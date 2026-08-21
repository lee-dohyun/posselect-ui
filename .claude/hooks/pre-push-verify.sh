#!/usr/bin/env bash
# PreToolUse(Bash) hook — `git push` 직전에 타입체크/린트를 강제한다.
#
# 왜: 이 저장소들의 CI는 Docker 빌드 성공만을 게이트로 삼고 lint/typecheck를 돌리지 않는다.
# main push는 self-hosted runner를 통해 즉시 프로덕션에 반영된다.
# exit 2 = 도구 호출 차단, exit 0 = 통과.
set -uo pipefail

INPUT=$(cat)
CMD=$(printf '%s' "$INPUT" | jq -r '.tool_input.command // empty')

case "$CMD" in
  *"git push"*) ;;
  *) exit 0 ;;
esac

if [ "${CLAUDE_SKIP_PUSH_VERIFY:-}" = "1" ]; then
  echo "pre-push-verify: CLAUDE_SKIP_PUSH_VERIFY=1 이므로 건너뜀" >&2
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$PWD}" || exit 0
[ -f package.json ] || exit 0

FAILED=""
if jq -e '.scripts.typecheck' package.json >/dev/null 2>&1; then
  echo "pre-push-verify: npm run typecheck 실행 중" >&2
  npm run typecheck --silent || FAILED="typecheck"
fi
if [ -z "$FAILED" ] && jq -e '.scripts.lint' package.json >/dev/null 2>&1; then
  echo "pre-push-verify: npm run lint 실행 중" >&2
  npm run lint --silent || FAILED="lint"
fi
if [ -z "$FAILED" ] && jq -e '.scripts.test' package.json >/dev/null 2>&1; then
  echo "pre-push-verify: npm test 실행 중" >&2
  npm test --silent || FAILED="test"
fi

[ -z "$FAILED" ] && { echo "pre-push-verify: 통과" >&2; exit 0; }

cat >&2 <<MSG
push를 차단했습니다: npm run $FAILED 가 실패했습니다.

이 저장소는 main push가 곧 프로덕션 배포이며 CI는 Docker 빌드 성공만 확인합니다.
즉 지금 push하면 이 실패는 아무 데서도 걸러지지 않고 운영에 반영됩니다.

검증 없이 진행해야 할 정당한 사유가 있다면 CLAUDE_SKIP_PUSH_VERIFY=1 을 설정하세요.
MSG
exit 2
