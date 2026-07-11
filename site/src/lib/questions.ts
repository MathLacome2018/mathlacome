export interface Question {
  id: string;
  body: string;
  author_email: string;
  status: 'open' | 'answered';
  answer: string | null;
  tags: string[];
  like_count: number;
  answered_at: string | null;
  created_at: string;
}

export function truncate(text: string, max = 140): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}
