export const getDaysInMonth = (month) => {
  const year = new Date().getFullYear();
  const lastDay = new Date(year, parseInt(month), 0);
  const daysInMonth = lastDay.getDate();

  return daysInMonth;
};
