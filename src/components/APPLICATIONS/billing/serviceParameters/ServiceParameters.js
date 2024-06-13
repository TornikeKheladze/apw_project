import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import BilHeader from "../bilHeader/BilHeader";
import useServiceParameters from "./useServiceParameters";
import { serviceParametersArr } from "../formArrays/serviceArr";
import Alert from "components/Alert";

const ServiceParameters = () => {
  const {
    loading,
    updatedList,
    alert,
    filter,
    setFilter,
    selectOptions,
    deleteItem,
    service,
  } = useServiceParameters();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={true}
        text={"სერვისის პარამეტრები"}
        url={`/billing/service-parameters/create?serviceID=${service.serviceID}`}
      />
      {service && <h4 className="mb-3">სერვისი: "{service.name}"</h4>}
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
            staticArr={serviceParametersArr}
            fetchedArr={updatedList}
            optionsObj={selectOptions}
            actions={{ edit: true, delete: deleteItem }}
          />
        )}

        {updatedList.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default ServiceParameters;
