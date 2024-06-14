import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { categoryProductionArr } from "../../formArrays/serviceArr";
import { useCategoryProductionForm } from "./useCategoryProductionForm";
import ServiceCategoryTreeMenu from "../../serviceCategories/ServiceCategoryTreeMenu";
import { buildCategoryTree } from "helpers/treeMenuBuilder";

const CategoryProductionForm = () => {
  const {
    actionLoading,
    isLoading,
    alert,
    action,
    submitHandler,
    categories,
    categoryProduction,
    chosenCategory,
    setChosenCategory,
    organizations,
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
          <>
            <p className="label mb-3">აირჩიეთ კატეგორია</p>
            <ServiceCategoryTreeMenu
              categories={buildCategoryTree(categories)}
              chosenItem={chosenCategory}
              setChosenItem={setChosenCategory}
            />
            <GeneralForm
              submitHandler={submitHandler}
              formArray={categoryProductionArr.filter(
                (item) => item.name !== "usedQuantity" && item.name !== "catID"
              )}
              isLoading={actionLoading}
              updateDataObj={action === "edit" ? categoryProduction : null}
              optionsObj={{
                agentID: organizations,
                status: [
                  { id: 1, name: "აქტიური" },
                  { id: 0, name: "არააქტიური" },
                ],
              }}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default CategoryProductionForm;
