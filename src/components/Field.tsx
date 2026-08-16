import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

interface FieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  error?: string | boolean;
  helpText?: ReactNode;
  className?: string;
}

export function Field({ label, children, required, error, helpText, className = '' }: FieldProps) {
  return (
    <div className={`field ${className}`}>
      <label className={required ? 'required' : ''}>{label}</label>
      {children}
      {error && typeof error === 'string' && <div className="field-error-text">{error}</div>}
      {!error && helpText && <div className="field-help">{helpText}</div>}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', ...rest } = props;
  return <input className={`input ${className}`} {...rest} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = '', ...rest } = props;
  return <textarea className={`input ${className}`} {...rest} />;
}
