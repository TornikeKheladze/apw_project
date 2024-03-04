import Alert from "components/Alert";
import useLegalFormsForm from "./useLegalFormsForm";
import GeneralForm from "../../generalForm/GeneralForm";
import { legalFormArr } from "../../formArrays/formArrays";
import LoadingSpinner from "components/icons/LoadingSpinner";

const LegalFormsForm = () => {
  const { action, actionLoading, loading, successMessage, submitHandler } =
    useLegalFormsForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color="success" message={successMessage} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          ლეგალური ფორმის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            formArray={legalFormArr}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default LegalFormsForm;
