import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAllServices } from "services/services";
import { useNavigate } from "react-router-dom";
import {
  createSpecPrice,
  getSpecPriceById,
  updateSpecPrice,
} from "services/servicePrices";
import { getAllUsers } from "services/users";

export const useSpecPricesForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { action, id } = useParams();

  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  const mutateHandler = (response, message) => {
    if (response.data.message || response.data.error) {
      setAlert({
        message: `${message} ვერ მოხერხდა`,
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "danger",
        });
      }, 2500);
    } else {
      queryClient.invalidateQueries("getSpecPrices");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        navigate(-1);
        queryClient.invalidateQueries(["getSpecPriceById", id]);
      }, 1500);
    }
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createSpecPrice,
    onSuccess(data) {
      mutateHandler(data, "spec prices დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateSpecPrice,
    onSuccess(data) {
      mutateHandler(data, "spec prices ცვლილება");
    },
  });

  const {
    data: specPrice = {},
    isLoading: specPriceLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getSpecPriceById", id],
    queryFn: () => getSpecPriceById(id).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
    staleTime: Infinity,
  });

  const { data: services = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const { data: users = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res.data.users),
  });

  const submitHandler = (data) => {
    if (action === "create") {
      createMutate(data);
    } else {
      updateMutate({
        ...data,
        priceID: id,
      });
    }
  };

  return {
    action,
    loading: specPriceLoading || servicesLoading || usersLoading || isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    specPrice,
    services,
    users,
  };
};
