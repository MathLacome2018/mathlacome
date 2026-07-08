import React from 'react';

/**
 * ArticleCard — editorial card linking to a post or article.
 * Layouts: stack (image top), inline (image left), minimal (no image).
 */
export function ArticleCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  imageSrc,
  imageAlt = '',
  href = '#',
  layout = 'stack',
  featured = false,
  style: extraStyle = {},
}) {
  const [hovered, setHovered] = React.useState(false);

  const wrapStyle = {
    display: layout === 'inline' ? 'grid' : 'flex',
    gridTemplateColumns: layout === 'inline' ? '140px 1fr' : undefined,
    flexDirection: layout !== 'inline' ? 'column' : undefined,
    gap: 0,
    borderTop: '1px solid var(--border-default)',
    background: 'var(--bg-surface)',
    cursor: 'pointer',
    transition: 'border-color var(--duration-fast) var(--ease-default)',
    borderLeft: hovered ? '2px solid var(--fg-primary)' : '2px solid transparent',
    ...extraStyle,
  };

  const imgWrapStyle = {
    overflow: 'hidden',
    aspectRatio: layout === 'inline' ? '1 / 1' : featured ? '16 / 7' : '16 / 9',
    background: 'var(--bg-muted)',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform var(--duration-slow) var(--ease-out)',
    transform: hovered ? 'scale(1.03)' : 'scale(1)',
  };

  const bodyStyle = {
    padding: layout === 'inline' ? 'var(--space-4)' : 'var(--space-4) 0 var(--space-6)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
  };

  const metaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-2xs)',
    fontWeight: 'var(--weight-medium)',
    letterSpacing: 'var(--tracking-wider)',
    textTransform: 'uppercase',
    color: 'var(--fg-tertiary)',
  };

  const titleStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: featured ? 'var(--text-display-md)' : 'var(--text-display-sm)',
    fontWeight: 400,
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-display)',
    color: 'var(--fg-primary)',
    margin: 0,
  };

  const excerptStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--weight-light)',
    lineHeight: 'var(--leading-relaxed)',
    color: 'var(--fg-secondary)',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  return (
    <a
      href={href}
      style={wrapStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={title}
    >
      {imageSrc && (
        <div style={imgWrapStyle}>
          <img src={imageSrc} alt={imageAlt} style={imgStyle} />
        </div>
      )}
      <div style={bodyStyle}>
        <div style={metaStyle}>
          {category && <span>{category}</span>}
          {category && date && <span style={{ color: 'var(--border-default)' }}>—</span>}
          {date && <span>{date}</span>}
          {readTime && <span style={{ color: 'var(--border-default)' }}>·</span>}
          {readTime && <span>{readTime}</span>}
        </div>
        <h2 style={titleStyle}>{title}</h2>
        {excerpt && <p style={excerptStyle}>{excerpt}</p>}
      </div>
    </a>
  );
}
