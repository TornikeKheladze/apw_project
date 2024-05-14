import { getCategories } from "services/serviceCategories";
import { useQuery } from "react-query";

const useServiceCategories = () => {
  const { data: categoriesArr = [{}], isLoading } = useQuery({
    queryKey: "getCategories",
    queryFn: () => getCategories().then((res) => res.data),
    staleTime: Infinity,
  });

  const categories = categoriesArr.map((cat) => ({ ...cat, id: cat.catID }));

  const buildTreeMenu = (categories, parentId = 0) => {
    return categories
      .filter((category) => category.parentID === parentId)
      .map((category) => ({
        ...category,
        children: buildTreeMenu(categories, category.catID),
      }));
  };

  const categoriesTree = buildTreeMenu(categories);

  return {
    isLoading,
    categories,
    categoriesTree,
  };
};

export default useServiceCategories;
