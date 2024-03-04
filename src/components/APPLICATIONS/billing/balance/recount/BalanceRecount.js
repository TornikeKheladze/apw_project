import { useEffect, useState } from "react";
import { recountArr } from "../../formArrays/formArrays";
import GeneralForm from "../../generalForm/GeneralForm";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "services/customers";
import { getCurrencies } from "services/services";
import { saveCustomers } from "reducers/CustomerReducer";
import { saveCurrencies } from "reducers/CurrencyReducer";
import { balanceRecount } from "services/balanceHistory";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Alert from "components/Alert";

const BalanceRecount = () => {
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const allcustomers = useSelector((state) => state.customer.customers);
  const currencies = useSelector((state) => state.currency.currencies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        const customers = await getCustomers();
        const currencies = await getCurrencies();

        dispatch(saveCustomers(customers.data));
        dispatch(saveCurrencies(currencies.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const submitHandler = async (data) => {
    try {
      setActionLoading(true);
      await balanceRecount(data);
      setActionLoading(false);
      setSuccessMessage(`ბალანსის გადათვლა წარმატებულია`);
      localStorage.removeItem("formInputData");
      setTimeout(() => {
        setSuccessMessage("");
        navigate(-1);
      }, 2500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="workspace p-5">
      <h3 className="mb-10">ბალანსის გადათვლა</h3>
      {loading && <LoadingSpinner blur />}
      <Alert color="success" dismissable message={successMessage} />

      <div className="card p-5">
        <GeneralForm
          optionsObj={{
            currency_id: currencies,
            customer_id: allcustomers,
          }}
          formArray={recountArr}
          submitHandler={submitHandler}
          isLoading={actionLoading}
        />
      </div>
    </main>
  );
};

export default BalanceRecount;
