import { TableHTMLAttributes } from 'react';

/**
 * Thin wrapper — Industry's table is a plain `<table class="table">` with
 * native thead/tbody/tr/td, status cells reusing <Tag>. No row/cell
 * abstraction on top; compose with native table elements directly.
 */
export function Table(props: TableHTMLAttributes<HTMLTableElement>) {
  const { className = '', ...rest } = props;
  return <table className={`table ${className}`} {...rest} />;
}
