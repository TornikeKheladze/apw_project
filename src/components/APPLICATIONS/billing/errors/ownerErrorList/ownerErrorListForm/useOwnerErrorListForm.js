import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveCustomers } from "reducers/CustomerReducer";
import { saveOurErrorList } from "reducers/ErrorListReducer";
import { getCustomers } from "services/customers";
import {
  addOwnerError,
  editOwnerError,
  getOurErrorList,
  getOwnerErrorById,
} from "services/errorList";

const useOwnerErrorListForm = () => {
  const dispatch = useDispatch();
  const { action, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const { customers } = useSelector((store) => store.customer);
  const { ourErrorList } = useSelector((store) => store.errorList);

  useEffect(() => {
    const fetchData = async () => {
      const cust = await getCustomers();
      const ourErr = await getOurErrorList();
      dispatch(saveCustomers(cust.data));
      dispatch(saveOurErrorList(ourErr.data));
      setLoading(true);
      if (action === "edit") {
        const res = await getOwnerErrorById(id);
        localStorage.setItem("formInputData", JSON.stringify(res.data));
      }
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
        await addOwnerError(data);
        setSuccessMessage("ერორი წარმატებით დაემატა");
      } else {
        await editOwnerError(data, id);
        setSuccessMessage("ერორი წარმატებით შეიცვალა");
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
    ourErrorList,
    actionLoading,
  };
};
export default useOwnerErrorListForm;
