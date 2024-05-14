import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createCategoryProduction,
  getCategories,
  getCategoryProductionById,
  updateCategoryProduction,
} from "services/serviceCategories";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllUsers } from "services/users";

export const useCategoryProductionForm = () => {
  const { action, id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries("getCategoryProduction");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["getCategoryProductionById", id]);
        navigate(-1);
      }, 1500);
    }
  };

  const { data: categoriesArr = [{}], isLoading: categoriesLoading } = useQuery(
    {
      queryKey: "getCategories",
      queryFn: () => getCategories().then((res) => res.data),
    }
  );

  const { data: usersData = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  const users = usersData.map((user) => ({ ...user, id: user.user_id }));

  const categories = categoriesArr.map((cat) => ({
    ...cat,
    name: cat.categoryName,
    id: cat.catID,
  }));

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createCategoryProduction,
    onSuccess: (res) => {
      mutateHandler(res, "categoryProduction დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: editLoading } = useMutation({
    mutationFn: updateCategoryProduction,
    onSuccess: (res) => {
      mutateHandler(res, "categoryProduction ცვლილება");
    },
  });

  const {
    data: categoryProduction = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getCategoryProductionById", id],
    queryFn: () => getCategoryProductionById(id).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
    staleTime: Infinity,
  });

  useEffect(() => {
    return () => {
      if (action === "edit") {
        localStorage.removeItem("formInputData");
      }
    };
  }, [action]);

  const submitHandler = (data) => {
    if (action === "create") {
      createMutate({ ...data, usedQuantity: 0 });
    } else {
      updateMutate({
        ...data,
        usedQuantity: categoryProduction.usedQuantity,
        id,
      });
    }
  };

  return {
    isLoading: isLoading || categoriesLoading || isFetching || usersLoading,
    actionLoading: createLoading || editLoading,
    alert,
    action,
    submitHandler,
    categoryProduction,
    categories,
    users,
  };
};
