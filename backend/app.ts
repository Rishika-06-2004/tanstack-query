import { Hono } from "hono";
import { studentRoute } from "./routes/students";
export const app = new Hono();
app.route("/students", studentRoute);
