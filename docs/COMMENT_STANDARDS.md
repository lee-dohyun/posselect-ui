# 코드 주석(Comment) 표준화 가이드

이 문서는 시스템 전반의 유지보수성과 추적성을 극대화하기 위해 작성하는 JSDoc / JavaDoc 표준 가이드라인입니다. 모든 에이전트와 개발자는 코드를 커밋하기 전 아래 규칙을 준수해야 합니다.

## 1. 기본 원칙
* **Why 중심 작성**: 이 코드가 '무엇을' 하는지 설명하는 대신, **'왜' 그렇게 작성했는지(의도, 배경, UX/비즈니스 관점)**를 중점적으로 기재합니다.
* **선언부 문서화 강제**: 모든 주요 함수, 클래스, 인터페이스, 모듈 선언부 위에는 표준 문서화 주석 블록(`/** ... */`)을 반드시 작성합니다.

## 2. 필수 메타 태그 (JSDoc / JavaDoc)
모든 표준 주석 블록에는 반드시 다음 태그를 포함해야 합니다.

- `@author`: 해당 코드를 작성하거나 수정한 주체(예: `leedohyun`, `B2C Experience Optimizer` 등)
- `@since`: 해당 로직이 추가되거나 중대하게 변경된 일자 (형식: `YYYY-MM-DD`)
- `@see`: 관련된 참고 자료, GitHub 이슈 번호, 혹은 원본 데이터 모듈 링크 (예: `{@link https://github.com/lee-dohyun/customer.front/issues/2}`)

## 3. 작성 예시

### 프론트엔드 (JSDoc)
```typescript
/**
 * 이용약관 페이지 컴포넌트
 *
 * 약관 내용을 모달 창 밖에서도 독립적인 URL을 통해 접근할 수 있도록 제공하기 위함.
 * 사용자가 약관의 상세 내용을 모바일/데스크탑 환경에서 읽기 쉽게 구성하여 사용자 경험(UX)을 향상시킴.
 *
 * @author leedohyun
 * @since 2026-08-18
 * @see AGREEMENT_CONTENT
 * @see {@link https://github.com/lee-dohyun/customer.front/issues/2}
 * 
 * @returns {JSX.Element}
 */
export default function TermsPage() {
  // ...
}
```

## 4. 규격화된 TODO 태그
추가 보완이나 기술 부채 해결이 필요한 경우, 흩어지는 주석을 방지하기 위해 다음 규격을 사용합니다.
- `// TODO: [이슈번호/목적] 작업해야 할 내용 설명`
