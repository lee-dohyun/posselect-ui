import { ReactNode } from 'react';

type ToastVariant = 'success' | 'warning' | 'danger';

interface ToastProps {
  variant?: ToastVariant;
  children: ReactNode;
  className?: string;
}

/**
 * Fixed bottom-right notification — no Industry base page, added from the
 * Posselect mockup project's Dialog &amp; Toast screen. Render conditionally
 * from the consumer's own timed state (matches the mockup's `showToast`).
 */
export function Toast({ variant = 'success', children, className = '' }: ToastProps) {
  return (
    <div className={`toast blueprint ${className}`} role="status">
      <span className={`toast-dot ${variant !== 'success' ? `toast-dot-${variant}` : ''}`} />
      <span className="toast-text">{children}</span>
    </div>
  );
}
