import { Hono } from "hono";
import studentRoute from "./routes/students";
const app = new Hono();
app.route("/students", studentRoute);
export default app;
