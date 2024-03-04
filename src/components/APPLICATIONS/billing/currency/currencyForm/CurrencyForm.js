import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import useCurrencyForm from "./useCurrencyForm";
import GeneralForm from "../../generalForm/GeneralForm";
import { currencyArr } from "../../formArrays/formArrays";

const CurrencyForm = () => {
  const { successMessage, action, loading, submitHandler, actionLoading } =
    useCurrencyForm();
  return (
    <main className="workspace p-5">
      <Alert dismissable color="success" message={successMessage} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          ვალუტის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            formArray={currencyArr}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default CurrencyForm;
