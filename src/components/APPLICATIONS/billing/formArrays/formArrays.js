export const customers = [
  {
    filter: "select",
    name: "type",
    label: "აგენტი/მომწოდებელი",
    type: "radio",
  },
  { filter: "search", name: "name", label: "დასახელება", type: "text" },
  { filter: "search", name: "id_number", label: "ID ნომერი", type: "number" },
  { filter: "range", name: "balance", label: "ბალანსი", type: "number" },
  { filter: "select", name: "online", label: "ონლაინი", type: "radio" },
  {
    filter: "select",
    name: "legal_form_id",
    label: "ლეგალური ფორმა",
    type: "select",
  },
  {
    filter: "search",
    name: "legal_address",
    label: "იურიდიული მისამართი",
    type: "text",
  },
  {
    filter: "search",
    name: "physical_address",
    label: "ფაქტობრივი მისამართი",
    type: "text",
  },
  { filter: "search", name: "description", label: "აღწერა", type: "text" },
  { filter: "search", name: "country", label: "ქვეყანა", type: "text" },
  {
    filter: "search",
    name: "postal_code",
    label: "საფოსტო კოდი",
    type: "number",
  },
  {
    filter: "search",
    name: "contract_number",
    label: "საკონტაქტო ნომერი",
    type: "number",
  },
  {
    filter: "date",
    name: "contract_date",
    label: "საკონტაქტო თარიღი",
    type: "date",
  },
  { filter: "search", name: "ceo", label: "CEO", type: "text" },
  { filter: "search", name: "api", label: "API", type: "number" },
  { filter: "search", name: "username", label: "User Name", type: "text" },
  // { filter: "search", name: "password", label: "პაროლი", type: "password" },
  // { filter: "search", name: "secret", label: "SECRET", type: "text" },
  { filter: "search", name: "mobile", label: "მობილური", type: "number" },
  { filter: "range", name: "credit", label: "კრედიტი", type: "number" },
  { filter: "search", name: "ip_address", label: "IP მისამართი", type: "text" },
  { filter: "select", name: "sandbox", label: "სატესტო", type: "radio" },
  {
    filter: "search",
    name: "oris_bank_account",
    label: "ორის ბანკის ექაუნთი",
    type: "number",
  },
  {
    filter: "search",
    name: "act_position",
    label: "ACT პოზიცია",
    type: "text",
  },
  { filter: "search", name: "act_name", label: "ACT სახელი", type: "text" },
  // { filter: "select", name: "our", label: "OUR", type: "number" },
];

export const transactions = [
  { filter: "select", name: "status_id", label: "სტატუსი", type: "number" },
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
    filter: "range",
    name: "payer_parameter",
    label: "მომხმარებელი",
    type: "number",
  },
  {
    filter: "select",
    name: "service_id",
    label: "სერვისის სახელი",
    type: "select",
  },
  {
    filter: "select",
    name: "service_currency",
    label: "სერვისის ვალუტა",
    type: "select",
  },
  {
    filter: "select",
    name: "agent_currency",
    label: "აგენტის ვალუტა",
    type: "select",
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
    label: "დაგენერირებული თანხა",
    type: "number",
  },
  {
    filter: "date",
    name: "created_at",
    label: "ტრანზაქციის რეგისტრაციის თარიღი",
    type: "datetime-local",
  },
  {
    filter: "date",
    name: "execute_time",
    label: "ტრანზაქციის შესრულების თარიღი",
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

export const servicesArr = [
  { filter: "search", name: "name", label: "სახელი", type: "text" },
  { filter: "select", name: "owner_id", label: "ოვნერი", type: "select" },
  { filter: "search", name: "description", label: "აღწერა", type: "text" },
  {
    filter: "search",
    name: "oris_bank_account",
    label: "ორის ბანკის ექაუნთი",
    type: "number",
  },
  { filter: "select", name: "currency_id", label: "ვალუტა", type: "select" },
  {
    filter: "range",
    name: "min_amount",
    label: "მინ. რაოდენობა",
    type: "number",
  },
  {
    filter: "range",
    name: "max_amount",
    label: "მაქს. რაოდენობა",
    type: "number",
  },
  { name: "status", label: "სტატუსი", type: "radio" },
  { filter: "select", name: "category_id", label: "კატეგორია", type: "select" },
  { name: "image", label: "ფოტო", type: "file" },
  {
    name: "percent_charge_from_service",
    label: "% მომწოდებლისგან",
    type: "number",
  },
  {
    name: "fix_charge_from_service",
    label: "ფიქს მომწოდებლისგან",
    type: "number",
  },
  {
    name: "min_charge_from_service",
    label: "მინ მომწოდებლისგან",
    type: "number",
  },
  {
    name: "max_charge_from_service",
    label: "მაქს მომწოდებლისგან",
    type: "number",
  },
  {
    name: "percent_charge_to_service",
    label: "% ვუხდით მომწოდებელს",
    type: "number",
  },
  {
    name: "fix_charge_to_service",
    label: "ფიქს ვუხდით მომწოდებელს",
    type: "number",
  },
  {
    name: "min_charge_to_service",
    label: "მინ ვუხდით მომწოდებელს",
    type: "number",
  },
  {
    name: "max_charge_to_service",
    label: "მაქს ვუხდით მომწოდებელს",
    type: "number",
  },
];

export const serviceCategoriesArrr = [
  { name: "name_geo", label: "სახელი (GEO)", type: "text" },
  { name: "name_eng", label: "სახელი (ENG)", type: "text" },
  { name: "name_rus", label: "სახელი (RUS)", type: "text" },
  { name: "image", label: "ფოტო", type: "file" },
];

export const serviceProductionsArr = [
  {
    filter: "select",
    name: "service_id",
    label: "სერვისის სახელი",
    type: "select",
  },
  { filter: "select", name: "owner_id", label: "Owner", type: "select" },
  { filter: "select", name: "agent_id", label: "აგენტი", type: "select" },
  {
    filter: "range",
    name: "our_charge",
    label: "ჩვენი გადასახადი",
    type: "number",
  },
  {
    filter: "range",
    name: "rate_percent",
    label: "Rate %",
    type: "number",
  },
  {
    filter: "range",
    name: "min_to_agent",
    label: "მინ. აგენტისთვის",
    type: "number",
  },
  {
    filter: "range",
    name: "max_to_agent",
    label: "მაქს. აგენტისთვის",
    type: "number",
  },
  {
    filter: "range",
    name: "percent_to_agent",
    label: "% აგენტისთვის",
    type: "number",
  },
  {
    filter: "range",
    name: "fix_to_agent",
    label: "ფიქსირებული აგენტისთვის",
    type: "number",
  },
  {
    filter: "range",
    name: "min_from_agent",
    label: "მინ. აგენტისგან",
    type: "number",
  },
  {
    filter: "range",
    name: "max_from_agent",
    label: "მაქს. აგენტისგან",
    type: "number",
  },
  {
    filter: "range",
    name: "percent_from_agent",
    label: "% აგენტისგან",
    type: "number",
  },
  {
    filter: "range",
    name: "fixed_from_agent",
    label: "ფიქსირებული აგენტისგან",
    type: "number",
  },
  {
    filter: "range",
    name: "payer_fixed",
    label: "გადამხდელის ფიქსირებული",
    type: "number",
  },
  {
    filter: "range",
    name: "payer_percent",
    label: "გადამხდელის %",
    type: "number",
  },

  {
    filter: "range",
    name: "payer_min",
    label: "გადამხდელის მინ.",
    type: "number",
  },
  {
    filter: "range",
    name: "payer_max",
    label: "გადამხდელის მაქს.",
    type: "number",
  },
  {
    filter: "range",
    name: "min_amount",
    label: "მაქს. რაოდენობა",
    type: "number",
  },
  {
    filter: "range",
    name: "max_amount",
    label: "მინ. რაოდენობა",
    type: "number",
  },
  { filter: "select", name: "status", label: "სტატუსი", type: "radio" },
  {
    filter: "radio",
    name: "sender_verify",
    label: "გამგზავნის ვერიფიკაცია",
    type: "radio",
  },
  {
    filter: "range",
    name: "receiver_verify",
    label: "მიმღების ვერიფიკაცია",
    type: "radio",
  },
];

export const currencyArr = [
  {
    name: "currency_code",
    label: "ვალუტის კოდი",
    type: "number",
  },
  {
    name: "name",
    label: "სახელი",
    type: "text",
  },
  {
    name: "qty",
    label: "რაოდენობა",
    type: "number",
  },
];

export const ourErrorArr = [
  {
    name: "status",
    label: "სტატუსი",
    type: "number",
  },
  {
    name: "error_code",
    label: "ერორის კოდი",
    type: "number",
  },
  { name: "name_ge", label: "სახელი (GEO)", type: "text" },
  { name: "name_eng", label: "სახელი (ENG)", type: "text" },
  { name: "name_ru", label: "სახელი (RUS)", type: "text" },
];

export const ownerErrorArr = [
  {
    name: "status",
    label: "სტატუსი",
    type: "number",
  },
  {
    name: "error_code",
    label: "ერორის კოდი",
    type: "number",
  },
  { name: "name_ge", label: "სახელი (GEO)", type: "text" },
  { name: "name_eng", label: "სახელი (ENG)", type: "text" },
  { name: "name_ru", label: "სახელი (RUS)", type: "text" },
  {
    name: "owner_id",
    label: "ოვნერი",
    type: "select",
  },
  {
    name: "our_error_id",
    label: "ჩვენი ერორი",
    type: "select",
  },
];

export const payerArr = [
  { name: "transaction_id", label: "ტრანზაქცია" },
  { name: "firstname", label: "სახელი" },
  { name: "lastname", label: "გვარი" },
  { name: "email", label: "მეილი" },
];

export const balanceHistoryArr = [
  {
    filter: "select",
    name: "customer_id",
    label: "მომხმარებელი",
    type: "select",
  },
  {
    name: "transaction_id",
    label: "ტრანზაქცია",
    type: "number",
    filter: "search",
  },
  { filter: "range", name: "balance", label: "ბალანსი", type: "number" },

  {
    filter: "range",
    name: "total_balance",
    label: "სრული ბალანსი",
    type: "number",
  },
  {
    filter: "select",
    name: "currency_id",
    label: "ვალუტა",
    type: "select",
  },
  {
    filter: "range",
    name: "debt",
    label: "გასვლა",
    type: "number",
  },
  {
    filter: "range",
    name: "credit",
    label: "შემოსვლა",
    type: "number",
  },
  {
    filter: "select",
    name: "type_id",
    label: "ტიპი",
    type: "select",
  },
  {
    filter: "date",
    name: "created_at",
    label: "თარიღი",
    type: "date",
  },
];

export const legalFormArr = [{ name: "name", label: "სახელი", type: "text" }];

export const addBalanceArr = [
  {
    filter: "select",
    name: "customer_id",
    label: "მომხმარებელი",
    type: "select",
  },
  {
    filter: "range",
    name: "debt",
    label: "თანხა",
    type: "number",
  },
  {
    filter: "range",
    name: "credit",
    label: "თანხა",
    type: "number",
  },
  {
    filter: "select",
    name: "currency_id",
    label: "ვალუტა",
    type: "select",
  },
  {
    filter: "date",
    name: "created_at",
    label: "თარიღი",
    type: "datetime-local",
  },
];

export const recountArr = [
  {
    filter: "select",
    name: "customer_id",
    label: "მომხმარებელი",
    type: "select",
  },
  {
    filter: "select",
    name: "currency_id",
    label: "ვალუტა",
    type: "select",
  },
  {
    filter: "date",
    name: "date",
    label: "თარიღი",
    type: "date",
  },
];

export const nullifyArr = [
  {
    filter: "select",
    name: "customer_id",
    label: "მომხმარებელი",
    type: "select",
  },
];

export const currencyRatesArr = [
  {
    name: "from",
    label: "ვალუტა-დან",
  },
  {
    name: "quantity",
    label: "რაოდენობა",
  },
  {
    name: "to",
    label: "ვალუტა-ში",
  },
  {
    name: "nbg_rate",
    label: "ეროვნულის კურსი",
  },
  {
    name: "apw_rate",
    label: "ჩვენი კურსი",
  },
];
