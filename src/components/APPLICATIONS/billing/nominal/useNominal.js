import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { getNominalForAgent, getNominalStatistic } from "services/transactions";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies } from "services/services";
import { saveCurrencies } from "reducers/CurrencyReducer";
import { getTodayDate } from "helpers/getTodayDate";

export const useNominal = () => {
  const [agentData, setAgentData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [agentMoney, setAgentMoney] = useState([]);
  const [ownerMoney, setOwnerMoney] = useState([]);
  const [userMoney, setUserMoney] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currencies } = useSelector((state) => state.currency);
  const dispatch = useDispatch();
  const { register, control, setValue } = useForm({
    defaultValues: { nominal_date: getTodayDate(true) },
  });

  const selectedCurrency = useWatch({ name: "currency", control });
  const selectedDate = useWatch({ name: "nominal_date", control });

  useEffect(() => {
    if (currencies?.length > 0) {
      setValue("currency", currencies?.find((curr) => curr.name === "GEL").id);
    }
  }, [setValue, currencies]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const currenciesData = await getCurrencies();
      dispatch(saveCurrencies(currenciesData.data));
    };
    fetchCurrencies();
  }, [dispatch]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [
          { Agent, Owner, NomUser },
          { userMoneyData },
          { agentMoneyData },
          { ownerMoneyData },
        ] = await Promise.all([
          getNominalStatistic({
            // date: selectedDate,
            currency: selectedCurrency,
          }),
          getNominalForAgent("users", {
            // date: selectedDate,
            currency: selectedCurrency,
          }),
          getNominalForAgent("agents", {
            // date: selectedDate,
            currency: selectedCurrency,
          }),
          getNominalForAgent("owners", {
            // date: selectedDate,
            currency: selectedCurrency,
          }),
        ]);

        setAgentMoney(agentMoneyData);
        setOwnerMoney(ownerMoneyData);
        setUserMoney(userMoneyData);

        setAgentData(Agent);
        setOwnerData(Owner);
        setClientData(NomUser);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedCurrency) {
      fetchInitialData();
    }
  }, [dispatch, selectedCurrency, selectedDate]);

  return {
    currencies,
    register,
    loading,
    selectedCurrency,
    clientData,
    userMoney,
    agentData,
    agentMoney,
    ownerData,
    ownerMoney,
  };
};
