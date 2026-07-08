/**
 * @startingPoint section="Article" subtitle="Editorial card for blog post listings" viewport="700x340"
 */
export interface ArticleCardProps {
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  readTime?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  /** Card layout style */
  layout?: 'stack' | 'inline' | 'minimal';
  /** Larger title + wider image ratio for hero placement */
  featured?: boolean;
  style?: React.CSSProperties;
}
