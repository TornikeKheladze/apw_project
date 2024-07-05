import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import BilHeader from "../bilHeader/BilHeader";
import Alert from "components/Alert";
import { useSpecPrices } from "./useSpecPrices";
import { specPricesArr } from "../formArrays/serviceArr";
import { Link } from "react-router-dom";

const SpecPrices = () => {
  const {
    loading,
    updatedList,
    alert,
    filter,
    setFilter,
    selectOptions,
    deleteItem,
    service,
  } = useSpecPrices();

  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="card p-3 mb-3">
        <div className="flex gap-2 flex-wrap">
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
            სერვისის პარამეტრები
          </Link>
          <Link
            to={`/billing/service-prices?serviceID=${service.serviceID}`}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            სერვისის ფასები
          </Link>
        </div>
      </div>
      <BilHeader
        visible={true}
        text={"სპეც ფასები"}
        url={`/billing/spec-prices/create?serviceID=${service.serviceID}`}
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
            staticArr={specPricesArr}
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

export default SpecPrices;
