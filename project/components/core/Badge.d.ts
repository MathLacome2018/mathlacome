export interface BadgeProps {
  /** Visual style */
  variant?: 'solid' | 'outline' | 'muted';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
