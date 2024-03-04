import DetailComponent from "../../detailComponent/DetailComponent";
import { transactions } from "../../formArrays/formArrays";
import { useTransactionDetails } from "./useReturnedTransactionDetails";

const ReturnedTransactionDetails = () => {
  const { updatedTransaction, loading } = useTransactionDetails();
  return (
    <DetailComponent
      title="ტრანზაქციის"
      staticArray={transactions}
      updatedData={updatedTransaction}
      loading={loading}
    />
  );
};

export default ReturnedTransactionDetails;
