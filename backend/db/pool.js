const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "genai_assistant",
  password: "2440",
  port: 5432,
});

module.exports = pool;
