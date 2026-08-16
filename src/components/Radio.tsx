import { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  label: ReactNode;
}

export function Radio({ label, className = '', ...props }: RadioProps) {
  return (
    <label className={`radio ${className}`}>
      <input type="radio" {...props} />
      <span className="dot" />
      {label}
    </label>
  );
}
