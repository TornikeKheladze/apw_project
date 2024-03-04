import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addOurError, editOurError, getOurErrorById } from "services/errorList";

const useOurErrorListForm = () => {
  const dispatch = useDispatch();
  const { action, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (action === "edit") {
        const res = await getOurErrorById(id);
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
        await addOurError(data);
        setSuccessMessage("ერორი წარმატებით დაემატა");
      } else {
        await editOurError(data, id);
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

  return { successMessage, action, loading, submitHandler, actionLoading };
};
export default useOurErrorListForm;
