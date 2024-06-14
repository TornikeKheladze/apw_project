export const serviceCategoriesArr = [
  {
    filter: "categoryName",
    name: "categoryName",
    label: "categoryName",
    type: "text",
  },
  {
    name: "calculationPeriod",
    label: "calculationPeriod",
    type: "number",
  },
  { name: "catType", label: "catType", type: "select" },
  {
    name: "chargeCalculationEndDate",
    label: "chargeCalculationEndDate",
    type: "datetime-local",
  },
  {
    name: "chargeCalculationStartDate",
    label: "chargeCalculationStartDate",
    type: "datetime-local",
  },
  { filter: "select", name: "ownerID", label: "ownerID", type: "select" },
  { name: "parentID", label: "parentID", type: "select" },
  {
    name: "usedQuantity",
    label: "usedQuantity",
    type: "number",
  },
];

export const serviceArr = [
  {
    filter: "status",
    name: "status",
    label: "status",
    type: "text",
  },
  {
    name: "active",
    label: "active",
    type: "select",
  },
  {
    filter: "search",
    name: "name",
    label: "name",
    type: "text",
  },
  {
    filter: "search",
    name: "description",
    label: "description",
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
    label: "categoryID",
    type: "select",
  },
  {
    name: "priceCalculationPeriod",
    label: "priceCalculationPeriod",
    type: "number",
  },
  {
    name: "ownerID",
    label: "ownerID",
    type: "select",
  },
  {
    name: "serviceUrl",
    label: "serviceUrl",
    type: "text",
  },

  // { filter: "sort", name: "sort", label: "sort", type: "number" },
];

export const serviceParametersArr = [
  {
    filter: "search",
    name: "parameterName",
    label: "parameterName",
    type: "text",
  },
  {
    filter: "search",
    name: "parameterPlaceholder",
    label: "parameterPlaceholder",
    type: "text",
  },
  {
    name: "serviceID",
    label: "serviceID",
    type: "select",
  },
  {
    name: "parameterLength",
    label: "parameterLength",
    type: "number",
  },
  {
    filter: "select",
    name: "parameterTypeID",
    label: "parameterTypeID",
    type: "select",
  },
  { filter: "select", name: "catID", label: "catID", type: "select" },
];

export const serviceParametersTypeArr = [
  {
    name: "parameterPlaceholder",
    label: "parameterPlaceholder",
    type: "text",
  },
  {
    name: "parameterTypeName",
    label: "parameterTypeName",
    type: "text",
  },
];

export const servicePricesArr = [
  {
    filter: "search",
    name: "price",
    label: "price",
    type: "number",
  },
  {
    filter: "search",
    name: "quantity",
    label: "quantity",
    type: "number",
  },
  {
    name: "serviceID",
    label: "serviceID",
    type: "select",
  },
];

export const specPricesArr = [
  ...servicePricesArr,
  {
    filter: "select",
    name: "agentID",
    label: "agentID",
    type: "select",
  },
];

export const chargesArr = [
  {
    filter: "search",
    name: "chargeFixed",
    label: "chargeFixed",
    type: "number",
  },
  {
    filter: "search",
    name: "chargePercent",
    label: "chargePercent",
    type: "number",
  },
  {
    filter: "search",
    name: "quantity",
    label: "quantity",
    type: "number",
  },
  {
    filter: "select",
    name: "catID",
    label: "catID",
    type: "select",
  },
];

export const salesArr = [
  {
    filter: "select",
    name: "active",
    label: "active",
    type: "select",
  },
  {
    filter: "select",
    name: "serviceID",
    label: "serviceID",
    type: "select",
  },
  {
    filter: "select",
    name: "catID",
    label: "catID",
    type: "select",
  },
  {
    filter: "select",
    name: "saleStatusID",
    label: "saleStatusID",
    type: "select",
  },
  {
    name: "percent",
    label: "percent",
    type: "number",
  },
  {
    name: "fixed",
    label: "fixed",
    type: "number",
  },
  {
    name: "startDate",
    label: "startDate",
    type: "datetime-local",
  },
  {
    name: "endDate",
    label: "endDate",
    type: "datetime-local",
  },
];

export const billingPackageArr = [
  {
    filter: "select",
    name: "serviceID",
    label: "serviceID",
    type: "select",
  },
  {
    name: "price",
    label: "price",
    type: "number",
  },
  {
    name: "expiration",
    label: "expiration",
    type: "number",
  },
  {
    name: "quantity",
    label: "quantity",
    type: "number",
  },
];

export const serviceProductionArr = [
  {
    filter: "select",
    name: "status",
    label: "status",
    type: "select",
  },
  {
    filter: "select",
    name: "serviceID",
    label: "serviceID",
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
    name: "ownerID",
    label: "ownerID",
    type: "select",
  },
  {
    name: "maxCredit",
    label: "maxCredit",
    type: "number",
  },
  {
    name: "maxCreditTransactions",
    label: "maxCreditTransactions",
    type: "number",
  },
  {
    name: "usedTransactionQuantity",
    label: "usedTransactionQuantity",
    type: "number",
  },
  {
    name: "percentToAgent",
    label: "percentToAgent",
    type: "number",
  },
  {
    name: "fixedToAgent",
    label: "fixedToAgent",
    type: "number",
  },
  {
    name: "priceCalculationStartDate",
    label: "priceCalculationStartDate",
    type: "datetime-local",
  },
  {
    name: "priceCalculationEndDate",
    label: "priceCalculationEndDate",
    type: "datetime-local",
  },
];

export const packageProductionsArr = [
  {
    filter: "select",
    name: "packageID",
    label: "packageID",
    type: "select",
  },
  {
    filter: "select",
    name: "serviceID",
    label: "serviceID",
    type: "select",
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
    name: "usedTransactionQuantity",
    label: "usedTransactionQuantity",
    type: "number",
  },
  {
    name: "startDate",
    label: "startDate",
    type: "datetime-local",
  },
  {
    name: "endDate",
    label: "endDate",
    type: "datetime-local",
  },
];

export const categoryProductionArr = [
  {
    filter: "select",
    name: "status",
    label: "status",
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
    name: "catID",
    label: "catID",
    type: "select",
  },

  {
    name: "usedQuantity",
    label: "usedQuantity",
    type: "number",
  },
  {
    name: "fixedToAgent",
    label: "fixedToAgent",
    type: "number",
  },
  {
    name: "percentToAgent",
    label: "percentToAgent",
    type: "number",
  },
  {
    name: "maxCredit",
    label: "maxCredit",
    type: "number",
  },
  {
    name: "maxCreditTransactions",
    label: "maxCreditTransactions",
    type: "number",
  },
  {
    name: "chargeCalculationStartDate",
    label: "chargeCalculationStartDate",
    type: "datetime-local",
  },
  {
    name: "chargeCalculationEndDate",
    label: "chargeCalculationEndDate",
    type: "datetime-local",
  },
];

export const apiCredentialsArr = [
  {
    name: "apiName",
    label: "apiName",
    type: "text",
  },
  {
    name: "apiId",
    label: "apiId",
    type: "number",
  },
  {
    name: "apiKey",
    label: "apiKey",
    type: "number",
  },
];
