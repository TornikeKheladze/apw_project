import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "services/serviceCategories";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { buildCategoryTree } from "helpers/treeMenuBuilder";
import { serviceCategoriesArr } from "../../formArrays/serviceArr";
import { getAllUsers } from "services/users";

export const useServiceCategoriesForm = () => {
  const { action, id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const ownerID = searchParams.get("ownerID");

  const [chosenCategory, setChosenCategory] = useState({});

  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });

  const mutateHandler = (response, message) => {
    if (response.data.message) {
      setAlert({
        message: `${message} ვერ მოხერხდა`,
        type: "danger",
      });
    } else {
      queryClient.invalidateQueries("getCategories");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        navigate("/billing/service-categories");
        queryClient.invalidateQueries(["getCategoryById", id]);
      }, 1500);
    }
  };

  const { data: categoriesArr = [{}], isLoading: categoriesLoading } = useQuery(
    {
      queryKey: "getCategories",
      queryFn: () => getCategories().then((res) => res.data),
    }
  );
  const { data: users = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  const categories = categoriesArr.map((cat) => {
    return { ...cat, name: cat.categoryName, id: cat.catID };
  });

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createCategory,
    onSuccess: (res) => {
      mutateHandler(res, "კატეგორიის დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: editLoading } = useMutation({
    mutationFn: updateCategory,
    onSuccess: (res) => {
      mutateHandler(res, "კატეგორიის ცვლილება");
    },
  });

  const {
    data: category = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: () => getCategoryById(id).then((res) => res.data),
    onSuccess: (data) => {
      setChosenCategory({
        ...data,
        id: data.catID,
        catID: category.parentID,
      });
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (action === "edit")
      setChosenCategory({
        id: category.parentID,
        catID: category.parentID,
      });
    return () => {
      if (action === "edit") {
        localStorage.removeItem("formInputData");
      }
    };
  }, [action, category.parentID]);

  const categoriesTree = buildCategoryTree(
    categories.filter((cat) => cat.catID !== +id)
  );

  const submitHandler = (data) => {
    const parentID = chosenCategory.catID || 0;

    if (action === "create") {
      createMutate({ ...data, ownerID, parentID, usedQuantity: 0 });
    } else {
      updateMutate({
        ownerID,
        ...data,
        catID: id,
        parentID,
        usedQuantity: category.usedQuantity,
      });
    }
  };

  const formFields = serviceCategoriesArr.filter(
    (item) =>
      item.name !== "usedQuantity" &&
      item.name !== "parentID" &&
      (!ownerID || item.name !== "ownerID")
  );

  return {
    alert,
    action,
    isLoading: isLoading || categoriesLoading || usersLoading,
    submitHandler,
    actionLoading: createLoading || editLoading,
    category,
    isFetching,
    categoriesTree,
    chosenCategory,
    setChosenCategory,
    formFields,
    users,
  };
};
