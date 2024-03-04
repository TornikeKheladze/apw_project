export const getYesterdayFormatted = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const year = yesterday.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
  const month = (yesterday.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if needed
  const day = yesterday.getDate().toString().padStart(2, "0"); // Add leading zero if needed

  return `${year}-${month}-${day}`;
};
