import { filterDuplicates } from "./filterArray";

export const buildDepartmentTree = (departments, parentId = 0) => {
  return departments
    .filter((department) => department.parent_id === parentId)
    .map((department) => ({
      ...department,
      children: buildDepartmentTree(departments, department.id),
    }));
};

// თუ სუპერია დატადან ვიღებ პირდაპირ დეპარტამენტებს ანუ ორგ აიდის მიხედვით,
// თუ სუპერი არარი მაშინ ავტორიზებულიდან მატანს ბექი მემბერს და ეგ უნდა იყოს
// პახოდუ თუ თავისი ორგანიზაციაა მაშინ მემბერს და დატას ვაერთიანებ
// პახოდუ შეიძლება გამეორდეს და მაგასაც ვფილტრავ (:
// იგივე ლოგიკა პოზიციებზეც
export const buildMemberList = (
  departmentData,
  authorizedUser,
  id,
  idFieldName = "oid"
) => {
  const memberArray = departmentData.member || [];
  const mainArray = departmentData.data || departmentData.users || [];
  const deps = authorizedUser.superAdmin
    ? mainArray
    : +authorizedUser[idFieldName] === +id
    ? [...memberArray, ...mainArray]
    : memberArray;
  return filterDuplicates(deps, "id");
};

export const buildCategoryTree = (categories, parentId = 0) => {
  return categories
    .filter((category) => category.parentID === parentId)
    .map((category) => ({
      ...category,
      children: buildCategoryTree(categories, category.catID),
    }));
};
