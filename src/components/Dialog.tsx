import { MouseEvent, ReactNode } from 'react';
import { BlueprintCorners } from './Blueprint';

interface DialogProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
}

/** Modal at the top elevation — matches Industry's components/dialog.html. */
export function Dialog({ title, children, actions, onClose }: DialogProps) {
  const stop = (e: MouseEvent) => e.stopPropagation();
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog blueprint" role="dialog" aria-modal="true" aria-labelledby="ds-dialog-title" onClick={stop}>
        <BlueprintCorners />
        <div className="dialog-title" id="ds-dialog-title">{title}</div>
        <div className="dialog-body">{children}</div>
        {actions && <div className="dialog-actions">{actions}</div>}
      </div>
    </div>
  );
}
