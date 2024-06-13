import { useState } from "react";
import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";
import { getAllServices } from "services/services";
import { filterArray } from "helpers/filterArray";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deletePrice, getPrices } from "services/servicePrices";
import { useSearchParams } from "react-router-dom";

const useServicePrices = () => {
  const queryClient = useQueryClient();
  const [searchParam] = useSearchParams();
  const serviceID = searchParam.get("serviceID");

  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [filter, setFilter] = useState({});

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => deletePrice(id),
    onSuccess: () => {
      queryClient.invalidateQueries("getPrices");
      setAlert({
        message: "სერვისის ფასი წარმატებით წაიშალა",
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

  // ვფილტრავ იმიტორო მხოლოდ ერთი სერვისის ფასი აჩვენოს
  const prices = pricesData
    .map((price) => ({
      ...price,
      id: price.priceID,
    }))
    .filter((price) => +price.serviceID === +serviceID);

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

  const service =
    services.find((service) => +service.serviceID === +serviceID) || {};

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
    service,
  };
};

export default useServicePrices;
