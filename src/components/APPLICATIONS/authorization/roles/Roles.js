import Footer from "partials/Footer";

import EditRoleModal from "./editModal/EditRoleModal";
import AddRole from "./addRole/AddRole";

import { useRoles } from "./useRoles";
import DeleteModal from "components/customModal/DeleteModal";
import List from "components/list/List";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Alert from "components/Alert";

const Roles = () => {
  const {
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
    isLoading,
    successMessage,
    actionLoading,
  } = useRoles();

  return (
    <main className="workspace">
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        action={deleteRole}
        title={"როლის წაშლა"}
        loading={actionLoading}
      />
      <EditRoleModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        role={choosenRole}
        action={editRole}
        loading={actionLoading}
      />
      <AddRole add={add} loading={actionLoading} />

      <div className="card p-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : roles?.length ? (
          <List
            items={roles}
            openDelete={setIsDeleteModalOpen}
            openEdit={setIsEditModalOpen}
            setChoosenItem={setChoosenRole}
            title={"დასახელება"}
          />
        ) : (
          <p>როლები არ მოიძებნა</p>
        )}
      </div>
      <Alert message={successMessage} color="success" dismissable>
        {successMessage}
      </Alert>
      <Footer />
    </main>
  );
};

export default Roles;
