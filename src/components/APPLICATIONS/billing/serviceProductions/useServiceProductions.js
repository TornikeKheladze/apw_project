import { useState } from "react";
import { getAllServices } from "services/services";
import { useMutation, useQuery } from "react-query";
import { useQueryClient } from "react-query";
import {
  getServiceProduction,
  updateServiceProduction,
} from "services/serviceProduction";
import { idToName } from "helpers/idToName";
import { filterArray } from "helpers/filterArray";
import { removeEmpty } from "helpers/removeEmpty";
import { statusBadge } from "helpers/CheckStatusForBilling";
import { getOrganizations } from "services/organizations";

export const useServiceProductions = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState({});
  const [alert, setAlert] = useState({ message: "", type: "success" });

  const { data: productionsData = [{}], isLoading: productionsLoading } =
    useQuery({
      queryKey: "getServiceProduction",
      queryFn: () => getServiceProduction().then((res) => res.data),
    });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const { data: organizations = [{}], isLoading: orgLoading } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateServiceProduction,
    onSuccess: () => {
      queryClient.invalidateQueries("getServiceProduction");
      setAlert({
        message: "service production წარმატებით შეიცვალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

  const productions = productionsData.map((production) => ({
    ...production,
    id: production.serviceProductionID,
  }));

  const updatedArr = filterArray(productions, removeEmpty(filter))?.map(
    (sProd) => {
      return {
        ...sProd,
        ownerID: idToName(organizations, sProd.ownerID),
        agentID: idToName(organizations, sProd.agentID),
        serviceID: idToName(services, sProd.serviceID),
        status: statusBadge(sProd.status),
      };
    }
  );

  const selectOptions = {
    serviceID: services,
    ownerID: organizations,
    agentID: organizations,
    status: [
      { name: "არააქტიური", id: 0 },
      { name: "აქტიური", id: 1 },
    ],
  };
  const activationHandler = (id) => {
    const serviceProduction = productionsData.find(
      (s) => s.serviceProductionID === id
    );
    updateMutate({
      ...serviceProduction,
      status: serviceProduction.status === 1 ? 0 : 1,
    });
  };

  const isActive = (id) =>
    productionsData.find((s) => s.serviceProductionID === id)?.status === 1
      ? true
      : false;

  return {
    loading: servicesLoading || orgLoading || productionsLoading,
    alert,
    productions,
    selectOptions,
    updatedArr,
    filter,
    setFilter,
    activation: {
      isActive,
      activationHandler,
      updateLoading,
    },
  };
};
