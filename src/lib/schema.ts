export interface Review {
  id: number;
  name: string;
  email: string;
  position: string;
  source: string;
  photo_url: string | null;
  created_at: Date;
}

export const CREATE_REVIEWS_TABLE = `
  CREATE TABLE IF NOT EXISTS reviews (
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    position   TEXT NOT NULL,
    source     TEXT NOT NULL,
    photo_url  TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
  )
`;
