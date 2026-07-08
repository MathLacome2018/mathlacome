Site-wide navigation bar. Brand name renders in Bebas Neue; links in Oswald uppercase.

```jsx
<Nav
  brand="Mathlacome"
  links={[
    { label: 'Articles', href: '/articles' },
    { label: 'Science', href: '/science' },
    { label: 'About', href: '/about' },
  ]}
  cta={{ label: 'Subscribe', href: '/subscribe' }}
  theme="light"
  sticky={true}
/>
```

Themes: `light`, `dark`, `cream`. Use `sticky` to pin at top during scroll.
