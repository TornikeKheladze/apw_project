import Footer from "partials/Footer";

import EditRoleModal from "./editModal/EditRoleModal";
import AddRole from "./addRole/AddRole";

import { useRoles } from "./useRoles";
import DeleteModal from "components/customModal/DeleteModal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Alert from "components/Alert";
import RoleList from "components/list/RoleList";

const Roles = () => {
  const {
    roles,
    isLoading,
    permissions,
    loadings: { createLoading, deleteLoading, editLoading },
    mutates: { createMutate, deleteMutate, editMutate },
    states: { isDeleteModalOpen, isEditModalOpen, choosenRole, alert },
    setStates: { setIsDeleteModalOpen, setIsEditModalOpen, setChoosenRole },
  } = useRoles();

  return (
    <main className="workspace">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        action={deleteMutate}
        title={"როლის წაშლა"}
        loading={deleteLoading}
      />
      <EditRoleModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        role={choosenRole}
        action={editMutate}
        loading={editLoading}
        permissions={permissions}
      />
      <AddRole
        permissions={permissions}
        add={createMutate}
        loading={createLoading}
      />

      <div className="card p-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : roles?.length ? (
          <RoleList
            items={roles}
            openDelete={setIsDeleteModalOpen}
            openEdit={setIsEditModalOpen}
            setChoosenItem={setChoosenRole}
            title={"როლები"}
          />
        ) : (
          <p>როლები არ მოიძებნა</p>
        )}
      </div>
      <Alert message={alert.message} color={alert.type} dismissable />

      <Footer />
    </main>
  );
};

export default Roles;
