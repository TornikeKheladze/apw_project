import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";
import { serviceCategoriesArrr } from "../formArrays/formArrays";
import useServiceCategories from "./useServiceCategories";
import BilHeader from "../bilHeader/BilHeader";
import useCheckPermission from "helpers/useCheckPermission";

const ServiceCategories = () => {
  const { loading, deleteAndUpdate, serviceCategories } =
    useServiceCategories();
  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={useCheckPermission("bil_service_categories_add_post")}
        text={"სერვისის კატეგორიები"}
        url={"/billing/service-categories/create"}
      />
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          loading && "overflow-x-hidden"
        }`}
      >
        {loading && <LoadingSpinner blur />}

        <Table
          staticArr={serviceCategoriesArrr}
          fetchedArr={serviceCategories}
          deleteAndUpdate={deleteAndUpdate}
        />
        {serviceCategories.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
    </main>
  );
};

export default ServiceCategories;
