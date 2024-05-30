import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import Input from "components/form/Input";
import PermissionSelect from "../PermissionSelect";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { permissionsObj } from "data/permissions";
import { useEffect, useState } from "react";

const EditRoleModal = ({
  isOpen,
  setIsOpen,
  role,
  action,
  loading,
  permissions = [],
}) => {
  const [currentPermissions, setCurrentPermissions] = useState([]);

  useEffect(() => {
    setCurrentPermissions(
      role?.permissions?.map((p) => {
        return { ...p, name: permissionsObj[p.name] };
      })
    );
  }, [role]);

  return (
    <Modal active={isOpen} onClose={() => setIsOpen(false)}>
      <ModalHeader>როლის ცვლილება</ModalHeader>
      <ModalBody>
        {/* {loading === "isEditing" && <LoadingSpinner blur />} */}
        <Input value={role.name} readOnly />
        <h4 className="mt-5">უფლებები</h4>
        <PermissionSelect
          options={permissions.map(({ name, ...p }) => ({
            ...p,
            name: permissionsObj[name],
          }))}
          selectedPermissions={currentPermissions}
          setSelectedPermissions={setCurrentPermissions}
        />
      </ModalBody>
      <ModalFooter>
        <div className="flex ltr:ml-auto rtl:mr-auto">
          <Button
            color="secondary"
            className="uppercase"
            onClick={() => setIsOpen(false)}
          >
            უკან დაბრუნება
          </Button>
          <Button
            onClick={() => {
              action({
                role_name: role.name,
                permission: currentPermissions.map(({ id }) => id),
                id: role.id,
                aid: role.aid,
              });
            }}
            className="ltr:ml-2 rtl:mr-2 uppercase"
          >
            {loading === "isEditing" ? (
              <span className="w-[5.8rem]">
                <LoadingSpinner />
              </span>
            ) : (
              "დადასტურება"
            )}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default EditRoleModal;
