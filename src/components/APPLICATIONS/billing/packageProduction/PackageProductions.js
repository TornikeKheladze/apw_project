import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import BilHeader from "../bilHeader/BilHeader";
import Alert from "components/Alert";
import { usePackageProductions } from "./usePackageProductions";
import { packageProductionsArr } from "../formArrays/serviceArr";

const PackageProductions = () => {
  const {
    loading,
    alert,
    filter,
    setFilter,
    packageProductions,
    searchOptions,
    updatedList,
    deleteItem,
  } = usePackageProductions();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={true}
        text={"ტრანზაქციების პაკეტების მიწოდება"}
        url={"/billing/package-production/create"}
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
            staticArr={packageProductionsArr}
            fetchedArr={updatedList}
            optionsObj={searchOptions}
            actions={{ edit: true, delete: deleteItem }}
          />
        )}

        {packageProductions.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default PackageProductions;
