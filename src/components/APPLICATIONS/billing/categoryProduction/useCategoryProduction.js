import {
  getCategories,
  getCategoryProduction,
  updateCategoryProduction,
} from "services/serviceCategories";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { filterArray } from "helpers/filterArray";
import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";
import { getAllUsers } from "services/users";
import { statusBadge } from "helpers/CheckStatusForBilling";

export const useCategoryProduction = () => {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });
  const [filter, setFilter] = useState({});

  const { data: categoryProduction = [{}], isLoading } = useQuery({
    queryKey: "getCategoryProduction",
    queryFn: () => getCategoryProduction().then((res) => res.data),
  });

  const { data: categoriesArr = [{}], isLoading: categoryLoading } = useQuery({
    queryKey: "getCategories",
    queryFn: () => getCategories().then((res) => res.data),
  });

  const { data: users = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateCategoryProduction,
    onSuccess() {
      queryClient.invalidateQueries("getCategoryProduction");
      setAlert({
        message: "CategoryProduction წარმატებით შეიცვალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
    onError() {},
  });

  const categories = categoriesArr.map((cat) => ({
    ...cat,
    id: cat.catID,
    name: cat.categoryName,
  }));

  const updatedList = filterArray(categoryProduction, removeEmpty(filter))?.map(
    (catProduction) => {
      return {
        ...catProduction,
        agentID: idToName(users, catProduction.agentID),
        catID: idToName(categories, catProduction.catID),
        status: statusBadge(catProduction.status),
      };
    }
  );

  const selectOptions = {
    agentID: users,
    catID: categories,
    status: [
      { id: 1, name: "აქტიური" },
      { id: 0, name: "არააქტიური" },
    ],
  };

  const activationHandler = (id) => {
    const category = categoryProduction.find((c) => c.id === id);
    updateMutate({ ...category, status: category.status === 1 ? 0 : 1 });
  };

  const isActive = (id) =>
    categoryProduction.find((c) => c.id === id)?.status === 1 ? true : false;

  return {
    isLoading: isLoading || categoryLoading || usersLoading,
    updatedList,
    alert,
    filter,
    setFilter,
    selectOptions,
    activation: {
      isActive,
      activationHandler,
      updateLoading,
    },
  };
};
