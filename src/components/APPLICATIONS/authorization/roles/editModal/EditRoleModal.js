import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import Input from "components/form/Input";
import { useEditRoleModal } from "./useEditRoleModal";
import PermissionSelect from "../PermissionSelect";
import LoadingSpinner from "components/icons/LoadingSpinner";
let billingPermissions = require("../../../../../data/billingPermissions.json");

const EditRoleModal = ({ isOpen, setIsOpen, role, action, loading }) => {
  const {
    permissions,
    input = "",
    currentPermissions,
    setCurrentPermissions,
  } = useEditRoleModal(role);

  return (
    <Modal active={isOpen} onClose={() => setIsOpen(false)}>
      <ModalHeader>როლის ცვლილება</ModalHeader>
      <ModalBody>
        {/* {loading === "isEditing" && <LoadingSpinner blur />} */}
        <Input value={input} readOnly />
        <h4 className="mt-5">უფლებები</h4>
        <PermissionSelect
          options={permissions.map((p) => {
            return { ...p, name: billingPermissions[p.name] };
          })}
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
            onClick={async () => {
              await action({
                role_name: input,
                permission: currentPermissions.map(({ id }) => id),
                aid: role.aid,
              });
              setIsOpen(false);
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
