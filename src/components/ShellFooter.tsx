import { Logo } from './Logo';

/**
 * 완전 정적인 Footer 위젯 — fetch 없음, 항상 동일하게 렌더링된다.
 */
export function ShellFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-biz">
          <Logo size={20} />
          <div className="site-footer-biz-info" style={{ marginTop: 14 }}>
            (주)포스셀렉트 · 대표 홍길동
            <br />
            사업자등록번호 123-45-67890
            <br />
            통신판매업신고 제2026-서울강남-01234호
            <br />
            서울특별시 강남구 테헤란로 123
          </div>
        </div>

        <div className="site-footer-links">
          <div>
            <div className="site-footer-links-group-title">고객센터</div>
            <div className="site-footer-cs-phone">1588-0000</div>
            <div className="site-footer-cs-hours">평일 09:00–18:00 (주말·공휴일 휴무)</div>
            <div className="site-footer-links-group" style={{ marginTop: 14 }}>
              <a href="https://customer.posselect.com/mypage">1:1 문의</a>
              <a href="https://home.posselect.com/notices">공지사항</a>
              <a href="https://home.posselect.com/faq">자주 묻는 질문</a>
            </div>
          </div>
          <div>
            <div className="site-footer-links-group-title">이용안내</div>
            <div className="site-footer-links-group">
              <a href="https://home.posselect.com/terms">이용약관</a>
              <a href="https://home.posselect.com/privacy" className="strong">
                개인정보처리방침
              </a>
              <a href="https://home.posselect.com/shipping">배송/교환/반품 안내</a>
              <a href="https://home.posselect.com/youth-policy">청소년보호정책</a>
              <a href="https://home.posselect.com/safe-trade">안전거래센터</a>
            </div>
          </div>
          <div>
            <div className="site-footer-links-group-title">회사</div>
            <div className="site-footer-links-group">
              <a href="https://home.posselect.com/about">회사 소개</a>
              <a href="https://home.posselect.com/careers">채용</a>
              <a href="https://home.posselect.com/partners">입점 문의</a>
              <a href="https://home.posselect.com/ads">광고 문의</a>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <div className="site-footer-copyright">© {year} PosSelect Corp. All rights reserved.</div>
        {/* SNS/앱 다운로드: 실제 채널/앱이 없어 클릭해도 아무 데도 안 가는 비활성 표시만 유지한다
            (진짜 링크로 두면 404로 튕겨나가므로 span + aria-disabled로 "미구현" 상태를 명시). */}
        <div className="site-footer-social">
          <span className="icon-btn" aria-disabled="true" title="준비 중">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="2" y="2" width="20" height="20" rx="5"></rect>
              <circle cx="12" cy="12" r="4.2"></circle>
              <circle cx="17.4" cy="6.6" r="1"></circle>
            </svg>
          </span>
          <span className="icon-btn" aria-disabled="true" title="준비 중">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M14 9V6a2 2 0 0 1 2-2h2V1h-3a5 5 0 0 0-5 5v3H7v3h3v10h4V12h3l1-3h-4z"></path>
            </svg>
          </span>
          <span className="icon-btn" aria-disabled="true" title="준비 중">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="2" y="4" width="20" height="16" rx="3"></rect>
              <polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none"></polygon>
            </svg>
          </span>
        </div>
        <div className="site-footer-payments">
          <span className="tag">VISA</span>
          <span className="tag">Mastercard</span>
          <span className="tag">KakaoPay</span>
          <span className="tag">네이버페이</span>
          <span className="tag">무통장입금</span>
        </div>
      </div>

      <div className="site-footer-app">
        <span className="badge" aria-disabled="true" title="준비 중">
          App Store
        </span>
        <span className="badge" aria-disabled="true" title="준비 중">
          Google Play
        </span>
      </div>
    </footer>
  );
}
