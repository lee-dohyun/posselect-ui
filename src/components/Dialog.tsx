import { CSSProperties, MouseEvent, ReactNode, useEffect, useRef, useId } from 'react';
import { BlueprintCorners } from './Blueprint';

interface DialogProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
  /** Overrides the default 440px cap (still clamped to 100% viewport width) — use for content that needs more line length, e.g. long-form text. */
  maxWidth?: number;
}

/**
 * Modal at the top elevation — matches Industry's components/dialog.html.
 * Fixed-height chrome (title/actions) with an internally scrolling body, so content longer
 * than the viewport (long-form text, tall forms on a phone with the keyboard open) stays
 * reachable instead of silently overflowing past the screen edge.
 */
export function Dialog({ title, children, actions, onClose, maxWidth }: DialogProps) {
  const stop = (e: MouseEvent) => e.stopPropagation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    
    if (dialogRef.current) {
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'));
      if (focusable.length > 0) focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="dialog blueprint"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={stop}
        style={maxWidth ? ({ '--dialog-max-width': `${maxWidth}px` } as CSSProperties) : undefined}
      >
        <BlueprintCorners />
        <div className="dialog-title" id={titleId}>{title}</div>
        <div className="dialog-body">{children}</div>
        {actions && <div className="dialog-actions">{actions}</div>}
      </div>
    </div>
  );
}
