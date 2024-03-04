import CustomInput from "components/form/CustomInput";
import NominalContainer from "./nominalContainer/NominalContainer";
import CustomSelect from "components/form/CustomSelect";
import { clientArray, clientArrayNotGel, customerArray } from "./nominalArray";
import LoadingSpinner from "components/icons/LoadingSpinner";

import { useNominal } from "./useNominal";

const Nominal = () => {
  const {
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
  } = useNominal();

  return (
    <main className="workspace p-5 overflow-hidden">
      <div className="flex md:items-center justify-between flex-col md:flex-row items-start gap-4">
        <h3>ნომინალური ანგარიში</h3>
        <form className="flex gap-2 justify-end">
          <CustomSelect className="w-32" name={"currency"} register={register}>
            {currencies &&
              currencies.map((item) => (
                <option
                  className="p-3"
                  key={item.id.toString() + item.name}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
          </CustomSelect>
          <CustomInput
            name="nominal_date"
            register={register}
            type="date"
            className="w-40"
          />
        </form>
      </div>

      <div className="bg-whites w-full  dark:bg-gray-900 mt-10 min-h-screen transition duration-300">
        {loading ? (
          <LoadingSpinner blur />
        ) : (
          <>
            <NominalContainer
              title={"მომხმარებლის"}
              mainTableData={"data here"}
              incomeData={"income data here"}
              outcomeData={"outcome data here"}
              type="client"
              staticArray={
                +selectedCurrency ===
                +currencies?.find((curr) => curr.name === "GEL")?.id
                  ? clientArrayNotGel
                  : clientArray
              }
              data={clientData}
              moneyData={userMoney}
            />

            <NominalContainer
              title={"აგენტის"}
              mainTableData={"data here"}
              incomeData={"income data here"}
              outcomeData={"outcome data here"}
              staticArray={customerArray}
              data={agentData}
              moneyData={agentMoney}
              type="customer"
            />

            <NominalContainer
              title={"მომწოდებლის"}
              mainTableData={"data here"}
              incomeData={"income data here"}
              outcomeData={"outcome data here"}
              staticArray={customerArray}
              data={ownerData}
              moneyData={ownerMoney}
              type="customer"
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Nominal;
