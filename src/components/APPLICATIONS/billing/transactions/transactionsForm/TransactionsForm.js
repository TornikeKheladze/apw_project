import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";

import { useTransactionsForm } from "./useTransactionsForm";
import GeneralForm from "../../generalForm/GeneralForm";
import { transactions } from "../../formArrays/formArrays";

const TransactionsForm = () => {
  const {
    customers,
    services,
    loading,
    actionLoading,
    successMessage,
    submitHandler,
  } = useTransactionsForm();

  return (
    <main className="workspace lg:p-5 p-2">
      <div className="card p-5 lg:w-2/3 w-full mx-auto">
        <h3 className="text-primary mb-5">ტრანზაქციის დამატება</h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            optionsObj={{
              agent_id: customers?.filter(
                (customer) => customer.type === "agent"
              ),
              owner_id: customers?.filter(
                (customer) => customer.type === "owner"
              ),
              service_id: services,
              owner_operation_id: [{ name: "test", id: 1 }],
              agent_operation_id: [{ name: "test", id: 2 }],
            }}
            submitHandler={submitHandler}
            formArray={transactions}
            isLoading={actionLoading}
          />
        )}
      </div>
      <Alert message={successMessage} color="success" dismissable />
    </main>
  );
};

export default TransactionsForm;
