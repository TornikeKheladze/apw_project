export function getCurrentDate(dateFormat) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");

  // Replace placeholders in the date format
  dateFormat = dateFormat.replace("yyyy", year);
  dateFormat = dateFormat.replace("MM", month);
  dateFormat = dateFormat.replace("dd", day);

  return dateFormat;
}

export function getDateOneMonthFromNow(dateFormat) {
  const currentDate = new Date();
  const oneMonthLater = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );

  const year = oneMonthLater.getFullYear();
  let month = (oneMonthLater.getMonth() + 1).toString().padStart(2, "0");
  let day = oneMonthLater.getDate().toString().padStart(2, "0");

  // Replace placeholders in the date format
  dateFormat = dateFormat.replace("yyyy", year);
  dateFormat = dateFormat.replace("MM", month);
  dateFormat = dateFormat.replace("dd", day);

  return dateFormat;
}

export const addDaysToDate = (days) => {
  if (isNaN(days)) return;
  const today = new Date();
  today.setDate(today.getDate() + days);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const daysDifference = (days) => {
  const today = new Date();
  const selectedDate = new Date(days);

  if (isNaN(selectedDate)) {
    return;
  }
  const differenceInMilliseconds = selectedDate - today;
  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );
  return differenceInDays;
};

export const months = [
  { name: "იანვარი", number: 0 },
  { name: "თებერვალი", number: 1 },
  { name: "მარტი", number: 2 },
  { name: "აპრილი", number: 3 },
  { name: "მაისი", number: 4 },
  { name: "ივნისი", number: 5 },
  { name: "ივლისი", number: 6 },
  { name: "აგვისტო", number: 7 },
  { name: "სექტემბერი", number: 8 },
  { name: "ოქტომბერი", number: 9 },
  { name: "ნოემბერი", number: 10 },
  { name: "დეკემბერი", number: 11 },
];

export const monthlyDummyData = [
  {
    amount: 0,
    yearMonth: "2024-00",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-01",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-02",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-03",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-04",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-05",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-06",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-07",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-08",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-09",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-10",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
  {
    amount: 0,
    yearMonth: "2024-11",
    paidAmount: 0,
    paidTransactionCount: 0,
    transactionCount: 0,
  },
];

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// export const monthlyDummyData = [
//   {
//     amount: 17500,
//     yearMonth: "2024-00",
//     paidAmount: 8200,
//     paidTransactionCount: 23,
//     transactionCount: 147,
//   },
//   {
//     amount: 19800,
//     yearMonth: "2024-01",
//     paidAmount: 6200,
//     paidTransactionCount: 31,
//     transactionCount: 162,
//   },
//   {
//     amount: 10500,
//     yearMonth: "2024-02",
//     paidAmount: 4200,
//     paidTransactionCount: 14,
//     transactionCount: 93,
//   },
//   {
//     amount: 14400,
//     yearMonth: "2024-03",
//     paidAmount: 5500,
//     paidTransactionCount: 19,
//     transactionCount: 125,
//   },
//   {
//     amount: 12600,
//     yearMonth: "2024-04",
//     paidAmount: 7100,
//     paidTransactionCount: 29,
//     transactionCount: 156,
//   },
//   {
//     amount: 16200,
//     yearMonth: "2024-05",
//     paidAmount: 9300,
//     paidTransactionCount: 35,
//     transactionCount: 184,
//   },
//   {
//     amount: 19000,
//     yearMonth: "2024-06",
//     paidAmount: 8400,
//     paidTransactionCount: 25,
//     transactionCount: 145,
//   },
//   {
//     amount: 13500,
//     yearMonth: "2024-07",
//     paidAmount: 6500,
//     paidTransactionCount: 27,
//     transactionCount: 168,
//   },
//   {
//     amount: 11700,
//     yearMonth: "2024-08",
//     paidAmount: 5600,
//     paidTransactionCount: 22,
//     transactionCount: 134,
//   },
//   {
//     amount: 14300,
//     yearMonth: "2024-09",
//     paidAmount: 4800,
//     paidTransactionCount: 18,
//     transactionCount: 107,
//   },
//   {
//     amount: 16500,
//     yearMonth: "2024-10",
//     paidAmount: 7000,
//     paidTransactionCount: 32,
//     transactionCount: 173,
//   },
//   {
//     amount: 15800,
//     yearMonth: "2024-11",
//     paidAmount: 7100,
//     paidTransactionCount: 26,
//     transactionCount: 152,
//   },
// ];
