import { useNavigate } from "react-router-dom";
// import SuperAdminDashboard from "./SuperAdminDashboard";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate("/");
  useEffect(() => {
    navigate("/organizations");
  }, [navigate]);
  // return <SuperAdminDashboard />;
  return <></>;
};

export default Home;
