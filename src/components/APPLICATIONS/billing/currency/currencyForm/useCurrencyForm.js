const { useState, useEffect } = require("react");
const { useDispatch } = require("react-redux");
const { useParams } = require("react-router-dom");
const {
  getCurrencyById,
  addCurrency,
  editCurrency,
} = require("services/currency");

const useCurrencyForm = () => {
  const dispatch = useDispatch();
  const { action, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (action === "edit") {
        const res = await getCurrencyById(id);
        console.log(res);
        const specificDataForName = {
          ...res.data,
          name: res.data.currency_name,
        };
        console.log(specificDataForName);
        localStorage.setItem(
          "formInputData",
          JSON.stringify(specificDataForName)
        );
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
      currency_name: data.name,
      sort: 1,
    };

    try {
      setActionLoading(true);
      if (action === "create") {
        await addCurrency(requestData);
        setSuccessMessage("ვალუტა წარმატებით დაემატა");
      } else {
        await editCurrency(requestData, id);
        setSuccessMessage("სერვისი წარმატებით შეიცვალა");
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

export default useCurrencyForm;
