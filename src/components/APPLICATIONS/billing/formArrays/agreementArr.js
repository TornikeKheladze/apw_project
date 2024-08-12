export const fizikuriArr = [
  {
    name: "user_name",
    label: "სახელი",
    type: "text",
  },
  {
    name: "user_lname",
    label: "გვარი",
    type: "text",
  },
  {
    name: "user_personal_number",
    label: "პირადი ნომერი",
    type: "number",
  },
  {
    name: "user_tell",
    label: "ტელეფონი",
    type: "number",
  },
  {
    name: "user_email",
    label: "ელ. ფოსტა",
    type: "email",
  },
  {
    name: "contact_info",
    label: "დამატებითი საკონტაქტო ინფორმაცია",
    type: "text",
  },
];

export const legalUser = [
  {
    name: "legal_name",
    label: "დასახელება *",
    type: "text",
    required: true,
  },
  {
    name: "legal_identifi_number",
    label: "საიდენტიფიკაციო ნომერი *",
    type: "text",
    required: true,
  },
  {
    name: "legal_type",
    label: "ტიპი *",
    type: "select",
    required: true,
  },
  {
    name: "legal_sip",
    label: "სსიპ - საჯარო სამართლის იურიდიული პირი *",
    type: "select",
    required: true,
  },
  {
    name: "legal_lagel_addres",
    label: "იურიდიული მისამართი *",
    type: "text",
    required: true,
  },
  {
    name: "legal_tell",
    label: "ტელეფონი",
    type: "number",
  },
  {
    name: "legal_email",
    label: "ელ. ფოსტა",
    type: "email",
  },
  {
    name: "legal_contact_info",
    label: "დამატებითი საკონტაქტო ინფორმაცია",
    type: "text",
  },
];

export const uflebamosiliArr = [
  {
    name: "authorized_name",
    label: "სახელი *",
    type: "text",
    required: true,
  },
  {
    name: "authorized_lname",
    label: "გვარი *",
    type: "text",
    required: true,
  },
  {
    name: "authorized_personal_number",
    label: "პირადი ნომერი *",
    type: "number",
    required: true,
  },
  {
    name: "authorized_tell",
    label: "ტელეფონი *",
    type: "number",
    required: true,
  },
  {
    name: "authorized_email",
    label: "ელ. ფოსტა *",
    type: "email",
    required: true,
  },
  {
    name: "authorized_legal_adress",
    label: "იურიდიული მისამართი",
    type: "text",
  },
  {
    name: "authorized_contact_info",
    label: "დამატებითი საკონტაქტო ინფორმაცია",
    type: "text",
  },
];

export const avtorizirebuliArr = [
  {
    name: "name",
    label: "სახელი *",
    type: "text",
    required: true,
  },
  {
    name: "lname",
    label: "გვარი *",
    type: "text",
    required: true,
  },
  {
    name: "personal_number",
    label: "პირადი ნომერი *",
    type: "number",
    required: true,
  },
  {
    name: "tell",
    label: "ტელეფონი *",
    type: "number",
    required: true,
  },
  {
    name: "email",
    label: "ელ. ფოსტა *",
    type: "email",
    required: true,
  },
  {
    name: "comment",
    label: "მინდობილობის როლი *",
    type: "select",
    required: true,
  },
  {
    name: "user_date_expiration",
    label: "მინდობილობის ვადა *",
    type: "date",
    required: true,
  },
  {
    name: "contact_info",
    label: "დამატებითი საკონტაქტო ინფორმაცია",
    type: "text",
  },
];

export const statementArr = [
  { name: "name", label: "განმცხადებელი", filter: "text" },
  {
    name: "channel",
    label: "განცხადების ინიცირების არხი",
    filter: "text",
  },
  { name: "created_at", label: "თარიღი", filter: "date" },
];

export const statementFilterArr = [
  { name: "name", label: "იურიდიული პირი", type: "text", notRequired: true },
  {
    name: "user_name",
    label: "უფლებამოსილი პირი (სახელი)",
    type: "text",
    notRequired: true,
  },
  {
    name: "user_l_name",
    label: "უფლებამოსილი პირი (გვარი)",
    type: "text",
    notRequired: true,
  },
  {
    name: "start",
    label: "თარიღი (დან)",
    type: "date",
    notRequired: true,
  },
  {
    name: "end",
    label: "თარიღი (მდე)",
    type: "date",
    notRequired: true,
  },
];
