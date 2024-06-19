export const transactionArr = [
  {
    filter: "select",
    name: "statusID",
    label: "სტატუსი",
    type: "select",
  },
  {
    filter: "select",
    name: "transactionType",
    label: "ტრანზაქციის ტიპი",
    type: "select",
  },
  {
    filter: "search",
    name: "transactionNumber",
    label: "ტრანზაქციის ნომერი",
    type: "number",
  },
  {
    filter: "select",
    name: "ownerID",
    label: "მომწოდებელი",
    type: "select",
  },
  {
    filter: "select",
    name: "agentID",
    label: "აგენტი",
    type: "select",
  },
  {
    filter: "select",
    name: "serviceID",
    label: "სერვისი",
    type: "select",
  },
  {
    name: "ownerOperationID",
    label: "მომწოდებლის ოპერაციის ID",
    type: "number",
  },
  {
    name: "agentOperationID",
    label: "აგენტის ოპერაციის ID",
    type: "number",
  },
  {
    filter: "search",
    name: "amount",
    label: "რაოდენობა",
    type: "number",
  },
  {
    name: "ourProfit",
    label: "ჩვენი მოგება",
    type: "number",
  },
  {
    name: "ownerProfit",
    label: "მომწოდებლის მოგება",
    type: "number",
  },
  {
    name: "ownerExpense",
    label: "მომწოდებლის ხარჯი",
    type: "number",
  },
  {
    name: "agentProfit",
    label: "აგენტის მოგება",
    type: "number",
  },
  {
    name: "payerParameter",
    label: "გადამხდელის პარამეტრი",
    type: "text",
  },
  {
    name: "executeTime",
    label: "შესრულების დრო",
    type: "datetime-local",
  },
  // {
  //   name: "parentTransactionNumber",
  //   label: "parentTransactionNumber",
  //   type: "text",
  // },
  // {
  //   name: "parentTransactionID",
  //   label: "parentTransactionID",
  //   type: "number",
  // },
];

export const makeTransactionsArr = [
  { name: "agentID", label: "აგენტი", type: "select" },
  { name: "serviceID", label: "სერვისი", type: "select" },
  { name: "agentOperationID", label: "აგენტის ოპერაციის ID", type: "number" },
  { name: "payerParameter", label: "გადამხდელის პარამეტრი", type: "text" },
  { name: "saleID", label: "ფასდაკლება", type: "select" },
];
