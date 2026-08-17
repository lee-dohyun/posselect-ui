import { describe, it, expect } from 'vitest';
import { pageList } from './Pagination';

describe('Pagination pageList', () => {
  it('generates simple list without ellipsis when totalPages is small', () => {
    expect(pageList(1, 3)).toEqual([1, 2, 3]);
  });

  it('generates ellipsis near the end when on early pages', () => {
    expect(pageList(1, 10)).toEqual([1, 2, '…', 10]);
    expect(pageList(2, 10)).toEqual([1, 2, 3, '…', 10]);
  });

  it('generates ellipsis near the start when on late pages', () => {
    expect(pageList(10, 10)).toEqual([1, '…', 9, 10]);
    expect(pageList(9, 10)).toEqual([1, '…', 8, 9, 10]);
  });

  it('generates two ellipses when in the middle', () => {
    expect(pageList(5, 10)).toEqual([1, '…', 4, 5, 6, '…', 10]);
  });
});
