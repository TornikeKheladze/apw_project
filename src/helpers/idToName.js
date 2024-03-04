export const idToName = (arr = [], idField) => {
  const name = arr?.find(({ id }) => id === idField);
  // temporary name
  return (
    name &&
    (name.name ||
      name.category_name ||
      name.currency_name ||
      name.template_name ||
      name.column_type)
  );
};
