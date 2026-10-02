#!/usr/bin/env bash
# AGENTS.md 의 공통 캐논 블록이 손으로 고쳐졌는지 검사한다 (gateway#215).
#
# 블록은 `~/msa/scripts/sync-agents-canon.sh` 가 주입하고, `canon:begin sha=` 헤더에 본문 해시를
# 같이 적는다. 본문을 다시 해시해 헤더와 다르면 누군가 블록을 직접 고친 것이다 — 그러면 저장소마다
# 규칙이 갈라지고 다음 sync 때 그 수정은 조용히 덮어써진다. 규칙은 원본(`~/msa/AGENTS.md`)에서 고친다.
#
# 저장소 안에서 완결된다(네트워크·LLM 없음). CANON_CHECK_REMOTE=1 이면 추가로 정본
# (gateway/docs/agents-canon.md)과 sha 를 비교해 "sync 가 안 돌았다"를 경고한다. 이쪽은 실패로
# 처리하지 않는다 — 캐논이 갱신되면 그 전에 열린 PR 은 전부 낡은 블록을 갖게 되는데, 그건 PR 의 잘못이 아니다.
set -uo pipefail
ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
F="$ROOT/AGENTS.md"
[ -f "$F" ] || exit 0
CANON_RAW_URL="${CANON_RAW_URL:-https://raw.githubusercontent.com/lee-dohyun/gateway/main/docs/agents-canon.md}"

OUT=$(python3 - "$F" <<'PY'
import hashlib, re, sys
s = open(sys.argv[1], encoding='utf-8').read()
m = re.search(r'<!-- canon:begin sha=([0-9a-f]+)[^>]*-->\n(.*?)<!-- canon:end -->', s, re.S)
if not m:
    print("NOBLOCK"); sys.exit(0)
declared, body = m.group(1), m.group(2)
# 블록 = 제목 + 빈 줄 + 안내 인용문(> ...) + 빈 줄 + 캐논 본문. 해시는 캐논 본문에만 걸려 있다.
lines = body.split('\n')
i = 0
while i < len(lines) and not lines[i].startswith('>'): i += 1
while i < len(lines) and lines[i].startswith('>'): i += 1
core = '\n'.join(lines[i:]).strip('\n')
actual = hashlib.sha1(core.encode('utf-8')).hexdigest()[:len(declared)]
print(f"{declared} {actual}")
PY
) || { echo "check-canon-block: AGENTS.md 를 읽지 못했다" >&2; exit 1; }

if [ "$OUT" = "NOBLOCK" ]; then
  echo "check-canon-block: AGENTS.md 에 캐논 블록이 없다 — ~/msa/scripts/sync-agents-canon.sh 로 주입할 것" >&2
  exit 1
fi
DECLARED=${OUT% *}; ACTUAL=${OUT#* }
if [ "$DECLARED" != "$ACTUAL" ]; then
  cat >&2 <<MSG
check-canon-block: AGENTS.md 의 캐논 블록이 손으로 수정됐다 (헤더 sha=$DECLARED, 본문 sha=$ACTUAL).
  이 블록은 자동 주입분이다. 수정을 되돌리고, 규칙을 바꾸려면 원본 ~/msa/AGENTS.md 를 고친 뒤
  ~/msa/scripts/sync-agents-canon.sh 를 돌릴 것.
MSG
  exit 1
fi

if [ "${CANON_CHECK_REMOTE:-0}" = "1" ]; then
  REMOTE=$(curl -fsSL --max-time 15 "$CANON_RAW_URL" 2>/dev/null | sed -n 's/.*canon-source sha=\([0-9a-f]*\).*/\1/p' | head -1)
  if [ -z "$REMOTE" ]; then
    echo "::warning::check-canon-block: 정본($CANON_RAW_URL)을 받지 못해 최신 여부는 확인하지 못했다"
  elif [ "$REMOTE" != "$DECLARED" ]; then
    echo "::warning file=AGENTS.md::캐논 블록이 정본보다 낡았다 (이 브랜치 $DECLARED / 정본 $REMOTE). main 을 머지하거나 sync-agents-canon.sh 를 돌릴 것"
  fi
fi
exit 0
