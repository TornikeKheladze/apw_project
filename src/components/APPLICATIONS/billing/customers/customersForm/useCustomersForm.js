import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveLegalForms } from "reducers/LegalFormReducer";
import { addCustomer, editCustomer, getCustomerById } from "services/customers";
import { getLegalForms } from "services/legalForms";

const useCustomersForm = () => {
  const dispatch = useDispatch();
  const { action, id } = useParams();
  const { legalForms } = useSelector((store) => store.legalForm);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (action === "edit") {
        const res = await getCustomerById(id);
        localStorage.setItem("formInputData", JSON.stringify(res.data));
      }
      const legalForms = await getLegalForms();
      dispatch(saveLegalForms(legalForms.data));
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
        await addCustomer(data);
        setSuccessMessage("Customer წარმატებით დაემატა");
      } else {
        await editCustomer({ ...data, id });
        setSuccessMessage("Customer წარმატებით შეიცვალა");
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
    submitHandler,
    action,
    legalForms,
    loading,
    actionLoading,
    successMessage,
  };
};

export default useCustomersForm;
