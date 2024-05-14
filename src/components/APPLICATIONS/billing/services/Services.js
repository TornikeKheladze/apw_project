import Table from "../table/Table";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useServices } from "./useServices";
import BilHeader from "../bilHeader/BilHeader";
import useCheckPermission from "helpers/useCheckPermission";
import { serviceArr } from "../formArrays/serviceArr";
import Alert from "components/Alert";

const Services = () => {
  const {
    loading,
    updatedList,
    categories,
    alert,
    filter,
    setFilter,
    activation,
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
