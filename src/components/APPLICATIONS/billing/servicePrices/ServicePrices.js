import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import BilHeader from "../bilHeader/BilHeader";
import { servicePricesArr } from "../formArrays/serviceArr";
import Alert from "components/Alert";
import useServicePrices from "./useServicePrices";
import { Link } from "react-router-dom";

const ServicePrices = () => {
  const {
    loading,
    updatedList,
    services,
    alert,
    filter,
    setFilter,
    deleteItem,
    service,
  } = useServicePrices();

  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="card p-3 mb-3">
        <div className="flex gap-3 flex-wrap">
          <Link
            to={`/billing/services/details/${service.serviceID}`}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            სერვისის დეტალები
          </Link>
          <Link
            to={`/billing/service-parameters?serviceID=${service.serviceID}`}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            ტექნიკური პარამეტრები
          </Link>
          <Link
            to={`/billing/spec-prices?serviceID=${service.serviceID}`}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            სერვისის სპეც ფასები
          </Link>
        </div>
      </div>
      <BilHeader
        visible={true}
        text={"სერვისის ფასები"}
        url={`/billing/service-prices/create?serviceID=${service.serviceID}`}
      />
      <h4 className="mb-3">სერვისი: "{service.name}"</h4>
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
