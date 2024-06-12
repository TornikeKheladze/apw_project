export const transactionArr = [
  {
    filter: "select",
    name: "statusID",
    label: "statusID",
    type: "select",
  },
  {
    filter: "select",
    name: "transactionType",
    label: "transactionType",
    type: "select",
  },
  {
    filter: "search",
    name: "transactionNumber",
    label: "transactionNumber",
    type: "number",
  },
  {
    filter: "select",
    name: "ownerID",
    label: "ownerID",
    type: "select",
  },
  {
    filter: "select",
    name: "agentID",
    label: "agentID",
    type: "select",
  },
  {
    filter: "select",
    name: "serviceID",
    label: "serviceID",
    type: "select",
  },
  {
    name: "ownerOperationID",
    label: "ownerOperationID",
    type: "number",
  },
  {
    name: "agentOperationID",
    label: "agentOperationID",
    type: "number",
  },
  {
    filter: "search",
    name: "amount",
    label: "amount",
    type: "number",
  },
  {
    name: "ourProfit",
    label: "ourProfit",
    type: "number",
  },
  {
    name: "ownerProfit",
    label: "ownerProfit",
    type: "number",
  },
  {
    name: "ownerExpense",
    label: "ownerExpense",
    type: "number",
  },
  {
    name: "agentProfit",
    label: "agentProfit",
    type: "number",
  },
  {
    name: "payerParameter",
    label: "payerParameter",
    type: "text",
  },
  {
    name: "executeTime",
    label: "executeTime",
    type: "datetime-local",
  },
  {
    name: "requests",
    label: "requests",
    type: "text",
  },

  {
    name: "parentTransactionNumber",
    label: "parentTransactionNumber",
    type: "text",
  },
  {
    name: "parentTransactionID",
    label: "parentTransactionID",
    type: "number",
  },
];

export const makeTransactionsArr = [
  { name: "agentID", label: "agentID", type: "select" },
  { name: "serviceID", label: "serviceID", type: "select" },
  { name: "agentOperationID", label: "agentOperationID", type: "number" },
  { name: "payerParameter", label: "payerParameter", type: "text" },
  { name: "saleID", label: "saleID", type: "select" },
];
