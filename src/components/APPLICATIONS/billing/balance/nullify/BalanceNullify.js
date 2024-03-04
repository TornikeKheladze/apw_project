import { useEffect, useState } from "react";
import { nullifyArr } from "../../formArrays/formArrays";
import GeneralForm from "../../generalForm/GeneralForm";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "services/customers";
import { saveCustomers } from "reducers/CustomerReducer";
import { balanceNullify } from "services/balanceHistory";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Alert from "components/Alert";
import { convertDate } from "helpers/convertDate";

const BalanceNullify = () => {
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const allcustomers = useSelector((state) => state.customer.customers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        const customers = await getCustomers();

        dispatch(saveCustomers(customers.data));
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
      await balanceNullify({ ...data, created_at: convertDate(new Date()) });
      setActionLoading(false);
      setSuccessMessage(`ბალანსი წარმატებით განულდა`);
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
      <h3 className="mb-10">ბალანსის განულება</h3>
      {loading && <LoadingSpinner blur />}
      <Alert color="success" dismissable message={successMessage} />

      <div className="card p-5">
        <GeneralForm
          optionsObj={{
            customer_id: allcustomers,
          }}
          formArray={nullifyArr}
          submitHandler={submitHandler}
          isLoading={actionLoading}
        />
      </div>
    </main>
  );
};

export default BalanceNullify;
