import { useCallback, useEffect, useState } from "react";
import { getAct, getGeorgianNumber } from "services/comparisonAct";
import { comparisonActArray } from "data/comparisonActData";
import { useSearchParams } from "react-router-dom";
import { getCustomerById } from "services/customers";
import { calculateDates } from "data/dates";

export const useComparisonActGenerate = () => {
  const [searchParams] = useSearchParams();
  const [agentData, setAgentData] = useState();
  const { monthsInGeorgian } = calculateDates();
  const [numbersValues, setNumbersValues] = useState([]);
  const [loading, setLoading] = useState(true);

  const agentId = searchParams.get("id");
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const currency = searchParams.get("currency");

  const getValueForComparisonAct = useCallback(
    (item, statisticData) => {
      if (statisticData[`${item.id}`]?.length > 0) {
        const shesabamisiValutisChanaweri = statisticData[`${item.id}`].find(
          (item) => item.currency === currency
        );
        if (shesabamisiValutisChanaweri) {
          return shesabamisiValutisChanaweri[item.valueName];
        } else {
          return "0.00";
        }
      } else {
        return "0.00";
      }
    },
    [currency]
  );

  useEffect(() => {
    const fetchComparisonAct = async () => {
      const actData = await getAct({
        date: `${year}-${month}`,
        customer_id: +agentId,
      });
      const agentData = await getCustomerById(+agentId);
      setAgentData(agentData.data);

      const numbersArr = comparisonActArray.map((item) => {
        return getValueForComparisonAct(item, actData.data);
      });
      const responsesArray = [];
      for (const number of numbersArr) {
        try {
          const response = await getGeorgianNumber(number, currency);
          responsesArray.push({ numeric: number, verbal: response.data });
        } catch (error) {
          console.error(`Error fetching data for number ${number}:`, error);
          responsesArray.push(null); // Push null in case of an error
        }
      }
      setNumbersValues(responsesArray);
      setLoading(false);
    };

    fetchComparisonAct();
  }, [agentId, month, year, getValueForComparisonAct, currency]);

  return {
    agentId,
    month,
    year,
    agentData,
    monthsInGeorgian,
    currency,
    numbersValues,
    loading,
  };
};
