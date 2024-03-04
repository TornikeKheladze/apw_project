import { convertBase64 } from "helpers/convertBase64";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useGeneralForm = (formArray) => {
  const [formData, setFormData] = useState({});
  const [imageForDisplay, setImageForDisplay] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
    if (localStorage.getItem("formInputData")) {
      formArray.forEach((field) => {
        setValue(
          field.name,
          JSON.parse(localStorage.getItem("formInputData"))[field.name]
        );
      });
    }
  }, [setValue, formArray]);

  return {
    register,
    handleSubmit,
    errors,
    formData,
    handleFormChange,
    setValue,
    imageForDisplay,
  };
};

export default useGeneralForm;
