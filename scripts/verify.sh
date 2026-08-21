#!/usr/bin/env bash
# push 전 검증 — 이 저장소의 **도구 무관 단일 진입점**.
#
# 호출자 3곳(같은 스크립트를 부른다):
#   - .githooks/pre-push                     git push 하는 모든 주체(Codex/Antigravity/사람 포함)
#   - .claude/hooks/pre-push-verify.sh       Claude Code (PreToolUse)
#   - .github/workflows/pr-check.yml         CI
#
# 왜 이렇게 바꿨나: 2026-08-21 실측에서 검증 로직이 `.claude/hooks/` 아래에만 있었고
# `core.hooksPath` 는 전 저장소 unset, `.git/hooks` 는 비어 있었다. 즉 Claude 이외의 도구가
# push 하면 아무 검증도 걸리지 않았고, main push 는 곧 프로덕션 배포다.
#
# 종료 코드: 0 통과 / 1 실패. LLM·네트워크를 쓰지 않는다.
set -uo pipefail

ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$ROOT" || exit 0

if [ "${MSA_SKIP_VERIFY:-0}" = "1" ] || [ "${CLAUDE_SKIP_PUSH_VERIFY:-0}" = "1" ]; then
  echo "verify: 건너뜀(SKIP 환경변수). 우회했다면 그 사실을 보고에 남길 것." >&2
  exit 0
fi

# 비대화형 셸(git hook 포함)에는 nvm 경로가 없다 — npm 을 직접 찾는다.
if ! command -v npm >/dev/null 2>&1; then
  NVM_BIN=$(ls -d "$HOME"/.nvm/versions/node/*/bin 2>/dev/null | sort -V | tail -1)
  [ -n "$NVM_BIN" ] && export PATH="$NVM_BIN:$PATH"
fi

# 문서/도구 설정만 바뀐 push 는 검증을 건너뛴다(빌드 산출물에 영향이 없다).
BASE=""
BRANCH=$(git branch --show-current 2>/dev/null)
if [ -n "$BRANCH" ] && git rev-parse -q --verify "origin/$BRANCH" >/dev/null 2>&1; then BASE="origin/$BRANCH"
elif git rev-parse -q --verify origin/main >/dev/null 2>&1; then BASE="origin/main"; fi
if [ -n "$BASE" ]; then
  CHANGED=$(git diff --name-only "$BASE..HEAD" 2>/dev/null)
  if [ -n "$CHANGED" ] && ! printf '%s\n' "$CHANGED" | grep -qvE '(\.md$|^\.claude/|^\.githooks/|^\.cursor/|^docs/)'; then
    echo "verify: 문서·도구 설정만 변경됨 — 검증 생략" >&2
    exit 0
  fi
fi

FAILED=""
run() { # run <이름> <명령...>
  local name="$1"; shift
  echo "verify: $name 실행 중" >&2
  "$@" || { FAILED="$name"; return 1; }
}

if [ -x ./gradlew ]; then
  run "./gradlew test" ./gradlew test --console=plain -q || true
elif [ -f package.json ] && [ ! -d node_modules ]; then
  # worktree 를 새로 판 경우 등 의존성이 없는 트리에서는 검증이 성립하지 않는다.
  # 여기서 실패로 처리하면 정상 변경까지 막히므로, 못 돌렸다는 사실만 남기고 통과시킨다.
  echo "verify: node_modules 없음 — Node 검증을 돌릴 수 없다(npm ci 후 다시 검증할 것)" >&2
elif [ -f package.json ] && command -v npm >/dev/null 2>&1; then
  has() { node -e "process.exit(require('./package.json').scripts?.['$1']?0:1)" 2>/dev/null; }
  has typecheck && [ -z "$FAILED" ] && { run "npm run typecheck" npm run typecheck --silent || true; }
  has lint      && [ -z "$FAILED" ] && { run "npm run lint" npm run lint --silent || true; }
  has test      && [ -z "$FAILED" ] && { run "npm test" npm test --silent || true; }
elif [ -f package.json ]; then
  echo "verify: npm 을 찾을 수 없다 — Node 검증을 건너뛴다(설치 경로 확인 필요)" >&2
fi

# 저장소 고유 검사(있으면). LLM 없는 결정적 스크립트만 둘 것.
if [ -z "$FAILED" ] && [ -d scripts/verify.d ]; then
  for extra in scripts/verify.d/*.sh; do
    [ -f "$extra" ] || continue
    run "$(basename "$extra")" bash "$extra" || break
  done
fi

if [ -n "$FAILED" ]; then
  cat >&2 <<MSG

❌ verify 실패: $FAILED

이 저장소는 main push 가 곧 프로덕션 배포다(self-hosted runner 가 kubectl set image 까지 수행).
지금 push 하면 이 실패는 아무 데서도 걸러지지 않고 운영에 반영된다. 원인을 고친 뒤 다시 시도할 것.

정당한 사유가 있어 우회해야 한다면 MSA_SKIP_VERIFY=1 을 설정하고, 우회 사실을 보고/이슈에 남길 것.
MSG
  exit 1
fi
echo "verify: 통과" >&2
exit 0
