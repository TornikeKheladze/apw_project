import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveCurrencies } from "reducers/CurrencyReducer";
import { saveCustomers } from "reducers/CustomerReducer";
import { saveServiceCategories } from "reducers/ServiceCategoryReducer";
import { getCustomers } from "services/customers";
import { getServiceCategories } from "services/serviceCategories";
import {
  addService,
  editService,
  getCurrencies,
  getServiceById,
} from "services/services";

const useServicesForm = () => {
  const dispatch = useDispatch();
  const { action, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const customers = useSelector((state) => state.customer.customers);
  const currencies = useSelector((state) => state.currency.currencies);
  const serviceCategories = useSelector(
    (state) => state.serviceCategory.serviceCategories
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (action === "edit") {
        const res = await getServiceById(id);
        localStorage.setItem("formInputData", JSON.stringify(res.data));
      }
      const customers = await getCustomers();
      const currencies = await getCurrencies();
      const serviceCategories = await getServiceCategories();
      dispatch(saveCustomers(customers.data));
      dispatch(saveCurrencies(currencies.data));
      dispatch(saveServiceCategories(serviceCategories.data));
      setLoading(false);
    };
    fetchData();

    return () => {
      if (action === "edit") {
        localStorage.removeItem("formInputData");
      }
    };
  }, [dispatch, action, id]);

  const submitHandler = async (data) => {
    const requestData = {
      ...data,
      image: JSON.parse(localStorage.getItem("formInputData"))?.image,
    };

    try {
      setActionLoading(true);
      if (action === "create") {
        const res = await addService(requestData);
        console.log(res);
        setSuccessMessage("სერვისი წარმატებით დაემატა");
      } else {
        await editService(requestData, id);
        setSuccessMessage("სერვისი წარმატებით შეიცვალა");
      }
      setActionLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setActionLoading(false);
      console.log(error);
    }
  };

  return {
    action,
    loading,
    actionLoading,
    successMessage,
    customers,
    currencies,
    serviceCategories,
    submitHandler,
  };
};

export default useServicesForm;
