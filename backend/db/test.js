const pool = require("./pool");

(async () => {
  const res = await pool.query("SELECT COUNT(*) FROM users");
  console.log("users count:", res.rows[0].count);
  process.exit(0);
})();
