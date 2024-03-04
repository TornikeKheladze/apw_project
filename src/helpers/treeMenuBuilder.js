export const buildDepartmentTree = (departments, parentId = 0) => {
  return departments
    .filter((department) => department.parent_id === parentId)
    .map((department) => ({
      ...department,
      children: buildDepartmentTree(departments, department.id),
    }));
};
