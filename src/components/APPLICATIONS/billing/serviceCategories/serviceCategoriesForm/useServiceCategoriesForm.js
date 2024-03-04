import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addServiceCategory,
  editServiceCategory,
  getServiceCategoryById,
} from "services/serviceCategories";

export const useServiceCategoriesForm = () => {
  const dispatch = useDispatch();
  const { action, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (action === "edit") {
        const res = await getServiceCategoryById(id);
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
    const requestData = {
      ...data,
      sort: 1,
      image: JSON.parse(localStorage.getItem("formInputData"))?.image,
    };

    try {
      setActionLoading(true);
      if (action === "create") {
        await addServiceCategory(requestData);
        setSuccessMessage("წარმატებით დაემატა");
      } else {
        await editServiceCategory(requestData, id);
        setSuccessMessage("წარმატებით შეიცვალა");
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
