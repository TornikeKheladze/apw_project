import Table from "../table/Table";
import LoadingSpinner from "components/icons/LoadingSpinner";
import BilHeader from "../bilHeader/BilHeader";
import { serviceProductionArr } from "../formArrays/serviceArr";
import Alert from "components/Alert";
import { useServiceProductions } from "./useServiceProductions";

const ServiceProductions = () => {
  const {
    loading,
    alert,
    productions,
    selectOptions,
    updatedArr,
    filter,
    setFilter,
    activation,
  } = useServiceProductions();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={true}
        text={"service productions"}
        url={"/billing/service-productions/create"}
      />
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          loading && "overflow-x-hidden"
        }`}
      >
        {loading ? (
          <LoadingSpinner blur />
        ) : (
          <Table
            filter={{ filter, setFilter }}
            staticArr={serviceProductionArr}
            fetchedArr={updatedArr}
            optionsObj={selectOptions}
            actions={{ details: true, edit: true, activation }}
          />
        )}

        {productions.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default ServiceProductions;
