import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config({ override: true });

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
console.log("Database connection initialized to host:", new URL(process.env.DATABASE_URL).host);