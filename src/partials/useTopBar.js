import useDarkMode from "utilities/hooks/useDarkMode";
import useFullscreen from "utilities/hooks/useFullScreen";
import { getAuthorizedUser } from "services/users";
import { saveAuthOrg, saveAuthorizedUser } from "reducers/UserReducer";
import { useNavigate } from "react-router-dom";
import { logout } from "services/authorization";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getOrganizationById } from "services/organizations";

export const useTopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuBarVisible = useSelector((state) => state.root.menuBarVisible);
  const { authorizedUser } = useSelector((state) => state.user);

  useQuery({
    queryKey: ["getAuthorizedOrganization", authorizedUser.oid],
    queryFn: () =>
      getOrganizationById(authorizedUser.oid).then((res) => res.data.data),
    onSuccess: (data) => {
      dispatch(saveAuthOrg(data));
      if (data.sip === 1) {
        dispatch(saveAuthorizedUser({ ...authorizedUser, isSip: true }));
      }
    },
    enabled: authorizedUser.oid ? true : false,
  });

  useQuery({
    queryKey: ["getAuthorizedUser"],
    queryFn: getAuthorizedUser,
    onSuccess: (res) => {
      const superAdmin = res.data.user.roles[0]?.name === "Super-Admin";
      dispatch(
        saveAuthorizedUser({ ...authorizedUser, ...res.data.user, superAdmin })
      );
    },
    onError: () => navigate("/login"),
    retry: false,
  });

  const [darkMode, toggleDarkMode] = useDarkMode();
  const [isFullscreen, toggleFullscreen] = useFullscreen();

  const logoutUser = async () => {
    try {
      await logout();
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
