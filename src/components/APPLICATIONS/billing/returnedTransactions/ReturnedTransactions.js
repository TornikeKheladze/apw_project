import Table from "../table/Table";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Pagination from "components/Pagination";
import { useReturnedTransactions } from "./useReturnedTransactions";
import { returnedTransactionsArr } from "../formArrays/returnedTransactionsArr";

const ReturnedTransactions = () => {
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
  } = useReturnedTransactions();

  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="flex justify-between mb-5 lg:items-center items-start flex-col lg:flex-row text-xs lg:text-sm gap-4">
        <h3>დაბრუნებული ტრანზაქციები</h3>
      </div>
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          (loading || actionLoading) && "overflow-x-hidden"
        }`}
      >
        {actionLoading && <LoadingSpinner blur />}
        {loading && <LoadingSpinner blur />}

        <Table
          excelExporFunc={fetchAllTransactions}
          searchSubmit={filterHandler}
          staticArr={returnedTransactionsArr}
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
          }}
        />
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

export default ReturnedTransactions;
