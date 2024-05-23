import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { useApiCredentialsForm } from "./useApiCredentialsForm";
import { apiCredentialsArr } from "../../formArrays/serviceArr";

const ApiCredentialsForm = () => {
  const {
    action,
    loading,
    submitHandler,
    actionLoading,
    alert,
    apiCredential,
  } = useApiCredentialsForm();

  return (
    <main className="workspace p-5">
      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          Api Credentials {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            updateDataObj={action === "edit" ? apiCredential : null}
            formArray={apiCredentialsArr}
            isLoading={actionLoading}
          />
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default ApiCredentialsForm;
