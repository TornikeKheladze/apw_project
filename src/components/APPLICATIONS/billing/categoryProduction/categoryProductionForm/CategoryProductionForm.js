import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { categoryProductionArr } from "../../formArrays/serviceArr";
import { useCategoryProductionForm } from "./useCategoryProductionForm";

const CategoryProductionForm = () => {
  const {
    actionLoading,
    isLoading,
    alert,
    action,
    submitHandler,
    categories,
    users,
    categoryProduction,
  } = useCategoryProductionForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          category production {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            formArray={categoryProductionArr.filter(
              (item) => item.name !== "usedQuantity"
            )}
            isLoading={actionLoading}
            updateDataObj={action === "edit" ? categoryProduction : null}
            optionsObj={{
              agentID: users,
              catID: categories,
              status: [
                { id: 1, name: "აქტიური" },
                { id: 0, name: "არააქტიური" },
              ],
            }}
          />
        )}
      </div>
    </main>
  );
};

export default CategoryProductionForm;
