interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/** Builds the page-number list with a single ellipsis, e.g. [1, '…', 4, 5, 6, '…', 12]. */
function pageList(page: number, totalPages: number): (number | '…')[] {
  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const result: (number | '…')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - (sorted[i - 1] as number) > 1) result.push('…');
    result.push(p);
  });
  return result;
}

/** Numbered pager with prev/next icon buttons — Industry components/pagination.html + posselect current-page fill. */
export function Pagination({ page, totalPages, onPageChange, className = '' }: PaginationProps) {
  return (
    <nav className={`pagination ${className}`} aria-label="페이지">
      <button
        type="button"
        className="btn btn-ghost btn-icon"
        aria-label="이전"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        ‹
      </button>
      {pageList(page, totalPages).map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="pagination-ellipsis">…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={`btn btn-icon ${p === page ? 'btn-primary' : 'btn-ghost'}`}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        className="btn btn-ghost btn-icon"
        aria-label="다음"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        ›
      </button>
    </nav>
  );
}
