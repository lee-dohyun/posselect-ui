import { ReactNode } from 'react';

export interface SegmentedControlProps {
  name: string;
  options: { label: ReactNode; value: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SegmentedControl({ name, options, value, onChange, className = '' }: SegmentedControlProps) {
  return (
    <div className={`seg ${className}`} role="group">
      {options.map((opt) => (
        <label key={opt.value} className="seg-opt">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            disabled={opt.disabled}
            onChange={(e) => {
              if (e.target.checked && onChange) {
                onChange(opt.value);
              }
            }}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
