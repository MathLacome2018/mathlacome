import React from 'react';

/**
 * Nav — site navigation bar. Supports logo/brand name, links, and optional CTA.
 * Themes: light (default), dark (inverted), cream.
 */
export function Nav({
  brand = 'Mathlacome',
  links = [],
  cta,
  theme = 'light',
  sticky = false,
  style: extraStyle = {},
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const bg = {
    light: 'var(--bg-page)',
    dark:  'var(--bg-invert)',
    cream: 'var(--color-cream)',
  }[theme];

  const fg = {
    light: 'var(--fg-primary)',
    dark:  'var(--fg-invert)',
    cream: 'var(--fg-primary)',
  }[theme];

  const borderColor = {
    light: 'var(--border-default)',
    dark:  'var(--border-invert)',
    cream: 'var(--color-cream-dark)',
  }[theme];

  const navStyle = {
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? 0 : undefined,
    zIndex: sticky ? 100 : undefined,
    background: bg,
    borderBottom: `1px solid ${borderColor}`,
    ...extraStyle,
  };

  const innerStyle = {
    maxWidth: 'var(--container-xl)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px',
  };

  const brandStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '1.6rem',
    letterSpacing: '0.04em',
    color: fg,
    textDecoration: 'none',
    lineHeight: 1,
  };

  const linksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-6)',
    listStyle: 'none',
  };

  const linkStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-medium)',
    letterSpacing: 'var(--tracking-wider)',
    textTransform: 'uppercase',
    color: fg,
    textDecoration: 'none',
    opacity: 0.8,
    transition: 'opacity var(--duration-fast) var(--ease-default)',
  };

  return (
    <nav style={navStyle} role="navigation">
      <div style={innerStyle}>
        <a href="/" style={brandStyle}>{brand}</a>
        <ul style={linksStyle}>
          {links.map((link, i) => (
            <li key={i}>
              <a
                href={link.href || '#'}
                style={linkStyle}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0.8}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {cta && (
          <a href={cta.href || '#'} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-2xs)',
            fontWeight: 'var(--weight-semibold)',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase',
            color: bg,
            background: fg,
            padding: '8px 18px',
            textDecoration: 'none',
            transition: 'opacity var(--duration-fast)',
          }}>{cta.label}</a>
        )}
      </div>
    </nav>
  );
}
