import useThemeOptions from "utilities/hooks/useThemeOptions";
import Input from "components/form/Input";
import Pie from "components/charts/Pie";
import { useQuery } from "react-query";
import {
  getUsersActivityStatistic,
  getUsersDepartmentsStatistic,
  getUsersPositionsStatistic,
} from "services/statistics";
import { useSelector } from "react-redux";
import { useState } from "react";
import Button from "components/Button";

const UserStatistic = () => {
  const { colors } = useThemeOptions();
  const opacities = [0.3, 0.8, 0.2, 0.6, 0.9, 0.1, 0.7, 0.5, 0.4];
  const [dateFilter, setDateFilter] = useState({
    start_date: "",
    end_date: "",
  });
  console.log(dateFilter);

  const { authorizedUser } = useSelector((store) => store.user);

  const { data: userActiveStatistic = [] } = useQuery({
    queryKey: "userActiveStatistic",
    queryFn: () =>
      getUsersActivityStatistic(authorizedUser?.oid).then(
        (res) => res.data.data
      ),
  });

  const { data: userDepartmentstatistic = [] } = useQuery({
    queryKey: "userDepartmentstatistic",
    queryFn: () =>
      getUsersDepartmentsStatistic(authorizedUser?.oid).then(
        (res) => res.data.data
      ),
  });

  const { data: userPositionsStatistic = [] } = useQuery({
    queryKey: "userPositionsStatistic",
    queryFn: () =>
      getUsersPositionsStatistic(authorizedUser?.oid).then(
        (res) => res.data.data
      ),
  });

  console.log(userPositionsStatistic);

  const departments = {
    labels: userDepartmentstatistic.map((d) => d.name),
    datasets: [
      {
        data: userDepartmentstatistic?.map((d) => d.users),
        // backgroundColor: [
        //   "rgb(" + colors.primary + "/ .1)",
        //   "rgb(" + colors.primary + "/ .5)",
        //   "rgb(" + colors.primary + "/ .25)",
        // ],
        // `/ .${opacities[index % opacities.length]})`
        backgroundColor: userDepartmentstatistic?.map(
          (d, index) =>
            "rgb(" +
            colors.primary +
            `/ ${opacities[index % opacities.length]})`
        ),
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };
  const userActiveStatisticData = {
    labels: ["აქტიური", "არააქტიური"],
    datasets: [
      {
        data: [userActiveStatistic?.active, userActiveStatistic?.deactivate],
        backgroundColor: [
          "rgb(" + colors.primary + "/ .1)",
          "rgb(" + colors.primary + "/ .5)",
        ],
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  const userOositionsData = {
    labels: userPositionsStatistic?.map((p) => p.position_name),
    datasets: [
      {
        data: userPositionsStatistic?.map((p) => p.users),
        backgroundColor: userDepartmentstatistic?.map(
          (_, index) =>
            "rgb(" +
            colors.primary +
            `/ ${opacities[index % opacities.length]})`
        ),
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  return (
    <main className="workspace overflow-hidden pb-8 relative">
      {/* {loading && <LoadingSpinner blur />} */}
      <div className="flex lg:flex-row flex-col gap-4 justify-between  mb-3">
        <h2 className="mb-3  sm:text-xl text-base text-left">
          მომხმარებლების სტატისტიკა
        </h2>
        <div className="flex gap-2 sm:flex-row flex-col mb-5">
          <Input
            onChange={(e) =>
              setDateFilter({ ...dateFilter, start_date: e.target.value })
            }
            type="date"
          />
          <Input
            onChange={(e) =>
              setDateFilter({ ...dateFilter, end_date: e.target.value })
            }
            type="date"
          />
          <Button
            onClick={() => {
              console.log(dateFilter);
            }}
            className="justify-center"
          >
            გაფილტვრა
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5 min-w-0">
          <h3>მომხმარებლების რაოდენობა</h3>
          <div className="mt-5 min-w-0">
            <Pie data={userActiveStatisticData} withShadow />
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
            <Pie data={userOositionsData} withShadow />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserStatistic;
