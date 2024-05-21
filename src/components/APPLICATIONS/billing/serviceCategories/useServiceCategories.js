import { getCategories } from "services/serviceCategories";
import { useQuery } from "react-query";
import { buildCategoryTree } from "helpers/treeMenuBuilder";

const useServiceCategories = () => {
  const { data: categoriesArr = [{}], isLoading } = useQuery({
    queryKey: "getCategories",
    queryFn: () => getCategories().then((res) => res.data),
    staleTime: Infinity,
  });

  const categories = categoriesArr.map((cat) => ({ ...cat, id: cat.catID }));

  const categoriesTree = buildCategoryTree(categories);

  return {
    isLoading,
    categories,
    categoriesTree,
  };
};

export default useServiceCategories;
