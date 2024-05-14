import { useState } from "react";
import { removeEmpty } from "helpers/removeEmpty";
import { getAllServices, updateService } from "services/services";
import { idToName } from "helpers/idToName";
import { filterArray } from "helpers/filterArray";
import { useMutation, useQuery } from "react-query";
import { getCategories } from "services/serviceCategories";
import { useQueryClient } from "react-query";
import { getAllUsers } from "services/users";
import { statusBadge } from "helpers/CheckStatusForBilling";

export const useServices = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState({});
  const [alert, setAlert] = useState({ message: "", type: "success" });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const { data: categoriesData = [{}], isLoading: categoriesLoading } =
    useQuery({
      queryKey: "getCategories",
      queryFn: () => getCategories().then((res) => res.data),
    });
  const { data: users = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: (id) => updateService(id),
    onSuccess: () => {
      queryClient.invalidateQueries("getAllServices");
      setAlert({ message: "სერვისი წარმატებით შეიცვალა", type: "success" });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

  const categories = categoriesData.map((category) => ({
    ...category,
    id: category.catID,
    name: category.categoryName,
  }));

  const updatedList = filterArray(services, removeEmpty(filter))?.map(
    (service) => {
      return {
        ...service,
        categoryID: idToName(categories, service.categoryID),
        ownerID: idToName(
          users.map((user) => ({ ...user, id: user.user_id })),
          service.ownerID
        ),
        active: statusBadge(service.active),
      };
    }
  );

  const activationHandler = (id) => {
    const service = services.find((service) => service.serviceID === id);
    updateMutate({ ...service, active: service.active === 1 ? 0 : 1 });
  };

  const isActive = (id) =>
    services.find((service) => service.serviceID === id)?.active === 1
      ? true
      : false;

  return {
    loading: servicesLoading || categoriesLoading || usersLoading,
    updatedList,
    activation: {
      activationHandler,
      updateLoading,
      isActive,
    },
    alert,
    categories,
    filter,
    setFilter,
  };
};
