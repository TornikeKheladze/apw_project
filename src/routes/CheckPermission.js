import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckPermission = ({ perm, children }) => {
  const navigate = useNavigate("");
  const { authorizedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (authorizedUser.name) {
      if (
        !authorizedUser.roles
          .map((role) => role.permissions)
          ?.flat()
          .map(({ name }) => name)
          .includes(perm)
      ) {
        navigate(-1);
      }
    }
  }, [navigate, authorizedUser, perm]);

  return children;
};

export default CheckPermission;
