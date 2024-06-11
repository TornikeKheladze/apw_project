import LoadingSpinner from "components/icons/LoadingSpinner";
import useServiceCategories from "./useServiceCategories";
import BilHeader from "../bilHeader/BilHeader";
import useCheckPermission from "helpers/useCheckPermission";
import ServiceCategoryTreeMenu from "./ServiceCategoryTreeMenu";

const ServiceCategories = () => {
  const { isLoading, categories, categoriesTree } = useServiceCategories();
  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={useCheckPermission("bil_categories_get")}
        text={"სერვისის კატეგორიები"}
        url={"/billing/service-categories/create"}
      />
      <div
        className={`card p-5 mb-4 w-full overflow-x-auto relative ${
          isLoading && "overflow-x-hidden"
        }`}
      >
        {isLoading && <LoadingSpinner blur />}
        <ServiceCategoryTreeMenu categories={categoriesTree} />
        {categories.length === 0 && !isLoading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
    </main>
  );
};

export default ServiceCategories;
