import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('defaults to the neutral variant', () => {
    render(<Tag>재고부족</Tag>);
    expect(screen.getByText('재고부족')).toHaveClass('tag', 'tag-neutral');
  });

  it('applies the requested variant class', () => {
    render(<Tag variant="success">배송완료</Tag>);
    expect(screen.getByText('배송완료')).toHaveClass('tag', 'tag-success');
  });

  it('applies the highlight variant class', () => {
    render(<Tag variant="highlight">쿠폰</Tag>);
    expect(screen.getByText('쿠폰')).toHaveClass('tag', 'tag-highlight');
  });

  it('merges a caller-provided className alongside the variant class', () => {
    render(
      <Tag variant="danger" className="ml-2">
        품절
      </Tag>,
    );
    expect(screen.getByText('품절')).toHaveClass('tag', 'tag-danger', 'ml-2');
  });
});
