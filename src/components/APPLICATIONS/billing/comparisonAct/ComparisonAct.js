import ActList from "./actList/ActList";
import CustomSelect from "components/form/CustomSelect";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useComparisonAct } from "./useComparisonAct";

const ComparisonAct = () => {
  const {
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
  } = useComparisonAct();

  return (
    <main className="workspace p-5 w-full overflow-hidden">
      {loading && <LoadingSpinner blur />}
      {actionLoading && <LoadingSpinner blur />}
      <div className="flex w-full justify-end">
        <CustomSelect
          className="w-20 cursor-pointer"
          onChange={(e) => setActiveCurrency(e.target.value)}
        >
          {!activeCurrency && (
            <option value="">
              {currencies.find(({ id }) => +id === +activeCurrency)?.name ||
                "ვალუტა"}
            </option>
          )}
          {currencies.length > 0 &&
            currencies.map((item) => (
              <option className="p-3" key={item.id + item.name} value={item.id}>
                {item.name}
              </option>
            ))}
        </CustomSelect>
      </div>
      <div className="flex items-center gap-2 justify-end mt-4 mb-4">
        <CustomSelect
          className="w-28 cursor-pointer"
          onChange={(e) => setYear(e.target.value)}
        >
          {!year && <option value="">{currentYear}</option>}
          {years?.map((item) => (
            <option className="p-3" key={item.year} value={item.value}>
              {item.year}
            </option>
          ))}
        </CustomSelect>
        <CustomSelect
          className="w-36 cursor-pointer"
          onChange={(e) => setMonth(e.target.value)}
        >
          {month === currentMonth && (
            <option value="">
              {
                monthsInGeorgian.find(({ value }) => +value === +currentMonth)
                  .month
              }
            </option>
          )}

          {monthsInGeorgian?.map((item) => (
            <option className="p-3" key={item.month} value={item.value}>
              {item.month}
            </option>
          ))}
        </CustomSelect>
      </div>
      <ActList data={updatedActData} />
    </main>
  );
};

export default ComparisonAct;
