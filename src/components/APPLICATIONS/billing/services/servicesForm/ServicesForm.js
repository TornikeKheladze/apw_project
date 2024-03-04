import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import useServicesForm from "./useServicesForm";
import GeneralForm from "../../generalForm/GeneralForm";
import { servicesArr } from "../../formArrays/formArrays";

const ServicesForm = () => {
  const {
    action,
    loading,
    actionLoading,
    successMessage,
    customers,
    currencies,
    serviceCategories,
    submitHandler,
  } = useServicesForm();

  return (
    <main className="workspace p-5">
      <Alert dismissable color="success" message={successMessage} />

      <div className="card p-5 lg:w-2/3 lg:mx-auto">
        <h3 className="mb-3">
          სერვისის {action === "create" ? "დამატება" : "შეცვლა"}
        </h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : (
          <GeneralForm
            optionsObj={{
              owner_id: customers.filter(
                (customer) => customer.type === "owner"
              ),
              currency_id: currencies,
              category_id: serviceCategories,
              status: [
                { value: "active", name: "აქტიური" },
                { value: "inactive", name: "არააქტიური" },
              ],
            }}
            submitHandler={submitHandler}
            formArray={servicesArr}
            isLoading={actionLoading}
          />
        )}
      </div>
    </main>
  );
};

export default ServicesForm;
