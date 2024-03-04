import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCustomers } from "reducers/CustomerReducer";
import { getCustomers } from "services/customers";
import { removeEmpty } from "helpers/removeEmpty";
import { deleteService, getCurrencies, getServices } from "services/services";
import { saveServices } from "reducers/ServiceReducer";

import { saveServiceCategories } from "reducers/ServiceCategoryReducer";
import { saveCurrencies } from "reducers/CurrencyReducer";
import { idToName } from "helpers/idToName";
import { getServiceCategories } from "services/serviceCategories";
import { filterArray } from "helpers/filterArray";
import { setFilter } from "reducers/FilterReducer";

export const useServices = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((store) => store.filter);
  const [loading, setLoading] = useState(false);
  // const [actionLoading, setActionLoading] = useState(false);
  const [updatedList, setUpdatedList] = useState([]);

  const { services } = useSelector((store) => store.service);
  const { serviceCategories } = useSelector((store) => store.serviceCategory);
  const { currencies } = useSelector((store) => store.currency);
  const { customers } = useSelector((store) => store.customer);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [owners, serv, cat, curr] = await Promise.all([
          getCustomers(),
          getServices(),
          getServiceCategories(),
          getCurrencies(),
        ]);
        dispatch(saveServices(serv.data.filter(({ active }) => active === 1)));
        dispatch(saveServiceCategories(cat.data));
        dispatch(saveCurrencies(curr.data));
        dispatch(saveCustomers(owners.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [dispatch]);

  const filterHandler = () => {
    // try {
    //   setActionLoading(true);
    //   const serv = await filterService(removeEmpty(filter));
    //   dispatch(saveServices(serv.data));
    //   setActionLoading(false);
    // } catch (error) {
    //   console.log(error);
    //   setActionLoading(false);
    // }
    // dispatch(setFilter({}));
  };
  useEffect(() => {
    const updated = filterArray(services, removeEmpty(filter))?.map(
      (service) => {
        return {
          ...service,
          category_id: idToName(serviceCategories, service.category_id),
          owner_id: idToName(customers, service.owner_id),
          currency_id: idToName(currencies, service.currency_id),
        };
      }
    );

    setUpdatedList(updated);
  }, [services, customers, serviceCategories, currencies, filter]);

  const deleteAndUpdate = async (id) => {
    await deleteService(id);
    setTimeout(() => {
      dispatch(saveServices(services.filter((service) => +service.id !== +id)));
    }, 1600);
  };

  useEffect(() => {
    return () => {
      dispatch(setFilter({}));
    };
  }, [dispatch]);

  return {
    loading,
    updatedList,
    serviceCategories,
    deleteAndUpdate,
    filterHandler,
    currencies,
    owners: customers.filter(({ type }) => type === "owner"),
  };
};
