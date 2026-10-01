#!/usr/bin/env bash
# PreToolUse(Bash) 훅 — 실제 `git push` 호출 직전에, **push 대상 저장소**의 scripts/verify.sh 를 돌린다.
#
# 검증 로직은 여기 있지 않다. scripts/verify.sh 한 곳에 있고 .githooks/pre-push 도
# 같은 스크립트를 부른다 — 예전처럼 Claude 훅에만 로직이 있으면 다른 도구의 push 는
# 아무 검증도 안 걸린다. 이 파일은 "Claude 가 push 하려 할 때 막는" 얇은 어댑터다.
# exit 2 = 도구 호출 차단(사유가 Claude 에게 전달됨), exit 0 = 통과.
#
# 무엇이 push 인가 (gateway#289):
#   예전에는 명령 문자열에 'git push' 가 들어 있기만 하면 발동했고, 항상 CLAUDE_PROJECT_DIR 저장소를
#   검증했다. 그래서 `gh issue comment --body "... git push ..."` 같은 명령이 수 분짜리 verify 를 돌리고,
#   `git -C ~/git/B push` 는 B 가 아니라 세션 저장소 A 를 검증했다.
#   지금은 명령을 shell 규칙대로 분해(따옴표·&&·;·|·개행·heredoc)해서 실제 git push 호출만 찾고,
#   `cd X &&` / `git -C X` 로 가리킨 디렉터리의 저장소를 검증한다. 기준 디렉터리는 훅 입력의 cwd.
#   - --dry-run/-n, --delete/-d, --help 는 검증하지 않는다(코드가 나가지 않는다).
#   - bash/sh/zsh -c '...' 는 안쪽 문자열을 다시 분해한다. eval·xargs·별칭·함수는 못 본다 —
#     그 경로는 .githooks/pre-push 가 막는다.
#   - 분해에 실패하면(파이썬 없음/예외) 예전 동작(문자열 매칭 + CLAUDE_PROJECT_DIR)으로 물러난다.
set -uo pipefail

INPUT=$(cat)

read -r -d '' PARSER <<'PY'
import json, os, re, shlex, subprocess, sys

SEP = set(";&|()")
WRAPPERS = {"env", "command", "sudo", "time", "nice", "nohup", "exec", "builtin"}
GIT_OPT_WITH_VALUE = {"-C", "-c", "--git-dir", "--work-tree", "--namespace", "--super-prefix",
                      "--exec-path", "--config-env", "--attr-source"}
roots = []

def normalize(cmd):
    """따옴표 밖의 개행을 ' ; ' 로 바꾸고 heredoc 본문을 지운다(본문 속 'git push' 오탐 방지)."""
    out, i, n = [], 0, len(cmd)
    q = None
    pending = []          # 이 줄 끝에서 읽어 넘길 heredoc 종결어 [(word, strip_tabs)]
    while i < n:
        c = cmd[i]
        if q:
            out.append(c)
            if c == "\\" and q == '"' and i + 1 < n:
                out.append(cmd[i + 1]); i += 2; continue
            if c == q: q = None
            i += 1; continue
        if c == "\\" and i + 1 < n:
            out.append(c); out.append(cmd[i + 1]); i += 2; continue
        if c in "'\"":
            q = c; out.append(c); i += 1; continue
        if cmd.startswith("<<", i) and not cmd.startswith("<<<", i):
            m = re.match(r"<<(-?)\s*(['\"]?)([A-Za-z0-9_]+)\2", cmd[i:])
            if m:
                pending.append((m.group(3), m.group(1) == "-"))
                out.append(" "); i += m.end(); continue
        if c == "\n":
            out.append(" ; "); i += 1
            while pending:
                word, strip = pending.pop(0)
                while i < n:
                    j = cmd.find("\n", i)
                    line = cmd[i:] if j < 0 else cmd[i:j]
                    i = n if j < 0 else j + 1
                    if (line.strip() if strip else line) == word: break
            continue
        out.append(c); i += 1
    return "".join(out)

def tokens(s):
    lex = shlex.shlex(s, posix=True, punctuation_chars=True)
    lex.whitespace_split = True
    lex.commenters = ""
    return list(lex)

def resolve(base, p):
    p = os.path.expandvars(os.path.expanduser(p))
    return os.path.normpath(p if os.path.isabs(p) else os.path.join(base, p))

def toplevel(d):
    r = subprocess.run(["git", "-C", d, "rev-parse", "--show-toplevel"], capture_output=True, text=True)
    return r.stdout.strip() if r.returncode == 0 else None

def handle_git(args, cur):
    d, i = cur, 0
    while i < len(args):
        a = args[i]
        if a == "-C" and i + 1 < len(args):
            d = resolve(d, args[i + 1]); i += 2; continue
        if a.startswith("--work-tree="):
            d = resolve(d, a.split("=", 1)[1]); i += 1; continue
        if a in GIT_OPT_WITH_VALUE and i + 1 < len(args):
            i += 2; continue
        if a.startswith("-"):
            i += 1; continue
        break
    if i >= len(args) or args[i] != "push":
        return
    rest = args[i + 1:]
    if any(x in ("-n", "--dry-run", "-d", "--delete", "-h", "--help") for x in rest):
        return
    r = toplevel(d) if os.path.isdir(d) else None
    roots.append(r or toplevel(cur) or "")

def handle_segment(seg, cur):
    """seg 를 처리하고 cd 가 있었으면 바뀐 디렉터리를 돌려준다."""
    k = 0
    while k < len(seg):
        w = seg[k]
        if re.match(r"^[A-Za-z_][A-Za-z0-9_]*=", w): k += 1; continue
        if w in WRAPPERS:
            k += 1
            while k < len(seg) and (seg[k].startswith("-") or re.match(r"^[A-Za-z_][A-Za-z0-9_]*=", seg[k])): k += 1
            continue
        break
    seg = seg[k:]
    if not seg: return cur
    w = os.path.basename(seg[0])
    if w in ("cd", "pushd"):
        tgt = [a for a in seg[1:] if not a.startswith("-")]
        if not tgt: return os.path.expanduser("~")
        if tgt[0] == "-": return cur
        nd = resolve(cur, tgt[0])
        return nd if os.path.isdir(nd) else cur
    if w == "git":
        handle_git(seg[1:], cur)
    elif w in ("bash", "sh", "zsh", "dash") and "-c" in seg:
        idx = seg.index("-c")
        if idx + 1 < len(seg): scan(seg[idx + 1], cur)
    return cur

def scan(cmd, cur):
    toks, seg = tokens(normalize(cmd)), []
    for t in toks + [";"]:
        if t and all(ch in SEP for ch in t):
            if seg: cur = handle_segment(seg, cur)
            seg = []
        else:
            seg.append(t)

try:
    data = json.load(sys.stdin)
    cmd = (data.get("tool_input") or {}).get("command") or ""
    cwd = data.get("cwd") or os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()
    scan(cmd, cwd)
except Exception as e:
    sys.stderr.write("pre-push-verify: 명령 분해 실패(%s) — 문자열 매칭으로 물러난다\n" % e)
    sys.exit(3)
for r in dict.fromkeys(x for x in roots if x):
    print(r)
PY

# 모든 Bash 호출에서 도는 훅이다 — 'git' 이 한 글자도 없는 명령은 파이썬을 띄우지 않고 바로 통과시킨다.
PRE=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null) && case "$PRE" in *git*) ;; *) exit 0 ;; esac

ROOTS=$(printf '%s' "$INPUT" | python3 -c "$PARSER")
rc=$?
if [ "$rc" -ne 0 ]; then
  # 폴백: 예전 동작. 명령에 'git push' 문자열이 있고 세션 저장소가 있으면 그 저장소를 검증한다.
  CMD=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
  case "$CMD" in *"git push"*) ;; *) exit 0 ;; esac
  ROOTS=$(cd "${CLAUDE_PROJECT_DIR:-$PWD}" 2>/dev/null && git rev-parse --show-toplevel 2>/dev/null)
fi

[ -n "${ROOTS:-}" ] || exit 0

while IFS= read -r ROOT; do
  [ -n "$ROOT" ] && [ -f "$ROOT/scripts/verify.sh" ] || continue
  if ! (cd "$ROOT" && bash scripts/verify.sh); then
    echo "push 를 차단했습니다: $ROOT/scripts/verify.sh 실패(위 출력 참고). 원인을 고친 뒤 다시 push 하세요." >&2
    exit 2
  fi
done <<< "$ROOTS"
exit 0
