import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import { serviceProductionsArr } from "../formArrays/formArrays";
import useServiceProduction from "./useServiceProduction";
import BilHeader from "../bilHeader/BilHeader";
import useCheckPermission from "helpers/useCheckPermission";

const ServiceProduction = () => {
  const {
    actionLoading,
    loading,
    deleteAndUpdate,
    filterHandler,
    updatedServiceProductionList,
    allServices,
    allcustomers,
  } = useServiceProduction();
  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={useCheckPermission("bil_service_production_add_post")}
        text={"Service Production"}
        url={"/billing/service-production/create"}
      />
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          (loading || actionLoading) && "overflow-x-hidden"
        }`}
      >
        {actionLoading && <LoadingSpinner blur />}
        {loading && <LoadingSpinner blur />}
        <Table
          deleteAndUpdate={deleteAndUpdate}
          searchSubmit={filterHandler}
          staticArr={serviceProductionsArr}
          fetchedArr={updatedServiceProductionList}
          //   sortHandler={sortHandler}
          //   sortConfig={sortConfig}
          optionsObj={{
            service_id: allServices,
            agent_id: allcustomers?.filter(
              (customer) => customer.type === "agent"
            ),
            owner_id: allcustomers?.filter(
              (customer) => customer.type === "owner"
            ),
            status: [
              { id: 0, name: "გამორთულია" },
              { id: 1, name: "ჩართულია" },
            ],
          }}
        />
        {updatedServiceProductionList.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      {/* <div className="mt-5">
        <Pagination
          currentPage={currentPage}
          totalCount={totalSize}
          // დროებითი ფეიჯის ზომა
          pageSize={2}
          onPageChange={(page) => setCurrentPage(page)}
          // onPageSizeChange={(size) => setPageSize(size)}
        />
      </div> */}
    </main>
  );
};

export default ServiceProduction;
