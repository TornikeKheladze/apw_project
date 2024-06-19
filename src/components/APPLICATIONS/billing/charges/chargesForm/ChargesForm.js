import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { useChargesForm } from "./useChargesForm";
import { chargesArr } from "../../formArrays/serviceArr";
import ServiceCategoryTreeMenu from "../../serviceCategories/ServiceCategoryTreeMenu";
import { buildCategoryTree } from "helpers/treeMenuBuilder";

const ChargesForm = () => {
  const {
    action,
    loading,
    submitHandler,
    actionLoading,
    alert,
    categories,
    charge,
    chosenCategory,
    setChosenCategory,
  } = useChargesForm();

  return (
    <main className="workspace p-5">
      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          მოსაკრებლის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
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
              updateDataObj={action === "edit" ? charge : null}
              formArray={chargesArr.filter((item) => item.name !== "catID")}
              isLoading={actionLoading}
            />
          </>
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default ChargesForm;
