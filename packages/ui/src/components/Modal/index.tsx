/**
 * Modal component with GitHub-style theming
 */

import React, { useEffect, useCallback } from 'react';

/** Modal size options */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** Modal component props */
export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: ModalSize;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to close on Escape key */
  closeOnEsc?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
  /** Children content */
  children: React.ReactNode;
}

/**
 * Modal component for dialogs and overlays
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  footer,
  children,
}) => {
  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  const sizeStyles: Record<ModalSize, React.CSSProperties> = {
    sm: { maxWidth: '400px' },
    md: { maxWidth: '500px' },
    lg: { maxWidth: '700px' },
    xl: { maxWidth: '900px' },
    full: { maxWidth: '95vw', maxHeight: '95vh' },
  };

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  };

  const modalStyles: React.CSSProperties = {
    backgroundColor: 'var(--bg-secondary, #161b22)',
    borderRadius: '0.5rem',
    border: '1px solid var(--border-color, #30363d)',
    width: '100%',
    ...sizeStyles[size],
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid var(--border-color, #30363d)',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: 'var(--text-primary, #c9d1d9)',
    margin: 0,
  };

  const closeButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary, #8b949e)',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  };

  const bodyStyles: React.CSSProperties = {
    padding: '1.5rem',
    overflowY: 'auto',
    flex: 1,
    color: 'var(--text-primary, #c9d1d9)',
  };

  const footerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    padding: '1rem 1.5rem',
    borderTop: '1px solid var(--border-color, #30363d)',
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={overlayStyles} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div style={headerStyles}>
            <h2 style={titleStyles}>{title}</h2>
            <button
              style={closeButtonStyles}
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div style={bodyStyles}>{children}</div>
        {footer && <div style={footerStyles}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
