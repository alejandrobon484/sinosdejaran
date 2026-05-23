import { sql } from "@/src/lib/db";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) {
    return Response.json({ error: "ID inválido" }, { status: 400 });
  }

  const rows = await sql`
    UPDATE posts SET likes = likes + 1 WHERE id = ${numId} RETURNING likes
  `;

  if (!rows.length) {
    return Response.json({ error: "Post no encontrado" }, { status: 404 });
  }

  return Response.json({ likes: rows[0].likes });
}
