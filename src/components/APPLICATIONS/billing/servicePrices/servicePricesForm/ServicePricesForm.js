import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { useServicePricesForm } from "./useServicePricesForm";
import { servicePricesArr } from "../../formArrays/serviceArr";

const ServicePricesForm = () => {
  const {
    action,
    loading,
    submitHandler,
    services,
    actionLoading,
    alert,
    servicePrice,
  } = useServicePricesForm();

  return (
    <main className="workspace p-5">
      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          სერვისის prices {action === "create" ? "დამატება" : "შეცვლა"}
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
            }}
            updateDataObj={action === "edit" ? servicePrice : null}
            formArray={servicePricesArr}
            isLoading={actionLoading}
          />
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default ServicePricesForm;
