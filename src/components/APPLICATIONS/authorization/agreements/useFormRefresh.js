import { useEffect, useMemo } from "react";

export const useFormRefresh = ({
  setFormData,
  setValue,
  formData,
  selectedUserPackage,
  selectedService,
  setSelectedUserPackage,
  setSelectedService,
  isGovInfoFetched,
  defaultData,
}) => {
  // ფორმის ავტომატური შევსების ლოგიკა არი ამ ჰუკში
  const handleFormChange = (e) => {
    if (e.target.type !== "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const formInputData = useMemo(() => {
    if (defaultData) return defaultData;
    return localStorage.getItem("agreementForm")
      ? JSON.parse(localStorage.getItem("agreementForm"))
      : null;
  }, [defaultData]);

  useEffect(() => {
    if (formInputData && isGovInfoFetched) {
      for (const [key, value] of Object.entries(formInputData)) {
        setValue(key, value);
      }
    }
  }, [setValue, isGovInfoFetched, formInputData]);

  useEffect(() => {
    setFormData(formInputData || {});
  }, [setFormData, formInputData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("agreementForm", JSON.stringify(formData));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [formData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("userPackages", JSON.stringify(selectedUserPackage));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedUserPackage]);

  useEffect(() => {
    const packagesData = localStorage.getItem("userPackages");
    if (packagesData) {
      setSelectedUserPackage(JSON.parse(packagesData));
    }
  }, [setSelectedUserPackage]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("serviceChechbox", JSON.stringify(selectedService));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedService]);

  useEffect(() => {
    const servicesData = localStorage.getItem("serviceChechbox");
    if (servicesData) {
      setSelectedService(JSON.parse(servicesData));
    }
  }, [setSelectedService]);

  return {
    handleFormChange,
  };
};
