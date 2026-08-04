import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  block?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', block, className = '', ...props }, ref) => {
    const classes = ['btn', `btn-${variant}`, block && 'btn-block', className]
      .filter(Boolean)
      .join(' ');
    return <button ref={ref} className={classes} {...props} />;
  }
);
Button.displayName = 'Button';
