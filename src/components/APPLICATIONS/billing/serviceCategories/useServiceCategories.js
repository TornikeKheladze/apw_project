import { getCategories } from "services/serviceCategories";
import { useQuery } from "react-query";
import { buildCategoryTree } from "helpers/treeMenuBuilder";
import { useSelector } from "react-redux";

const useServiceCategories = () => {
  const { authorizedUser } = useSelector((store) => store.user);
  const { data: categoriesData = [{}], isLoading } = useQuery({
    queryKey: "getCategories",
    queryFn: () => getCategories().then((res) => res.data),
  });

  const categories = categoriesData
    .map((cat) => ({ ...cat, id: cat.catID }))
    .filter((service) => {
      if (!authorizedUser.isSip && !authorizedUser.superAdmin)
        return service.applicantRegistrationApi === 1;
      return service;
    });

  const categoriesTree = buildCategoryTree(categories);

  return {
    isLoading,
    categories,
    categoriesTree,
  };
};

export default useServiceCategories;
