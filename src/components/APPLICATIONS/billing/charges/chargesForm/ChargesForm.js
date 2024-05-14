import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import GeneralForm from "../../generalForm/GeneralForm";
import { useChargesForm } from "./useChargesForm";
import { chargesArr } from "../../formArrays/serviceArr";

const ChargesForm = () => {
  const {
    action,
    loading,
    submitHandler,
    actionLoading,
    alert,
    categories,
    charge,
  } = useChargesForm();

  return (
    <main className="workspace p-5">
      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          charges {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            submitHandler={submitHandler}
            optionsObj={{
              catID: categories.map((cat) => {
                return { ...cat, name: cat.categoryName, id: cat.catID };
              }),
            }}
            updateDataObj={action === "edit" ? charge : null}
            formArray={chargesArr}
            isLoading={actionLoading}
          />
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default ChargesForm;
