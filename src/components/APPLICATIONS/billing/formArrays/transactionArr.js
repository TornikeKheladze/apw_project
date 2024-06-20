export const transactionArr = [
  {
    filter: "select",
    name: "statusID",
    label: "ტრანზაქციის სტატუსი",
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
    label: "სერვისის მომწოდებელი",
    type: "select",
  },
  {
    filter: "select",
    name: "agentID",
    label: "სერვისის მიმღები",
    type: "select",
  },
  {
    filter: "select",
    name: "agentTypeID",
    label: "სერვისის მიმღების ტიპი",
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
    label: "სერვისის მომწოდებლის ოპერაციის იდენტიფიკატორი",
    type: "number",
  },
  {
    name: "agentOperationID",
    label: "სერვისის მიმღების ოპერაციის იდენტიფიკატორი",
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
    label: "მოსაკრებელი",
    type: "number",
  },
  {
    name: "ownerProfit",
    label: "სერვისის მომწოდებლის სარგებელი",
    type: "number",
  },
  {
    name: "ownerExpense",
    label: "სერვისის მომწოდებლის ხარჯი",
    type: "number",
  },
  {
    name: "agentProfit",
    label: "სერვისის მიმღების სარგებელი",
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
  { name: "agentID", label: "სერვისის მიმღები", type: "select" },
  { name: "serviceID", label: "სერვისი", type: "select" },
  {
    name: "agentOperationID",
    label: "სერვისის მიმღები ოპერაციის იდენტიფიკატორი",
    type: "number",
  },
  { name: "payerParameter", label: "გადამხდელის პარამეტრი", type: "text" },
  { name: "saleID", label: "ფასდაკლება", type: "select" },
];
