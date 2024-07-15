import { useNavigate } from "react-router-dom";
// import SuperAdminDashboard from "./SuperAdminDashboard";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { authorizedUser } = useSelector((store) => store.user);
  const navigate = useNavigate("/");
  useEffect(() => {
    if (authorizedUser.superAdmin) {
      navigate("/sips");
    } else if (authorizedUser.isSip) {
      navigate("/organizations");
    } else {
      navigate(`/users/organisation/${authorizedUser.oid}`);
    }
  }, [navigate, authorizedUser]);
  // return <SuperAdminDashboard />;
  return <></>;
};

export default Home;
