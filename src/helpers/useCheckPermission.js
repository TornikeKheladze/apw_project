import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCheckPermission = (perm) => {
  const { authorizedUser } = useSelector((state) => state.user);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (authorizedUser.name) {
      if (
        !authorizedUser.roles
          .map((role) => role.permissions)
          ?.flat()
          .map(({ name }) => name)
          .includes(perm)
      ) {
        setHasAccess(false);
      } else {
        setHasAccess(true);
      }
    }
  }, [authorizedUser, perm]);

  return hasAccess;
};

export default useCheckPermission;

export const useCheckAID = (aid) => {
  const { authorizedUser } = useSelector((state) => state.user);
  const roles = authorizedUser.roles || [];

  if (authorizedUser.superAdmin) return true;
  if (roles.find((role) => role.aid === aid)) return true;
  return false;
};
