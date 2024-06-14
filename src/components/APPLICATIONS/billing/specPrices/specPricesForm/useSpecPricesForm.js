import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAllServices } from "services/services";
import { useNavigate } from "react-router-dom";
import {
  createSpecPrice,
  getSpecPriceById,
  updateSpecPrice,
} from "services/servicePrices";
import { getOrganizations } from "services/organizations";

export const useSpecPricesForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { action, id } = useParams();
  const [searchParam] = useSearchParams();

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

  const serviceID = searchParam.get("serviceID") || specPrice.serviceID;

  const service =
    services.find((service) => +service.serviceID === +serviceID) || {};

  const { data: organizations = [{}], isLoading: orgLoading } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });

  const submitHandler = (data) => {
    if (action === "create") {
      createMutate({ ...data, serviceID });
    } else {
      updateMutate({
        ...data,
        priceID: id,
        serviceID,
      });
    }
  };

  return {
    action,
    loading: specPriceLoading || servicesLoading || orgLoading || isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    specPrice,
    services,
    organizations,
    service,
  };
};
