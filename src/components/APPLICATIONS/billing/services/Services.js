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
import { Link } from "react-router-dom";

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
        <h4 className="ml-3">სერვისის კატეგორიები</h4>
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

      <div className="card p-3 mb-3">
        <h4 className="mb-2">მახასიათებლები</h4>
        <div className="flex gap-2 flex-wrap">
          <Link
            to={"/billing/service-prices"}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            სერვისის ფასები
          </Link>
          <Link
            to={"/billing/spec-prices"}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            სერვისის სპეც ფასები
          </Link>
          <Link
            to={"/billing/service-parameters"}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            სერვისის პარამეტრები
          </Link>
          <Link
            to={"/billing/service-parameter-types"}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            პარამეტრის ტიპები
          </Link>
        </div>
      </div>

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
        {loading ? (
          <LoadingSpinner blur />
        ) : (
          <Table
            filter={{ filter, setFilter }}
            staticArr={serviceArr}
            fetchedArr={updatedList}
            optionsObj={{
              categoryID: categories,
            }}
            actions={{ details: true, edit: true, activation }}
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
