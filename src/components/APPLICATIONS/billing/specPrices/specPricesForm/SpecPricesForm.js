import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { specPricesArr } from "../../formArrays/serviceArr";
import { useSpecPricesForm } from "./useSpecPricesForm";

const SpecPricesForm = () => {
  const {
    action,
    loading,
    submitHandler,
    services,
    actionLoading,
    alert,
    specPrice,
    users,
  } = useSpecPricesForm();

  return (
    <main className="workspace p-5">
      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          spec prices {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            optionsObj={{
              serviceID: services.map((service) => {
                return {
                  ...service,
                  id: service.serviceID,
                };
              }),
              agentID: users,
            }}
            updateDataObj={action === "edit" ? specPrice : null}
            formArray={specPricesArr}
            isLoading={actionLoading}
          />
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default SpecPricesForm;
