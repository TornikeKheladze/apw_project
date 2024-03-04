import Table from "../table/Table";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Pagination from "components/Pagination";
import { useTransactions } from "./useTransactions";

const Transactions = () => {
  const {
    customers,
    services,
    updatedTransactionsList,
    sortConfig,
    loading,
    actionLoading,
    currentPage,
    setCurrentPage,
    totalSize,
    filterHandler,
    sortHandler,
    sumData,
    fetchAllTransactions,
    columnsWithpermissions,
    currencies,
  } = useTransactions();

  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="flex justify-between mb-5 lg:items-center items-start flex-col lg:flex-row text-xs lg:text-sm gap-4">
        <h3>ტრანზაქციები</h3>
        <div className="flex lg:gap-4 gap-2 items-center flex-wrap lg:flex-nowrap">
          <div className="bg-primary p-2 w-full sm:w-auto text-white rounded-lg">
            მიღებული თანხა:{" "}
            {sumData?.all?.length > 0 && sumData?.all[0]?.total_amount}
          </div>
          <div className="bg-primary p-2 w-full sm:w-auto text-white rounded-lg">
            დაგენერირებული თანხა:{" "}
            {sumData?.all?.length > 0 && sumData?.all[0]?.total_amount}
          </div>
          <div className="bg-primary p-2 w-full sm:w-auto text-white rounded-lg">
            გაფილტრული მოგების ჯამი:{" "}
            {sumData?.all?.length > 0 && sumData?.all[0]?.our_profit}
          </div>
        </div>
      </div>
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          (loading || actionLoading) && ""
        }`}
      >
        {actionLoading && <LoadingSpinner blur />}
        {loading && <LoadingSpinner blur />}

        {columnsWithpermissions.length ? (
          <Table
            excelExporFunc={fetchAllTransactions}
            searchSubmit={filterHandler}
            staticArr={columnsWithpermissions}
            fetchedArr={updatedTransactionsList}
            sortHandler={sortHandler}
            sortConfig={sortConfig}
            optionsObj={{
              agent_id: customers?.filter(
                (customer) => customer.type === "agent"
              ),
              owner_id: customers?.filter(
                (customer) => customer.type === "owner"
              ),
              service_id: services,
              status_id: [
                { id: 1, name: "რეგისტრირებული" },
                { id: 2, name: "მუშავდება" },
                { id: 3, name: "წარმატებული" },
                { id: 4, name: "გაუქმებული" },
                { id: 5, name: "დაბრუნებული" },
              ],
              service_currency: currencies,
              agent_currency: currencies,
            }}
          />
        ) : (
          <></>
        )}
        {updatedTransactionsList.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      <div className="mt-5">
        <Pagination
          currentPage={currentPage}
          totalCount={totalSize}
          // დროებითი ფეიჯის ზომა
          pageSize={30}
          onPageChange={(page) => setCurrentPage(page)}
          // onPageSizeChange={(size) => setPageSize(size)}
        />
      </div>
    </main>
  );
};

export default Transactions;
