import Button from "components/Button";
import Dropdown from "components/Dropdown";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import Input from "components/form/Input";
import useEditDepartmentModal from "./useEditDepartmentModal.js";
import DepDropdown from "../DepDropdown.js";

const EditDepartmentModal = (props) => {
  const {
    isOpen,
    setIsOpen,
    action,
    setChosenOrganization,
    chosenOrganization,
    organization,
    setNewDepartmentName,
    newDepartmentName = "",
    departments,
    parentDepartment,
    setParentDepartment,
    organizations,
  } = props;

  const { departmentTree, user } = useEditDepartmentModal(props);

  const dropdown = (
    <div className="mt-10">
      <Dropdown
        content={
          <div className="dropdown-menu DO_NOT_CLOSE_MODAL h-36 min-w-300 overflow-y-auto">
            {organizations.length > 0 &&
              organizations.map((org) => (
                <button
                  className="DO_NOT_CLOSE_MODAL"
                  key={org.id}
                  onClick={() => setChosenOrganization(org)}
                >
                  {org?.name}
                </button>
              ))}
          </div>
        }
      >
        <Button className="uppercase min-w-300 flex justify-between">
          {chosenOrganization.name || organization.name}
          <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
        </Button>
      </Dropdown>
    </div>
  );

  return (
    <Modal active={isOpen} centered onClose={() => setIsOpen(false)}>
      <ModalHeader>დეპარტამენტის ცვლილება</ModalHeader>
      <ModalBody>
        <Input
          value={newDepartmentName}
          onChange={(e) => setNewDepartmentName(e.target.value)}
        />
        {user?.superAdmin ? dropdown : ""}
        <DepDropdown
          // loading={loading}
          departments={departments}
          chosenDepartment={parentDepartment}
          setChosenDepartment={setParentDepartment}
          departmentTree={departmentTree}
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
          <Button onClick={action} className="ltr:ml-2 rtl:mr-2 uppercase">
            დადასტურება
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default EditDepartmentModal;
