export const serviceCategoriesArr = [
  {
    filter: "categoryName",
    name: "categoryName",
    label: "დასახელება",
    type: "text",
  },
  // {
  //   name: "calculationPeriod",
  //   label: "კალკულაციის პერიოდი",
  //   type: "number",
  // },
  { name: "catType", label: "კატალოგის ტიპი", type: "select" },
  // {
  //   name: "chargeCalculationEndDate",
  //   label: "მოსაკრებლის კალკულაციის დასრულების თარიღი",
  //   type: "datetime-local",
  // },
  // {
  //   name: "chargeCalculationStartDate",
  //   label: "მოსაკრებლის კალკულაციის დაწყების თარიღი",
  //   type: "datetime-local",
  // },
  { name: "categoryDescription", label: "სერვისის აღწერილობა", type: "text" },
  { name: "usageTerms", label: "სარგებლობის პირობები", type: "text" },
  { name: "additionalTerms", label: "დამატებითი პირობები", type: "text" },
  // { name: "obligations", label: "ვალდებულებები", type: "text" },
  {
    filter: "select",
    name: "ownerID",
    label: "სერვისის მომწოდებელი",
    type: "select",
  },
  { name: "parentID", label: "მშობელი", type: "select" },
  {
    name: "applicantRegistrationApi",
    label: "დაშვება იურიდიული პირებისათვის",
    type: "select",
  },
  {
    name: "usedQuantity",
    label: "გამოყენებული რაოდენობა",
    type: "number",
  },
];

export const serviceArr = [
  // {
  //   filter: "status",
  //   name: "status",
  //   label: "status",
  //   type: "text",
  // },
  {
    name: "active",
    label: "სტატუსი",
    type: "select",
  },
  {
    filter: "search",
    name: "name",
    label: "დასახელება",
    type: "text",
  },
  {
    filter: "search",
    name: "description",
    label: "აღწერა",
    type: "text",
  },
  // {
  //   name: "image",
  //   label: "image",
  //   type: "file",
  // },
  {
    filter: "select",
    name: "categoryID",
    label: "კატალოგი",
    type: "select",
  },
  {
    name: "priceCalculationPeriod",
    label: "ფასის კალკულაციის პერიოდი (დღეები)",
    type: "number",
  },
  {
    name: "ownerID",
    label: "სერვისის მომწოდებელი",
    type: "select",
  },
  {
    name: "applicantRegistrationApi",
    label: "დაშვება იურიდიული პირებისათვის",
    type: "select",
  },
  {
    name: "serviceUrl",
    label: "სერვისის URL",
    type: "text",
  },

  // { filter: "sort", name: "sort", label: "sort", type: "number" },
];

export const serviceParametersArr = [
  {
    filter: "search",
    name: "parameterName",
    label: "ტექნიკური სახელწოდება (ლათინურად)",
    type: "text",
  },
  {
    filter: "search",
    name: "parameterPlaceholder",
    label: "სახელწოდება",
    type: "text",
  },
  {
    name: "serviceID",
    label: "სერვისი",
    type: "select",
  },
  {
    name: "parameterLength",
    label: "ველში სიმბოლოების რაოდენობა",
    type: "number",
  },
  {
    filter: "select",
    name: "parameterTypeID",
    label: "პარამეტრის ტიპი",
    type: "select",
  },
  { filter: "select", name: "catID", label: "კატალოგი", type: "select" },
];

export const serviceParametersTypeArr = [
  {
    name: "parameterPlaceholder",
    label: "სახელი",
    type: "text",
  },
  {
    name: "parameterTypeName",
    label: "ტექნიკური სახელი",
    type: "text",
  },
];

export const servicePricesArr = [
  {
    filter: "search",
    name: "price",
    label: "ფასი",
    type: "number",
  },
  {
    filter: "search",
    name: "quantity",
    label: "რაოდენობა",
    type: "number",
  },
  {
    name: "serviceID",
    label: "სერვისი",
    type: "select",
  },
];

export const specPricesArr = [
  ...servicePricesArr,
  {
    filter: "select",
    name: "agentID",
    label: "სერვისის მიმღები",
    type: "select",
  },
];

export const chargesArr = [
  {
    filter: "search",
    name: "chargeFixed",
    label: "ფიქსირებული მოსაკრებელი",
    type: "number",
  },
  {
    filter: "search",
    name: "chargePercent",
    label: "მოსაკრებელი პროცენტულად",
    type: "number",
  },
  {
    filter: "search",
    name: "quantity",
    label: "რაოდენობა",
    type: "number",
  },
  {
    filter: "select",
    name: "catID",
    label: "კატალოგი",
    type: "select",
  },
];

export const salesArr = [
  {
    filter: "select",
    name: "active",
    label: "სტატუსი",
    type: "select",
  },
  {
    filter: "select",
    name: "serviceID",
    label: "სერვისი",
    type: "select",
  },
  {
    filter: "select",
    name: "catID",
    label: "კატალოგი",
    type: "select",
  },
  {
    filter: "select",
    name: "saleStatusID",
    label: "ფასდაკლების სტატუსი",
    type: "select",
  },
  {
    name: "percent",
    label: "პროცენტი",
    type: "number",
  },
  {
    name: "fixed",
    label: "ფიქსირებული",
    type: "number",
  },
  {
    name: "startDate",
    label: "დაწყების თარიღი",
    type: "datetime-local",
  },
  {
    name: "endDate",
    label: "დასრულების თარიღი",
    type: "datetime-local",
  },
];

export const billingPackageArr = [
  {
    filter: "select",
    name: "serviceID",
    label: "სერვისი",
    type: "select",
  },
  {
    name: "price",
    label: "ფასი",
    type: "number",
  },
  {
    name: "expiration",
    label: "ვადა (დღეები)",
    type: "number",
  },
  {
    name: "quantity",
    label: "ტრანზაქციების რაოდენობა",
    type: "number",
  },
];

export const serviceProductionArr = [
  {
    filter: "select",
    name: "status",
    label: "სტატუსი",
    type: "select",
  },
  {
    filter: "select",
    name: "serviceID",
    label: "სერვისი",
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
    name: "ownerID",
    label: "სერვისის მომწოდებელი",
    type: "select",
  },
  {
    name: "maxCredit",
    label: "კრედიტის ზედა ზღვარი",
    type: "number",
  },
  {
    name: "maxCreditTransactions",
    label: "კრედიტის ზედა ზღვარი ტრანზაქციების რაოდენობის მიხედვით",
    type: "number",
  },
  {
    name: "usedTransactionQuantity",
    label: "გამოყენებული ტრანზაქციების რაოდენობა",
    type: "number",
  },
  {
    name: "percentToAgent",
    label: "სერვისის მიმღებისთვის გადასახდელი პროცენტი",
    type: "number",
  },
  {
    name: "fixedToAgent",
    label: "სერვისის მიმღებისთვის ფიქსირებული გადასახადი",
    type: "number",
  },
  {
    name: "priceCalculationStartDate",
    label: "ფასის დაანგარიშების საწყისი თარიღი",
    type: "datetime-local",
  },
  {
    name: "priceCalculationEndDate",
    label: "ფასის დაანგარიშების საბოლოო თარიღი",
    type: "datetime-local",
  },
];

export const packageProductionsArr = [
  {
    filter: "select",
    name: "packageID",
    label: "პაკეტი",
    type: "select",
  },
  {
    filter: "select",
    name: "serviceID",
    label: "სერვისი",
    type: "select",
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
    name: "usedTransactionQuantity",
    label: "გამოყენებული ტრანზაქციების რაოდენობა",
    type: "number",
  },
  {
    name: "startDate",
    label: "დაწყების თარიღი",
    type: "datetime-local",
  },
  {
    name: "endDate",
    label: "დასრულების თარიღი",
    type: "datetime-local",
  },
];

export const categoryProductionArr = [
  {
    filter: "select",
    name: "status",
    label: "სტატუსი",
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
    name: "catID",
    label: "კატალოგი",
    type: "select",
  },

  {
    name: "usedQuantity",
    label: "გამოყენებული რაოდენობა",
    type: "number",
  },
  {
    name: "fixedToAgent",
    label: "სერვისის მიმღებისთვის ფიქსირებული გადასახადი",
    type: "number",
  },
  {
    name: "percentToAgent",
    label: "სერვისის მიმღებისთვის გადასახდელი პროცენტი",
    type: "number",
  },
  {
    name: "maxCredit",
    label: "კრედიტის ზედა ზღვარი",
    type: "number",
  },
  {
    name: "maxCreditTransactions",
    label: "კრედიტის ზედა ზღვარი ტრანზაქციების რაოდენობის მიხედვით",
    type: "number",
  },
  {
    name: "chargeCalculationStartDate",
    label: "მოსაკრებლის კალკულაციის დაწყების თარიღი",
    type: "datetime-local",
  },
  {
    name: "chargeCalculationEndDate",
    label: "მოსაკრებლის კალკულაციის დასრულების თარიღი",
    type: "datetime-local",
  },
];

export const apiCredentialsArr = [
  {
    name: "apiName",
    label: "API ს სახელი",
    type: "text",
  },
  {
    name: "apiId",
    label: "API ID",
    type: "number",
  },
  {
    name: "apiKey",
    label: "API KEY",
    type: "number",
  },
  {
    name: "apiUrl",
    label: "API URL",
    type: "text",
  },
];

export const bankRegisterArr = [
  {
    name: "bankName",
    label: "ბანკის სახელი",
    type: "text",
  },
  {
    name: "bankContactPhone",
    label: "ბანკის საკონტაქტო ტელეფონი",
    type: "text",
  },
  {
    name: "email",
    label: "ელ-ფოსტა",
    type: "text",
  },
  {
    name: "password",
    label: "პაროლი",
    type: "text",
  },
  {
    name: "riskLevel",
    label: "რისკის დონე",
    type: "text",
  },
  {
    name: "legalForm",
    label: "სამართლებრივი ფორმა",
    type: "text",
  },
  {
    name: "legalName",
    label: "სამართლებრივი სახელი",
    type: "text",
  },
  {
    name: "legalAddress",
    label: "სამართლებრივი მისამართი",
    type: "text",
  },
  {
    name: "physicalAddress",
    label: "ფიზიკური მისამართი",
    type: "text",
  },
  {
    name: "identificationCode",
    label: "საიდენტიფიკაციო კოდი",
    type: "text",
  },
  {
    name: "ipAddress",
    label: "IP მისამართი",
    type: "text",
  },
  {
    name: "registrationCountry",
    label: "რეგისტრაციის ქვეყანა",
    type: "text",
  },
  {
    name: "registrationCity",
    label: "რეგისტრაციის ქალაქი",
    type: "text",
  },
  {
    name: "postalCode",
    label: "საფოსტო კოდი",
    type: "text",
  },
  {
    name: "contractNumber",
    label: "კონტრაქტის ნომერი",
    type: "text",
  },
  {
    name: "contractDate",
    label: "კონტრაქტის თარიღი",
    type: "date",
  },
  {
    name: "director",
    label: "დირექტორი",
    type: "text",
  },
  {
    name: "servicingBanker",
    label: "მომსახურე ბანკირი",
    type: "text",
  },
  {
    name: "bankSwiftCode",
    label: "SWIFT კოდი",
    type: "text",
  },
  {
    name: "bankAccountNumber",
    label: "ბანკის ანგარიშის ნომერი",
    type: "text",
  },
  {
    name: "intermediaryBankDetails",
    label: "შუამავალი ბანკის დეტალები",
    type: "text",
  },
  {
    name: "authorizationPhoneNumber",
    label: "ავტორიზაციის ტელეფონის ნომერი",
    type: "text",
  },
  {
    name: "actSignerPosition",
    label: "აქტის ხელმომწერის პოზიცია",
    type: "text",
  },
  {
    name: "actSigner",
    label: "აქტის ხელმომწერი",
    type: "text",
  },
  {
    name: "status",
    label: "სტატუსი",
    type: "text",
  },
  {
    name: "role",
    label: "როლი",
    type: "text",
  },
];
