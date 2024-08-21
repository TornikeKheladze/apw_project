import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAllServices } from "services/services";
import { useNavigate } from "react-router-dom";
import { createPrice, getPriceById, updatePrice } from "services/servicePrices";

export const useServicePricesForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
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
      queryClient.invalidateQueries("getPrices");
      localStorage.removeItem("formInputData");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        navigate(-1);
        queryClient.invalidateQueries(["getPriceById", id]);
      }, 1500);
    }
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createPrice,
    onSuccess(data) {
      mutateHandler(data, "სერვის ფასის დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updatePrice,
    onSuccess(data) {
      mutateHandler(data, "სერვის ფასის ცვლილება");
    },
  });

  const {
    data: servicePrice = {},
    isLoading: servicePriceLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getPriceById", id],
    queryFn: () => getPriceById(id).then((res) => res.data),
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

  const serviceID = searchParam.get("serviceID") || servicePrice.serviceID;

  const service =
    services.find((service) => +service.serviceID === +serviceID) || {};

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
    loading: servicePriceLoading || servicesLoading || isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    servicePrice,
    services,
    service,
  };
};
