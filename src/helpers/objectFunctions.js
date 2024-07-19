export function isEmptyObject(obj) {
  // Check if the object is not null and of type 'object'
  if (obj && typeof obj === "object") {
    // Use Object.keys to get an array of the object's keys and check its length
    return Object.keys(obj).length === 0;
  }
  // If obj is not an object or is null, return false (not empty)
  return false;
}

export function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    // Get the value of the key for the current object
    const groupKey = currentValue[key];
    // If the group doesn't exist yet, create it
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    // Add the current object to the group
    result[groupKey].push(currentValue);
    return result;
  }, {});
}
