#!/usr/bin/env bash
# tokens.css 와 tailwind.config.js 의 색상 토큰이 서로의 미러인지 기계적으로 대조한다.
#
# 왜: 두 파일은 손으로 유지되는 미러다. 한쪽만 고치면 Storybook과 실제 앱이 어긋나거나
# 클래스가 아무 값으로도 해석되지 않는다. 사람 눈으로는 램프 한 단계 누락을 놓치기 쉽다.
# 단독 실행도 되고 PostToolUse 훅으로도 쓰인다. 훅으로 쓰일 때도 push를 막지는 않는다(경고).
set -uo pipefail
cd "${CLAUDE_PROJECT_DIR:-$PWD}" || exit 0

CSS=src/styles/tokens.css
TW=tailwind.config.js
[ -f "$CSS" ] && [ -f "$TW" ] || exit 0

hexes() { grep -oiE '#[0-9a-f]{6}\b' "$1" | tr 'A-F' 'a-f' | sort -u; }

ONLY_CSS=$(comm -23 <(hexes "$CSS") <(hexes "$TW"))
ONLY_TW=$(comm -13 <(hexes "$CSS") <(hexes "$TW"))

# tokens.css 안에서 정의되지 않은 var(--...) 참조 찾기 (hero 배너 인시던트 유형).
# 제외 대상: (1) `var(--x-${...})` 처럼 JS 템플릿 리터럴로 조립되는 동적 참조
#           (2) `var(--x, fallback)` 처럼 대체값이 있어 조용히 죽지 않는 참조
DEFINED=$(grep -oE '^\s*--[a-z0-9-]+' "$CSS" | tr -d ' ' | sort -u)
USED=$(grep -rhoE 'var\(--[a-z0-9-]+[),]' src/ 2>/dev/null \
        | grep -v ',$' \
        | sed -E 's/var\(//; s/[),]$//' \
        | sort -u)
UNDEF=$(comm -13 <(printf '%s\n' "$DEFINED") <(printf '%s\n' "$USED"))

STATUS=0
if [ -n "$ONLY_CSS" ] || [ -n "$ONLY_TW" ]; then
  STATUS=1
  echo "토큰 미러 불일치 — 두 파일은 서로의 미러여야 합니다:" >&2
  [ -n "$ONLY_CSS" ] && { echo "  tokens.css 에만 있는 색:" >&2; echo "$ONLY_CSS" | sed 's/^/    /' >&2; }
  [ -n "$ONLY_TW" ] && { echo "  tailwind.config.js 에만 있는 색:" >&2; echo "$ONLY_TW" | sed 's/^/    /' >&2; }
fi
if [ -n "$UNDEF" ]; then
  STATUS=1
  echo "정의되지 않은 CSS 변수 참조 — 조용히 무시되어 배경이 투명해집니다(hero 배너 인시던트 유형):" >&2
  echo "$UNDEF" | sed 's/^/    /' >&2
fi
[ "$STATUS" -eq 0 ] && echo "토큰 미러 정상 (색 $(hexes "$CSS" | wc -l)종, 정의된 변수 $(printf '%s\n' "$DEFINED" | wc -l)개)"
exit "$STATUS"
