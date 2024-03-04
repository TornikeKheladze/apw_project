import LoadingSpinner from "components/icons/LoadingSpinner";
import useOwnerErrorList from "./useOwnerErrorList";
import Table from "../../table/Table";
import { ownerErrorArr } from "../../formArrays/formArrays";

const OwnerErrorList = () => {
  const { loading, updatedList, deleteAndUpdate } = useOwnerErrorList();
  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="card p-5 w-full overflow-x-auto relative">
        {loading && <LoadingSpinner blur />}
        <h3>ოვნერის ერორები</h3>
        <Table
          staticArr={ownerErrorArr}
          fetchedArr={updatedList}
          deleteAndUpdate={deleteAndUpdate}
        />
      </div>
    </main>
  );
};

export default OwnerErrorList;
