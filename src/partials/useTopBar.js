import useDarkMode from "utilities/hooks/useDarkMode";
import useFullscreen from "utilities/hooks/useFullScreen";
import { useEffect } from "react";
import { getAuthorizedUser } from "services/users";
import { saveAuthorizedUser } from "reducers/UserReducer";
import { useNavigate } from "react-router-dom";
import { logout } from "services/authorization";
import { useDispatch, useSelector } from "react-redux";

export const useTopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuBarVisible = useSelector((state) => state.root.menuBarVisible);
  const authorizedUser = useSelector((state) => state.user.authorizedUser);

  const [darkMode, toggleDarkMode] = useDarkMode();
  const [isFullscreen, toggleFullscreen] = useFullscreen();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authorizedUser.name) {
        try {
          const res = await getAuthorizedUser();
          const superAdmin = res.data.user.roles[0]?.name === "Super-Admin";
          dispatch(saveAuthorizedUser({ ...res.data.user, superAdmin }));
        } catch (error) {
          navigate("/login");
        }
      }
    };

    fetchUserData();
  }, [dispatch, authorizedUser, navigate]);

  const logoutUser = async () => {
    try {
      const res = await logout();
      dispatch(saveAuthorizedUser({}));
      localStorage.removeItem("token");
      // temporary navigation
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    logoutUser,
    darkMode,
    toggleDarkMode,
    isFullscreen,
    toggleFullscreen,
    menuBarVisible,
    authorizedUser,
    dispatch,
    navigate,
  };
};
