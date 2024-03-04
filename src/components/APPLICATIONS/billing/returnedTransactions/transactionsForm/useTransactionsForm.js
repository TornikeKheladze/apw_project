import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCustomers } from "reducers/CustomerReducer";
import { saveServices } from "reducers/ServiceReducer";
import { getCustomers } from "services/customers";
import { addTransaction, getServices } from "services/transactions";

export const useTransactionsForm = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customer);
  const { services } = useSelector((state) => state.service);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const customers = await getCustomers();
      const services = await getServices();

      dispatch(saveCustomers(customers.data));
      dispatch(saveServices(services.data));
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const submitHandler = async (data) => {
    setActionLoading(true);
    for (const key in data) {
      data[key] = +data[key];
    }
    const requestData = { ...data, execute_time: "2023-07-12 12:00:00" };
    await addTransaction(requestData);
    // localStorage.removeItem("formInputData");
    setSuccessMessage("ტრანზაქცია წარმატებით დაემატა");
    setTimeout(() => {
      setSuccessMessage("");
    }, 1500);
    setActionLoading(false);
    setTimeout(() => {
      navigate("/organizations");
    }, 1700);
  };

  return {
    customers,
    services,
    loading,
    actionLoading,
    successMessage,
    submitHandler,
  };
};
