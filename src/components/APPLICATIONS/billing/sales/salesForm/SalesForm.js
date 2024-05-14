import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { salesArr } from "../../formArrays/serviceArr";
import { useSalesForm } from "./useSalesForm";

const SalesForm = () => {
  const {
    action,
    loading,
    submitHandler,
    services,
    actionLoading,
    alert,
    saleStatuses,
    sale,
  } = useSalesForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          sale {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            optionsObj={{
              saleStatusID: saleStatuses.map((type) => {
                return {
                  ...type,
                  id: type.saleStatusID,
                  name: type.saleStatusName,
                };
              }),
              serviceID: services.map((service) => {
                return {
                  ...service,
                  id: service.serviceID,
                };
              }),
              active: [
                { id: 1, name: "აქტიური" },
                { id: 0, name: "არააქტიური" },
              ],
            }}
            updateDataObj={action === "edit" ? sale : null}
            formArray={salesArr.filter((p) => p.name !== "catID")}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default SalesForm;
