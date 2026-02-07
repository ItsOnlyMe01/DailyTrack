const pool = require("./pool");

async function getOrCreateUser(email) {
  //look for user's email
  const findRes = await pool.query(
    "SELECT id,email FROM users WHERE email=$1",
    [email],
  );

  if (findRes.rows.length > 0) {
    return findRes.rows[0];
  }

  //else cretae new user

  const createRes = await pool.query(
    "INSERT INTO users(email) VALUES ($1) RETURNING id,email",
    [email],
  );
  return createRes.rows[0];
}

module.exports = { getOrCreateUser };
