import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";
import BilHeader from "../bilHeader/BilHeader";
import { salesArr } from "../formArrays/serviceArr";
import Alert from "components/Alert";
import { useSales } from "./useSales";
import SaleStatuses from "./SaleStatuses";

const Sales = () => {
  const {
    loading,
    alert,
    sales,
    filter,
    setFilter,
    selectOptions,
    updatedList,
    activation,
    deleteItem,
  } = useSales();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader visible={true} text={"sales"} url={"/billing/sales/create"} />
      <div
        className={`card p-5 w-full mb-4 overflow-x-auto relative min-h-[25rem] ${
          loading && "overflow-x-hidden"
        }`}
      >
        {loading ? (
          <LoadingSpinner blur />
        ) : (
          <Table
            filter={{ filter, setFilter }}
            staticArr={salesArr}
            fetchedArr={updatedList}
            optionsObj={selectOptions}
            actions={{
              edit: true,
              activation,
              delete: deleteItem,
            }}
          />
        )}

        {sales.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      <SaleStatuses />

      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default Sales;
