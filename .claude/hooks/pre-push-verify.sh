#!/usr/bin/env bash
# PreToolUse(Bash) 훅 — `git push` 직전에 scripts/verify.sh 를 돌린다.
#
# 검증 로직은 여기 있지 않다. scripts/verify.sh 한 곳에 있고 .githooks/pre-push 와 CI 도
# 같은 스크립트를 부른다 — 예전처럼 Claude 훅에만 로직이 있으면 다른 도구의 push 는
# 아무 검증도 못 받는다.
# exit 2 = 도구 호출 차단(사유가 Claude 에게 전달됨), exit 0 = 통과.
set -uo pipefail

INPUT=$(cat)
CMD=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)
case "$CMD" in *"git push"*) ;; *) exit 0 ;; esac

cd "${CLAUDE_PROJECT_DIR:-$PWD}" 2>/dev/null || exit 0
ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
[ -f "$ROOT/scripts/verify.sh" ] || exit 0

if bash "$ROOT/scripts/verify.sh"; then exit 0; fi
echo "push 를 차단했습니다: scripts/verify.sh 실패(위 출력 참고). 원인을 고친 뒤 다시 push 하세요." >&2
exit 2
