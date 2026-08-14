import { CSSProperties, MouseEvent, ReactNode } from 'react';
import { BlueprintCorners } from './Blueprint';

interface DialogProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
  /** Overrides the default 440px cap (still clamped to 100% viewport width) — use for content that needs more line length, e.g. long-form text. */
  maxWidth?: number;
}

/** Modal at the top elevation — matches Industry's components/dialog.html. */
export function Dialog({ title, children, actions, onClose, maxWidth }: DialogProps) {
  const stop = (e: MouseEvent) => e.stopPropagation();
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="dialog blueprint"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ds-dialog-title"
        onClick={stop}
        style={maxWidth ? ({ '--dialog-max-width': `${maxWidth}px` } as CSSProperties) : undefined}
      >
        <BlueprintCorners />
        <div className="dialog-title" id="ds-dialog-title">{title}</div>
        <div className="dialog-body">{children}</div>
        {actions && <div className="dialog-actions">{actions}</div>}
      </div>
    </div>
  );
}
