import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAllServices } from "services/services";
import { useNavigate } from "react-router-dom";
import { createPrice, getPriceById, updatePrice } from "services/servicePrices";

export const useServicePricesForm = () => {
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
      queryClient.invalidateQueries("getPrices");
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
      mutateHandler(data, "სერვის prices დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updatePrice,
    onSuccess(data) {
      mutateHandler(data, "სერვის prices ცვლილება");
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
    loading: servicePriceLoading || servicesLoading || isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    servicePrice,
    services,
  };
};
