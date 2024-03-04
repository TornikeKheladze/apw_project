import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";
import { currencyArr } from "../formArrays/formArrays";
import { useCurrency } from "./useCurrency";
import BilHeader from "../bilHeader/BilHeader";
import useCheckPermission from "helpers/useCheckPermission";

const Currency = () => {
  const { loading, currencies, deleteAndUpdate } = useCurrency();
  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={useCheckPermission("bil_currency_add_post")}
        text={"ვალუტა"}
        url={"/billing/currency/create"}
      />
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          loading && "overflow-x-hidden"
        }`}
      >
        {loading && <LoadingSpinner blur />}

        <Table
          staticArr={currencyArr}
          fetchedArr={currencies}
          deleteAndUpdate={deleteAndUpdate}
        />
        {currencies.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
    </main>
  );
};

export default Currency;
