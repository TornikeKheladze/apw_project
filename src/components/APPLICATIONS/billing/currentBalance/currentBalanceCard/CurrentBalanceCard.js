const CurrentBalanceCard = ({ data: { name, curData, credit } }) => {
  return (
    <div
      className="card md:w-[22rem] w-[18rem] relative md:p-5 p-2 pt-4 pb-20 md:pb-20 flex flex-col items-center hover:scale-105 hover:shadow-lg
     transition-transform duration-300 mb-10"
    >
      <p
        className="border-b border-gray-500 pb-3 text-center 
    w-full lg:text-base text-lg font-medium text-primary mb-6"
      >
        {name}
      </p>

      <div className="flex flex-col items-left w-max  justify-center gap-2  text-sm ">
        <p className="flex items-center gap-2 ">
          <span>GEL:</span>
          <span>{curData["GEL"] || "0.00"}</span>
        </p>
        <p className="flex  items-center  gap-2 ">
          <span>EUR:</span>
          <span>{curData["EUR"] || "0.00"}</span>
        </p>
        <p className="flex  items-center  gap-2">
          <span>USD:</span>
          <span>{curData["USD"] || "0.00"}</span>
        </p>
        <p className="flex  items-center  gap-2">
          <span>RUB:</span>
          <span>{curData["RUB"] || "0.00"}</span>
        </p>
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <p className="mb-1">კრედიტი</p>
        <p className="bg-primary w-max py-2 px-6 rounded-lg text-white">
          {credit || "0.00"}
        </p>
      </div>
    </div>
  );
};

export default CurrentBalanceCard;
