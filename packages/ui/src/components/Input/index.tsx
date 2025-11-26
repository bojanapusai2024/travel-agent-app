/**
 * Input component with GitHub-style theming
 */

import React from 'react';

/** Input size options */
export type InputSize = 'sm' | 'md' | 'lg';

/** Input component props */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label for the input */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Input size */
  inputSize?: InputSize;
  /** Left addon element */
  leftAddon?: React.ReactNode;
  /** Right addon element */
  rightAddon?: React.ReactNode;
}

/**
 * Input component with label, error, and helper text support
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      inputSize = 'md',
      leftAddon,
      rightAddon,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyles: Record<InputSize, React.CSSProperties> = {
      sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
      md: { padding: '0.5rem 0.75rem', fontSize: '1rem' },
      lg: { padding: '0.75rem 1rem', fontSize: '1.125rem' },
    };

    const inputStyles: React.CSSProperties = {
      width: '100%',
      backgroundColor: 'var(--bg-primary, #0d1117)',
      color: 'var(--text-primary, #c9d1d9)',
      border: `1px solid ${error ? 'var(--accent-danger, #f85149)' : 'var(--border-color, #30363d)'}`,
      borderRadius: '0.375rem',
      outline: 'none',
      transition: 'all 0.2s ease',
      ...sizeStyles[inputSize],
    };

    const labelStyles: React.CSSProperties = {
      display: 'block',
      marginBottom: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: 'var(--text-primary, #c9d1d9)',
    };

    const helperStyles: React.CSSProperties = {
      marginTop: '0.25rem',
      fontSize: '0.75rem',
      color: error ? 'var(--accent-danger, #f85149)' : 'var(--text-secondary, #8b949e)',
    };

    const wrapperStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    };

    const addonStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      padding: '0 0.5rem',
      color: 'var(--text-secondary, #8b949e)',
    };

    return (
      <div style={{ marginBottom: '1rem' }}>
        {label && <label style={labelStyles}>{label}</label>}
        <div style={wrapperStyles}>
          {leftAddon && <span style={{ ...addonStyles, paddingLeft: '0.75rem' }}>{leftAddon}</span>}
          <input
            ref={ref}
            style={{
              ...inputStyles,
              paddingLeft: leftAddon ? '2.5rem' : inputStyles.padding,
              paddingRight: rightAddon ? '2.5rem' : inputStyles.padding,
              ...style,
            }}
            {...props}
          />
          {rightAddon && (
            <span style={{ ...addonStyles, position: 'absolute', right: 0, paddingRight: '0.75rem' }}>
              {rightAddon}
            </span>
          )}
        </div>
        {(error || helperText) && <p style={helperStyles}>{error || helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
