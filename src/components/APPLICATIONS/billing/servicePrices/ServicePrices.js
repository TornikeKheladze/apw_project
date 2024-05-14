import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import BilHeader from "../bilHeader/BilHeader";
import { servicePricesArr } from "../formArrays/serviceArr";
import Alert from "components/Alert";
import useServicePrices from "./useServicePrices";

const ServicePrices = () => {
  const {
    loading,
    updatedList,
    services,
    alert,
    filter,
    setFilter,
    deleteItem,
  } = useServicePrices();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={true}
        text={"სერვისის prices"}
        url={"/billing/service-prices/create"}
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
            staticArr={servicePricesArr}
            fetchedArr={updatedList}
            optionsObj={{
              serviceID: services,
            }}
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

export default ServicePrices;
