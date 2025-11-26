/**
 * Button component with GitHub-style theming
 */

import React from 'react';

/** Button variant options */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/** Button size options */
export type ButtonSize = 'sm' | 'md' | 'lg';

/** Button component props */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether the button is in loading state */
  isLoading?: boolean;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right icon element */
  rightIcon?: React.ReactNode;
}

/**
 * Button component with multiple variants and sizes
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: '0.375rem',
    fontWeight: 500,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    outline: 'none',
    opacity: disabled || isLoading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: { padding: '0.375rem 0.75rem', fontSize: '0.875rem' },
    md: { padding: '0.5rem 1rem', fontSize: '1rem' },
    lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' },
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--accent-primary, #1f6feb)',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: 'var(--bg-secondary, #161b22)',
      color: 'var(--text-primary, #c9d1d9)',
      border: '1px solid var(--border-color, #30363d)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--accent-primary, #1f6feb)',
      border: '1px solid var(--accent-primary, #1f6feb)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-primary, #c9d1d9)',
    },
    danger: {
      backgroundColor: 'var(--accent-danger, #f85149)',
      color: '#ffffff',
    },
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg
            style={{
              width: '1em',
              height: '1em',
              marginRight: '0.5rem',
              animation: 'spin 1s linear infinite',
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75" />
          </svg>
          Loading...
        </span>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;
