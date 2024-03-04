import StatisticChart from "../statisticChart/StatisticChart";

const GeneralCharts = ({ agentData, ownerData, serviceData }) => {
  return (
    <div className="flex flex-col md:gap-24 gap-16 mt-16">
      <div className="flex lg:flex-row flex-col w-full justify-center items-center gap-10 border-b border-gray-300 pb-4 dark:border-gray-700  ">
        <div className="flex flex-col  w-full items-center gap-2">
          <p>აგენტის მოგება</p>
          <StatisticChart
            data={agentData}
            nameKey={"agent_name"}
            chartValue={"agent_profit"}
          />
        </div>
        <div className="flex flex-col w-full items-center gap-2">
          <p>აგენტის ბრუნვა</p>
          <StatisticChart
            data={agentData}
            nameKey={"agent_name"}
            chartValue={"amount"}
          />
        </div>
      </div>
      <div className="flex lg:flex-row  flex-col w-full justify-center items-center gap-10 border-b border-gray-300 pb-4 dark:border-gray-700  ">
        <div className="flex flex-col   w-full items-center gap-2">
          <p>მომწოდებლის მოგება</p>
          <StatisticChart
            data={ownerData}
            nameKey={"owner_name"}
            chartValue={"owner_profit"}
          />
        </div>
        <div className="flex flex-col  w-full items-center gap-2">
          <p>მომწოდებლის ბრუნვა</p>
          <StatisticChart
            data={ownerData}
            nameKey={"owner_name"}
            chartValue={"amount"}
          />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col w-full justify-center items-center gap-10 pb-4 ">
        <div className="flex flex-col  w-full items-center gap-2">
          <p>სერვისის მოგება</p>
          <StatisticChart
            data={serviceData}
            nameKey={"services_name"}
            chartValue={"our_profit"}
          />
        </div>
        <div className="flex flex-col  w-full items-center gap-2">
          <p>სერვისის ბრუნვა</p>
          <StatisticChart
            data={serviceData}
            nameKey={"services_name"}
            chartValue={"amount"}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralCharts;
