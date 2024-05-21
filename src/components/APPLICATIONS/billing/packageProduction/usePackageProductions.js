import { useState } from "react";
import { getAllServices } from "services/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteBillingPackageProduction,
  getBillingPackages,
  getBillingPackagesProduction,
} from "services/billingPackages";
import { getAllUsers } from "services/users";
import { filterArray } from "helpers/filterArray";
import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";

export const usePackageProductions = () => {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [filter, setFilter] = useState({});

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => deleteBillingPackageProduction(id),
    onSuccess: () => {
      queryClient.invalidateQueries("getBillingPackagesProduction");
      setAlert({
        message: "package production წარმატებით წაიშალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const {
    data: packagesProductionsData = [],
    isLoading: packageProductionsLoading,
  } = useQuery({
    queryKey: "getBillingPackagesProduction",
    queryFn: () => getBillingPackagesProduction().then((res) => res.data),
  });

  const { data: packagesData = [], isLoading: packageLoading } = useQuery({
    queryKey: "getBillingPackages",
    queryFn: () => getBillingPackages().then((res) => res.data),
  });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const { data: users = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

  const packageProductions = packagesProductionsData.map((p) => ({
    ...p,
    id: p.packagesProductionID,
  }));

  const packages = packagesData.map((p) => ({
    ...p,
    id: p.packageID,
    name: `ფასი:${p.price}, რაოდენობა:${p.quantity}`,
  }));

  const updatedList = filterArray(packageProductions, removeEmpty(filter))?.map(
    (packageProduction) => ({
      ...packageProduction,
      id: packageProduction.packagesProductionID,
      serviceID: idToName(services, packageProduction.serviceID),
      packageID: idToName(packages, packageProduction.packageID),
      agentID: idToName(users, packageProduction.agentID),
      ownerID: idToName(users, packageProduction.ownerID),
    })
  );

  const searchOptions = {
    serviceID: services,
    packageID: packages,
    agentID: users,
    ownerID: users,
  };

  return {
    loading:
      packageLoading ||
      servicesLoading ||
      packageProductionsLoading ||
      usersLoading,
    deleteItem: {
      deleteMutate,
      deleteLoading,
    },
    alert,
    filter,
    setFilter,
    packageProductions,
    searchOptions,
    updatedList,
  };
};
