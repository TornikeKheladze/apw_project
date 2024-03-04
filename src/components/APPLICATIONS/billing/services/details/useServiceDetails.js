import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCustomers } from "services/customers";
import { saveCustomers } from "reducers/CustomerReducer";
import { saveService } from "reducers/ServiceReducer";
import { getCurrencies, getServiceById } from "services/services";
import { saveServiceCategories } from "reducers/ServiceCategoryReducer";
import { saveCurrencies } from "reducers/CurrencyReducer";
import { idToName } from "helpers/idToName";
import { getServiceCategories } from "services/serviceCategories";

export const useServiceDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState({});

  const { service, services } = useSelector((store) => store.service);
  const { serviceCategories } = useSelector((store) => store.serviceCategory);
  const { currencies } = useSelector((store) => store.currency);
  const { customers } = useSelector((store) => store.customer);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const serv = await getServiceById(id);
        const cat = await getServiceCategories();
        const curr = await getCurrencies();
        const owners = await getCustomers();
        dispatch(saveService(serv.data));
        dispatch(saveServiceCategories(cat.data));
        dispatch(saveCurrencies(curr.data));
        dispatch(saveCustomers(owners.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (!services.find((t) => +t.id === +id)) {
      fetchInitialData();
    } else {
      dispatch(saveService(services.find((t) => +t.id === +id)));
    }
  }, [dispatch, id, services]);

  useEffect(() => {
    setUpdated({
      ...service,
      category_id: idToName(serviceCategories, service.category_id),
      owner_id: idToName(customers, service.owner_id),
      currency_id: idToName(currencies, service.currency_id),
    });
  }, [service, customers, serviceCategories, currencies]);

  return {
    loading,
    updated,
  };
};
