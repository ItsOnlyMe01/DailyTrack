const pool = require("./pool");

async function applyPayment(ledgerId, operation, amount) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // lock ledger row
    const { rows } = await client.query(
      "SELECT balance FROM ledger WHERE id = $1 FOR UPDATE",
      [ledgerId],
    );

    let balance = rows[0].balance;

    if (operation === "CREDIT") balance += amount;
    if (operation === "DEBIT") balance -= amount;

    await client.query(
      "INSERT INTO payments (ledger_id, amount, date) VALUES ($1, $2, CURRENT_DATE)",
      [ledgerId, amount],
    );

    await client.query("UPDATE ledger SET balance = $1 WHERE id = $2", [
      balance,
      ledgerId,
    ]);

    await client.query("COMMIT");
    return balance;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { applyPayment };
