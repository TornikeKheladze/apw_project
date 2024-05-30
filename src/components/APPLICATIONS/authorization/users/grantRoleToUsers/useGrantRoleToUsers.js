import { APPLICATIONS } from "data/applications";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getRolesData, setRolesToUser } from "services/roles";
import { getUsersByTypeAndId } from "services/users";

const useGrantRoleToUsers = () => {
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState();
  const { type, id } = useParams();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  const afterRequestHandler = (message, type) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert({
        type: type,
        message: "",
      });
    }, 2000);
    queryClient.invalidateQueries(["getUsers", type, id]);
    if (type === "success") {
      setSelectedRole("");
      setSelectedUsers([]);
    }
  };

  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["getUsers", type, id],
    queryFn: () =>
      getUsersByTypeAndId(type, id).then((res) => res?.data?.users),
  });

  const {
    data: rolesData = { roles: [], permission: [] },
    isLoading: rolesDataLoading,
  } = useQuery({
    queryKey: "getRolesData",
    queryFn: () => getRolesData().then((res) => res.data.data),
    staleTime: Infinity,
  });

  const { mutate: setRoleMutate, isLoading: setRoleMutateLoading } =
    useMutation({
      mutationFn: (data) => setRolesToUser(data),
      onSuccess: () =>
        afterRequestHandler("როლის დამატება წარმატებულია", "success"),
      onError: () =>
        afterRequestHandler("როლის დამატება ვერ მოხერხდა", "danger"),
    });

  const roleChangeHandler = (e) => {
    setSelectedRole(+e.target.value);
  };

  const handleCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== userId)
      );
    }
  };

  const submitHandler = async () => {
    const aid = rolesData.roles.find((role) => +role.id === +selectedRole).aid;
    const url = APPLICATIONS.find((app) => +app.id === +aid).url;
    setRoleMutate({ aid, url, role_id: selectedRole, user_id: selectedUsers });
  };

  return {
    roles: rolesData.roles,
    selectedUsers,
    selectedRole,
    users,
    isLoading: rolesDataLoading || isUsersLoading,
    roleChangeHandler,
    submitHandler,
    handleCheckboxChange,
    setRoleMutateLoading,
    alert,
  };
};

export default useGrantRoleToUsers;
