import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { CategoryTiles } from './CategoryTiles';

const items = [
  { id: 9001, label: '패션의류', href: '/?category=9001', icon: <svg data-testid="icon-9001" /> },
  { id: 9002, label: '뷰티', href: '/?category=9002', icon: <svg data-testid="icon-9002" /> },
];

// vitest globals 가 꺼져 있어 testing-library 의 자동 cleanup 이 걸리지 않는다.
afterEach(cleanup);

describe('CategoryTiles', () => {
  it('renders one link per item, pointing at its href', () => {
    render(<CategoryTiles items={items} />);
    expect(screen.getByRole('link', { name: '패션의류' })).toHaveAttribute('href', '/?category=9001');
    expect(screen.getByRole('link', { name: '뷰티' })).toHaveAttribute('href', '/?category=9002');
  });

  it('frames each tile with the blueprint pattern and shows its icon', () => {
    render(<CategoryTiles items={items} />);
    const tile = screen.getByRole('link', { name: '패션의류' });
    expect(tile).toHaveClass('category-tile', 'blueprint');
    expect(tile).toContainElement(screen.getByTestId('icon-9001'));
  });

  it('labels the navigation landmark, defaulting to "카테고리"', () => {
    const { rerender } = render(<CategoryTiles items={items} />);
    expect(screen.getByRole('navigation', { name: '카테고리' })).toHaveClass('category-tiles');
    rerender(<CategoryTiles items={items} label="대분류" className="mt-4" />);
    expect(screen.getByRole('navigation', { name: '대분류' })).toHaveClass('category-tiles', 'mt-4');
  });

  it('renders nothing when there are no items', () => {
    const { container } = render(<CategoryTiles items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
