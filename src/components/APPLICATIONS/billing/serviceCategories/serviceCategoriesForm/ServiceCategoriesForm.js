import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useServiceCategoriesForm } from "./useServiceCategoriesForm";
import GeneralForm from "../../generalForm/GeneralForm";
import ServiceCategoryTreeMenu from "../ServiceCategoryTreeMenu";

const ServiceCategoriesForm = () => {
  const {
    alert,
    action,
    submitHandler,
    actionLoading,
    isLoading,
    category,
    isFetching,
    categoriesTree,
    chosenCategory,
    setChosenCategory,
    formFields,
    organizations,
  } = useServiceCategoriesForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          სერვისის კატალოგის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {isLoading || isFetching ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <>
            <p className="label mb-3">აირჩიეთ parentID</p>
            <ServiceCategoryTreeMenu
              categories={categoriesTree}
              chosenItem={chosenCategory}
              setChosenItem={setChosenCategory}
            />
            <GeneralForm
              submitHandler={submitHandler}
              formArray={formFields}
              isLoading={actionLoading}
              updateDataObj={action === "edit" ? category : null}
              optionsObj={{
                ownerID: organizations,
                catType: [
                  { name: "noli", id: 0 },
                  { name: "erti", id: 1 },
                ],
              }}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default ServiceCategoriesForm;
