import { useEffect, useState } from "react";
import { getActDetail } from "services/comparisonAct";
import { useSearchParams } from "react-router-dom";
import { calculateDates } from "data/dates";
import { getCustomerById } from "services/customers";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies } from "services/services";
import { saveCurrencies } from "reducers/CurrencyReducer";

export const useComparisonActDetails = () => {
  const [searchParams] = useSearchParams();
  const [statisticData, setStatisticData] = useState();
  const [agentData, setAgentData] = useState();
  const [loading, setLoading] = useState(true);
  const { monthsInGeorgian } = calculateDates();
  const currencies = useSelector((state) => state.currency.currencies);
  const dispatch = useDispatch();
  const [activeCurrency, setActiveCurrency] = useState();

  const agentId = searchParams.get("id");
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const currency = searchParams.get("currency");

  useEffect(() => {
    if (currencies.length > 0) {
      setActiveCurrency(currencies.find((item) => item.name === currency));
    }
  }, [currencies, currency]);

  useEffect(() => {
    const fetchComparisonAct = async () => {
      const currenciesData = await getCurrencies();
      const actData = await getActDetail({
        date: `${year}-${month}`,
        customer_id: +agentId,
      });
      const agentData = await getCustomerById(+agentId);
      setAgentData(agentData.data);
      setStatisticData(actData.data);
      dispatch(saveCurrencies(currenciesData.data));
      setLoading(false);
    };

    fetchComparisonAct();
  }, [agentId, month, year, dispatch]);

  const dataForRender = statisticData?.filter(
    (item) => item.service_currency === activeCurrency.id
  );

  return {
    agentId,
    month,
    year,
    agentData,
    monthsInGeorgian,
    currency,
    dataForRender,
    loading,
  };
};
