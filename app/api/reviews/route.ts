import { sql } from "@/src/lib/db";
import type { Review } from "@/src/lib/schema";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, position, source, photo_url } = body;

  const missing = (["name", "email", "position", "source"] as const).filter(
    (f) => !body[f]?.toString().trim()
  );

  if (missing.length > 0) {
    return Response.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const [review] = await sql<Review[]>`
    INSERT INTO reviews (name, email, position, source, photo_url)
    VALUES (${name.trim()}, ${email.trim()}, ${position.trim()}, ${source.trim()}, ${photo_url ?? null})
    RETURNING *
  `;

  return Response.json({ review }, { status: 201 });
}
