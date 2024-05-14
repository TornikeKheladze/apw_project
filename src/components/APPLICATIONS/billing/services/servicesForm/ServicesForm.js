import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import useServicesForm from "./useServicesForm";
import GeneralForm from "../../generalForm/GeneralForm";
import { serviceArr } from "../../formArrays/serviceArr";

const ServicesForm = () => {
  const {
    action,
    submitHandler,
    categories,
    alert,
    service = {},
    isLoading,
    actionLoading,
  } = useServicesForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          სერვისის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center relative">
            <LoadingSpinner blur />
          </div>
        ) : (
          <GeneralForm
            optionsObj={{
              categoryID: categories,
              active: [
                { name: "არააქტიური", id: 0 },
                { name: "აქტიური", id: 1 },
              ],
            }}
            submitHandler={submitHandler}
            formArray={serviceArr.filter(
              (service) => service.name !== "ownerID"
            )}
            isLoading={actionLoading}
            updateDataObj={action === "edit" ? service : null}
          />
        )}
      </div>
    </main>
  );
};

export default ServicesForm;
