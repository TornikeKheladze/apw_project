import Tabs, {
  TabsContent,
  TabsContentItem,
  TabsNavigation,
  TabsNavigationItem,
} from "components/Tabs";

const StatisticTabs = ({ table, canceled, graphical }) => {
  return (
    <Tabs activeIndex={1} className="mt-5">
      <TabsNavigation>
        <TabsNavigationItem index={1} className="text-sm">
          ცხრილი
        </TabsNavigationItem>
        {canceled && (
          <TabsNavigationItem index={2} className="text-sm">
            გაუქმებული
          </TabsNavigationItem>
        )}

        <TabsNavigationItem index={3} className="text-sm">
          გრაფიკული
        </TabsNavigationItem>
      </TabsNavigation>
      <TabsContent>
        <TabsContentItem index={1}>{table}</TabsContentItem>
        <TabsContentItem index={2}>{canceled}</TabsContentItem>
        <TabsContentItem index={3}>{graphical}</TabsContentItem>
      </TabsContent>
    </Tabs>
  );
};

export default StatisticTabs;
