import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAllServices } from "services/services";
import { useNavigate } from "react-router-dom";
import {
  createBillingPackage,
  getBillingPackageById,
  updateBillingPackage,
} from "services/billingPackages";

export const useBillingPackagesForm = () => {
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
      queryClient.invalidateQueries("getBillingPackages");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["getBillingPackageById", id]);
        navigate(-1);
      }, 1500);
    }
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createBillingPackage,
    onSuccess(data) {
      mutateHandler(data, "package დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateBillingPackage,
    onSuccess(data) {
      mutateHandler(data, "package ცვლილება");
    },
  });

  const {
    data: billingPackage = {},
    isLoading: packageLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getBillingPackageById", id],
    queryFn: () => getBillingPackageById(id).then((res) => res.data),
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
      createMutate({
        ...data,
      });
    } else {
      updateMutate({
        ...data,
        packageID: id,
      });
    }
  };

  return {
    action,
    loading: packageLoading || servicesLoading || isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    billingPackage,
    services,
  };
};
