import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

export const pool = createPool({
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});
