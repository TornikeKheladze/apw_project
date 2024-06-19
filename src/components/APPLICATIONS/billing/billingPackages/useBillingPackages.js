import { useState } from "react";
import { getAllServices } from "services/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteBillingPackage,
  getBillingPackages,
} from "services/billingPackages";
import { filterArray } from "helpers/filterArray";
import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";

export const useBillingPackages = () => {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [filter, setFilter] = useState({});

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => deleteBillingPackage(id),
    onSuccess: () => {
      queryClient.invalidateQueries("getBillingPackages");
      setAlert({
        message: "ტრანზაქციის პაკეტი წარმატებით წაიშალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const { data: packages = [], isLoading: packageLoading } = useQuery({
    queryKey: "getBillingPackages",
    queryFn: () => getBillingPackages().then((res) => res.data),
  });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

  const updatedList = filterArray(packages, removeEmpty(filter))?.map(
    (serParams) => {
      return {
        ...serParams,
        id: serParams.packageID,
        serviceID: idToName(services, serParams.serviceID),
      };
    }
  );

  const selectOptions = {
    serviceID: services,
  };

  return {
    loading: packageLoading || servicesLoading,
    alert,
    packages,
    filter,
    setFilter,
    services,
    updatedList,
    selectOptions,
    deleteItem: {
      deleteMutate,
      deleteLoading,
    },
  };
};
