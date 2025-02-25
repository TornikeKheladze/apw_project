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
import { getOrganizations } from "services/organizations";
import { useSelector } from "react-redux";

export const useServiceCategoriesForm = () => {
  const { action, id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { authorizedUser } = useSelector((store) => store.user);

  const ownerID = searchParams.get("ownerID");
  const parentID = searchParams.get("parentID") || 0;
  const catType = searchParams.get("catType");

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
  const {
    data: organizationData = { data: [], member: null, dga: [] },
    isLoading: orgLoading,
  } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data),
  });

  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data || [];

  const categories = categoriesArr
    .map((cat) => {
      return { ...cat, name: cat.categoryName, id: cat.catID };
    })
    .filter((cat) => +cat.catType === 0);

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createCategory,
    onSuccess: (res) => {
      mutateHandler(res, "კატალოგის დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: editLoading } = useMutation({
    mutationFn: updateCategory,
    onSuccess: (res) => {
      mutateHandler(res, "კატალოგის ცვლილება");
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
    // const parentID = chosenCategory.catID || 0;
    const obligations = data.obligations
      ? JSON.stringify(data.obligations.map((item) => item.name))
      : "";

    if (action === "create") {
      createMutate({
        // ownerID,
        ...data,
        parentID,
        ownerID: authorizedUser.oid,
        catType: data.catType || catType,
        usedQuantity: 0,
        obligations,
      });
    } else {
      updateMutate({
        ownerID,
        ...data,
        parentID: data.parentID || parentID,
        catID: id,
        usedQuantity: category.usedQuantity,
        obligations,
      });
    }
  };

  // const formFields = serviceCategoriesArr.filter(
  //   (item) =>
  //     item.name !== "usedQuantity" &&
  //     item.name !== "parentID" &&
  //     (!ownerID || item.name !== "ownerID") &&
  //     (!parentID || item.name !== "parentID") &&
  //     (!catType || item.name !== "catType")
  // );
  const formFields = serviceCategoriesArr.filter(
    (item) =>
      item.name !== "usedQuantity" &&
      item.name !== "parentID" &&
      item.name !== "ownerID" &&
      (!parentID || item.name !== "parentID") &&
      (!catType || item.name !== "catType")
  );

  return {
    alert,
    action,
    isLoading: isLoading || categoriesLoading || orgLoading,
    submitHandler,
    actionLoading: createLoading || editLoading,
    category,
    isFetching,
    categoriesTree,
    chosenCategory,
    setChosenCategory,
    formFields,
    organizations,
    catType,
  };
};
