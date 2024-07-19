import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../table/Table";

import BilHeader from "../bilHeader/BilHeader";
import Alert from "components/Alert";
import { useApiCredentials } from "./useApiCredentials";
import { apiCredentialsArr } from "../formArrays/serviceArr";

const ApiCredentials = () => {
  const { loading, alert, filter, setFilter, deleteItem, apiCredentials } =
    useApiCredentials();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={true}
        text={"API-ს რეგისტრაცია"}
        url={"/billing/api-credentials/create"}
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
            staticArr={apiCredentialsArr}
            fetchedArr={apiCredentials}
            actions={{ delete: deleteItem, edit: true }}
          />
        )}

        {apiCredentials.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
      <Alert dismissable color={alert.type} message={alert.message} />
    </main>
  );
};

export default ApiCredentials;
