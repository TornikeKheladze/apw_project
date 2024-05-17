// import Customizer from "partials/Customizer";
import TopBar from "partials/TopBar";
import SuperAdminMenuBar from "./SuperAdminMenuBar";
import ScrollToTop from "components/icons/ScrollToTop";

const Navigation = () => {
  return (
    <>
      <TopBar />
      {/* <MenuBar /> */}
      {/* <CustomMenuBar /> */}
      <SuperAdminMenuBar className="bg-danger w-[1000px]" />
      {/* <Customizer /> */}
      <ScrollToTop />
    </>
  );
};

export default Navigation;
