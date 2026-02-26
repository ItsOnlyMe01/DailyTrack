const { detectIntent } = require("../utils/intentDetector");
const { extractWriteData } = require("../utils/writeExtractor");
const { getCurrentMonth } = require("../utils/currentMonth");

const { findLedger, createLedger } = require("../db/ledger");
const { applyPayment } = require("../db/payments");

const { extractReadQuery } = require("../utils/readqueryExtractor");
const { resolveMonth } = require("../utils/resolveMonth");
const { getLedgerField, getPaymentsSum } = require("../db/readQueries");

const { searchSimilar } = require("../vector/search");
const { generateAnswer } = require("../utils/answerGenerator");
const { needsExplanation } = require("../utils/needsExplaination");

async function askQuestion(question, workspaceId) {
  /* =======================
     1. INTENT DETECTION
     ======================= */
  const intentResult = await detectIntent(question);

  /* =======================
     2. WRITE FLOW (SQL)
     ======================= */
  if (intentResult.intent === "WRITE") {
    const writeData = await extractWriteData(question);
    if (!writeData.action) {
      return "This data is read-only. Please upload a corrected document to update it.";
    }

    const { entity_name, operation, amount } = writeData;

    if (!entity_name || !operation || !amount) {
      return "Incomplete payment information";
    }

    //  normalize ONLY here
    const normalizedName = entity_name.trim().toLowerCase();
    const month = getCurrentMonth();

    const ledgers = await findLedger(workspaceId, normalizedName, month);

    let ledger;
    if (ledgers.length === 0) {
      ledger = await createLedger(workspaceId, normalizedName, month);
    } else if (ledgers.length > 1) {
      return `Multiple ledgers found for ${entity_name}. Please specify.`;
    } else {
      ledger = ledgers[0];
    }

    const newBalance = await applyPayment(ledger.id, operation, amount);

    return {
      message: "Payment recorded successfully",
      customer: ledger.customer_name,
      month,
      new_balance: newBalance,
    };
  }

  /* =======================
     3. READ FLOW (SQL FIRST)
     ======================= */
  const readQuery = await extractReadQuery(question);

  if (
    readQuery.metric &&
    ["balance", "total_bill", "payments_sum"].includes(readQuery.metric)
  ) {
    const month = resolveMonth(readQuery.month);

    const name = readQuery.entity_name
      ? readQuery.entity_name.trim().toLowerCase()
      : null;

    if (!name) {
      return "Please specify whose bill you want";
    }

    /* ---- BALANCE ---- */
    if (readQuery.metric === "balance") {
      const value = await getLedgerField(workspaceId, name, month, "balance");

      if (value === null) {
        return "No balance data available";
      }

      const response = {
        customer: name,
        month,
        balance: value,
      };

      if (needsExplanation(question)) {
        const chunks = await searchSimilar(question, workspaceId);
        if (chunks.length) {
          response.explanation = await generateAnswer(question, chunks);
        }
      }

      return response;
    }

    /* ---- TOTAL BILL (derived) ---- */
    if (readQuery.metric === "total_bill") {
      const total = await getPaymentsSum(workspaceId, name, month);

      if (!total || total === 0) {
        return "No bill data recorded yet";
      }

      return {
        customer: name,
        month,
        total_bill: total,
      };
    }

    /* ---- PAYMENTS SUM ---- */
    if (readQuery.metric === "payments_sum") {
      const total = await getPaymentsSum(workspaceId, name, month);

      if (!total || total === 0) {
        return "No payment data recorded yet";
      }

      const response = {
        customer: name,
        month,
        payments: total,
      };

      if (needsExplanation(question)) {
        const chunks = await searchSimilar(question, workspaceId);
        if (chunks.length) {
          response.explanation = await generateAnswer(question, chunks);
        }
      }

      return response;
    }
  }

  /* =======================
     4. READ FLOW (RAG ONLY)
     ======================= */
  const chunks = await searchSimilar(question, workspaceId);

  if (!chunks.length) {
    return "No answer available";
  }

  return await generateAnswer(question, chunks);
}

module.exports = { askQuestion };
