import React from 'react';

/**
 * Badge — compact label for categories, tags, and status.
 * Variants: solid (black), outline, muted.
 */
export function Badge({
  variant = 'solid',
  size = 'md',
  children,
  style: extraStyle = {},
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-semibold)',
    letterSpacing: 'var(--tracking-widest)',
    textTransform: 'uppercase',
    lineHeight: 1,
    borderRadius: 'var(--radius-none)',
    whiteSpace: 'nowrap',
  };

  const sizes = {
    sm: { fontSize: '9px',  padding: '3px 7px' },
    md: { fontSize: '10px', padding: '4px 9px' },
    lg: { fontSize: '11px', padding: '5px 11px' },
  };

  const variants = {
    solid: {
      background: 'var(--fg-primary)',
      color: 'var(--fg-invert)',
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: 'var(--fg-primary)',
      border: 'var(--border-width) solid var(--fg-primary)',
    },
    muted: {
      background: 'var(--bg-muted)',
      color: 'var(--fg-secondary)',
      border: 'var(--border-width) solid var(--border-default)',
    },
  };

  return (
    <span style={{ ...base, ...sizes[size], ...variants[variant], ...extraStyle }}>
      {children}
    </span>
  );
}
