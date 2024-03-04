import Table from "../table/Table";
import { customers } from "../formArrays/formArrays";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Pagination from "components/Pagination";
import BilHeader from "../bilHeader/BilHeader";
import { useCustomers } from "./useCustomers";
import useCheckPermission from "helpers/useCheckPermission";

const Customers = () => {
  const {
    legalForms,
    updatedCostumersList,
    sortConfig,
    loading,
    actionLoading,
    currentPage,
    setCurrentPage,
    totalSize,
    deleteAndUpdate,
    sortHandler,
    filterHandler,
    fetchAllCustomers,
  } = useCustomers();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={useCheckPermission("bil_customers_add_post")}
        text={"აგენტები და მომწოდებლები"}
        url={"/billing/customers/create"}
      />
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          (loading || actionLoading) && "overflow-x-hidden"
        }`}
      >
        {actionLoading && <LoadingSpinner blur />}
        {loading && <LoadingSpinner blur />}
        <Table
          excelExporFunc={fetchAllCustomers}
          deleteAndUpdate={deleteAndUpdate}
          searchSubmit={filterHandler}
          staticArr={customers}
          fetchedArr={updatedCostumersList}
          sortHandler={sortHandler}
          sortConfig={sortConfig}
          optionsObj={{
            legal_form_id: legalForms,
            online: [
              { id: 0, name: "გამორთულია" },
              { id: 1, name: "ჩართულია" },
            ],
            type: [
              { id: "owner", name: "მომწოდებელი" },
              { id: "agent", name: "აგენტი" },
            ],
          }}
        />
        {updatedCostumersList.length === 0 && !loading && (
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

export default Customers;
