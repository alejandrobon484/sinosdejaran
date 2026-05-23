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

export interface Post {
  id: number;
  author_name: string;
  author_position: string;
  author_source: string;
  review_text: string;
  response_text: string;
  created_at: Date;
}

export const CREATE_POSTS_TABLE = `
  CREATE TABLE IF NOT EXISTS posts (
    id              SERIAL PRIMARY KEY,
    author_name     TEXT NOT NULL,
    author_position TEXT NOT NULL,
    author_source   TEXT NOT NULL,
    review_text     TEXT NOT NULL,
    response_text   TEXT NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
  )
`;
