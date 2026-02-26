const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "genai_assistant",
  password: process.env.DB_PASSWORD || "2440",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

module.exports = pool;
