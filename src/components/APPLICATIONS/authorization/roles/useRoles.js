import { APPLICATIONS } from "data/applications";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  savePermissions,
  saveRoles,
  saveRolesDepOnPrev,
} from "reducers/RoleReducer";
import {
  addRole,
  addSuperAdminRole,
  deleteRoleById,
  deleteSuperAdminRole,
  getRolesAndPermissionsData,
  getSuperAdminData,
} from "services/roles";

export const useRoles = () => {
  const dispatch = useDispatch();
  const { authorizedUser } = useSelector((store) => store.user);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [choosenRole, setChoosenRole] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { roles } = useSelector((store) => store.role);
  const [successMessage, setSuccessMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = () => {
      const fetchAndSave = async (fetchFunc) => {
        setIsLoading(true);
        const res = await fetchFunc();
        dispatch(saveRolesDepOnPrev(res.data.data.roles));
        dispatch(savePermissions(res.data.data.permission));
        setIsLoading(false);
      };

      if (authorizedUser.id) {
        try {
          if (authorizedUser?.superAdmin) {
            fetchAndSave(getSuperAdminData);
          } else {
            const uniqueAids = [
              ...new Set(authorizedUser.roles.map((role) => role.aid)),
            ];
            uniqueAids.forEach((aid) => {
              fetchAndSave(() =>
                getRolesAndPermissionsData(
                  APPLICATIONS.find((app) => app.id === aid).url
                )
              );
            });
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    };

    fetchInitialData();
    return () => {
      dispatch(saveRoles([]));
    };
  }, [dispatch, authorizedUser]);

  const editRole = async (data) => {
    try {
      setActionLoading("isEditing");
      if (authorizedUser.superAdmin) {
        const res = await addSuperAdminRole(data);
        dispatch(
          saveRoles(
            roles?.map((role) =>
              role.id === res.data.data.route.id ? res.data.data.route : role
            )
          )
        );
      } else {
        const res = await addRole(
          data,
          APPLICATIONS.find((app) => +app.id === +data.aid).url
        );
        dispatch(
          saveRoles(
            roles?.map((role) =>
              role.id === res.data.data.route.id ? res.data.data.route : role
            )
          )
        );
      }
      setSuccessMessage("როლი წარმატებით შეიცვალა");
      setActionLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      console.log(error);
      setActionLoading(false);
    }
  };

  const deleteRole = async () => {
    const update = (id) => {
      const updatedList = roles.filter((role) => role.id !== id);
      dispatch(saveRoles(updatedList));
      setIsDeleteModalOpen(false);
      setChoosenRole({});
    };
    try {
      setActionLoading("isDeleting");
      if (authorizedUser.superAdmin) {
        const res = await deleteSuperAdminRole({
          role_id: choosenRole.id,
        });
        update(res.data.data.route.id);
      } else {
        const res = await deleteRoleById(
          {
            role_id: choosenRole.id,
          },
          APPLICATIONS.find((app) => +app.id === +choosenRole.aid).url
        );
        update(res.data.data.route.id);
      }
      setSuccessMessage("როლი წარმატებით წაიშალა");
      setActionLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      setActionLoading(false);
    }
  };

  const add = async (data) => {
    try {
      setActionLoading("isAdding");
      if (authorizedUser.superAdmin) {
        const res = await addSuperAdminRole(data);
        dispatch(saveRoles([...roles, res.data.data.route]));
      } else {
        const res = await addRole(
          data,
          APPLICATIONS.find((app) => +app.id === +data.aid).url
        );
        dispatch(saveRoles([...roles, res.data.data.route]));
      }
      setSuccessMessage("როლი წარმატებით დაემატა");
      setActionLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      console.log(error);
      setActionLoading(false);
    }
  };

  return {
    add,
    deleteRole,
    editRole,
    roles,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    choosenRole,
    setChoosenRole,
    dispatch,
    isLoading,
    successMessage,
    actionLoading,
  };
};
