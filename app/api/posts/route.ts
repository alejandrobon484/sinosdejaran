import { sql } from "@/src/lib/db";
import type { Post } from "@/src/lib/schema";

export async function GET() {
  const posts = (await sql`
    SELECT * FROM posts ORDER BY created_at DESC
  `) as Post[];
  return Response.json({ posts });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { author_name, author_position, author_source, review_text, response_text, stars } = body;

  const missing = (
    ["author_name", "author_position", "review_text", "response_text"] as const
  ).filter((f) => !body[f]?.toString().trim());

  if (missing.length > 0) {
    return Response.json(
      { error: `Faltan campos requeridos: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const starsValue = stars != null ? Number(stars) : null;

  const [post] = (await sql`
    INSERT INTO posts (author_name, author_position, author_source, review_text, response_text, stars)
    VALUES (
      ${author_name.trim()},
      ${author_position.trim()},
      ${author_source?.trim() || ""},
      ${review_text.trim()},
      ${response_text.trim()},
      ${starsValue}
    )
    RETURNING *
  `) as Post[];

  return Response.json({ post }, { status: 201 });
}
