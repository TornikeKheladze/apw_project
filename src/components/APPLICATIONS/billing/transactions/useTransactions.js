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
import { transactions } from "../formArrays/formArrays";
import { setFilter } from "reducers/FilterReducer";
import { convertTimestamp } from "helpers/convertTimestamp";
import { getCurrencies } from "services/services";
import { saveCurrencies } from "reducers/CurrencyReducer";

export const useTransactions = () => {
  const dispatch = useDispatch();
  const allTransactions = useSelector(
    (state) => state.transaction.transactions
  );
  const customers = useSelector((state) => state.customer.customers);
  const services = useSelector((state) => state.service.services);
  const sumData = useSelector((state) => state.transaction.sumData);
  const { currencies } = useSelector((store) => store.currency);
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
        const [cust, serv, sumData, curr] = await Promise.all([
          getCustomers(),
          getServices(),
          getSumData(),
          getCurrencies(),
        ]);
        dispatch(saveCustomers(cust.data));
        dispatch(saveServices(serv.data));
        dispatch(saveSumData(sumData.data));
        dispatch(saveCurrencies(curr.data));
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
          removeEmpty(filterObj),
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
    [dispatch, currentPage]
  );

  useEffect(() => {
    if (isInitial) {
      fetchTransactions({});
      setIsInitial(false);
    } else {
      fetchTransactions(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, fetchTransactions]);

  useEffect(() => {
    const updatedTransactions = allTransactions?.map((transaction) => {
      return {
        ...transaction,
        created_at: convertTimestamp(transaction.created_at),
        owner_id: idToName(customers, transaction.owner_id),
        agent_id: idToName(customers, transaction.agent_id),
        service_id: idToName(services, transaction.service_id),
        status_id: checkStatus(transaction.status_id),
        service_currency:
          idToName(currencies, transaction.service_currency) || "GEL",
        agent_currency:
          idToName(currencies, transaction.agent_currency) || "GEL",
      };
    });
    setUpdatedTransactionsList(updatedTransactions);
  }, [allTransactions, customers, services, currencies]);

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
  const filterHandler = useCallback(
    async (filterObj) => {
      try {
        setActionLoading(true);
        const tran = await filterTransactions(removeEmpty({ ...filterObj }), 1);
        setCurrentPage(1);
        dispatch(saveTransactions(tran.data.data));
        setTotalSize(tran.data.total);
        setActionLoading(false);
      } catch (error) {
        console.log(error);
        setActionLoading(false);
      }
    },
    [setActionLoading, setCurrentPage, dispatch, setTotalSize]
  );

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
      keyReplace(tr, transactions)
    );

    return translatedData;
  };
  const { authorizedUser } = useSelector((store) => store.user);

  const permCheck = (perm) => {
    if (authorizedUser.name) {
      if (
        !authorizedUser.roles
          .map((role) => role.permissions)
          ?.flat()
          .map(({ name }) => name.split("bil_transaction_table_")[1])
          .includes(perm)
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  const columnsWithpermissions = transactions.filter((t) => permCheck(t.name));

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
    columnsWithpermissions,
    currencies,
  };
};
