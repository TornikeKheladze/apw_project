import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";
import BilHeader from "../bilHeader/BilHeader";
import Alert from "components/Alert";
import { useCategoryProduction } from "./useCategoryProduction";
import { categoryProductionArr } from "../formArrays/serviceArr";

const CategoryProduction = () => {
  const {
    isLoading,
    updatedList,
    alert,
    filter,
    setFilter,
    selectOptions,
    activation,
  } = useCategoryProduction();
  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={true}
        text={"კატეგორიის მიწოდება"}
        url={"/billing/category-production/create"}
      />
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          isLoading && "overflow-x-hidden"
        }`}
      >
        {isLoading ? (
          <LoadingSpinner blur />
        ) : (
          <Table
            filter={{ filter, setFilter }}
            staticArr={categoryProductionArr}
            fetchedArr={updatedList}
            optionsObj={selectOptions}
            actions={{ details: true, edit: true, activation }}
          />
        )}

        {updatedList.length === 0 && !isLoading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default CategoryProduction;
