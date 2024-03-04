export const mergeCurrentBalance = (arr) => {
  const resultArray = [];
  arr.forEach((obj) => {
    const {
      name,
      balance,
      credit,
      currency: { name: currencyName },
      type,
    } = obj;

    const existingObj = resultArray.find((item) => item.name === name);
    if (existingObj) {
      existingObj.curData[currencyName] = balance;
    } else {
      const newObj = {
        name: name,
        curData: {
          [currencyName]: balance,
        },
        credit: credit,
        type,
      };
      resultArray.push(newObj);
    }
  });
  return resultArray;
};
