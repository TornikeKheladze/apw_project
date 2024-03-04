import Table from "../table/Table";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { legalFormArr } from "../formArrays/formArrays";
import { useLegalForms } from "./useLegalForms";
import BilHeader from "../bilHeader/BilHeader";
import useCheckPermission from "helpers/useCheckPermission";

const LegalForms = () => {
  const { loading, legalForms, deleteAndUpdate } = useLegalForms();

  return (
    <main className="workspace overflow-hidden pb-8">
      <BilHeader
        visible={useCheckPermission("bil_legal_form_add_post")}
        text={"ლეგალური ფორმა"}
        url={"/billing/legalform/create"}
      />
      <div
        className={`card p-5 w-full overflow-x-auto relative ${
          loading && "overflow-x-hidden"
        }`}
      >
        {loading && <LoadingSpinner blur />}
        <Table
          staticArr={legalFormArr}
          fetchedArr={legalForms}
          deleteAndUpdate={deleteAndUpdate}
        />
        {legalForms.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
    </main>
  );
};

export default LegalForms;
