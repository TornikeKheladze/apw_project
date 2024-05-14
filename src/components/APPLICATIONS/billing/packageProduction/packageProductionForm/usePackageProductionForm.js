import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAllServices } from "services/services";
import { useNavigate } from "react-router-dom";
import {
  createBillingPackageProduction,
  getBillingPackageProductionById,
  getBillingPackages,
  updateBillingPackageProduction,
} from "services/billingPackages";
import { getAllUsers } from "services/users";

export const usePackageProductionForm = () => {
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
      queryClient.invalidateQueries("getBillingPackagesProduction");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["getBillingPackageProductionById", id]);
        navigate(-1);
      }, 1500);
    }
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createBillingPackageProduction,
    onSuccess(data) {
      mutateHandler(data, "package production დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateBillingPackageProduction,
    onSuccess(data) {
      mutateHandler(data, "package production ცვლილება");
    },
  });

  const {
    data: packageProduction = {},
    isLoading: packageProductionLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getBillingPackageProductionById", id],
    queryFn: () => getBillingPackageProductionById(id).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
    staleTime: Infinity,
  });

  const { data: packagesData = [], isLoading: packageLoading } = useQuery({
    queryKey: "getBillingPackages",
    queryFn: () => getBillingPackages().then((res) => res.data),
  });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const { data: usersData = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

  const packages = packagesData.map((p) => ({
    ...p,
    id: p.packageID,
    name: `ფასი:${p.price}, რაოდენობა:${p.quantity}`,
  }));

  const users = usersData.map((user) => ({
    ...user,
    id: user.user_id,
  }));

  const submitHandler = (data) => {
    if (action === "create") {
      createMutate({
        ...data,
        usedTransactionQuantity: 0,
      });
    } else {
      updateMutate({
        ...data,
        usedTransactionQuantity: packageProduction.usedTransactionQuantity,
        packagesProductionID: id,
      });
    }
  };

  return {
    action,
    loading:
      packageLoading ||
      servicesLoading ||
      usersLoading ||
      packageProductionLoading ||
      isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    services,
    packageProduction,
    packages,
    users,
  };
};
