export const keyReplace = (engObj, geoArr) => {
  const updatedObject = {};
  for (const key in engObj) {
    const newKeyObj = geoArr.find(({ name }) => name === key);
    if (newKeyObj) {
      updatedObject[newKeyObj.label] = engObj[key];
    }
  }
  return updatedObject;
};
