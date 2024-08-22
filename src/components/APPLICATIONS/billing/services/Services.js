import Table from "../table/Table";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useServices } from "./useServices";
import BilHeader from "../bilHeader/BilHeader";
import useCheckPermission from "helpers/useCheckPermission";
import { serviceArr } from "../formArrays/serviceArr";
import Alert from "components/Alert";
import ServiceCategoryTreeMenu from "../serviceCategories/ServiceCategoryTreeMenu";
import { buildCategoryTree } from "helpers/treeMenuBuilder";
import Button from "components/Button";

const Services = () => {
  const {
    loading,
    updatedList,
    categories,
    alert,
    filter,
    setFilter,
    activation,
    chosenCategory,
    setChosenCategory,
  } = useServices();

  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="card py-3 mb-3">
        <h4 className="ml-3">სერვისის კატალოგები</h4>
        <ServiceCategoryTreeMenu
          categories={buildCategoryTree(categories)}
          chosenItem={chosenCategory}
          setChosenItem={setChosenCategory}
        />
        <Button
          className="ml-3 p-1 text-xs"
          onClick={() => {
            setChosenCategory({});
            setFilter({});
          }}
        >
          ყველას ჩვენება
        </Button>
      </div>

      <BilHeader
        visible={useCheckPermission("bil_services_post_add")}
        text={"სერვისები"}
        url={"/billing/services/create"}
        buttonText="სერვისის დამატება"
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
            staticArr={serviceArr.filter(
              (item) =>
                item.name !== "serviceUrl" &&
                item.name !== "applicantRegistrationApi"
            )}
            fetchedArr={updatedList}
            optionsObj={{
              categoryID: categories,
            }}
            actions={{
              details: true,
              edit: true,
              activation,
            }}
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

export default Services;
