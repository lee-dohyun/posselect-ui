import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode, createContext, useContext, useId } from 'react';

const FieldContext = createContext<{ id: string; error?: string | boolean; helpText?: ReactNode } | null>(null);

interface FieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  error?: string | boolean;
  helpText?: ReactNode;
  className?: string;
}

export function Field({ label, children, required, error, helpText, className = '' }: FieldProps) {
  const fieldId = useId();
  const errorId = error ? `${fieldId}-error` : undefined;
  const helpId = helpText ? `${fieldId}-help` : undefined;

  return (
    <FieldContext.Provider value={{ id: fieldId, error, helpText }}>
      <div className={`field ${className}`}>
        <label htmlFor={fieldId} className={required ? 'required' : ''}>{label}</label>
        {children}
        {error && typeof error === 'string' && <div id={errorId} className="field-error-text" role="alert">{error}</div>}
        {!error && helpText && <div id={helpId} className="field-help">{helpText}</div>}
      </div>
    </FieldContext.Provider>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = '', id, 'aria-invalid': ariaInvalid, 'aria-describedby': ariaDescribedby, ...rest } = props;
  const context = useContext(FieldContext);
  const inputId = id || context?.id;
  const isInvalid = ariaInvalid ?? !!context?.error;
  const describedBy = ariaDescribedby || [
    context?.error ? `${context.id}-error` : null,
    context?.helpText && !context?.error ? `${context.id}-help` : null
  ].filter(Boolean).join(' ') || undefined;

  return <input id={inputId} className={`input ${isInvalid ? 'input-error' : ''} ${className}`} aria-invalid={isInvalid} aria-describedby={describedBy} {...rest} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = '', id, 'aria-invalid': ariaInvalid, 'aria-describedby': ariaDescribedby, ...rest } = props;
  const context = useContext(FieldContext);
  const textareaId = id || context?.id;
  const isInvalid = ariaInvalid ?? !!context?.error;
  const describedBy = ariaDescribedby || [
    context?.error ? `${context.id}-error` : null,
    context?.helpText && !context?.error ? `${context.id}-help` : null
  ].filter(Boolean).join(' ') || undefined;

  return <textarea id={textareaId} className={`input ${isInvalid ? 'input-error' : ''} ${className}`} aria-invalid={isInvalid} aria-describedby={describedBy} {...rest} />;
}
