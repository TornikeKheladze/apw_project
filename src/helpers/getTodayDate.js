export const getTodayDate = (nominal = false) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = nominal
    ? `${year}-${month}-${day}`
    : `${day}/${month}/${year}`;
  return formattedDate;
};
