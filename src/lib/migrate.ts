import { neon } from "@neondatabase/serverless";
import { CREATE_REVIEWS_TABLE } from "./schema";

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);
  await sql.transaction([sql.query(CREATE_REVIEWS_TABLE)]);
  console.log("Migration complete: table 'reviews' is ready.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
