import { TableHTMLAttributes } from 'react';

/**
 * Thin wrapper — Industry's table is a plain `<table class="table">` with
 * native thead/tbody/tr/td, status cells reusing <Tag>. No row/cell
 * abstraction on top; compose with native table elements directly.
 *
 * The `.table-wrap` div around it is a scroll container (2026-08-13): order/product
 * tables have enough columns to exceed a phone viewport, and without it the overflow
 * propagates up and puts the whole page into horizontal scroll. It only scrolls when
 * the table genuinely doesn't fit, so narrow tables are unaffected.
 */
export function Table(props: TableHTMLAttributes<HTMLTableElement>) {
  const { className = '', ...rest } = props;
  return (
    <div className="table-wrap">
      <table className={`table ${className}`} {...rest} />
    </div>
  );
}
