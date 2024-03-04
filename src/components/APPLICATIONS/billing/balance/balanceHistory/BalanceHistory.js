import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../../table/Table";
import { filterBalanceHistory } from "services/balanceHistory";
import { balanceHistoryArr } from "../../formArrays/formArrays";
import { useBalanceHistory } from "./useBalanceHistory";

const BalanceHistory = () => {
  const {
    sum,
    loading,
    actionLoading,
    deleteAndUpdate,
    filterHandler,
    allcustomers,
    currencies,
    updatedBalanceHistoryList,
    balanceHistoryTypes,
  } = useBalanceHistory();

  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="flex justify-between mb-5 lg:items-center items-start flex-col lg:flex-row text-xs lg:text-sm gap-4">
        <h3>ბალანსის ისტორია</h3>
        <div className="flex lg:gap-4 gap-2 items-center flex-wrap lg:flex-nowrap">
          <div className="bg-primary p-2 w-full sm:w-auto text-white rounded-lg">
            ტრანზაქციების რაოდენობა:
            {sum.count}
          </div>
          <div className="bg-primary p-2 w-full sm:w-auto text-white rounded-lg">
            შემოსული თანხის ჯამი თანხა: {parseFloat(+sum.debt).toFixed(2)}
          </div>
          <div className="bg-primary p-2 w-full sm:w-auto text-white rounded-lg">
            გასული თანხის ჯამი: {parseFloat(+sum.credit).toFixed(2)}
          </div>
        </div>
      </div>
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          (loading || actionLoading) && "overflow-x-hidden"
        }`}
      >
        {actionLoading && <LoadingSpinner blur />}
        {loading && <LoadingSpinner blur />}

        <Table
          requestFunctionForExcel={filterBalanceHistory}
          deleteAndUpdate={deleteAndUpdate}
          searchSubmit={filterHandler}
          staticArr={balanceHistoryArr}
          fetchedArr={updatedBalanceHistoryList}
          optionsObj={{
            // customer_id: allcustomers?.filter(
            //   (customer) => customer.type === "agent"
            // ),
            type_id: balanceHistoryTypes,
            customer_id: allcustomers,
            currency_id: currencies,
          }}
        />
        {updatedBalanceHistoryList.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
    </main>
  );
};

export default BalanceHistory;
