import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { usePackageProductionForm } from "./usePackageProductionForm";

const PackageProductionForm = () => {
  const {
    action,
    loading,
    submitHandler,
    services,
    actionLoading,
    alert,
    packageProduction,
    packages,
    formFields,
    organizations,
  } = usePackageProductionForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          პაკეტის მიწოდების {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            optionsObj={{
              serviceID: services,
              packageID: packages,
              ownerID: organizations,
              agentID: organizations,
            }}
            updateDataObj={action === "edit" ? packageProduction : null}
            formArray={formFields}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default PackageProductionForm;
