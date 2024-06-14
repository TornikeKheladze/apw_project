import { useQuery } from "react-query";
import BarChart from "./BarChart";
import { getAgentStatistic, getOwnerStatistic } from "services/statistic";
import { idToName } from "helpers/idToName";
import ConfigChartJS from "config/chartjs";
import useThemeOptions from "utilities/hooks/useThemeOptions";
import { useParams } from "react-router-dom";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { mergeObjectsWithSimilarNames } from "helpers/sumObjectKeys";
import { getOrganizations } from "services/organizations";

const Statistic = () => {
  const { user } = useParams();
  const key = user === "owner" ? "ownerId" : "agentID";
  const queryFn = user === "owner" ? getOwnerStatistic : getAgentStatistic;

  const {
    data: statistic = [{}],
    isLoading: statisticLoading,
    isFetching: statisticFetching,
  } = useQuery({
    queryKey: ["getStatistic", user],
    queryFn: () => queryFn().then((res) => res.data),
  });

  const {
    data: organizations = [{}],
    isLoading: orgLoading,
    isFetching: orgsFetching,
  } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });

  const { bar } = ConfigChartJS();
  const { colors } = useThemeOptions();

  const statisticData = statistic.map((s) => {
    return {
      ...s,
      [key]: idToName(organizations, s[key]) || s[key],
    };
  });

  const mergedStatisticData = mergeObjectsWithSimilarNames(
    statisticData,
    ["amount", "paidAmount", "transactionCount", "paidTransactionCount"],
    key
  );

  const barOptions = (height) => {
    return {
      ...bar,
      scales: {
        y: {
          ...bar.scales.y,
          max: height || 20,
          ticks: {
            stepSize: height / 10,
          },
        },
      },
    };
  };

  const amountBarData = {
    labels: mergedStatisticData.map((item) => item.name),
    datasets: [
      {
        label: "სრული რაოდენობა",
        data: mergedStatisticData.map((item) => item.amount),
        backgroundColor: "rgb(" + colors.primary + "/ .1)",
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
      {
        label: "გადახდილი რაოდენობა",
        data: mergedStatisticData.map((item) => item.paidAmount),
        backgroundColor: "rgb(" + colors.primary + "/ .5)",
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  const unpaidAmountBarData = {
    labels: mergedStatisticData.map((item) => item.name),
    datasets: [
      {
        label: "რაოდენობა",
        data: mergedStatisticData.map((item) => item.amount - item.paidAmount),
        backgroundColor: "rgb(" + colors.primary + "/ .5)",
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  const countsData = {
    labels: mergedStatisticData.map((item) => item.name),
    datasets: [
      {
        label: "ტრანზაქციების რაოდენობა",
        data: mergedStatisticData.map((item) => item.transactionCount),
        backgroundColor: "rgb(" + colors.primary + "/ .5)",
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
      {
        label: "გადახდილი ტრანზაქციების რაოდენობა",
        data: mergedStatisticData.map((item) => item.paidTransactionCount),
        backgroundColor: "rgb(" + colors.primary + "/ .1)",
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  const loading =
    statisticFetching || orgsFetching || statisticLoading || orgLoading;
  return (
    <main className="workspace overflow-hidden pb-8 relative">
      {loading && <LoadingSpinner blur />}
      <h2 className="mb-3">
        {user === "owner" ? "ოვნერების" : "აგენტების"} სტატისტიკა
      </h2>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5 min-w-0">
          <h4 className="mb-3">თანხის რაოდენობა</h4>
          <BarChart
            data={amountBarData}
            config={barOptions(
              Math.max(...mergedStatisticData.map((item) => item.amount))
            )}
          />
        </div>

        <div className="card p-5 min-w-0">
          <h4 className="mb-3">გადაუხდელი თანხა</h4>
          <BarChart
            data={unpaidAmountBarData}
            config={barOptions(
              Math.max(
                ...mergedStatisticData.map(
                  (item) => item.amount - item.paidAmount
                )
              )
            )}
          />
        </div>
        <div className="card p-5 min-w-0">
          <h4 className="mb-3">ტრანზაქციების რაოდენობა</h4>
          <BarChart
            data={countsData}
            config={barOptions(
              Math.max(
                ...mergedStatisticData.map((item) => item.transactionCount)
              )
            )}
          />
        </div>
      </div>
    </main>
  );
};

export default Statistic;
