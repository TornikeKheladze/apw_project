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
    actionLoading,
    alert,
    types,
    serviceParameter,
    service,
  } = useServiceParametersForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">სერვისი:"{service.name}"</h3>
        <h4 className="mb-3">
          სერვისის პარამეტრის {action === "create" ? "დამატება" : "შეცვლა"}
        </h4>
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
                  name: type.parameterPlaceholder,
                };
              }),
              // serviceID: services.map((service) => {
              //   return {
              //     ...service,
              //     id: service.serviceID,
              //   };
              // }),
            }}
            updateDataObj={action === "edit" ? serviceParameter : null}
            formArray={serviceParametersArr.filter(
              (p) => p.name !== "catID" && p.name !== "serviceID"
            )}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default ServiceParametersForm;
