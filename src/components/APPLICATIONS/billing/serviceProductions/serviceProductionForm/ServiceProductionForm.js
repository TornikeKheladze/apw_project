import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { useServiceProductionForm } from "./useServiceProductionForm";

const ServiceProductionForm = () => {
  const {
    action,
    submitHandler,
    services,
    alert,
    serviceProduction = {},
    isLoading,
    actionLoading,
    formFields,
    organizations,
  } = useServiceProductionForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          სერვისის production {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center relative">
            <LoadingSpinner blur />
          </div>
        ) : (
          <GeneralForm
            optionsObj={{
              serviceID: services,
              agentID: organizations,
              ownerID: organizations,
              status: [
                { name: "არააქტიური", id: 0 },
                { name: "აქტიური", id: 1 },
              ],
            }}
            submitHandler={submitHandler}
            formArray={formFields}
            isLoading={actionLoading}
            updateDataObj={action === "edit" ? serviceProduction : null}
          />
        )}
      </div>
    </main>
  );
};

export default ServiceProductionForm;
