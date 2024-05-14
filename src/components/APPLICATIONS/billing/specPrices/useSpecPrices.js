import { useState } from "react";
import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";
import { getAllServices } from "services/services";
import { filterArray } from "helpers/filterArray";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteSpecPrice, getSpecPrices } from "services/servicePrices";
import { getAllUsers } from "services/users";

export const useSpecPrices = () => {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [filter, setFilter] = useState({});

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => deleteSpecPrice(id),
    onSuccess: () => {
      queryClient.invalidateQueries("getSpecPrices");
      setAlert({
        message: "spec price წარმატებით წაიშალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const { data: specPricesData = [], isLoading: specPricesLoading } = useQuery({
    queryKey: "getSpecPrices",
    queryFn: () => getSpecPrices().then((res) => res.data),
  });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });
  const { data: usersData = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res.data.users),
  });

  const specPrices = specPricesData.map((price) => ({
    ...price,
    id: price.priceID,
  }));

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));
  const users = usersData.map((user) => ({ ...user, id: user.user_id }));

  const updatedList = filterArray(specPrices, removeEmpty(filter))?.map(
    (serParams) => {
      return {
        ...serParams,
        serviceID: idToName(services, serParams.serviceID),
        agentID: idToName(users, serParams.agentID),
      };
    }
  );
  const selectOptions = {
    serviceID: services,
    agentID: users,
  };

  return {
    loading: specPricesLoading || servicesLoading || usersLoading,
    updatedList,
    alert,
    filter,
    setFilter,
    selectOptions,
    deleteItem: {
      deleteMutate,
      deleteLoading,
    },
  };
};
