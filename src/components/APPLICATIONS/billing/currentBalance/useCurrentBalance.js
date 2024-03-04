import { useEffect, useState } from "react";
import { getCurrentBalance } from "services/balanceHistory";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies } from "services/currency";
import { mergeCurrentBalance } from "helpers/mergeCurrentBalance";
import { saveBalance } from "reducers/BalanceHistoryReducer";

export const useCurrentBalance = () => {
  const dispatch = useDispatch();
  const { balance } = useSelector((store) => store.balanceHistory);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [cb, cur] = await Promise.all([
          getCurrentBalance(),
          getCurrencies(),
        ]);

        const currentBalanceWithCurrency = cb.data.map((curBal) => {
          return {
            ...curBal,
            currency: cur.data.find(({ id }) => id === curBal.currency_id),
          };
        });
        dispatch(saveBalance(mergeCurrentBalance(currentBalanceWithCurrency)));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    if (!balance.length > 0) {
      fetchInitialData();
    }
  }, [dispatch, balance.length]);

  return { loading, balance };
};
