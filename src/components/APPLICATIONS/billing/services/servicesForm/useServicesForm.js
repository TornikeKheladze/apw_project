import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getServiceById,
  updateService,
  createService,
} from "services/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCategories } from "services/serviceCategories";
import { serviceArr } from "../../formArrays/serviceArr";
import { getOrganizations } from "services/organizations";
import { useSelector } from "react-redux";

const useServicesForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { action, id } = useParams();
  const [searchParams] = useSearchParams();
  const { authorizedUser } = useSelector((store) => store.user);

  const ownerID = searchParams.get("ownerID");
  const categoryID = searchParams.get("categoryID");

  const [chosenCategory, setChosenCategory] = useState({});
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });

  const {
    data: service = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getServiceById", id],
    queryFn: () => getServiceById(id).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
    staleTime: Infinity,
  });

  const { data: categoriesData = [{}], isLoading: categoriesLoading } =
    useQuery({
      queryKey: "getCategories",
      queryFn: () => getCategories().then((res) => res.data),
    });
  const { data: organizations = [{}], isLoading: orgLoading } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });

  const mutateHandler = (response, message, serviceID) => {
    if (response.data.message) {
      setAlert({
        message: `${message} ვერ მოხერხდა`,
        type: "danger",
      });
    } else {
      queryClient.invalidateQueries("getAllServices");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["getServiceById", id]);
        navigate(`/billing/services/details/${serviceID}`);
      }, 1500);
    }
  };

  const categories = categoriesData.map((cat) => {
    return { ...cat, name: cat.categoryName, id: cat.catID };
  });

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createService,
    onSuccess: (res) => {
      mutateHandler(res, "სერვისის დამატება", res.data.serviceID);
    },
  });

  const { mutate: updateMutate, isLoading: editLoading } = useMutation({
    mutationFn: updateService,
    onSuccess: (res) => {
      mutateHandler(res, "სერვისის ცვლილება", res.data.serviceID);
    },
  });

  useEffect(() => {
    if (action === "edit")
      setChosenCategory({
        id: service.categoryID,
      });
    return () => {
      if (action === "edit") {
        localStorage.removeItem("formInputData");
      }
    };
  }, [action, id, service.categoryID]);

  useEffect(() => {
    if (categoryID) {
      setChosenCategory({
        id: +categoryID,
      });
    }
  }, [categoryID]);

  const submitHandler = async (data) => {
    const requestData = {
      ownerID,
      ...data,
      image: JSON.parse(localStorage.getItem("formInputData"))?.image,
      categoryID: chosenCategory.id,
      price: 0,
    };
    if (!chosenCategory.id) {
      setAlert({
        message: "აირჩიეთ კატალოგი",
        type: "danger",
      });
      return;
    }

    if (action === "create") {
      createMutate({ ...requestData, ownerID: authorizedUser.oid });
    } else {
      updateMutate({ ...requestData, serviceID: id });
    }
  };

  // const formFields = serviceArr.filter(
  //   (item) =>
  //     item.name !== "categoryID" && (!ownerID || item.name !== "ownerID")
  // );
  const formFields = serviceArr.filter(
    (item) => item.name !== "categoryID" && item.name !== "ownerID"
  );

  return {
    action,
    submitHandler,
    categories,
    organizations,
    alert,
    service,
    isLoading: categoriesLoading || isLoading || isFetching || orgLoading,
    actionLoading: createLoading || editLoading,
    chosenCategory,
    setChosenCategory,
    formFields,
    categoryID: categoryID,
  };
};

export default useServicesForm;
