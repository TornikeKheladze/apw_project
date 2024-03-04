import Table from "../table/Table";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { servicesArr } from "../formArrays/formArrays";

import { useServices } from "./useServices";
import BilHeader from "../bilHeader/BilHeader";
import useCheckPermission from "helpers/useCheckPermission";

const Services = () => {
  const {
    loading,
    updatedList,
    serviceCategories,
    deleteAndUpdate,
    filterHandler,
    currencies,
    owners,
  } = useServices();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={useCheckPermission("bil_services_add_post")}
        text={"სერვისები"}
        url={"/billing/services/create"}
      />
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          loading && "overflow-x-hidden"
        }`}
      >
        {loading && <LoadingSpinner blur />}

        <Table
          searchSubmit={filterHandler}
          staticArr={servicesArr}
          fetchedArr={updatedList}
          deleteAndUpdate={deleteAndUpdate}
          optionsObj={{
            category_id: serviceCategories,
            currency_id: currencies,
            owner_id: owners,
          }}
        />
        {updatedList.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
    </main>
  );
};

export default Services;
