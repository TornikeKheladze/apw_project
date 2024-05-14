import { useState } from "react";
import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";
import { getAllServices } from "services/services";
import { filterArray } from "helpers/filterArray";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deletePrice, getPrices } from "services/servicePrices";

const useServicePrices = () => {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [filter, setFilter] = useState({});

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => deletePrice(id),
    onSuccess: () => {
      queryClient.invalidateQueries("getPrices");
      setAlert({
        message: "სერვისის price წარმატებით წაიშალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const { data: pricesData = [], isLoading: pricesLoading } = useQuery({
    queryKey: "getPrices",
    queryFn: () => getPrices().then((res) => res.data),
  });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const prices = pricesData.map((price) => ({
    ...price,
    id: price.priceID,
  }));

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

  const updatedList = filterArray(prices, removeEmpty(filter))?.map(
    (serParams) => {
      return {
        ...serParams,
        serviceID: idToName(services, serParams.serviceID),
      };
    }
  );

  return {
    loading: pricesLoading || servicesLoading,
    services,
    alert,
    updatedList,
    filter,
    setFilter,
    deleteItem: { deleteMutate, deleteLoading },
  };
};

export default useServicePrices;
