import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

import {
  addSuperAdminRole,
  // createRole,
  deleteSuperAdminRole,
  getRolesData,
  updateSuperAdminRole,
} from "services/roles";

export const useRoles = () => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [choosenRole, setChoosenRole] = useState({});
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });
  const { authorizedUser } = useSelector((store) => store.user);

  const {
    data: rolesData = { roles: [], permission: [] },
    isLoading: rolesDataLoading,
  } = useQuery({
    queryKey: "getRolesData",
    queryFn: () => getRolesData().then((res) => res.data.data),
  });

  const afterRequestHandler = (type, message) => {
    queryClient.invalidateQueries("getRolesData");
    setAlert({
      message,
      type,
    });
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setTimeout(() => {
      setAlert({
        message: "",
        type,
      });
    }, 2500);
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    // mutationFn: authorizedUser.superAdmin ? addSuperAdminRole : createRole,
    mutationFn: addSuperAdminRole,
    onSuccess: () => afterRequestHandler("success", "როლი წარმატებით შეიქმნა"),
    onError: () => afterRequestHandler("danger", "როლის შექმნა ვერ მოხერხდა"),
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: () => deleteSuperAdminRole({ role_id: choosenRole.id }),
    onSuccess: () => afterRequestHandler("success", "როლი წარმატებით წაიშალა"),
    onError: () => afterRequestHandler("danger", "როლის წაშლა ვერ მოხერხდა"),
  });

  const { mutate: editMutate, isLoading: editLoading } = useMutation({
    mutationFn: updateSuperAdminRole,
    onSuccess: () => afterRequestHandler("success", "როლი წარმატებით შეიცვალა"),
    onError: () => afterRequestHandler("danger", "როლის შექმნა ვერ მოხერხდა"),
  });

  // const roles = () => {
  //   const roles = rolesData.roles || [];
  //   if (authorizedUser.superAdmin) return roles;
  //   return roles.filter((role) => role.oid === authorizedUser.oid) || [];
  // };

  return {
    roles: rolesData.roles,
    isLoading: rolesDataLoading,
    permissions: rolesData.permission,
    authorizedUser,
    loadings: {
      createLoading,
      deleteLoading,
      editLoading,
    },
    mutates: {
      createMutate,
      deleteMutate,
      editMutate,
    },
    states: {
      isDeleteModalOpen,
      isEditModalOpen,
      choosenRole,
      alert,
    },
    setStates: {
      setIsDeleteModalOpen,
      setIsEditModalOpen,
      setChoosenRole,
    },
  };
};
