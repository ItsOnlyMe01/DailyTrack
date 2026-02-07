const pool = require("./pool");

async function findEntitiesByName(workspaceId, name) {
  const res = await pool.query(
    `
    SELECT id, name, balance
    FROM entities
    WHERE workspace_id = $1
      AND name ILIKE $2
    `,
    [workspaceId, `%${name}%`],
  );

  return res.rows;
}

async function createEntity(workspaceId, name) {
  const res = await pool.query(
    `
    INSERT INTO entities (workspace_id, name)
    VALUES ($1, $2)
    RETURNING id, name, balance
    `,
    [workspaceId, name],
  );

  return res.rows[0];
}

module.exports = { findEntitiesByName, createEntity };
