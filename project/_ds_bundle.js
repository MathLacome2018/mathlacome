/* @ds-bundle: {"format":4,"namespace":"MathlacomeDesignSystem_6c4953","components":[{"name":"ArticleCard","sourcePath":"components/article/ArticleCard.jsx"},{"name":"PullQuote","sourcePath":"components/article/PullQuote.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Nav","sourcePath":"components/navigation/Nav.jsx"}],"sourceHashes":{"components/article/ArticleCard.jsx":"d6f845bfcc69","components/article/PullQuote.jsx":"8864dc259056","components/core/Badge.jsx":"502ea36795d8","components/core/Button.jsx":"1140908fa389","components/core/Divider.jsx":"81a761015cb1","components/navigation/Nav.jsx":"b1818f0a50d0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MathlacomeDesignSystem_6c4953 = window.MathlacomeDesignSystem_6c4953 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/article/ArticleCard.jsx
try { (() => {
/**
 * ArticleCard — editorial card linking to a post or article.
 * Layouts: stack (image top), inline (image left), minimal (no image).
 */
function ArticleCard({
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
  style: extraStyle = {}
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
    ...extraStyle
  };
  const imgWrapStyle = {
    overflow: 'hidden',
    aspectRatio: layout === 'inline' ? '1 / 1' : featured ? '16 / 7' : '16 / 9',
    background: 'var(--bg-muted)'
  };
  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform var(--duration-slow) var(--ease-out)',
    transform: hovered ? 'scale(1.03)' : 'scale(1)'
  };
  const bodyStyle = {
    padding: layout === 'inline' ? 'var(--space-4)' : 'var(--space-4) 0 var(--space-6)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)'
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
    color: 'var(--fg-tertiary)'
  };
  const titleStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: featured ? 'var(--text-display-md)' : 'var(--text-display-sm)',
    fontWeight: 400,
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-display)',
    color: 'var(--fg-primary)',
    margin: 0
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
    overflow: 'hidden'
  };
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    style: wrapStyle,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    "aria-label": title
  }, imageSrc && /*#__PURE__*/React.createElement("div", {
    style: imgWrapStyle
  }, /*#__PURE__*/React.createElement("img", {
    src: imageSrc,
    alt: imageAlt,
    style: imgStyle
  })), /*#__PURE__*/React.createElement("div", {
    style: bodyStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: metaStyle
  }, category && /*#__PURE__*/React.createElement("span", null, category), category && date && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--border-default)'
    }
  }, "\u2014"), date && /*#__PURE__*/React.createElement("span", null, date), readTime && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--border-default)'
    }
  }, "\xB7"), readTime && /*#__PURE__*/React.createElement("span", null, readTime)), /*#__PURE__*/React.createElement("h2", {
    style: titleStyle
  }, title), excerpt && /*#__PURE__*/React.createElement("p", {
    style: excerptStyle
  }, excerpt)));
}
Object.assign(__ds_scope, { ArticleCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/article/ArticleCard.jsx", error: String((e && e.message) || e) }); }

// components/article/PullQuote.jsx
try { (() => {
/**
 * PullQuote — large editorial pull-quote block for article body use.
 */
function PullQuote({
  quote,
  attribution,
  style: extraStyle = {}
}) {
  return /*#__PURE__*/React.createElement("blockquote", {
    style: {
      borderTop: '2px solid var(--fg-primary)',
      borderBottom: '1px solid var(--border-default)',
      padding: 'var(--space-6) 0',
      margin: 0,
      ...extraStyle
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-display-sm)',
      fontWeight: 400,
      lineHeight: 'var(--leading-snug)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--fg-primary)',
      marginBottom: attribution ? 'var(--space-4)' : 0
    }
  }, quote), attribution && /*#__PURE__*/React.createElement("footer", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--fg-tertiary)'
    }
  }, "\u2014 ", attribution));
}
Object.assign(__ds_scope, { PullQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/article/PullQuote.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Badge — compact label for categories, tags, and status.
 * Variants: solid (black), outline, muted.
 */
function Badge({
  variant = 'solid',
  size = 'md',
  children,
  style: extraStyle = {}
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
    whiteSpace: 'nowrap'
  };
  const sizes = {
    sm: {
      fontSize: '9px',
      padding: '3px 7px'
    },
    md: {
      fontSize: '10px',
      padding: '4px 9px'
    },
    lg: {
      fontSize: '11px',
      padding: '5px 11px'
    }
  };
  const variants = {
    solid: {
      background: 'var(--fg-primary)',
      color: 'var(--fg-invert)',
      border: 'none'
    },
    outline: {
      background: 'transparent',
      color: 'var(--fg-primary)',
      border: 'var(--border-width) solid var(--fg-primary)'
    },
    muted: {
      background: 'var(--bg-muted)',
      color: 'var(--fg-secondary)',
      border: 'var(--border-width) solid var(--border-default)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...extraStyle
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * Button — primary action element.
 * Variants: primary (black fill), ghost (outline), text (no border).
 * Sizes: sm, md (default), lg.
 */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  href,
  onClick,
  children,
  style: extraStyle = {}
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
    borderRadius: 'var(--radius-none)'
  };
  const sizes = {
    sm: {
      fontSize: 'var(--text-2xs)',
      padding: '6px 14px'
    },
    md: {
      fontSize: 'var(--text-xs)',
      padding: '10px 22px'
    },
    lg: {
      fontSize: 'var(--text-sm)',
      padding: '14px 32px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--fg-primary)',
      color: 'var(--fg-invert)',
      borderColor: 'var(--fg-primary)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--fg-primary)',
      borderColor: 'var(--fg-primary)'
    },
    text: {
      background: 'transparent',
      color: 'var(--fg-primary)',
      borderColor: 'transparent',
      padding: sizes[size].padding.split(' ').map((v, i) => i % 2 === 0 ? v : '0').join(' ')
    }
  };
  const combinedStyle = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...extraStyle
  };
  const [hovered, setHovered] = React.useState(false);
  const hoverOverrides = hovered && !disabled ? {
    primary: {
      background: 'transparent',
      color: 'var(--fg-primary)'
    },
    ghost: {
      background: 'var(--fg-primary)',
      color: 'var(--fg-invert)'
    },
    text: {
      opacity: 0.6
    }
  }[variant] : {};
  const finalStyle = {
    ...combinedStyle,
    ...hoverOverrides
  };
  if (href) {
    return /*#__PURE__*/React.createElement("a", {
      href: href,
      style: finalStyle,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false)
    }, children);
  }
  return /*#__PURE__*/React.createElement("button", {
    disabled: disabled,
    onClick: onClick,
    style: finalStyle,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
/**
 * Divider — horizontal rule with optional label. Used between sections and article elements.
 */
function Divider({
  label,
  style: extraStyle = {}
}) {
  if (label) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        ...extraStyle
      }
    }, /*#__PURE__*/React.createElement("hr", {
      style: {
        flex: 1,
        border: 'none',
        borderTop: '1px solid var(--border-default)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--weight-semibold)',
        fontSize: 'var(--text-2xs)',
        letterSpacing: 'var(--tracking-widest)',
        textTransform: 'uppercase',
        color: 'var(--fg-tertiary)'
      }
    }, label), /*#__PURE__*/React.createElement("hr", {
      style: {
        flex: 1,
        border: 'none',
        borderTop: '1px solid var(--border-default)'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 'none',
      borderTop: '1px solid var(--border-default)',
      ...extraStyle
    }
  });
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Nav.jsx
try { (() => {
/**
 * Nav — site navigation bar. Supports logo/brand name, links, and optional CTA.
 * Themes: light (default), dark (inverted), cream.
 */
function Nav({
  brand = 'Mathlacome',
  links = [],
  cta,
  theme = 'light',
  sticky = false,
  style: extraStyle = {}
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const bg = {
    light: 'var(--bg-page)',
    dark: 'var(--bg-invert)',
    cream: 'var(--color-cream)'
  }[theme];
  const fg = {
    light: 'var(--fg-primary)',
    dark: 'var(--fg-invert)',
    cream: 'var(--fg-primary)'
  }[theme];
  const borderColor = {
    light: 'var(--border-default)',
    dark: 'var(--border-invert)',
    cream: 'var(--color-cream-dark)'
  }[theme];
  const navStyle = {
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? 0 : undefined,
    zIndex: sticky ? 100 : undefined,
    background: bg,
    borderBottom: `1px solid ${borderColor}`,
    ...extraStyle
  };
  const innerStyle = {
    maxWidth: 'var(--container-xl)',
    margin: '0 auto',
    padding: '0 var(--space-6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '56px'
  };
  const brandStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: '1.6rem',
    letterSpacing: '0.04em',
    color: fg,
    textDecoration: 'none',
    lineHeight: 1
  };
  const linksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-6)',
    listStyle: 'none'
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
    transition: 'opacity var(--duration-fast) var(--ease-default)'
  };
  return /*#__PURE__*/React.createElement("nav", {
    style: navStyle,
    role: "navigation"
  }, /*#__PURE__*/React.createElement("div", {
    style: innerStyle
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    style: brandStyle
  }, brand), /*#__PURE__*/React.createElement("ul", {
    style: linksStyle
  }, links.map((link, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("a", {
    href: link.href || '#',
    style: linkStyle,
    onMouseEnter: e => e.target.style.opacity = 1,
    onMouseLeave: e => e.target.style.opacity = 0.8
  }, link.label)))), cta && /*#__PURE__*/React.createElement("a", {
    href: cta.href || '#',
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      color: bg,
      background: fg,
      padding: '8px 18px',
      textDecoration: 'none',
      transition: 'opacity var(--duration-fast)'
    }
  }, cta.label)));
}
Object.assign(__ds_scope, { Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Nav.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ArticleCard = __ds_scope.ArticleCard;

__ds_ns.PullQuote = __ds_scope.PullQuote;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Nav = __ds_scope.Nav;

})();
