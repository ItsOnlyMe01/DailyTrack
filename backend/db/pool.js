const { Pool } = require("pg");

const poolConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "genai_assistant",
  password: process.env.DB_PASSWORD || "2440",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
};

if (process.env.DB_HOST && process.env.DB_HOST !== "localhost") {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(poolConfig);

module.exports = pool;

