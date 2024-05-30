import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  addSuperAdminRole,
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

  return {
    roles: rolesData.roles,
    isLoading: rolesDataLoading,
    permissions: rolesData.permission,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    choosenRole,
    setChoosenRole,
    createMutate,
    alert,
    createLoading,
    deleteMutate,
    deleteLoading,
    editMutate,
    editLoading,
  };
};
