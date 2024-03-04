import { useNavigate, useParams } from "react-router-dom";
import { addBalanceArr } from "../../formArrays/formArrays";
import GeneralForm from "../../generalForm/GeneralForm";
import { balanceAction } from "services/balanceHistory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies } from "services/services";
import { saveCurrencies } from "reducers/CurrencyReducer";
import { filterCustomersWithoutPage } from "services/customers";
import { saveCustomers } from "reducers/CustomerReducer";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Alert from "components/Alert";
import { convertDate } from "helpers/convertDate";

const AddBalance = () => {
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { currencies } = useSelector((store) => store.currency);
  const { customers } = useSelector((store) => store.customer);
  const { action } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const cur = await getCurrencies();
        const cust = await filterCustomersWithoutPage({});
        dispatch(saveCustomers(cust.data));
        dispatch(saveCurrencies(cur.data));
        setLoading(false);
      } catch (error) {}
    };
    fetchInitialData();
  }, [dispatch]);

  const submitHandler = async (data) => {
    try {
      let type_id = 0;
      if (action === "add") type_id = 7;
      if (action === "subtract") type_id = 8;
      setActionLoading(true);
      await balanceAction({
        ...data,
        type_id,
        created_at: convertDate(data.created_at),
      });
      setActionLoading(false);
      setSuccessMessage(
        `ბალანსი წარმატებით ${action === "add" ? "დაემატა" : "მოაკლდა"} `
      );
      localStorage.removeItem("formInputData");
      setTimeout(() => {
        setSuccessMessage("");
        navigate(-1);
      }, 2500);
    } catch (error) {
      console.log(error);
      setActionLoading(false);
    }
  };

  const addOrSubtractArr = addBalanceArr.filter((item) => {
    if (action === "add") {
      return item.name !== "debt";
    } else {
      return item.name !== "credit";
    }
  });
  return (
    <main className="workspace p-5">
      <h3 className="mb-10">
        ბალანსის {action === "add" ? "დამატება" : "მოკლება"}
      </h3>

      {loading && <LoadingSpinner blur />}
      <Alert color="success" dismissable message={successMessage} />

      <div className="card p-5">
        <GeneralForm
          optionsObj={{
            currency_id: currencies,
            customer_id: customers,
          }}
          formArray={addOrSubtractArr}
          submitHandler={submitHandler}
          isLoading={actionLoading}
        />
      </div>
    </main>
  );
};

export default AddBalance;
