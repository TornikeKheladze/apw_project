import Footer from "partials/Footer";

import Tabs, {
  TabsContent,
  TabsContentItem,
  TabsNavigation,
  TabsNavigationItem,
} from "components/Tabs";
import Button from "components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserRoles from "./userRoles/UserRoles";
import { useSelector } from "react-redux";
// import SuperAdminDetails from "./userForm/SuperAdminDetails";
import NewPasswordForm from "./passwordForms/newPasswordForm/NewPasswordForm";
import UserEditForm from "./userForm/UserEditForm";

const UserEdit = () => {
  const navigate = useNavigate();
  const { authorizedUser } = useSelector((store) => store.user);
  const [searchParam] = useSearchParams();
  const activeIndex = searchParam.get("activeIndex");
  // const { action, id } = useParams();

  // const regularUserEditing =
  //   authorizedUser.id !== undefined &&
  //   action === "edit" &&
  //   !((authorizedUser.superAdmin && +authorizedUser.id === +id) || false);

  return (
    <main className="workspace">
      <div className="w-full md:flex justify-center">
        <div className="card p-5 md:w-2/3">
          <Button onClick={() => navigate(-1)}>უკან</Button>
          <Tabs activeIndex={activeIndex ? +activeIndex : 1} className="mt-5">
            <TabsNavigation>
              <TabsNavigationItem index={1}>დეტალები</TabsNavigationItem>
              <TabsNavigationItem index={2}>როლები</TabsNavigationItem>
              {authorizedUser.superAdmin || authorizedUser.isSip ? (
                <TabsNavigationItem index={3}>უსაფრთხოება</TabsNavigationItem>
              ) : (
                <></>
              )}
            </TabsNavigation>
            <TabsContent>
              <TabsContentItem index={1}>
                {/* {regularUserEditing ? <UserForm /> : <SuperAdminDetails />} */}
                <UserEditForm />
              </TabsContentItem>
              <TabsContentItem index={2}>
                <UserRoles />
              </TabsContentItem>
              <TabsContentItem index={3}>
                <NewPasswordForm />
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
