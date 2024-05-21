import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getServiceById,
  updateService,
  createService,
} from "services/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCategories } from "services/serviceCategories";

const useServicesForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { action, id } = useParams();

  const { authorizedUser } = useSelector((store) => store.user);
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
        queryClient.invalidateQueries(["getServiceById", id]);
        navigate(-1);
      }, 1500);
    }
  };

  const categories = categoriesData.map((cat) => {
    return { ...cat, name: cat.categoryName, id: cat.catID };
  });

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createService,
    onSuccess: (res) => {
      mutateHandler(res, "სერვისის დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: editLoading } = useMutation({
    mutationFn: updateService,
    onSuccess: (res) => {
      mutateHandler(res, "სერვისის ცვლილება");
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

  const submitHandler = async (data) => {
    const ownerID = authorizedUser.id;
    const requestData = {
      ...data,
      image: JSON.parse(localStorage.getItem("formInputData"))?.image,
      ownerID,
      categoryID: chosenCategory.id,
    };
    if (action === "create") {
      createMutate({ ...requestData });
    } else {
      updateMutate({ ...requestData, serviceID: id });
    }
  };

  return {
    action,
    submitHandler,
    categories,
    alert,
    service,
    isLoading: categoriesLoading || isLoading || isFetching,
    actionLoading: createLoading || editLoading,
    chosenCategory,
    setChosenCategory,
  };
};

export default useServicesForm;
