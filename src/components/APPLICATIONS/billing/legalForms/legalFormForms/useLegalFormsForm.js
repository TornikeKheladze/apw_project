import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  addLegalForm,
  editLegalForm,
  getLegalFormById,
} from "services/legalForms";

const useLegalFormsForm = () => {
  const { action, id } = useParams();
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getLegalFormById(id);
      localStorage.setItem("formInputData", JSON.stringify(res.data));
      setLoading(false);
    };
    if (action === "edit") {
      fetchData();
    }

    return () => {
      if (action === "edit") {
        localStorage.removeItem("formInputData");
      }
    };
  }, [action, id]);

  const submitHandler = async (data) => {
    try {
      setActionLoading(true);
      if (action === "create") {
        await addLegalForm(data);
        setSuccessMessage("ლეგალური ფორმა წარმატებით დაემატა");
      } else {
        await editLegalForm(data, id);
        setSuccessMessage("ლეგალური ფორმა წარმატებით შეიცვალა");
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
    actionLoading,
    successMessage,
    submitHandler,
    loading,
  };
};

export default useLegalFormsForm;
