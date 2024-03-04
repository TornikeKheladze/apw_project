import { useCallback, useEffect, useState } from "react";
import {
  filterTransactions,
  getServices,
  getSumData,
} from "services/transactions";
import { useDispatch, useSelector } from "react-redux";
import { saveSumData, saveTransactions } from "reducers/TransactionsReducer";
import { getCustomers } from "services/customers";
import { saveCustomers } from "reducers/CustomerReducer";
import { saveServices } from "reducers/ServiceReducer";
import { checkStatus } from "helpers/CheckStatusForBilling";
import { filterTransactionsWithoutPage } from "services/transactions";
import { keyReplace } from "helpers/keyReplace";

import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";
import { setFilter } from "reducers/FilterReducer";
import { returnedTransactionsArr } from "../formArrays/returnedTransactionsArr";

export const useReturnedTransactions = () => {
  const dispatch = useDispatch();
  const allTransactions = useSelector(
    (state) => state.transaction.transactions
  );
  const customers = useSelector((state) => state.customer.customers);
  const services = useSelector((state) => state.service.services);
  const sumData = useSelector((state) => state.transaction.sumData);
  const { filter } = useSelector((store) => store.filter);
  const [updatedTransactionsList, setUpdatedTransactionsList] = useState([]);
  const [sortConfig, setSortConfig] = useState({ column: "", direction: "" });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSize, setTotalSize] = useState(0);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [cust, serv, sumData] = await Promise.all([
          getCustomers(),
          getServices(),
          getSumData(),
        ]);
        dispatch(saveCustomers(cust.data));
        dispatch(saveServices(serv.data));
        dispatch(saveSumData(sumData.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [dispatch]);

  const fetchTransactions = useCallback(
    async (filterObj) => {
      try {
        setActionLoading(true);
        const tran = await filterTransactions(
          removeEmpty({ filterObj, status_id: 2 }),
          currentPage
        );
        dispatch(saveTransactions(tran.data.data));
        setTotalSize(tran.data.total);
        setActionLoading(false);
      } catch (error) {
        setActionLoading(false);
        console.log(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  useEffect(() => {
    if (isInitial) {
      fetchTransactions({});
      setIsInitial(true);
    } else {
      fetchTransactions(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitial, currentPage, fetchTransactions]);

  useEffect(() => {
    const updatedTransactions = allTransactions?.map((transaction) => {
      return {
        ...transaction,
        owner_id: idToName(customers, transaction.owner_id),
        agent_id: idToName(customers, transaction.agent_id),
        service_id: idToName(services, transaction.service_id),
        status_id: checkStatus(transaction.status_id),
      };
    });
    setUpdatedTransactionsList(updatedTransactions);
  }, [allTransactions, customers, services]);

  const sortHandler = async (name, type) => {
    if (sortConfig.column === name) {
      setSortConfig({
        column: name,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({
        column: name,
        direction: "asc",
      });
    }

    try {
      setActionLoading(true);
      const res = await filterTransactions(
        {
          sort_column: name,
          sort_order: type,
        },
        1
      );
      dispatch(saveTransactions(res.data.data));
      setCurrentPage(1);
      setActionLoading(false);
    } catch (error) {
      console.log(error);
      setActionLoading(false);
    }
  };

  const filterHandler = useCallback(async () => {
    try {
      setActionLoading(true);
      const tran = await filterTransactions(removeEmpty(filter), 1);
      setCurrentPage(1);
      dispatch(saveTransactions(tran.data.data));
      setTotalSize(tran.data.total);
      setActionLoading(false);
    } catch (error) {
      console.log(error);
      setActionLoading(false);
    }
  }, [filter, dispatch, setCurrentPage, setTotalSize, setActionLoading]);

  const fetchAllTransactions = async () => {
    const res = await filterTransactionsWithoutPage(removeEmpty(filter));
    const updatedTransactions = res.data?.map((transaction) => {
      return {
        ...transaction,
        owner_id: idToName(customers, transaction.owner_id),
        agent_id: idToName(customers, transaction.agent_id),
        service_id: idToName(services, transaction.service_id),
        status_id: checkStatus(transaction.status_id),
      };
    });
    const translatedData = updatedTransactions.map((tr) =>
      keyReplace(tr, returnedTransactionsArr)
    );

    return translatedData;
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        filterHandler(removeEmpty(filter));
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [filter, filterHandler]);

  useEffect(() => {
    return () => {
      dispatch(setFilter({}));
    };
  }, [dispatch]);

  return {
    customers,
    services,
    updatedTransactionsList,
    sortConfig,
    loading,
    actionLoading,
    currentPage,
    setCurrentPage,
    totalSize,
    filterHandler,
    sortHandler,
    sumData,
    fetchAllTransactions,
  };
};
