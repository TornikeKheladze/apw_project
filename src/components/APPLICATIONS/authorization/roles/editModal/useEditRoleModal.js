import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
let billingPermissions = require("../../../../../data/billingPermissions.json");

export const useEditRoleModal = (role) => {
  const { permissions } = useSelector((state) => state.role);

  const [input, setInput] = useState("");
  const [currentPermissions, setCurrentPermissions] = useState([]);

  useEffect(() => {
    setCurrentPermissions(
      role?.permissions?.map((p) => {
        return { ...p, name: billingPermissions[p.name] };
      })
    );
    setInput(role?.name);
  }, [role]);

  return {
    permissions,
    input,
    setInput,
    currentPermissions,
    setCurrentPermissions,
  };
};
