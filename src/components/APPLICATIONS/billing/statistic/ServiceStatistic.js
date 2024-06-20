import useThemeOptions from "utilities/hooks/useThemeOptions";
import Input from "components/form/Input";
import Pie from "components/charts/Pie";

const ServiceStatistic = () => {
  const { colors } = useThemeOptions();

  const serviceStatisticData = {
    labels: ["აქტიური", "არააქტიური"],
    datasets: [
      {
        data: [12, 5],
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

  const serviceCategoriesData = {
    labels: [
      "პირადობის მოწმობა",
      "პასპორტი",
      "ქორწინების მოწმობა",
      "სურათის გადაღება",
    ],
    datasets: [
      {
        data: [23, 20, 13, 8],
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

  return (
    <main className="workspace overflow-hidden pb-8 relative">
      {/* {loading && <LoadingSpinner blur />} */}
      <div className="flex md:flex-row flex-col justify-between items-center mb-3">
        <h2 className="mb-3">სერვისების სტატისტიკა</h2>
        <div className="flex gap-2">
          <Input type="date" />
          <Input type="date" />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5 min-w-0">
          <h3>სერვისები სტატუსის მიხედვით</h3>
          <div className="mt-5 min-w-0">
            <Pie data={serviceStatisticData} withShadow />
          </div>
        </div>
        <div className="card p-5 min-w-0">
          <h3>სერვისები კატეგორიების მიხედვით</h3>
          <div className="mt-5 min-w-0">
            <Pie data={serviceCategoriesData} withShadow />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceStatistic;
