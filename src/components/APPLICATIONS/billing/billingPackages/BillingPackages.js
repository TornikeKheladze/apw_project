import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import BilHeader from "../bilHeader/BilHeader";
import Alert from "components/Alert";
import { useBillingPackages } from "./useBillingPackages";
import { billingPackageArr } from "../formArrays/serviceArr";

const BillingPackages = () => {
  const {
    loading,
    alert,
    packages,
    setFilter,
    filter,
    selectOptions,
    updatedList,
    deleteItem,
  } = useBillingPackages();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={true}
        text={"ტრანზაქციის პაკეტები"}
        url={"/billing/packages/create"}
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
            staticArr={billingPackageArr}
            fetchedArr={updatedList}
            optionsObj={selectOptions}
            actions={{ edit: true, delete: deleteItem }}
          />
        )}

        {packages.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default BillingPackages;
