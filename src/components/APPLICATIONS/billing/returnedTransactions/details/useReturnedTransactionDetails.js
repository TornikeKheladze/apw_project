import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveTransaction } from "reducers/TransactionsReducer";
import { getServices, getTransactionById } from "services/transactions";
import { getCustomers } from "services/customers";
import { saveCustomers } from "reducers/CustomerReducer";
import { saveServices } from "reducers/ServiceReducer";
import { checkStatus } from "helpers/CheckStatusForBilling";
import { idToName } from "helpers/idToName";

export const useReturnedTransactionDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { transaction, transactions } = useSelector(
    (state) => state.transaction
  );
  const customers = useSelector((state) => state.customer.customers);
  const services = useSelector((state) => state.service.services);
  const [updatedTransaction, setUpdatedTransaction] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const tran = await getTransactionById(id);
        const cust = await getCustomers();
        const serv = await getServices();
        dispatch(saveCustomers(cust.data));
        dispatch(saveServices(serv.data));
        dispatch(saveTransaction(tran.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (!transactions.find((t) => +t.id === +id)) {
      fetchTransaction();
    } else {
      dispatch(saveTransaction(transactions.find((t) => +t.id === +id)));
    }
  }, [id, dispatch, transactions]);

  useEffect(() => {
    const updateTransaction = () => {
      return {
        ...transaction,
        owner_id: idToName(customers, transaction.owner_id),
        agent_id: idToName(customers, transaction.agent_id),
        service_id: idToName(services, transaction.service_id),
        status_id: checkStatus(transaction.status_id),
      };
    };
    const updatedData = updateTransaction();
    setUpdatedTransaction(updatedData);
  }, [customers, services, transaction]);

  return {
    id,
    transaction,
    customers,
    services,
    updatedTransaction,
    setUpdatedTransaction,
    loading,
    setLoading,
  };
};
