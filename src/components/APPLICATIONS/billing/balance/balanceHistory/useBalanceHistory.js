import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCustomers } from "reducers/CustomerReducer";
import { getCustomers } from "services/customers";
import { removeEmpty } from "helpers/removeEmpty";
import {
  deleteBalanceHistory,
  filterBalanceHistory,
  getBalanceHistoryTypes,
  getBalanceSum,
} from "services/balanceHistory";
import {
  saveBalanceHistory,
  saveBalanceHistoryTypes,
} from "reducers/BalanceHistoryReducer";
import { idToName } from "helpers/idToName";
import { getCurrencies } from "services/services";
import { saveCurrencies } from "reducers/CurrencyReducer";
import { useParams } from "react-router-dom";
import { setFilter } from "reducers/FilterReducer";
import { filterArray } from "helpers/filterArray";
import { convertTimestamp } from "helpers/convertTimestamp";

export const useBalanceHistory = () => {
  const dispatch = useDispatch();
  const allcustomers = useSelector((state) => state.customer.customers);
  const currencies = useSelector((state) => state.currency.currencies);
  const { balanceHistory } = useSelector((state) => state.balanceHistory);
  const { balanceHistoryTypes } = useSelector((state) => state.balanceHistory);
  const { filter } = useSelector((store) => store.filter);
  const [sum, setSum] = useState({ debt: 0, credit: 0 });
  const [updatedBalanceHistoryList, setUpdatedBalanceHistoryList] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const { customerId } = useParams();

  useEffect(() => {
    dispatch(setFilter({}));
  }, [dispatch]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [customers, currencies, balanceHistoryTypes, sumData, res] =
          await Promise.all([
            getCustomers(),
            getCurrencies(),
            getBalanceHistoryTypes(),
            getBalanceSum(),
            filterBalanceHistory(removeEmpty({ customer_id: customerId })),
          ]);
        setSum(sumData.data);
        dispatch(saveBalanceHistory(res.data));
        dispatch(saveCustomers(customers.data));
        dispatch(saveCurrencies(currencies.data));
        dispatch(saveBalanceHistoryTypes(balanceHistoryTypes.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, customerId]);

  const filterHandler = async () => {
    try {
      setActionLoading(true);
      const bHistory = await filterBalanceHistory(removeEmpty(filter));
      dispatch(saveBalanceHistory(bHistory.data));
      setActionLoading(false);
    } catch (error) {
      console.log(error);
      setActionLoading(false);
    }
  };
  useEffect(() => {
    const updatedList = filterArray(balanceHistory, removeEmpty(filter))?.map(
      (bh) => {
        return {
          ...bh,
          customer_id: idToName(allcustomers, bh.customer_id),
          currency_id: idToName(currencies, bh.currency_id),
          type_id: idToName(balanceHistoryTypes, bh.type_id),
          type: bh.type_id,
          created_at: convertTimestamp(bh.created_at),
        };
      }
    );
    setUpdatedBalanceHistoryList(updatedList);
  }, [allcustomers, balanceHistory, currencies, balanceHistoryTypes, filter]);

  const deleteAndUpdate = async (id) => {
    await deleteBalanceHistory(id);
    setTimeout(() => {
      dispatch(
        saveBalanceHistory(balanceHistory.filter((bh) => +bh.id !== +id))
      );
    }, 1600);
  };

  return {
    sum,
    loading,
    actionLoading,
    deleteAndUpdate,
    filterHandler,
    allcustomers,
    currencies,
    updatedBalanceHistoryList,
    balanceHistoryTypes,
  };
};
