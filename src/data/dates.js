export const calculateDates = () => {
  const years = [];
  const monthsInGeorgian = [
    { month: "იანვარი", label: "01", value: 1 },
    { month: "თებერვალი", label: "02", value: 2 },
    { month: "მარტი", label: "03", value: 3 },
    { month: "აპრილი", label: "04", value: 4 },
    { month: "მაისი", label: "05", value: 5 },
    { month: "ივნისი", label: "06", value: 6 },
    { month: "ივლისი", label: "07", value: 7 },
    { month: "აგვისტო", label: "08", value: 8 },
    { month: "სექტემბერი", label: "09", value: 9 },
    { month: "ოქტომბერი", label: "10", value: 10 },
    { month: "ნოემბერი", label: "11", value: 11 },
    { month: "დეკემბერი", label: "12", value: 12 },
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const numberOfYears = 10;

  for (let i = 0; i < numberOfYears; i++) {
    const year = currentYear - i;
    years.push({ year: year.toString(), value: year });
  }

  return { years, currentYear, monthsInGeorgian, currentMonth };
};
