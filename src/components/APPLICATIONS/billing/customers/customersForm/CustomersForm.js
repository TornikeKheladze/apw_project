import Alert from "components/Alert";

import LoadingSpinner from "components/icons/LoadingSpinner";

import useCustomersForm from "./useCustomersForm";
import GeneralForm from "../../generalForm/GeneralForm";
import { customers } from "../../formArrays/formArrays";

const CustomersForm = () => {
  const {
    submitHandler,
    action,
    legalForms,
    loading,
    actionLoading,
    successMessage,
  } = useCustomersForm();

  return (
    <main className="workspace">
      <Alert dismissable color="success" message={successMessage} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto mb-5">
        <h3 className="mb-3">
          Customer-ს {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            optionsObj={{
              legal_form_id: legalForms,
              type: [
                { value: "owner", name: "ოვნერი" },
                { value: "agent", name: "აგენტი" },
              ],
            }}
            submitHandler={submitHandler}
            formArray={customers}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default CustomersForm;
