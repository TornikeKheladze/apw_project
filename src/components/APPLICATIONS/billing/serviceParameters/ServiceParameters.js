import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import useServiceParameters from "./useServiceParameters";
import { serviceParametersArr } from "../formArrays/serviceArr";
import Alert from "components/Alert";
import { Link } from "react-router-dom";
import Button from "components/Button";

const ServiceParameters = () => {
  const {
    loading,
    updatedList,
    alert,
    filter,
    setFilter,
    setUrlInput,
    urlInput,
    selectOptions,
    deleteItem,
    service,
    updateServiceMutate,
    updateServiceLoading,
  } = useServiceParameters();

  return (
    <main className="workspace overflow-hidden pb-8">
      {updateServiceLoading && <LoadingSpinner blur />}
      <div className="card p-3 mb-3">
        <div className="flex gap-3 flex-wrap">
          <Link
            to={`/billing/services/details/${service.serviceID}`}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            სერვისის დეტალები
          </Link>
          <Link
            to={`/billing/service-prices?serviceID=${service.serviceID}`}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            სერვისის ფასები
          </Link>
          <Link
            to={`/billing/spec-prices?serviceID=${service.serviceID}`}
            className="btn btn_primary btn_outlined p-1 text-xs"
          >
            სერვისის სპეც ფასები
          </Link>
        </div>
      </div>
      <h3>ტექნიკური პარამეტრები</h3>
      {service && <h4 className="my-3">სერვისი: "{service.name}"</h4>}

      <div className="card p-4 mb-3">
        <p className="mb-2">API მისამართი</p>
        <div className="flex justify-between flex-col md:flex-row gap-3 md:gap-0">
          <div className="flex md:w-2/3 w-full gap-3">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="form-control rounded-xl"
            />
            <Button
              onClick={() =>
                updateServiceMutate({ ...service, serviceUrl: urlInput })
              }
              color="success"
            >
              შენახვა
            </Button>
          </div>
          <div>
            <Link
              className="flex-grow"
              to={`/billing/service-parameters/create?serviceID=${service.serviceID}`}
            >
              <Button>პარამეტრის დამატება</Button>
            </Link>
          </div>
        </div>
      </div>

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
            staticArr={serviceParametersArr}
            fetchedArr={updatedList}
            optionsObj={selectOptions}
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

export default ServiceParameters;
