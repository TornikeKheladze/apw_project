import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { useBillingPackagesForm } from "./useBillingPackagesForm";
import { billingPackageArr } from "../../formArrays/serviceArr";

const BillingPackagesForm = () => {
  const {
    action,
    loading,
    submitHandler,
    services,
    actionLoading,
    alert,
    billingPackage,
  } = useBillingPackagesForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          ტრანზაქციის პაკეტის {action === "create" ? "დამატება" : "შეცვლა"}
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
            updateDataObj={action === "edit" ? billingPackage : null}
            formArray={billingPackageArr}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default BillingPackagesForm;
