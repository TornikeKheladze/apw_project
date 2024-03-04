import Footer from "partials/Footer";

import Tabs, {
  TabsContent,
  TabsContentItem,
  TabsNavigation,
  TabsNavigationItem,
} from "components/Tabs";
import UserForm from "./userForm/UserForm";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";
import Password from "./passwordForms/Password";
import UserRoles from "./userRoles/UserRoles";

const UserEdit = () => {
  const navigate = useNavigate();

  return (
    <main className="workspace">
      <div className="w-full flex justify-center">
        <div className="card p-5 md:w-2/3">
          <Button onClick={() => navigate(-1)}>უკან</Button>
          <Tabs activeIndex={1} className="mt-5">
            <TabsNavigation>
              <TabsNavigationItem index={1}>დეტალები</TabsNavigationItem>
              <TabsNavigationItem index={2}>როლები</TabsNavigationItem>
              <TabsNavigationItem index={3}>უსაფრთხოება</TabsNavigationItem>
            </TabsNavigation>
            <TabsContent>
              <TabsContentItem index={1}>
                <UserForm />
              </TabsContentItem>
              <TabsContentItem index={2}>
                <UserRoles />
              </TabsContentItem>
              <TabsContentItem index={3}>
                <Password />
              </TabsContentItem>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default UserEdit;
