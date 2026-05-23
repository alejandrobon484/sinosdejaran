import { neon } from "@neondatabase/serverless";
import { CREATE_REVIEWS_TABLE, CREATE_POSTS_TABLE } from "./schema";

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);
  await sql.transaction([
    sql.query(CREATE_REVIEWS_TABLE),
    sql.query(CREATE_POSTS_TABLE),
  ]);
  console.log("Migration complete: tables 'reviews' and 'posts' are ready.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
