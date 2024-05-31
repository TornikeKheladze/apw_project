import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { useMakeTransaction } from "./useMakeTransaction";

const MakeTransaction = () => {
  const {
    submitHandler,
    alert,
    isLoading,
    actionLoading,
    formFields,
    selectOptions,
  } = useMakeTransaction();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">ტრანზაქციის გატარება</h3>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center relative">
            <LoadingSpinner blur />
          </div>
        ) : (
          <GeneralForm
            optionsObj={selectOptions}
            submitHandler={submitHandler}
            formArray={formFields}
            isLoading={actionLoading}
            updateDataObj={null}
          />
        )}
      </div>
    </main>
  );
};

export default MakeTransaction;
