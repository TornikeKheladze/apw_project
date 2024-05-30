import { convertBase64 } from "helpers/convertBase64";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useGeneralForm = (formArray, updateDataObj) => {
  const [formData, setFormData] = useState({});
  const [imageForDisplay, setImageForDisplay] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    ...formObject
  } = useForm();

  const handleFormChange = async (e) => {
    if (e.target.type === "file") {
      const base = await convertBase64(e.target.files[0]);
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: base,
      }));
      setImageForDisplay(base);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
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
    setValue,
    imageForDisplay,
    formObject,
  };
};

export default useGeneralForm;
