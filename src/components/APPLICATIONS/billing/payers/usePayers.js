import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPayer, getTransactionById } from "services/transactions";
import { useDispatch, useSelector } from "react-redux";
import { savePayer, saveTransaction } from "reducers/TransactionsReducer";

const usePayers = () => {
  const { transactionId } = useParams();
  const [loading, setLoading] = useState(false);
  const payer = useSelector((state) => state.transaction.payer);
  const transaction = useSelector((state) => state.transaction.transaction);
  const dispatch = useDispatch();
  const [updatedPayer, setUpdatedPayer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getPayer({ transaction_id: transactionId });
        const transactionRes = await getTransactionById(transactionId);
        dispatch(savePayer(res.data[0]));
        dispatch(saveTransaction(transactionRes.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [transactionId, dispatch]);

  useEffect(() => {
    const getUpdatedPayer = () => {
      return {
        ...payer,
        transaction_id: transaction.transaction_number,
      };
    };
    const updated = getUpdatedPayer();
    setUpdatedPayer(updated);
  }, [transaction, payer]);

  return { loading, updatedPayer };
};
export default usePayers;
