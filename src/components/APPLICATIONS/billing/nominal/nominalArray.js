export const customerArray = [
  { name: "date", label: "თარიღი" },
  { name: "income", label: "შემოსვლა" },
  { name: "outcome", label: "გასვლა" },
  { name: "day", label: "აქტიური დღეს" },
  { name: "active", label: "აქტიური სულ" },
];

export const clientArray = [
  ...customerArray,
  { name: "active_national_rate", label: "შემოსვლა ლარში ეროვნულის კურსით" },
  { name: "canceled", label: "დაბრუნებული" },
  {
    name: "canceled_national_rate",
    label: "დაბრუნებული ლარში ეროვნულის კურსით",
  },
  { name: "day_national_rate", label: "აქტიური დღეს ლარში ეროვნულის კურსით" },

  {
    name: "income_national_rate",
    label: "შემოსვლა ლარში ეროვნულის კურსით",
  },
  {
    name: "outcome_national_rate",
    label: "გასვლა ლარში ეროვნულის კურსით",
  },
];

export const clientArrayNotGel = [
  ...customerArray,
  { name: "canceled", label: "დაბრუნებული" },
];
