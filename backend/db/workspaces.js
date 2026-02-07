const pool = require("./pool");

async function getOrCreateWorkspace(userId, name) {
  const findRes = await pool.query(
    "SELECT id, name FROM workspaces WHERE user_id = $1 AND name = $2",
    [userId, name],
  );

  if (findRes.rows.length > 0) {
    return findRes.rows[0];
  }

  const createRes = await pool.query(
    "INSERT INTO workspaces (user_id, name) VALUES ($1, $2) RETURNING id, name",
    [userId, name],
  );

  return createRes.rows[0];
}

async function getWorkspaces(userId) {
  const res = await pool.query(
    "SELECT id, name FROM workspaces WHERE user_id = $1",
    [userId],
  );
  return res.rows;
}

module.exports = { getOrCreateWorkspace, getWorkspaces };
