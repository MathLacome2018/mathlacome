import React from 'react';

/**
 * Divider — horizontal rule with optional label. Used between sections and article elements.
 */
export function Divider({ label, style: extraStyle = {} }) {
  if (label) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', ...extraStyle }}>
        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border-default)' }} />
        <span style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--weight-semibold)',
          fontSize: 'var(--text-2xs)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
          color: 'var(--fg-tertiary)',
        }}>{label}</span>
        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border-default)' }} />
      </div>
    );
  }
  return <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', ...extraStyle }} />;
}
