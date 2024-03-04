import Alert from "components/Alert";

import LoadingSpinner from "components/icons/LoadingSpinner";

import useOwnerErrorListForm from "./useOwnerErrorListForm";
import GeneralForm from "components/APPLICATIONS/billing/generalForm/GeneralForm";
import { ownerErrorArr } from "components/APPLICATIONS/billing/formArrays/formArrays";

const OwnerErrorListForm = () => {
  const {
    successMessage,
    action,
    loading,
    submitHandler,
    customers,
    ourErrorList,
    actionLoading,
  } = useOwnerErrorListForm();
  return (
    <main className="workspace p-5">
      <Alert dismissable color="success" message={successMessage} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          ოვნერის ერორის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            formArray={ownerErrorArr}
            optionsObj={{
              owner_id: customers?.filter((c) => c.type === "owner"),
              our_error_id: ourErrorList,
            }}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default OwnerErrorListForm;
