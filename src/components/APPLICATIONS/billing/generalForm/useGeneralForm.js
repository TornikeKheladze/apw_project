import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";

const useGeneralForm = (formArray, updateDataObj) => {
  const [formData, setFormData] = useState({});

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: updateDataObj ? updateDataObj : {},
  });

  const serviceID = useWatch({
    control,
    name: "serviceID",
  });

  useEffect(() => {
    // only for make transactions
    if (serviceID && pathname === "/billing/transactions/make-transaction") {
      setSearchParams({ serviceID });
    }
  }, [serviceID, pathname, setSearchParams]);

  const handleFormChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setFormData(JSON.parse(localStorage.getItem("formInputData")) || {});
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("formInputData", JSON.stringify(formData));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [formData]);

  useEffect(() => {
    if (updateDataObj) {
      formArray.forEach((field) => {
        setValue(field.name, updateDataObj[field.name]);
      });
    } else if (localStorage.getItem("formInputData")) {
      formArray.forEach((field) => {
        if (field.name !== "tell")
          setValue(
            field.name,
            JSON.parse(localStorage.getItem("formInputData"))[field.name]
          );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDataObj]);

  return {
    register,
    handleSubmit,
    errors,
    formData,
    handleFormChange,
  };
};

export default useGeneralForm;
