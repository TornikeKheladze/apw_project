import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import ServiceCategoryTreeMenu from "../../serviceCategories/ServiceCategoryTreeMenu";
import { buildCategoryTree } from "helpers/treeMenuBuilder";
import { useTransactionByCat } from "./useTransactionByCat";

const TransactionByCat = () => {
  const {
    submitHandler,
    categories,
    alert,
    isLoading,
    actionLoading,
    chosenCategory,
    setChosenCategory,
    formFields,
    selectOptions,
  } = useTransactionByCat();

  return (
    <main className="workspace p-5">
      <Alert dismissable color={alert.type} message={alert.message} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3 text-base text-primary-500">
          ტრანზაქციის გატარება კატეროგიის მიხედვით
        </h3>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center relative">
            <LoadingSpinner blur />
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
              optionsObj={selectOptions}
              submitHandler={submitHandler}
              formArray={formFields.filter((item) => item.name !== "serviceID")}
              isLoading={actionLoading}
              updateDataObj={null}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default TransactionByCat;
