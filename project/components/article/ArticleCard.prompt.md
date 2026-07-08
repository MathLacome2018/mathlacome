Editorial article card for blog/article listings. Three layouts: stack (image top), inline (image left), minimal (no image).

```jsx
<ArticleCard
  title="The Geometry of Space"
  category="Science"
  date="Jul 2026"
  readTime="6 min"
  excerpt="How topology shapes our understanding of the universe."
  layout="stack"
  featured={false}
/>
```

Use `featured={true}` for hero placements — widens image aspect ratio and enlarges title. Left-border animates on hover.
