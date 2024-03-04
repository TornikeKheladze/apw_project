import DetailComponent from "../../detailComponent/DetailComponent";
import { transactions } from "../../formArrays/formArrays";
import { useTransactionDetails } from "./useTransactionDetails";

const TransactionDetails = () => {
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

export default TransactionDetails;
