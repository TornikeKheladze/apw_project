import useThemeOptions from "utilities/hooks/useThemeOptions";
import Input from "components/form/Input";
import Pie from "components/charts/Pie";
import { useMutation, useQuery } from "react-query";
import {
  getUsersActivityStatistic,
  getUsersActivityStatisticSuperAdmin,
  getUsersDepartmentsStatistic,
  getUsersDepartmentsStatisticSuperAdmin,
  getUsersPositionsStatistic,
  getUsersPositionsStatisticSuperAdmin,
} from "services/statistics";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "components/Button";

import LoadingSpinner from "components/icons/LoadingSpinner";
import { getOrganizations } from "services/organizations";
import Dropdown from "components/Dropdown";
import { truncateText } from "helpers/truncateText";

const UserStatistic = () => {
  const { colors } = useThemeOptions();
  const [chosenOrg, setChosenOrg] = useState("");
  const opacities = [0.3, 0.8, 0.2, 0.6, 0.9, 0.1, 0.7, 0.5, 0.4];
  const [dateFilter, setDateFilter] = useState({
    start_date: "",
    end_date: "",
  });

  const authorizedUser = useSelector((state) => state.user.authorizedUser);

  const { data: organisations } = useQuery({
    queryKey: "getOrganizationsData",
    queryFn: () => getOrganizations().then((res) => res.data?.data),
    enabled: authorizedUser?.superAdmin,
  });

  const {
    mutate: getUsersActivityStatisticMutate,
    isLoading: getUsersActivityStatisticLoading,
    data: getUsersActivityStatisticData,
  } = useMutation({
    mutationFn: authorizedUser?.superAdmin
      ? getUsersActivityStatisticSuperAdmin
      : getUsersActivityStatistic,
  });
  const userActiveStatistic = getUsersActivityStatisticData?.data?.data;

  const {
    mutate: getUsersDepartmentsStatisticMutate,
    isLoading: getUsersDepartmentsStatisticLoading,
    data: getUsersDepartmentsStatisticData,
  } = useMutation({
    mutationFn: authorizedUser?.superAdmin
      ? getUsersDepartmentsStatisticSuperAdmin
      : getUsersDepartmentsStatistic,
  });
  const userDepartmentstatistic = getUsersDepartmentsStatisticData?.data?.data;

  const {
    mutate: getUsersPositionsStatisticMutate,
    isLoading: getUsersPositionsStatisticLoading,
    data: getUsersPositionsStatisticData,
  } = useMutation({
    mutationFn: authorizedUser?.superAdmin
      ? getUsersPositionsStatisticSuperAdmin
      : getUsersPositionsStatistic,
  });
  const userPositionsStatistic = getUsersPositionsStatisticData?.data?.data;

  useEffect(() => {
    if (!authorizedUser?.superAdmin) {
      getUsersActivityStatisticMutate(dateFilter);
      getUsersDepartmentsStatisticMutate(dateFilter);
      getUsersPositionsStatisticMutate(dateFilter);
    } else {
      if (chosenOrg && authorizedUser?.superAdmin) {
        getUsersActivityStatisticMutate({
          oid: chosenOrg?.id,
          data: dateFilter,
        });
        getUsersDepartmentsStatisticMutate({
          oid: chosenOrg?.id,
          data: dateFilter,
        });
        getUsersPositionsStatisticMutate({
          oid: chosenOrg?.id,
          data: dateFilter,
        });
      }
    }
  }, [
    dateFilter,
    getUsersActivityStatisticMutate,
    getUsersDepartmentsStatisticMutate,
    getUsersPositionsStatisticMutate,
    chosenOrg,
    authorizedUser?.superAdmin,
  ]);

  const userDepartmentsStatisticConfig = {
    labels: userDepartmentstatistic?.map((d) => d.name),
    datasets: [
      {
        data: userDepartmentstatistic?.map((d) => d.users),
        backgroundColor: [
          "rgb(" + colors.primary + "/ .1)",
          "rgb(" + colors.primary + "/ .5)",
          "rgb(" + colors.primary + "/ .25)",
        ],
        // backgroundColor: userDepartmentstatistic?.map(
        //   (d, index) =>
        //     "rgb(" +
        //     colors.primary +
        //     `/ ${opacities[index % opacities.length]})`
        // ),
        borderColor: "rgb(" + colors.primary + ")",
        borderWidth: 2,
      },
    ],
  };

  const userActiveStatisticConfig = {
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

  const userPositionsStatisticConfig = {
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
        </div>
      </div>
      {authorizedUser?.superAdmin && (
        <Dropdown
          content={
            <div className="dropdown-menu min-w-[12rem]">
              {organisations?.map((org) => (
                <p
                  className="cursor-pointer mb-1 border-b border-transparent pb-1 hover:border-primary"
                  onClick={() => setChosenOrg(org)}
                  key={org.id + Math.random()}
                >
                  {org.name}
                </p>
              ))}
            </div>
          }
        >
          <Button className="uppercase mb-6 min-w-[12rem] flex justify-between w-1/2">
            {truncateText(chosenOrg?.name, 40) || "აირჩიეთ ორგანიზაცია"}
            <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
          </Button>
        </Dropdown>
      )}
      {(getUsersActivityStatisticLoading ||
        getUsersDepartmentsStatisticLoading ||
        getUsersPositionsStatisticLoading) && <LoadingSpinner blur />}

      {(chosenOrg && authorizedUser?.superAdmin) ||
      !authorizedUser?.superAdmin ? (
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="card p-5 min-w-0">
            <h4>მომხმარებლების რაოდენობა</h4>
            <div className="mt-5 min-w-0">
              {userActiveStatistic?.active === 0 &&
              userActiveStatistic?.deactivate === 0 ? (
                <p className="text-center mt-4">ინფორმაცია არ მოიძებნა</p>
              ) : (
                <Pie data={userActiveStatisticConfig} withShadow />
              )}
            </div>
          </div>
          <div className="card p-5 min-w-0">
            <h4>მომხმარებლების რაოდენობა დეპანტამენტების მიხედვით</h4>
            <div className="mt-5 min-w-0">
              {userDepartmentstatistic?.length ? (
                <Pie data={userDepartmentsStatisticConfig} withShadow />
              ) : (
                <p className="text-center mt-4">ინფორმაცია არ მოიძებნა</p>
              )}
            </div>
          </div>
          <div className="card p-5 min-w-0">
            <h4>მომხმარებლების რაოდენობა პოზიციების მიხედვით</h4>
            <div className="mt-5 min-w-0">
              {userPositionsStatistic?.length ? (
                <Pie data={userPositionsStatisticConfig} withShadow />
              ) : (
                <p className="text-center mt-4">ინფორმაცია არ მოიძებნა</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>აირჩიეთ ორგანიზაცია სტატისტიკის სანახავად</p>
      )}
    </main>
  );
};

export default UserStatistic;
