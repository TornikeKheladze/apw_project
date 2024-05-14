import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { serviceParametersArr } from "../../formArrays/serviceArr";
import { useServiceParametersForm } from "./useServiceParametersForm";

const ServiceParametersForm = () => {
  const {
    action,
    loading,
    submitHandler,
    services,
    actionLoading,
    alert,
    types,
    serviceParameter,
  } = useServiceParametersForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          სერვისის პარამეტრის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            optionsObj={{
              parameterTypeID: types.map((type) => {
                return {
                  ...type,
                  id: type.serviceParameterTypeID,
                  name: type.parameterTypeName,
                };
              }),
              serviceID: services.map((service) => {
                return {
                  ...service,
                  id: service.serviceID,
                };
              }),
            }}
            updateDataObj={action === "edit" ? serviceParameter : null}
            formArray={serviceParametersArr.filter((p) => p.name !== "catID")}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default ServiceParametersForm;
