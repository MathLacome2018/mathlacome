import React from 'react';

/**
 * Button — primary action element.
 * Variants: primary (black fill), ghost (outline), text (no border).
 * Sizes: sm, md (default), lg.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  href,
  onClick,
  children,
  style: extraStyle = {},
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-medium)',
    letterSpacing: 'var(--tracking-wider)',
    textTransform: 'uppercase',
    textDecoration: 'none',
    border: 'var(--border-width) solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    transition: `background var(--duration-fast) var(--ease-default),
                 color var(--duration-fast) var(--ease-default),
                 border-color var(--duration-fast) var(--ease-default)`,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    borderRadius: 'var(--radius-none)',
  };

  const sizes = {
    sm: { fontSize: 'var(--text-2xs)', padding: '6px 14px' },
    md: { fontSize: 'var(--text-xs)',  padding: '10px 22px' },
    lg: { fontSize: 'var(--text-sm)',  padding: '14px 32px' },
  };

  const variants = {
    primary: {
      background: 'var(--fg-primary)',
      color: 'var(--fg-invert)',
      borderColor: 'var(--fg-primary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--fg-primary)',
      borderColor: 'var(--fg-primary)',
    },
    text: {
      background: 'transparent',
      color: 'var(--fg-primary)',
      borderColor: 'transparent',
      padding: sizes[size].padding.split(' ').map((v, i) => i % 2 === 0 ? v : '0').join(' '),
    },
  };

  const combinedStyle = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...extraStyle,
  };

  const [hovered, setHovered] = React.useState(false);

  const hoverOverrides = hovered && !disabled ? {
    primary: { background: 'transparent', color: 'var(--fg-primary)' },
    ghost:   { background: 'var(--fg-primary)', color: 'var(--fg-invert)' },
    text:    { opacity: 0.6 },
  }[variant] : {};

  const finalStyle = { ...combinedStyle, ...hoverOverrides };

  if (href) {
    return (
      <a
        href={href}
        style={finalStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={finalStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
