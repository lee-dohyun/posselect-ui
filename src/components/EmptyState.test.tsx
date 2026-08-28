import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import { EmptyState } from './EmptyState';

/**
 * posselect-ui#35 회귀 가드.
 *
 * 아이콘 슬롯은 아이콘 자체가 아니라 그것을 감싼 full-width 래퍼 div 다. 중앙 정렬을
 * `margin: 0 auto` 나 상위의 `text-align: center` 에 기대면, Tailwind preflight
 * (`svg { display: block }`)를 함께 로드하는 소비자에서 아이콘이 왼쪽 끝에 붙는다.
 * 래퍼 자체가 중앙 정렬 컨테이너여야 자식의 display 와 무관하게 가운데로 온다.
 *
 * jsdom 은 레이아웃을 계산하지 않으므로 실제 좌표가 아니라 적용된 선언을 확인한다.
 * 좌표 검증은 preflight 를 켠 Storybook 에서 눈으로 본다.
 */
beforeAll(() => {
  const style = document.createElement('style');
  // vitest 의 cwd 는 저장소 루트다(vitest.config.ts).
  style.textContent = readFileSync('src/styles/tokens.css', 'utf8');
  document.head.appendChild(style);
});

describe('EmptyState', () => {
  it('centers the icon slot with a layout that survives Tailwind preflight', () => {
    render(<EmptyState icon={<svg data-testid="icon" />} title="장바구니가 비어 있습니다" />);

    const slot = screen.getByTestId('icon').parentElement!;
    expect(slot).toHaveClass('empty-state-icon');

    const style = getComputedStyle(slot);
    expect(style.display).toBe('flex');
    expect(style.justifyContent).toBe('center');
  });
});
