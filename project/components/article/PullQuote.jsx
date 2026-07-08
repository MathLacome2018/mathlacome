import React from 'react';

/**
 * PullQuote — large editorial pull-quote block for article body use.
 */
export function PullQuote({ quote, attribution, style: extraStyle = {} }) {
  return (
    <blockquote style={{
      borderTop: '2px solid var(--fg-primary)',
      borderBottom: '1px solid var(--border-default)',
      padding: 'var(--space-6) 0',
      margin: 0,
      ...extraStyle,
    }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-display-sm)',
        fontWeight: 400,
        lineHeight: 'var(--leading-snug)',
        letterSpacing: 'var(--tracking-display)',
        color: 'var(--fg-primary)',
        marginBottom: attribution ? 'var(--space-4)' : 0,
      }}>
        {quote}
      </p>
      {attribution && (
        <footer style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--weight-medium)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          color: 'var(--fg-tertiary)',
        }}>
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}
