import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useServiceCategoriesForm } from "./useServiceCategoriesForm";
import GeneralForm from "../../generalForm/GeneralForm";
import { serviceCategoriesArrr } from "../../formArrays/formArrays";

const ServiceCategoriesForm = () => {
  const { successMessage, action, loading, submitHandler, actionLoading } =
    useServiceCategoriesForm();
  return (
    <main className="workspace p-5">
      <Alert dismissable color="success" message={successMessage} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          სერვისის კატეგორიის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            formArray={serviceCategoriesArrr}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default ServiceCategoriesForm;
