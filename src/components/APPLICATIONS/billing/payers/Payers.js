import DetailComponent from "../detailComponent/DetailComponent";
import { payerArr } from "../formArrays/formArrays";
import usePayers from "./usePayers";

const Payers = () => {
  const { loading, updatedPayer } = usePayers();
  return (
    <>
      {loading ? (
        <div className="workspace">იტვირთება...</div>
      ) : updatedPayer?.firstname ? (
        <DetailComponent
          title="გადამხდელის"
          staticArray={payerArr}
          updatedData={updatedPayer}
          loading={loading}
        />
      ) : (
        <main className="workspace">გადამხდელი ვერ მოიძებნა</main>
      )}
    </>
  );
};

export default Payers;
