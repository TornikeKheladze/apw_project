import useThemeOptions from "utilities/hooks/useThemeOptions";
import Input from "components/form/Input";
import Pie from "components/charts/Pie";

const UserStatistic = () => {
  const { colors } = useThemeOptions();

  const departments = {
    labels: [
      "ფინანსური დეპარტამენტი",
      "IT დეპარტამენტი",
      "საოპერაციო დეპარტამენტი",
    ],
    datasets: [
      {
        data: [19, 18, 10],
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
  const userActiveStatistic = {
    labels: ["აქტიური", "არააქტიური"],
    datasets: [
      {
        data: [20, 12],
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

  const positions = {
    labels: ["ბუღალტერი", "დეველოპერი", "ოპერატორი", "დირექტორი", "იურისტი"],
    datasets: [
      {
        data: [3, 10, 19, 1, 7],
        backgroundColor: [
          "rgb(" + colors.primary + "/ .1)",
          "rgb(" + colors.primary + "/ .5)",
          "rgb(" + colors.primary + "/ .25)",
          "rgb(" + colors.primary + "/ .0)",
          "rgb(" + colors.primary + "/ .75)",
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
        <h2 className="mb-3">მომხმარებლების სტატისტიკა</h2>
        <div className="flex gap-2">
          <Input type="date" />
          <Input type="date" />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5 min-w-0">
          <h3>მომხმარებლების რაოდენობა</h3>
          <div className="mt-5 min-w-0">
            <Pie data={userActiveStatistic} withShadow />
          </div>
        </div>
        <div className="card p-5 min-w-0">
          <h3>მომხმარებლების რაოდენობა დეპანტამენტების მიხედვით</h3>
          <div className="mt-5 min-w-0">
            <Pie data={departments} withShadow />
          </div>
        </div>
        <div className="card p-5 min-w-0">
          <h3>მომხმარებლების რაოდენობა პოზიციების მიხედვით</h3>
          <div className="mt-5 min-w-0">
            <Pie data={positions} withShadow />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserStatistic;
