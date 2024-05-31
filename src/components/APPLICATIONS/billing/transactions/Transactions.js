import Table from "../table/Table";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Pagination from "components/Pagination";
import { useTransactions } from "./useTransactions";
import { transactionArr } from "../formArrays/transactionArr";
import Button from "components/Button";
import { Link } from "react-router-dom";

const Transactions = () => {
  const {
    sortConfig,
    loading,
    filterHandler,
    sortHandler,
    fetchAllTransactions,
    transactionsData,
    searchParam,
    setSearchParam,
    transactionsLoading,
    actionLoading,
    filter,
    setFilter,
    updatedList,
    searchOptions,
  } = useTransactions();

  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="flex justify-between mb-5 lg:items-center items-start flex-col lg:flex-row text-xs lg:text-sm gap-4">
        <h3>ტრანზაქციები</h3>
        <div>
          <Link className="mr-2" to={"make-transaction"}>
            <Button className="p-1 text-xs">ტრანზაქციის გატარება</Button>
          </Link>
          <Link to={"make-transaction-by-cat"}>
            <Button className="p-1 text-xs">
              ტრანზაქციის გატარება კატეგორიის მიხედვით
            </Button>
          </Link>
        </div>
      </div>
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          loading && ""
        }`}
      >
        {actionLoading && <LoadingSpinner blur paginating />}
        {loading ? (
          <LoadingSpinner blur />
        ) : (
          <Table
            filter={{ filter, setFilter }}
            excelExporFunc={fetchAllTransactions}
            searchSubmit={filterHandler}
            staticArr={transactionArr}
            fetchedArr={updatedList}
            sortHandler={sortHandler}
            sortConfig={sortConfig}
            optionsObj={searchOptions}
            actions={{ details: true }}
          />
        )}

        {transactionsData.content.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      {!transactionsLoading && (
        <div className="mt-5">
          <Pagination
            currentPage={+searchParam.get("page") || 1}
            totalCount={transactionsData.totalElements}
            pageSize={transactionsData.size}
            onPageChange={(page) => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setSearchParam({ page });
            }}
            // onPageSizeChange={(size) => setPageSize(size)}
          />
        </div>
      )}
    </main>
  );
};

export default Transactions;
