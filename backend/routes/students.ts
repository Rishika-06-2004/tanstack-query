import { Hono } from "hono";
import { pool } from "../lib/db-connection";

const studentRoute = new Hono();

studentRoute.get("/", async (c) => {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS students(id SERIAL PRIMARY KEY,name TEXT NOT NULL,email TEXT NOT NULL UNIQUE)",
  );

  const result = await pool.query("SELECT * FROM students ORDER BY id ASC");

  return c.json(result.rows);
});

studentRoute.post("/", async (c) => {
  const body = await c.req.json();

  const result = await pool.query(
    "INSERT INTO students(name, email) VALUES($1, $2) RETURNING *",
    [body.name, body.email],
  );
  return c.json(result.rows[0]);
});
export default studentRoute;
