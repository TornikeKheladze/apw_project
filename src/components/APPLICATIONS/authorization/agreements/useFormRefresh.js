import { useEffect } from "react";

export const useFormRefresh = ({
  setFormData,
  setValue,
  formData,
  selectedUserPackage,
  selectedService,
  setSelectedUserPackage,
  setSelectedService,
  isGovInfoFetched,
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

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedData = localStorage.getItem("agreementForm");
    if (savedData && isGovInfoFetched) {
      const parsedData = JSON.parse(savedData);
      for (const [key, value] of Object.entries(parsedData)) {
        setValue(key, value);
      }
    }
  }, [setValue, isGovInfoFetched]);

  useEffect(() => {
    setFormData(JSON.parse(localStorage.getItem("agreementForm")) || {});
  }, [setFormData]);

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
