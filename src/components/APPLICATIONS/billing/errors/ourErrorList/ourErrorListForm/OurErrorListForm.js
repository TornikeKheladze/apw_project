import Alert from "components/Alert";

import LoadingSpinner from "components/icons/LoadingSpinner";

import useOurErrorListForm from "./useOurErrorListForm";
import GeneralForm from "components/APPLICATIONS/billing/generalForm/GeneralForm";
import { ourErrorArr } from "components/APPLICATIONS/billing/formArrays/formArrays";

const OurErrorListForm = () => {
  const { successMessage, action, loading, submitHandler, actionLoading } =
    useOurErrorListForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color="success" message={successMessage} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          ჩვენი ერორის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            formArray={ourErrorArr}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default OurErrorListForm;
