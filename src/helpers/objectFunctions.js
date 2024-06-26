export function isEmptyObject(obj) {
  // Check if the object is not null and of type 'object'
  if (obj && typeof obj === "object") {
    // Use Object.keys to get an array of the object's keys and check its length
    return Object.keys(obj).length === 0;
  }
  // If obj is not an object or is null, return false (not empty)
  return false;
}
