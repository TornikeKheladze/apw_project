import { useState } from "react";
import { getAllServices } from "services/services";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getCategories } from "services/serviceCategories";
import {
  deleteSale,
  getSaleStatuses,
  getSales,
  updateSale,
} from "services/sales";
import { filterArray } from "helpers/filterArray";
import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";
import { statusBadge } from "helpers/CheckStatusForBilling";

export const useSales = () => {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [filter, setFilter] = useState({});

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => deleteSale(id),
    onSuccess: () => {
      queryClient.invalidateQueries("getSales");
      setAlert({
        message: "sale წარმატებით წაიშალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });
  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateSale,
    onSuccess: () => {
      queryClient.invalidateQueries("getSales");
      setAlert({
        message: "sale წარმატებით შეიცვალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const { data: salesData = [], isLoading: salesLoading } = useQuery({
    queryKey: "getSales",
    queryFn: () => getSales().then((res) => res.data),
  });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const { data: saleStatusesData = [{}], isLoading: saleStatusLoading } =
    useQuery({
      queryKey: "getSaleStatuses",
      queryFn: () => getSaleStatuses().then((res) => res.data),
    });

  const { data: categoriesArr = [{}], isLoading: categoriesLoading } = useQuery(
    {
      queryKey: "getCategories",
      queryFn: () => getCategories().then((res) => res.data),
    }
  );

  const sales = salesData.map((sale) => ({
    ...sale,
    id: sale.saleID,
  }));

  const categories = categoriesArr.map((category) => ({
    ...category,
    id: category.catID,
    name: category.categoryName,
  }));

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

  const saleStatuses = saleStatusesData.map((spt) => ({
    ...spt,
    id: spt.saleStatusID,
    name: spt.saleStatusName,
  }));

  const selectOptions = {
    catID: categories,
    serviceID: services,
    saleStatusID: saleStatuses,
    active: [
      { id: 1, name: "აქტიური" },
      { id: 0, name: "არააქტიური" },
    ],
  };

  const updatedList = filterArray(sales, removeEmpty(filter))?.map((sale) => {
    return {
      ...sale,
      catID: idToName(categories, sale.catID),
      saleStatusID: idToName(saleStatuses, sale.saleStatusID),
      serviceID: idToName(services, sale.serviceID),
      active: statusBadge(sale.active),
    };
  });

  const activationHandler = (id) => {
    const sale = salesData.find((s) => s.saleID === id);
    updateMutate({ ...sale, active: sale.active === 1 ? 0 : 1 });
  };

  const isActive = (id) =>
    salesData.find((s) => s.saleID === id)?.active === 1 ? true : false;

  return {
    loading:
      servicesLoading || categoriesLoading || saleStatusLoading || salesLoading,
    deleteItem: {
      deleteMutate,
      deleteLoading,
    },
    activation: {
      isActive,
      activationHandler,
      updateLoading,
    },
    alert,
    sales,
    filter,
    setFilter,
    selectOptions,
    updatedList,
  };
};
