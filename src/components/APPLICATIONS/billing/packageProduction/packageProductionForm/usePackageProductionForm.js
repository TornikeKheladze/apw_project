import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAllServices } from "services/services";
import { useNavigate } from "react-router-dom";
import {
  createBillingPackageProduction,
  getBillingPackageProductionById,
  getBillingPackages,
  updateBillingPackageProduction,
} from "services/billingPackages";
import { packageProductionsArr } from "../../formArrays/serviceArr";
import { getOrganizations } from "services/organizations";

export const usePackageProductionForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { action, id } = useParams();
  const [searchParams] = useSearchParams();

  const ownerID = searchParams.get("ownerID");

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

  const { data: organizations = [{}], isLoading: orgLoading } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
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

  const submitHandler = (data) => {
    if (action === "create") {
      createMutate({
        ownerID,
        ...data,
        usedTransactionQuantity: 0,
      });
    } else {
      updateMutate({
        ownerID,
        ...data,
        usedTransactionQuantity: packageProduction.usedTransactionQuantity,
        packagesProductionID: id,
      });
    }
  };

  const formFields = packageProductionsArr.filter(
    (item) =>
      item.name !== "usedTransactionQuantity" &&
      (!ownerID || item.name !== "ownerID")
  );

  return {
    action,
    loading:
      packageLoading ||
      servicesLoading ||
      orgLoading ||
      packageProductionLoading ||
      isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    services,
    packageProduction,
    packages,
    organizations,
    formFields,
  };
};
