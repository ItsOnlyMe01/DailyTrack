const pool = require("./pool");

async function getLedgerField(workspaceId, customerName, month, field) {
  const res = await pool.query(
    `
    SELECT ${field}
    FROM ledger
    WHERE workspace_id = $1
      AND customer_name ILIKE $2
      AND month = $3
    `,
    [workspaceId, `%${customerName}%`, month],
  );

  return res.rows[0]?.[field] ?? null;
}

async function getPaymentsSum(workspaceId, customerName, month) {
  const res = await pool.query(
    `
    SELECT SUM(p.amount) as total
    FROM payments p
    JOIN ledger l ON l.id = p.ledger_id
    WHERE l.workspace_id = $1
      AND l.customer_name ILIKE $2
      AND l.month = $3
    `,
    [workspaceId, `%${customerName}%`, month],
  );

  return res.rows[0]?.total ?? 0;
}

module.exports = {
  getLedgerField,
  getPaymentsSum,
};
