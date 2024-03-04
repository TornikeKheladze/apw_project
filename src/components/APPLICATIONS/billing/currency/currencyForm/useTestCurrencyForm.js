import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { addCurrency, getCurrencyById } from "services/currency";

const useCurrencyForm = () => {
  const { action, id } = useParams();
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    return () => {
      if (action === "edit") {
        localStorage.removeItem("formInputData");
      }
    };
  }, [action]);

  const { isLoading: loading } = useQuery({
    queryKey: ["currency", id],
    queryFn: () => getCurrencyById(id),
    onSuccess: (data) => {
      const specificDataForName = {
        ...data.data,
        name: data.data.currency_name,
      };
      localStorage.setItem(
        "formInputData",
        JSON.stringify(specificDataForName)
      );
    },
  });

  const { mutate: addCurrencyMutation, isLoading: actionLoading } = useMutation(
    {
      mutationFn: addCurrency,
      onSuccess: () => {
        if (action === "create") {
          setSuccessMessage("ვალუტა წარმატებით დაემატა");
        } else {
          setSuccessMessage("ვალუტა წარმატებით შეიცვალა");
        }
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      },
    }
  );

  const submitHandler = (data) => {
    const requestData = {
      ...data,
      currency_name: data.name,
      sort: 1,
    };
    addCurrencyMutation(requestData);
  };

  return { successMessage, action, loading, submitHandler, actionLoading };
};

export default useCurrencyForm;
