import Tabs, {
  TabsContent,
  TabsContentItem,
  TabsNavigation,
  TabsNavigationItem,
} from "components/Tabs";
import CurrentBalanceCard from "./currentBalanceCard/CurrentBalanceCard";
import { useCurrentBalance } from "./useCurrentBalance";
import LoadingSpinner from "components/icons/LoadingSpinner";

const CurrentBalance = () => {
  const { loading, balance } = useCurrentBalance();
  return (
    <main className="workspace p-5">
      <h3 className="mb-6 mt-8">მიმდინარე ბალანსები</h3>
      <Tabs activeIndex={1} className="mt-5">
        <TabsNavigation>
          <TabsNavigationItem index={1} className="uppercase">
            აგენტები
          </TabsNavigationItem>
          <TabsNavigationItem index={2} className="uppercase">
            მომწოდებლები
          </TabsNavigationItem>
        </TabsNavigation>
        <TabsContent>
          <TabsContentItem index={1}>
            <div className="relative flex gap-8 flex-wrap justify-center transition-all ">
              {loading ? (
                <div className="flex flex-col items-center justify-center">
                  <LoadingSpinner blur />
                </div>
              ) : balance.length > 0 ? (
                balance.map(
                  (balance) =>
                    balance.type === "agent" && (
                      <CurrentBalanceCard key={balance.name} data={balance} />
                    )
                )
              ) : (
                <p>ინფორმაცია არ მოიძებნა</p>
              )}
            </div>
          </TabsContentItem>
          <TabsContentItem index={2}>
            <div className="relative flex gap-8 flex-wrap justify-center transition-all ">
              {loading ? (
                <div className="flex flex-col items-center justify-center">
                  <LoadingSpinner blur />
                </div>
              ) : balance.length > 0 ? (
                balance.map(
                  (balance) =>
                    balance.type === "owner" && (
                      <CurrentBalanceCard key={balance.name} data={balance} />
                    )
                )
              ) : (
                <p>ინფორმაცია არ მოიძებნა</p>
              )}
            </div>
          </TabsContentItem>
        </TabsContent>
      </Tabs>
    </main>
  );
};
export default CurrentBalance;
