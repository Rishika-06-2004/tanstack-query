import { pool } from "@/lib/db-connection";

export async function GET() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS students(
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `);

  const result = await pool.query("SELECT * FROM students ORDER BY id ASC");
  return Response.json(result.rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await pool.query(
    "INSERT INTO students(name, email) VALUES($1, $2) RETURNING *",
    [body.name, body.email],
  );
  return Response.json(result.rows[0]);
}
