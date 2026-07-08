/**
 * @startingPoint section="Core" subtitle="Primary, ghost and text button variants" viewport="700x200"
 */
export interface ButtonProps {
  /** Visual style */
  variant?: 'primary' | 'ghost' | 'text';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Renders as <a> when provided */
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
