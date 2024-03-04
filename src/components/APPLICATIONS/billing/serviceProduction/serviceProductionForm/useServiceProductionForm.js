import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveCustomers } from "reducers/CustomerReducer";
import { saveServices } from "reducers/ServiceReducer";
import { getCustomers } from "services/customers";
import {
  addServiceProduction,
  editServiceProduction,
  getServiceProductionById,
} from "services/serviceProduction";
import { getServices } from "services/transactions";

export const useServiceProductionForm = () => {
  const dispatch = useDispatch();
  const { action, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const { services } = useSelector((store) => store.service);
  const { customers } = useSelector((store) => store.customer);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (action === "edit") {
        const res = await getServiceProductionById(id);
        localStorage.setItem("formInputData", JSON.stringify(res.data));
      }
      const serv = await getServices();
      const cust = await getCustomers();
      dispatch(saveServices(serv.data));
      dispatch(saveCustomers(cust.data));
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
    try {
      setActionLoading(true);
      if (action === "create") {
        await addServiceProduction(data);
        setSuccessMessage("სერვის Production წარმატებით დაემატა");
      } else {
        await editServiceProduction(data, id);
        setSuccessMessage("სერვის Production წარმატებით შეიცვალა");
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
    successMessage,
    action,
    loading,
    submitHandler,
    customers,
    services,
    actionLoading,
  };
};
