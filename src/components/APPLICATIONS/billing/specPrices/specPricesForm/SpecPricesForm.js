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
    actionLoading,
    alert,
    specPrice,
    users,
    service,
  } = useSpecPricesForm();

  return (
    <main className="workspace p-5">
      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">სერვისი:"{service.name}"</h3>
        <h4 className="mb-3">
          სპეც ფასის {action === "create" ? "დამატება" : "შეცვლა"}
        </h4>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            optionsObj={{
              // serviceID: services.map((service) => ({
              //   ...service,
              //   id: service.serviceID,
              // })),
              agentID: users,
            }}
            updateDataObj={action === "edit" ? specPrice : null}
            formArray={specPricesArr.filter(
              (item) => item.name !== "serviceID"
            )}
            isLoading={actionLoading}
          />
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default SpecPricesForm;
