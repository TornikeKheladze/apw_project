export function convertTimestamp(timestamp) {
  // Parse the input timestamp
  const inputDate = new Date(timestamp);

  // Create a new date with the desired timezone offset
  const convertedDate = new Date(inputDate.getTime() + 4 * 60 * 60 * 1000); // Add 4 hours for UTC to your desired timezone

  // Format the date in the desired format (YYYY-MM-DD HH:MM:SS)
  const year = convertedDate.getFullYear();
  const month = String(convertedDate.getMonth() + 1).padStart(2, "0");
  const day = String(convertedDate.getDate()).padStart(2, "0");
  const hours = String(convertedDate.getHours()).padStart(2, "0");
  const minutes = String(convertedDate.getMinutes()).padStart(2, "0");
  const seconds = String(convertedDate.getSeconds()).padStart(2, "0");

  const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedTimestamp;
}
