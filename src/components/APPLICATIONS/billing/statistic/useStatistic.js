import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSumData } from "services/transactions";

import { useForm } from "react-hook-form";

import { filterCustomersWithoutPage } from "services/customers";
import { mergeObjectsWithSimilarNames } from "helpers/sumObjectKeys";

const SUCCESSTRANSACTIONID = 3;
const CANCELEDTRANSACTIONID = 4;

export const useStatistic = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [agentData, setAgentData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [canceled, setCanceled] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [
          {
            data: { Agent, owner, services },
          },
          {
            data: { Agent: agentCanceled },
          },
        ] = await Promise.all([
          getSumData({ status_id: SUCCESSTRANSACTIONID }),
          getSumData({ status_id: CANCELEDTRANSACTIONID }),
        ]);

        // {
        //   execute_time_start: getYesterdayFormatted(),
        //   execute_time_end: getYesterdayFormatted(),
        // }
        setCanceled(agentCanceled);
        setAgentData(Agent);
        setOwnerData(owner);
        setServiceData(services);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [dispatch]);

  const updatedOwnerData = ownerData.map((ow) => {
    const service = serviceData.find((s) => +s.services_id === +ow.services_id);
    return { ...ow, services_name: service.services_name };
  });

  const updatedAgentData = agentData.map((ag) => {
    const service = serviceData.find((s) => +s.services_id === +ag.services_id);
    return { ...ag, services_name: service.services_name };
  });

  const updatedCanceledAgentData = canceled.map((ag) => {
    const service = serviceData.find((s) => +s.services_id === +ag.services_id);
    return { ...ag, services_name: service?.services_name };
  });

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const {
        data: { Agent, owner, services },
      } = await getSumData(data);
      setAgentData(Agent);
      setOwnerData(owner);
      setServiceData(services);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const excelExporFunc = async () => {
    const res = await filterCustomersWithoutPage({ type: "agent" });
    const propertiesToMerge = ["amount", "agent_profit", "transaction_count"];
    const mergedArray = mergeObjectsWithSimilarNames(
      agentData,
      propertiesToMerge,
      "agent_name"
    );
    const ORISKEY = "ანგარიში";
    const NAMEKEY = "დასახელება";
    const AMOUNTKEY = "თანხა";

    const result = res.data.map(({ name, oris_bank_account }) => {
      return {
        [NAMEKEY]: name,
        [ORISKEY]: oris_bank_account,
        [AMOUNTKEY]:
          mergedArray.find((item) => item.name === name)?.amount || 0,
      };
    });
    return result;
  };

  return {
    excelExporFunc,
    handleSubmit,
    submitHandler,
    register,
    loading,
    updatedCanceledAgentData,
    updatedAgentData,
    serviceData,
    ownerData,
    agentData,
    updatedOwnerData,
  };
};
