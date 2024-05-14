import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAllServices } from "services/services";
import { useNavigate } from "react-router-dom";
import {
  createSale,
  getSaleById,
  getSaleStatuses,
  updateSale,
} from "services/sales";

export const useSalesForm = () => {
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
      queryClient.invalidateQueries("getSales");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["getSaleById", id]);
        navigate(-1);
      }, 1500);
    }
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createSale,
    onSuccess(data) {
      mutateHandler(data, "sale დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateSale,
    onSuccess(data) {
      mutateHandler(data, "sale ცვლილება");
    },
  });

  const {
    data: sale = {},
    isLoading: saleLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getSaleById", id],
    queryFn: () => getSaleById(id).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
    staleTime: Infinity,
  });

  const { data: saleStatuses = [{}], isLoading: saleStatusLoading } = useQuery({
    queryKey: "getSaleStatuses",
    queryFn: () => getSaleStatuses().then((res) => res.data),
  });

  const { data: services = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const submitHandler = (data) => {
    const service = services.find(
      (service) => +service.serviceID === +data.serviceID
    );
    if (action === "create") {
      createMutate({
        ...data,
        catID: service.categoryID,
      });
    } else {
      updateMutate({
        ...data,
        catID: service.categoryID,
        saleID: id,
      });
    }
  };

  return {
    action,
    loading: saleStatusLoading || servicesLoading || saleLoading || isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    saleStatuses,
    services,
    sale,
  };
};
