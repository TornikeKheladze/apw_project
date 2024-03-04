export const sumObjectKeys = (arrayOfObjects) => {
  const keySums = {};

  for (const obj of arrayOfObjects) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!keySums.hasOwnProperty(key)) {
          keySums[key] = 0;
        }

        // Convert the value to a number (float or integer)
        const value = parseFloat(obj[key]);

        // Check if the conversion was successful and the value is a number
        if (!isNaN(value)) {
          keySums[key] += value;
        }
      }
    }
  }

  return keySums;
};

export const mergeObjectsWithSimilarNames = (
  arr,
  propertiesToMerge,
  nameKey
) => {
  const mergedData = {};
  arr.forEach((item) => {
    const name = item[nameKey];
    if (!mergedData[name]) {
      mergedData[name] = {};
    }
    propertiesToMerge.forEach((prop) => {
      const propValue = parseFloat(item[prop]) || 0;
      if (isNaN(propValue)) {
        throw new Error(`Invalid number value for property "${prop}"`);
      }
      if (!mergedData[name][prop]) {
        mergedData[name][prop] = 0;
      }
      mergedData[name][prop] += propValue;
    });
  });
  const mergedArray = Object.keys(mergedData).map((name) => ({
    name,
    ...mergedData[name],
  }));
  return mergedArray;
};

export const transformDataByCustomerName = (inputData) => {
  const transformedData = {};

  // Loop through the input data and organize it by customers key
  for (const item of inputData) {
    const customersKey = item.customers;

    // Initialize the customer object if it doesn't exist
    if (!transformedData[customersKey]) {
      transformedData[customersKey] = {
        customer: customersKey,
        customer_id: item.customers_id,
        debt: 0,
        currencies: [],
      };
    }

    // Update the debt for the customer
    transformedData[customersKey].debt += parseFloat(item.debt);

    // Check if the currency exists in the currencies array
    const currencyIndex = transformedData[customersKey].currencies.findIndex(
      (currencyItem) => currencyItem.currency === item.currency
    );

    // If it doesn't exist, add it to the currencies array
    if (currencyIndex === -1) {
      transformedData[customersKey].currencies.push({
        currency: item.currency,
        amount: parseFloat(item.debt),
      });
    } else {
      // If it exists, update the amount
      transformedData[customersKey].currencies[currencyIndex].amount +=
        parseFloat(item.debt);
    }
  }

  // Convert the transformed data into an array
  const resultArray = Object.values(transformedData);

  return resultArray;
};
