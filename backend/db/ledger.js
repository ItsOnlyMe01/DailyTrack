const pool = require("./pool");

/**
 * Find ledger rows for a workspace, customer, and month
 */
async function findLedger(workspaceId, customerName, month) {
  const res = await pool.query(
    `
    SELECT *
    FROM ledger
    WHERE workspace_id = $1
      AND customer_name ILIKE $2
      AND month = $3
    `,
    [workspaceId, `%${customerName}%`, month],
  );

  return res.rows;
}

/**
 * Create a new ledger row when none exists
 */
async function createLedger(workspaceId, customerName, month) {
  const res = await pool.query(
    `
    INSERT INTO ledger (workspace_id, customer_name, month, total_bill, balance)
    VALUES ($1, $2, $3, 0, 0)
    RETURNING *
    `,
    [workspaceId, customerName, month],
  );

  return res.rows[0];
}

module.exports = {
  findLedger,
  createLedger,
};
