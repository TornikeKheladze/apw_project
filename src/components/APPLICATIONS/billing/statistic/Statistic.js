import LoadingSpinner from "components/icons/LoadingSpinner";
import CollapseStatistic from "./collapseStatistic/CollapseStatistic";
import GeneralCharts from "./generalCharts/GeneralCharts";
import { agentArr, ownerArr, serviceArr } from "../formArrays/statisticArray";
import CustomInput from "components/form/CustomInput";
import Button from "components/Button";
import ExcelExport from "../table/ExcelExport";

import { useStatistic } from "./useStatistic";

const Statistic = () => {
  const {
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
  } = useStatistic();

  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="flex justify-between mb-4">
        <h3>სტატისტიკა</h3>
        <ExcelExport fileName={"oris"} excelExporFunc={excelExporFunc} />
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex gap-2 justify-end"
      >
        <CustomInput
          name="execute_time_start"
          register={register}
          type="date"
          className="w-40"
        />
        <CustomInput
          name="execute_time_end"
          register={register}
          type="date"
          className="w-40"
        />
        <Button className="rounded">ფილტრი</Button>
      </form>
      {loading && <LoadingSpinner blur />}
      <CollapseStatistic
        canceledData={updatedCanceledAgentData}
        data={updatedAgentData}
        label={"აგენტები"}
        profitKey={"agent_profit"}
        nameKey={"agent_name"}
        tableHeaderArr={agentArr}
      />

      <CollapseStatistic
        data={updatedOwnerData}
        label={"მომწოდებლები"}
        profitKey={"owner_profit"}
        nameKey={"owner_name"}
        tableHeaderArr={ownerArr}
      />

      <CollapseStatistic
        data={serviceData}
        ownerSum={updatedOwnerData}
        agentSum={updatedAgentData}
        label={"სერვისები"}
        profitKey={"our_profit"}
        nameKey={"services_name"}
        tableHeaderArr={serviceArr}
      />

      <GeneralCharts
        agentData={agentData}
        ownerData={ownerData}
        serviceData={serviceData}
      />
    </main>
  );
};

export default Statistic;
