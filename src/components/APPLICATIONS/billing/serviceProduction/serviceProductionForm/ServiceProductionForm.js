import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useServiceProductionForm } from "./useServiceProductionForm";
import GeneralForm from "../../generalForm/GeneralForm";
import { serviceProductionsArr } from "../../formArrays/formArrays";

const ServiceProductionForm = () => {
  const {
    successMessage,
    action,
    loading,
    submitHandler,
    customers,
    services,
    actionLoading,
  } = useServiceProductionForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color="success" message={successMessage} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          სერვისის Production {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            optionsObj={{
              agent_id: customers?.filter(
                (customer) => customer.type === "agent"
              ),
              owner_id: customers?.filter(
                (customer) => customer.type === "owner"
              ),
              service_id: services,
            }}
            formArray={serviceProductionsArr}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default ServiceProductionForm;
