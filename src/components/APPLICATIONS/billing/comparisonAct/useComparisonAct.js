import { useEffect, useState } from "react";
import { getActs } from "services/transactions";
import { transformDataByCustomerName } from "helpers/sumObjectKeys";
import { getCurrencies } from "services/currency";
import { calculateDates } from "data/dates";

export const useComparisonAct = () => {
  const { currentMonth, currentYear, monthsInGeorgian, years } =
    calculateDates();

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actData, setActData] = useState([]);
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [activeCurrency, setActiveCurrency] = useState(1);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const cur = await getCurrencies();
        setCurrencies(cur.data);
        setLoading(false);
      } catch (error) {}
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setActionLoading(true);
        const res = await getActs({
          date: `${year}-${month}`,
        });
        setActData(transformDataByCustomerName(res.data));
        setActionLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [month, year, currentMonth, currentYear]);

  const updatedActData =
    actData.length > 0
      ? actData.map((item) => {
          return {
            ...item,
            year,
            month: monthsInGeorgian.find(({ value }) => +value === +month)
              ?.label,
            fetchedCurrencies: currencies,
            currency: currencies.find(({ id }) => +id === +activeCurrency)
              ?.name,
            date: `${year} წლის ${
              monthsInGeorgian.find(({ value }) => +value === +month).month
            }`,
          };
        })
      : [];

  return {
    loading,
    actionLoading,
    setActiveCurrency,
    activeCurrency,
    currencies,
    updatedActData,
    year,
    setYear,
    month,
    setMonth,
    currentMonth,
    currentYear,
    monthsInGeorgian,
    years,
  };
};
