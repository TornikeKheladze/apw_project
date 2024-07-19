export const orgArr = [
  {
    name: "name",
    label: "დასახელება",
    type: "text",
  },
  {
    name: "short_name",
    label: "შემოკლებული სახელწოდება",
    type: "text",
  },
  {
    name: "identify_code",
    label: "საიდენტიფიკაციო კოდი",
    type: "text",
  },
  {
    name: "email",
    label: "ელ-ფოსტა",
    type: "text",
  },
  {
    name: "tell",
    label: "ტელეფონი",
    type: "number",
  },
  {
    name: "address",
    label: "იურიდიული მისამართი",
    type: "text",
  },
  {
    name: "physical_address",
    label: "ფიზიკური მისამართი",
    type: "text",
    notRequired: true,
  },
  {
    name: "bank_account_number",
    label: "ბანკის ანგარიშის ნომერი",
    type: "text",
  },
  {
    name: "bank_number",
    label: "ბანკის ნომერი",
    type: "text",
  },
  {
    name: "treasury_code",
    label: "ხაზინის კოდი",
    type: "text",
  },
  {
    name: "type",
    label: "ტიპი",
    type: "select",
  },
  // {
  //   name: "reseller",
  //   label: "რესელერი",
  //   type: "select",
  // },
  {
    name: "user_quota",
    label: "უფასო მომხმარებლების რაოდენობა",
    type: "text",
  },
];

export const userArr = [
  {
    name: "personal_number",
    label: "პირადი ნომერი",
    type: "number",
  },
  {
    name: "name",
    label: "სახელი",
    type: "text",
  },
  {
    name: "l_name",
    label: "გვარი",
    type: "text",
  },
  {
    name: "email",
    label: "ელ-ფოსტა",
    type: "email",
  },
  {
    name: "tell",
    label: "მობილურის ნომერი",
    type: "number",
  },
  {
    name: "address",
    label: "მისამართი",
    type: "text",
  },
  // {
  //   name: "account_type",
  //   label: "ანგარიშის ტიპი",
  //   type: "select",
  // },
  {
    name: "active",
    label: "სტატუსი",
    type: "select",
  },
  {
    name: "signature",
    label: "ხელმომწერი პირი",
    type: "select",
  },
  {
    name: "date_expiration",
    label: "უფლებამოსილების ვადის გასვლის თარიღი",
    type: "datetime-local",
  },
  {
    name: "has_ring_number",
    label: "ელ. კვალიფიციური შტამპის ფუნქციონალით სარგებლობა",
    type: "radio",
    notRequired: true,
  },
];

export const smsArr = [
  {
    name: "message_type",
    label: "ტიპი",
    type: "select",
  },
  {
    name: "subject",
    label: "საგანი (subject)",
    type: "textarea",
  },
  {
    name: "content",
    label: "შეტყობინება",
    type: "textarea",
  },
  {
    name: "email_content",
    label: "ელ.ფოსტის შეტყობინება",
    type: "textarea",
  },
];
