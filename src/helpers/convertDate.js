export const convertDate = (date) => {
  let inputDateTime = new Date(date);
  // Format the date
  let formattedDateStr = `${inputDateTime.getFullYear()}-${(
    inputDateTime.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${inputDateTime
    .getDate()
    .toString()
    .padStart(2, "0")} ${inputDateTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${inputDateTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${inputDateTime
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  return formattedDateStr;
};
