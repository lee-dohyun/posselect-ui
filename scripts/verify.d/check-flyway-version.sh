#!/usr/bin/env bash
# Flyway 마이그레이션 버전 번호가 origin/main 과 충돌하는지 검사
set -uo pipefail

MIG_DIR="src/main/resources/db/migration"
[ -d "$MIG_DIR" ] || exit 0

git fetch -q origin main 2>/dev/null || true

# 현재 브랜치에서 새로 추가된 마이그레이션 파일 찾기
NEW_MIGRATIONS=$(git diff --name-only --diff-filter=A origin/main HEAD -- "$MIG_DIR" 2>/dev/null || true)

if [ -n "$NEW_MIGRATIONS" ]; then
  for file in $NEW_MIGRATIONS; do
    VERSION=$(basename "$file" | grep -oE '^V[0-9]+' || true)
    if [ -n "$VERSION" ]; then
      # origin/main 에 같은 버전 번호로 시작하는 마이그레이션이 있는지 검사
      if git ls-tree -r origin/main "$MIG_DIR" 2>/dev/null | grep -q "/${VERSION}__"; then
        echo "❌ Flyway 버전 충돌: 새로 추가한 $VERSION 버전이 origin/main 에 이미 존재합니다." >&2
        echo "   작업하는 동안 다른 세션이 같은 번호를 선점했습니다. 버전 번호를 다시 정하세요." >&2
        exit 1
      fi
    fi
  done
fi
exit 0
