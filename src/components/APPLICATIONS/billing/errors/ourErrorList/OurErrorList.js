import LoadingSpinner from "components/icons/LoadingSpinner";
import useOurErrorList from "./useOurErrorList";
import { ourErrorArr } from "../../formArrays/formArrays";
import Table from "../../table/Table";

const OurErrorList = () => {
  const { loading, deleteAndUpdate, ourErrorList } = useOurErrorList();
  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="card p-5 w-full overflow-x-auto relative">
        {loading && <LoadingSpinner blur />}
        <h3>ჩვენი ერორები</h3>
        <Table
          staticArr={ourErrorArr}
          fetchedArr={ourErrorList}
          deleteAndUpdate={deleteAndUpdate}
        />
      </div>
    </main>
  );
};

export default OurErrorList;
