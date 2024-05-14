import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { useServiceProductionForm } from "./useServiceProductionForm";
import { serviceProductionArr } from "../../formArrays/serviceArr";

const ServiceProductionForm = () => {
  const {
    action,
    submitHandler,
    services,
    alert,
    serviceProduction = {},
    isLoading,
    actionLoading,
    users,
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
              agentID: users,
              ownerID: users,
              status: [
                { name: "არააქტიური", id: 0 },
                { name: "აქტიური", id: 1 },
              ],
            }}
            submitHandler={submitHandler}
            formArray={serviceProductionArr.filter(
              (item) => item.name !== "usedTransactionQuantity"
            )}
            isLoading={actionLoading}
            updateDataObj={action === "edit" ? serviceProduction : null}
          />
        )}
      </div>
    </main>
  );
};

export default ServiceProductionForm;
