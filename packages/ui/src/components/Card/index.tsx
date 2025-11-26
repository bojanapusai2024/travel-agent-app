/**
 * Card component with GitHub-style theming
 */

import React from 'react';

/** Card variant options */
export type CardVariant = 'default' | 'elevated' | 'outlined';

/** Card component props */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card variant style */
  variant?: CardVariant;
  /** Card padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether the card is hoverable */
  hoverable?: boolean;
}

/** Card header props */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Right action element */
  action?: React.ReactNode;
}

/** Card footer props */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of footer content */
  align?: 'left' | 'center' | 'right' | 'space-between';
}

/**
 * Card component for containing content
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  children,
  style,
  ...props
}) => {
  const paddingStyles: Record<string, string> = {
    none: '0',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
  };

  const baseStyles: React.CSSProperties = {
    backgroundColor: 'var(--bg-secondary, #161b22)',
    borderRadius: '0.5rem',
    padding: paddingStyles[padding],
    transition: 'all 0.2s ease',
  };

  const variantStyles: Record<CardVariant, React.CSSProperties> = {
    default: {
      border: '1px solid var(--border-color, #30363d)',
    },
    elevated: {
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    outlined: {
      border: '2px solid var(--border-color, #30363d)',
      backgroundColor: 'transparent',
    },
  };

  const hoverStyles: React.CSSProperties = hoverable
    ? {
        cursor: 'pointer',
      }
    : {};

  return (
    <div
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...hoverStyles,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card header component
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  children,
  style,
  ...props
}) => {
  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    ...style,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: 'var(--text-primary, #c9d1d9)',
    margin: 0,
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--text-secondary, #8b949e)',
    marginTop: '0.25rem',
    margin: 0,
  };

  return (
    <div style={headerStyles} {...props}>
      <div>
        {title && <h3 style={titleStyles}>{title}</h3>}
        {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        {children}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

/**
 * Card body component
 */
export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  style,
  ...props
}) => {
  return (
    <div style={{ color: 'var(--text-primary, #c9d1d9)', ...style }} {...props}>
      {children}
    </div>
  );
};

/**
 * Card footer component
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  align = 'right',
  children,
  style,
  ...props
}) => {
  const alignStyles: Record<string, string> = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    'space-between': 'space-between',
  };

  const footerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: alignStyles[align],
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color, #30363d)',
    gap: '0.5rem',
    ...style,
  };

  return (
    <div style={footerStyles} {...props}>
      {children}
    </div>
  );
};

export default Card;
