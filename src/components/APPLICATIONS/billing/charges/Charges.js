import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import BilHeader from "../bilHeader/BilHeader";
import Alert from "components/Alert";
import { chargesArr } from "../formArrays/serviceArr";
import { useCharges } from "./useCharges";

const Charges = () => {
  const {
    loading,
    alert,
    updatedList,
    categories,
    filter,
    setFilter,
    deleteItem,
  } = useCharges();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={true}
        text={"charges"}
        url={"/billing/charges/create"}
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
            staticArr={chargesArr}
            fetchedArr={updatedList}
            optionsObj={{
              catID: categories,
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

export default Charges;
