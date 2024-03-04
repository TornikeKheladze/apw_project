import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveRoles } from "reducers/RoleReducer";
import { saveUsers } from "reducers/UserReducer";
import {
  getRolesAndPermissionsData,
  getSuperAdminData,
  setRolesToUser,
} from "services/roles";
import { getUsersByTypeAndId } from "services/users";

const useGrantRoleToUsers = () => {
  const [selectedRole, setSelectedRole] = useState();
  const dispatch = useDispatch();
  const allRoles = useSelector((state) => state.role.roles);
  const users = useSelector((state) => state.user.users);
  const [roleGranted, setRoleGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { type, id } = useParams();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { authorizedUser } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchRoles = async () => {
      const fetchAndSave = async (fetchFunc) => {
        const res = await fetchFunc();
        dispatch(saveRoles(res.data.data.roles));
      };
      try {
        setIsLoading(true);
        if (authorizedUser.superAdmin) {
          fetchAndSave(getSuperAdminData);
        } else {
          if (authorizedUser.roles?.map((role) => role.aid).includes(2)) {
            fetchAndSave(() => getRolesAndPermissionsData("documents"));
          }
          if (authorizedUser.roles?.map((role) => role.aid).includes(4)) {
            fetchAndSave(() => getRolesAndPermissionsData("billing"));
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchRoles();
  }, [dispatch, authorizedUser]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsersByTypeAndId(type, id);
      dispatch(saveUsers(res?.data?.users));
    };
    fetchUsers();
    return () => {
      dispatch(saveUsers([]));
    };
  }, [id, type, dispatch]);

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
    const roleData = {
      aid: 1,
      role_id: selectedRole,
      user_id: selectedUsers,
    };
    try {
      setIsLoading(true);
      await setRolesToUser(roleData);
      setIsLoading(false);
      setRoleGranted(true);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setRoleGranted(false);
    }, [2000]);
    setSelectedRole("");
    setSelectedUsers([]);
  };

  return {
    allRoles,
    selectedUsers,
    selectedRole,
    users,
    roleGranted,
    isLoading,
    roleChangeHandler,
    submitHandler,
    handleCheckboxChange,
  };
};

export default useGrantRoleToUsers;
