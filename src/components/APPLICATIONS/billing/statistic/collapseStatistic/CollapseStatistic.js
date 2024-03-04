import StatisticTabs from "../statisticTabs/StatisticTabs";
import {
  sumObjectKeys,
  mergeObjectsWithSimilarNames,
} from "helpers/sumObjectKeys";
import StatisticTable from "../statisticTable/StatisticTable";
import Tabs, {
  TabsContent,
  TabsContentItem,
  TabsNavigation,
  TabsNavigationItem,
} from "components/Tabs";

import StatisticChart from "../statisticChart/StatisticChart";
import { agentArr, ownerArr } from "../../formArrays/statisticArray";
import Collapse from "components/collapse/Collapse";

const CollapseStatistic = ({
  data,
  label,
  profitKey,
  nameKey,
  tableHeaderArr,
  ownerSum,
  agentSum,
  canceledData,
}) => {
  const propertiesToMerge = ["amount", profitKey, "transaction_count"];

  const mergedArray = mergeObjectsWithSimilarNames(
    data,
    propertiesToMerge,
    nameKey
  );

  const mergedCanceled =
    canceledData &&
    mergeObjectsWithSimilarNames(canceledData, propertiesToMerge, nameKey);

  const renderTable = (item, renderData) => {
    if (item) {
      return nameKey === "services_name" ? (
        <Tabs activeIndex={1} className="mt-5">
          <TabsNavigation>
            <TabsNavigationItem index={1} className="text-sm">
              აგენტები
            </TabsNavigationItem>
            <TabsNavigationItem index={2} className="text-sm">
              მომწოდებლები
            </TabsNavigationItem>
          </TabsNavigation>
          <TabsContent>
            <TabsContentItem index={1}>
              <StatisticTable
                data={agentSum.filter((dt) => dt[nameKey] === item.name)}
                headers={agentArr}
              />
            </TabsContentItem>
            <TabsContentItem index={2}>
              <StatisticTable
                data={ownerSum.filter((dt) => dt[nameKey] === item.name)}
                headers={ownerArr}
              />
            </TabsContentItem>
          </TabsContent>
        </Tabs>
      ) : (
        <StatisticTable
          data={renderData.filter((dt) => dt[nameKey] === item.name)}
          headers={tableHeaderArr}
        />
      );
    }
  };

  return (
    <Collapse
      mainInfo={{
        amount: sumObjectKeys(data).amount,
        profit: sumObjectKeys(data)[profitKey],
        quantity: sumObjectKeys(data).transaction_count,
      }}
      label={label}
    >
      {mergedArray.map((item) => {
        return (
          <Collapse
            key={item.name}
            label={item.name}
            mainInfo={{
              amount: item.amount,
              profit: item[profitKey],
              quantity: item.transaction_count,
              exportOrisFunc:
                label === "აგენტები"
                  ? () =>
                      data
                        .filter(
                          (requestData) => requestData.agent_name === item.name
                        )
                        .map((requestdata) => {
                          return {
                            ანგარიში: requestdata.oris,
                            დასახელება: `${requestdata.agent_name}/${requestdata.services_name}`,
                            თანხა: item.amount,
                          };
                        })
                  : undefined,
            }}
          >
            <StatisticTabs
              table={renderTable(item, data)}
              canceled={
                canceledData &&
                renderTable(
                  mergedCanceled.find(({ name }) => name === item.name),
                  canceledData
                )
              }
              graphical={
                <div className="md:w-1/2 mx-auto w-full">
                  <StatisticChart
                    data={mergedArray}
                    nameKey={"name"}
                    chartValue={"amount"}
                  />
                </div>
              }
            />
          </Collapse>
        );
      })}
    </Collapse>
  );
};

export default CollapseStatistic;
