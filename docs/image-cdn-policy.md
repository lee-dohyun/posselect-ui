# 이미지 CDN 정책

`ui.posselect.com`(`site/index.html`)을 비롯해 이 저장소가 만들어내는 화면에 노출되는 브랜드 이미지(로고,
파비콘 등)는 **파일 자체를 페이지에 내장(base64 임베드)하지 않고, MinIO에 업로드한 이미지를 CDN을 통해
외부 URL로 참조**하는 것을 원칙으로 한다.

## 왜

- `site/index.html`은 claude.ai 디자인 툴의 "standalone export" 결과물을 그대로 배포한 것인데, 이 export는
  기본적으로 모든 이미지·폰트를 base64로 페이지 안에 통째로 욱여넣는다. 이미지가 페이지 안에 갇혀 있으면
  브라우저 캐싱 이점을 못 받고(페이지를 새로 받을 때마다 이미지도 매번 다시 받음), 다른 프론트(customer.front
  등)에서 같은 로고를 재사용할 수도 없다.
- 이미지를 MinIO(`image.posselect.com`)로 빼두면 여러 프론트가 같은 CDN URL을 공유할 수 있고, 브라우저/CDN
  캐시가 정상적으로 동작하며, 나중에 백엔드를 실제 클라우드(S3+CloudFront 등)로 옮길 때도 URL 체계만
  유지하면 되는 lift-and-shift가 가능해진다(자세한 배경은 `~/msa` CLAUDE.md의 "장기 방향" 섹션 참고).

## 버킷 구조 (MinIO)

브랜드 이미지는 두 개의 버킷에 걸쳐 있고, 역할이 명확히 다르다.

| 버킷 | 역할 | 비고 |
|---|---|---|
| `design-assets` | **스테이징 전용.** claude.ai 디자인 MCP(DesignSync)로 가져온 원본을 그대로 미러링. | 서비스가 직접 참조하면 안 됨 — 디자인 툴에서 파일이 바뀌면 이 버킷도 그대로 따라 바뀌는 사본일 뿐. |
| `cdn` | **실제 서비스가 참조하는 프로덕션 버킷.** `design-assets`와 동일한 폴더 구조를 미러링하되, 명시적으로 검토해서 복사한 파일만 존재. | `site/index.html`을 포함해 실제 화면은 반드시 이 버킷만 참조. |

두 버킷 모두 내부 폴더 구조는 동일하게 맞춘다:

```
logos/      로고 배리에이션 전체 (svg/png/webp, 스택형, 태그라인, 정방형, 다크배경용 등)
favicons/   파비콘 (다양한 배경/색상 조합)
marks/      로고에서 분리된 마크(심볼)만
misc/       CI 보드 등 기타 참고 자산
```

## 이미지가 실제로 서빙되는 경로

`image.posselect.com`(imgproxy) → `cdn` 버킷. imgproxy는 root 자격증명으로 MinIO에 접근하므로 버킷은
private으로 유지해도 무방하다. 서명 URL은 다음 스크립트로 생성한다(이 저장소가 아니라 인프라 저장소
`~/msa`에 있음):

```bash
~/msa/imgproxy/generate-signed-url.sh cdn logos/posselect-logo-square.png
# -> https://image.posselect.com/<서명>/rs:fit:0:0/plain/s3://cdn/logos/posselect-logo-square.png
```

## `site/index.html`을 다시 내보낼 때 지켜야 할 절차

claude.ai 디자인 프로젝트("Posselect design system mockups")에서 "Export → Standalone HTML"로 다시
내보낼 때마다, 내보낸 파일은 기본적으로 모든 이미지를 다시 base64로 임베드한 상태로 나온다. 배포 전에
반드시 아래 절차로 CDN 참조로 되돌려야 한다.

1. 새로 내보낸 HTML에서 `<script type="__bundler/manifest">` 안의 JSON을 파싱해 이미지 자산 UUID → base64
   데이터 맵을 얻는다.
2. `cdn` 버킷의 모든 파일을 내려받아 MD5 해시를 계산하고, manifest의 각 이미지 자산과 해시를 대조한다 —
   **정확히 일치하는 것만** 실제 브랜드 자산이다(치수가 비슷해도 페이지 전용으로 배경/여백이 합성된 예시
   목업 이미지는 원본 자산과 바이트가 달라서 매칭되지 않는다 — 그런 건 그대로 임베드된 채로 둔다).
3. 매칭된 각 자산에 대해 `~/msa/imgproxy/generate-signed-url.sh cdn <key>`로 서명 URL을 생성한다.
4. `<script type="__bundler/template">` 안의 JSON 문자열에서, 매칭된 UUID가 `<img src="UUID">` 또는
   `<link rel="icon" href="UUID">` 형태로 등장하는 위치를 찾아 서명 URL 문자열로 그대로 치환한다(단순
   문자열 치환으로 충분 — UUID와 URL 둘 다 JSON 이스케이프가 필요 없는 문자셋이라 이스케이프 구조가
   깨지지 않는다). **`__bundler/manifest`의 원본 base64 데이터 자체는 건드리지 않아도 된다** — 사용되지
   않는 채로 남아도 무해하다(단, 대략 300~500 bytes/자산 정도씩 파일 크기가 불어나는 정도의 사소한
   비용은 있음).
5. 로컬에서 `docker build` + 컨테이너 실행으로 최소한 curl 검증(HTTP 200, 새 CDN URL이 응답에 포함되는지)
   후 배포한다 — 이 페이지는 프로덕션 도메인에 종속된 부트스트랩 로직이 있어서 `localhost`로 브라우저
   렌더링 검증은 안 될 수 있다(원본도 마찬가지로 안 됨, 이 파일 고유의 특성이지 문제 있는 게 아님).
6. 배포 후 실제 도메인에서 하드 리프레시(Ctrl+Shift+R)로 확인할 것 — 이 사이트는 `Cache-Control` 헤더가
   없어 일반 새로고침만으로는 이전 버전이 캐시에서 계속 나올 수 있다.

## 새 브랜드 자산을 추가할 때

1. 디자인 프로젝트(`assets/`)에서 파일을 받아 `design-assets` 버킷에 업로드(스테이징).
2. 실제로 서비스에서 쓸 게 확정되면 같은 키로 `cdn` 버킷에 복사(프로모션).
3. `design-assets`의 파일이 나중에 바뀌어도 `cdn`은 자동으로 따라 바뀌지 않는다 — 필요하면 다시
   명시적으로 복사해야 한다(의도된 동작 — 검토 없이 스테이징 변경이 바로 서비스에 반영되는 걸 막기 위함).
4. `cdn` 버킷에 파일을 추가/삭제했으면 `~/msa/imgproxy/cdn-alias/generate-cdn-alias-conf.sh`를
   재실행해서 아래 "짧은 경로" 매핑도 갱신할 것.

## 짧은 경로: `image.posselect.com/cdn/<key>` (2026-08-06 추가)

`cdn` 버킷 자산의 서명 URL(`/<서명>/rs:fit:0:0/plain/s3://cdn/<key>`)이 문서/코드에 참조하기엔
너무 길고 복잡하다는 이유로, `image.posselect.com/cdn/<key>` 형태의 짧은 별칭 경로를 추가했다.
브라우저에서 열면 실제 서명 URL로 302 리다이렉트된다.

**서명을 생략해도 안전한 이유**: imgproxy 서명은 보통 클라이언트가 리사이즈 파라미터(폭/높이/크롭 등)를
자유롭게 바꿀 수 있을 때, 반복 요청으로 서버 리소스를 소모시키는 남용을 막기 위한 것이다. `cdn` 버킷은
처리 옵션이 `rs:fit:0:0`(원본 그대로) 고정이라 이 위협이 해당 없고, 애초에 공개해도 되는 브랜드 자산이라
— 실제 대규모 이커머스(Shopify 등)도 공개 상품/브랜드 이미지는 정해진 프리셋 URL로 서명 없이 서빙하는
것과 같은 패턴이다.

**구현**: `minio` 네임스페이스의 `cdn-alias` Deployment(퍼블릭 `nginx:alpine` 이미지, 별도 빌드/푸시
불필요) + Service. `cdn` 버킷의 모든 키를 실제 서명 URL로 302 리다이렉트하는 정적 nginx conf를
ConfigMap으로 관리(`~/msa/imgproxy/cdn-alias/generate-cdn-alias-conf.sh`가 생성/재적용). gateway
(`application.yml`)의 `cdn-alias` 라우트(`Host=image.posselect.com` + `Path=/cdn/**`)가 기존
catch-all `shop-image-proxy` 라우트보다 먼저 매칭되도록 배치되어 있다.

**주의**: 이 매핑은 `cdn` 버킷 상태의 스냅샷이라, 버킷에 파일을 추가/삭제/이름변경하면 위 스크립트를
반드시 재실행해야 한다 — 자동 동기화되지 않는다.
