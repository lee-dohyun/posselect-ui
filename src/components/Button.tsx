import { ButtonHTMLAttributes, forwardRef } from 'react';
import { BlueprintCorners } from './Blueprint';

type Variant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** btn-icon modifier — square icon-only button, combine with any variant */
  icon?: boolean;
  block?: boolean;
}

// primary/secondary wear the blueprint frame + corner marks; ghost stays a frameless text action
// (matches Industry components/buttons.html exactly).
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', icon, block, className = '', children, ...props }, ref) => {
    const framed = variant !== 'ghost';
    const classes = [
      'btn',
      `btn-${variant}`,
      icon && 'btn-icon',
      block && 'btn-block',
      framed && 'blueprint',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <button ref={ref} className={classes} {...props}>
        {framed && <BlueprintCorners />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
