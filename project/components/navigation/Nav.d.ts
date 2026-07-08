/**
 * @startingPoint section="Navigation" subtitle="Site navigation bar with brand, links and optional CTA" viewport="700x80"
 */
export interface NavProps {
  /** Brand / site name displayed as logo text */
  brand?: string;
  links?: Array<{ label: string; href?: string }>;
  cta?: { label: string; href?: string };
  /** Color theme */
  theme?: 'light' | 'dark' | 'cream';
  /** Stick to top of viewport on scroll */
  sticky?: boolean;
  style?: React.CSSProperties;
}
