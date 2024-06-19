// export const filterArray = (arr, filterObject) => {
//   const filteredData = arr.filter((item) => {
//     return Object.keys(filterObject).every((key) => {
//       const filterValue = filterObject[key];
//       const itemValue = item[key];

//       // Check if the filter value is a string and item value contains it
//       if (typeof filterValue === "string" && typeof itemValue === "string") {
//         // Convert string values to lowercase for case-insensitive comparison
//         return itemValue.toLowerCase().includes(filterValue.toLowerCase());
//       }
//       // For numbers and other non-string values, perform exact matches
//       return +itemValue === +filterValue;
//     });
//   });

//   return filteredData;
// };
export const filterArray = (arr, filterObject) => {
  const filteredData = arr.filter((item) => {
    return Object.keys(filterObject).every((key) => {
      const filterValue = filterObject[key];
      const itemValue = item[key];

      // Check if the filter value is a range object
      if (key.endsWith("_min") || key.endsWith("_max")) {
        const baseKey = key.replace(/_(min|max)$/, ""); // Remove _min or _max suffix
        const minKey = `${baseKey}_min`;
        const maxKey = `${baseKey}_max`;

        // If both min and max values are specified, check the range
        if (
          filterObject.hasOwnProperty(minKey) &&
          filterObject.hasOwnProperty(maxKey)
        ) {
          const minFilterValue = filterObject[minKey];
          const maxFilterValue = filterObject[maxKey];
          const itemNumericValue = +item[baseKey];

          // Check if the item value falls within the specified range
          return (
            +itemNumericValue >= +minFilterValue &&
            +itemNumericValue <= +maxFilterValue
          );
        }

        // If only min value is specified, check against min
        if (key.endsWith("_min") && filterObject.hasOwnProperty(minKey)) {
          const minFilterValue = filterObject[minKey];
          const itemNumericValue = +item[baseKey];

          return +itemNumericValue >= +minFilterValue;
        }

        // If only max value is specified, check against max
        if (key.endsWith("_max") && filterObject.hasOwnProperty(maxKey)) {
          const maxFilterValue = filterObject[minKey];
          const itemNumericValue = +item[baseKey];

          return +itemNumericValue <= +maxFilterValue;
        }
      }

      // Check if the filter value is a string and item value contains it
      if (typeof filterValue === "string" && typeof itemValue === "string") {
        // Convert string values to lowercase for case-insensitive comparison
        return itemValue.toLowerCase().includes(filterValue.toLowerCase());
      }

      // For numbers and other non-string values, perform exact matches
      return +itemValue === +filterValue;
    });
  });

  return filteredData;
};

export const filterDuplicates = (array, key) => {
  const seen = new Set();
  return array.filter((item) => {
    const id = item[key];
    if (seen.has(id)) {
      return false;
    } else {
      seen.add(id);
      return true;
    }
  });
};
