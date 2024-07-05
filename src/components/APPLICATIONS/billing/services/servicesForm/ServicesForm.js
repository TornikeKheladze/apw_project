import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import useServicesForm from "./useServicesForm";
import GeneralForm from "../../generalForm/GeneralForm";
import ServiceCategoryTreeMenu from "../../serviceCategories/ServiceCategoryTreeMenu";
import { buildCategoryTree } from "helpers/treeMenuBuilder";

const ServicesForm = () => {
  const {
    action,
    submitHandler,
    categories,
    alert,
    service = {},
    isLoading,
    actionLoading,
    chosenCategory,
    setChosenCategory,
    formFields,
    organizations,
    categoryID,
  } = useServicesForm();

  return (
    <main className="workspace p-5">
      <Alert color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          სერვისის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center relative">
            <LoadingSpinner blur />
          </div>
        ) : (
          <>
            {!categoryID && (
              <>
                <p className="label mb-3">აირჩიეთ კატალოგი</p>
                <ServiceCategoryTreeMenu
                  categories={buildCategoryTree(categories)}
                  chosenItem={chosenCategory}
                  setChosenItem={setChosenCategory}
                />
              </>
            )}

            <GeneralForm
              optionsObj={{
                ownerID: organizations,
                active: [
                  { name: "არააქტიური", id: 0 },
                  { name: "აქტიური", id: 1 },
                ],
                applicantRegistrationApi: [
                  { name: "არა", id: 0, value: "0" },
                  { name: "დიახ", id: 1, value: "1" },
                ],
              }}
              submitHandler={submitHandler}
              formArray={formFields}
              isLoading={actionLoading}
              updateDataObj={action === "edit" ? service : null}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default ServicesForm;
