export interface Book {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  lessons: string | null;
  summary: string | null;
  snippets: string | null;
  added_at: string;
}

export interface BookComment {
  id: string;
  user_email: string;
  body: string;
  created_at: string;
}

export function paragraphs(text: string | null): string[] {
  return (text ?? '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
