import LoadingSpinner from "components/icons/LoadingSpinner";
import Table from "../../table/Table";
import { getRates } from "services/balanceHistory";
import { currencyRatesArr } from "../../formArrays/formArrays";
import { useEffect, useState } from "react";
import Label from "components/form/Label";
import classNames from "classnames";
import { convertDate } from "helpers/convertDate";

const CurrencyRates = () => {
  const currentDate = new Date();

  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(convertDate("2023-04-10 20:05:01"));

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const rates = await getRates({ date });
        setRates(rates.data);
        setLoading(false);
      } catch (error) {}
    };
    fetchInitialData();
  }, [date]);

  return (
    <main className="workspace overflow-hidden pb-8">
      <div className="flex justify-between mb-5 lg:items-center lg:flex-row text-xs lg:text-sm gap-4">
        <h3>ვალუტის კურსები</h3>

        <div>
          <Label className={`block mb-1  `}>თარიღი</Label>

          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(convertDate(e.target.value))}
            className={classNames("form-control")}
          />
        </div>
      </div>
      <div
        className={`card p-5 w-full overflow-x-auto relative min-h-[25rem] ${
          loading && "overflow-x-hidden"
        }`}
      >
        {loading && <LoadingSpinner blur />}

        <Table staticArr={currencyRatesArr} fetchedArr={rates} />
        {rates.length === 0 && !loading && (
          <div className="mt-10">ინფორმაცია ვერ მოიძებნა</div>
        )}
      </div>
    </main>
  );
};

export default CurrencyRates;
