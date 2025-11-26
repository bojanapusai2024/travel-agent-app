/**
 * Theme configuration with GitHub color scheme
 * Supports both dark and light modes
 */

/** Color palette type */
export interface ColorPalette {
  primary: string;
  secondary: string;
}

/** Accent colors type */
export interface AccentColors {
  primary: string;
  success: string;
  warning: string;
  danger: string;
}

/** Theme type */
export interface Theme {
  name: 'dark' | 'light';
  background: ColorPalette;
  text: ColorPalette;
  accent: AccentColors;
  border: string;
}

/** Dark theme - GitHub dark mode colors */
export const darkTheme: Theme = {
  name: 'dark',
  background: {
    primary: '#0d1117',
    secondary: '#161b22',
  },
  text: {
    primary: '#c9d1d9',
    secondary: '#8b949e',
  },
  accent: {
    primary: '#1f6feb',
    success: '#3fb950',
    warning: '#d29922',
    danger: '#f85149',
  },
  border: '#30363d',
};

/** Light theme - GitHub light mode colors */
export const lightTheme: Theme = {
  name: 'light',
  background: {
    primary: '#ffffff',
    secondary: '#f6f8fa',
  },
  text: {
    primary: '#24292f',
    secondary: '#57606a',
  },
  accent: {
    primary: '#0969da',
    success: '#1a7f0e',
    warning: '#9e6a03',
    danger: '#d1242f',
  },
  border: '#d0d7de',
};

/** Typography scale */
export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    mono: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

/** Spacing scale */
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

/** Border radius values */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  default: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
} as const;

/** Shadow values */
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

/** Transition presets */
export const transitions = {
  fast: 'all 0.15s ease',
  default: 'all 0.2s ease',
  slow: 'all 0.3s ease',
} as const;

/** Breakpoints for responsive design */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Get theme by name
 * @param name - Theme name ('dark' or 'light')
 * @returns Theme object
 */
export function getTheme(name: 'dark' | 'light'): Theme {
  return name === 'dark' ? darkTheme : lightTheme;
}

/**
 * CSS custom properties for a theme
 * @param theme - Theme object
 * @returns CSS custom properties object
 */
export function getThemeCSSProperties(theme: Theme): Record<string, string> {
  return {
    '--bg-primary': theme.background.primary,
    '--bg-secondary': theme.background.secondary,
    '--text-primary': theme.text.primary,
    '--text-secondary': theme.text.secondary,
    '--accent-primary': theme.accent.primary,
    '--accent-success': theme.accent.success,
    '--accent-warning': theme.accent.warning,
    '--accent-danger': theme.accent.danger,
    '--border-color': theme.border,
  };
}
