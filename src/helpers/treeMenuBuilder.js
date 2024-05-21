export const buildDepartmentTree = (departments, parentId = 0) => {
  return departments
    .filter((department) => department.parent_id === parentId)
    .map((department) => ({
      ...department,
      children: buildDepartmentTree(departments, department.id),
    }));
};

export const buildCategoryTree = (categories, parentId = 0) => {
  return categories
    .filter((category) => category.parentID === parentId)
    .map((category) => ({
      ...category,
      children: buildCategoryTree(categories, category.catID),
    }));
};
