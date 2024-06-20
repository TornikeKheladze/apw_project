import useThemeOptions from "utilities/hooks/useThemeOptions";
import Input from "components/form/Input";
import Pie from "components/charts/Pie";
import BarChart from "./BarChart";

const TransactionStatistic = () => {
  const { colors } = useThemeOptions();

  const transactionServiceData = {
    labels: [
      "პირადობის მოწმობა",
      "პასპორტი",
      "ქორწინების მოწმობა",
      "სურათის გადაღება",
    ],
    datasets: [
      {
        data: [1500, 572, 312, 259],
        backgroundColor: [
          "rgb(" + colors.primary + "/ .1)",
          "rgb(" + colors.primary + "/ .5)",
          "rgb(" + colors.primary + "/ .25)",
        ],
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  const transactionServiceProductionData = {
    labels: [
      "პირადობის მოწმობა",
      "პასპორტი",
      "ქორწინების მოწმობა",
      "სურათის გადაღება",
    ],
    datasets: [
      {
        data: [230, 220, 113, 18],
        backgroundColor: [
          "rgb(" + colors.primary + "/ .1)",
          "rgb(" + colors.primary + "/ .5)",
          "rgb(" + colors.primary + "/ .25)",
          "rgb(" + colors.primary + "/ .0)",
        ],
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  const transactionMigebulisData = {
    labels: [
      "პირადობის მოწმობა",
      "პასპორტი",
      "ქორწინების მოწმობა",
      "სურათის გადაღება",
    ],
    datasets: [
      {
        data: [190, 180, 300, 98],
        backgroundColor: [
          "rgb(" + colors.primary + "/ .1)",
          "rgb(" + colors.primary + "/ .5)",
          "rgb(" + colors.primary + "/ .25)",
          "rgb(" + colors.primary + "/ .0)",
        ],
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  const transactionByMonths = {
    labels: [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ],
    datasets: [
      {
        label: "2023",
        data: [25, 100, 115, 310, 415, 210, 87, 173, 115, 310, 415, 210],
        backgroundColor: "rgb(" + colors.primary + "/ .1)",
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
      {
        label: "2022",
        data: [150, 100, 115, 310, 415, 210, 87, 173, 115, 310, 415, 210],
        backgroundColor: "rgb(" + colors.primary + "/ .5)",
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  const transactionByKvartal = {
    labels: ["I", "II", "III", "IV"],
    datasets: [
      {
        label: "2023",
        data: [1115, 3310, 1415, 2210],
        backgroundColor: "rgb(" + colors.primary + "/ .1)",
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
      {
        label: "2022",
        data: [1150, 1310, 2415, 4210],
        backgroundColor: "rgb(" + colors.primary + "/ .5)",
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  return (
    <main className="workspace overflow-hidden pb-8 relative">
      {/* {loading && <LoadingSpinner blur />} */}
      <div className="flex md:flex-row flex-col justify-between items-center mb-3">
        <h2 className="mb-3">ტრანზაქციების სტატისტიკა</h2>
        <div className="flex gap-2">
          <Input type="date" />
          <Input type="date" />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5 min-w-0">
          <h3>ტრანზაქციები სერვისის მიხედვით</h3>
          <div className="mt-5 min-w-0">
            <Pie data={transactionServiceData} withShadow />
          </div>
        </div>
        <div className="card p-5 min-w-0">
          <h3>ტრანზაქციები მიწოდებული სერვისების მიხედვით</h3>
          <div className="mt-5 min-w-0">
            <Pie data={transactionServiceProductionData} withShadow />
          </div>
        </div>
        <div className="card p-5 min-w-0">
          <h3>ტრანზაქციები მიღებული სერვისის მიხედვით</h3>
          <div className="mt-5 min-w-0">
            <Pie data={transactionMigebulisData} withShadow />
          </div>
        </div>
        <div className="card p-5 min-w-0">
          <h3>თვეების შედარება წლების მიხედვით</h3>
          <div className="mt-5 min-w-0">
            {/* <Bar data={transactionByMonths} withShadow /> */}

            <BarChart
              data={transactionByMonths}
              // config={barOptions(
              //   Math.max(...mergedStatisticData.map((item) => item.amount))
              // )}
            />
          </div>
        </div>
        <div className="card p-5 min-w-0">
          <h3>კვარტლების შედარება წლების მიხედვით</h3>
          <div className="mt-5 min-w-0">
            {/* <Bar data={transactionByMonths} withShadow /> */}

            <BarChart
              data={transactionByKvartal}
              // config={barOptions(
              //   Math.max(...mergedStatisticData.map((item) => item.amount))
              // )}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TransactionStatistic;
