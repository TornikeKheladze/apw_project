export const returnedTransactionsArr = [
  { name: "status_id", label: "სტატუსი", type: "number" },
  {
    name: "transaction_number",
    label: "ტრანზაქციის ID",
    type: "number",
    filter: "search",
  },
  {
    filter: "search",
    name: "agent_operation_id",
    label: "აგენტის ტრანზაქციის ID",
    type: "number",
  },
  {
    filter: "search",
    name: "owner_operation_id",
    label: "მომწოდებლის ტრანზაქციის ID",
    type: "number",
  },
  { filter: "select", name: "agent_id", label: "აგენტი", type: "select" },
  { filter: "select", name: "owner_id", label: "მომწოდებელი", type: "select" },
  {
    filter: "select",
    name: "service_id",
    label: "სერვისის სახელი",
    type: "select",
  },
  {
    filter: "range",
    name: "service_currency",
    label: "სერვისის კურსი",
    type: "number",
  },
  {
    filter: "range",
    name: "agent_currency",
    label: "აგენტის კურსი",
    type: "number",
  },
  {
    filter: "range",
    name: "ngb_rate",
    label: "ეროვნულის კურსი",
    type: "number",
  },
  { filter: "range", name: "our_rate", label: "ჩვენი კურსი", type: "number" },
  { filter: "range", name: "amount", label: "მიღებული თანხა", type: "number" },
  {
    filter: "range",
    name: "total_amount",
    label: "მთლიანი თანხა",
    type: "number",
  },
  {
    filter: "range",
    name: "payer_parameter",
    label: "მომხმარებელი",
    type: "number",
  },
  {
    filter: "date",
    name: "created_at",
    label: "რეგისტრაციის თარიღი",
    type: "datetime-local",
  },
  {
    filter: "date",
    name: "execute_time",
    label: "გაშვების თარიღი",
    type: "datetime-local",
  },
  {
    filter: "range",
    name: "agent_profit",
    label: "აგენტის სარგებელი",
    type: "number",
  },

  {
    filter: "range",
    name: "owner_profit",
    label: "მომწოდებლის სარგებელი",
    type: "number",
  },

  {
    filter: "range",
    name: "our_profit",
    label: "ჩვენი მოგება",
    type: "number",
  },

  {
    filter: "range",
    name: "owner_expence",
    label: "მომწოდებლის ხარჯი",
    type: "number",
  },

  {
    filter: "range",
    name: "agent_expence",
    label: "აგენტის ხარჯი",
    type: "number",
  },

  {
    filter: "range",
    name: "payer_expence",
    label: "გადამხდელის ხარჯი",
    type: "number",
  },

  // { filter: "range", name: "requests", label: "მოთხოვნა", type: "number" },
];
