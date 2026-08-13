# ui.posselect.com = 이 저장소의 Storybook 정적 빌드.
#
# 예전엔 `site/index.html`(claude.ai 디자인 툴 export) 한 장을 그대로 nginx에 얹었는데,
# 목차/앵커/라이브 프리뷰/props 컨트롤이 없어 실제 참조 문서 역할을 못 했다(Redmine posselect #127).
# 디자인 export 자체는 원본 목업으로서 가치가 있어 버리지 않고 `/mockup/`에 남긴다 —
# `.storybook/main.ts`의 staticDirs가 빌드 산출물로 복사한다.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build-storybook

FROM nginx:alpine
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
