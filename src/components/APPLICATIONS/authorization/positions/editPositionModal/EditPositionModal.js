import Button from "components/Button";
import Dropdown from "components/Dropdown";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import Input from "components/form/Input";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useState } from "react";

const EditPositionModal = ({
  isOpen,
  setIsOpen,
  position,
  action,
  loading,
  departments = [],
}) => {
  const [input, setInput] = useState(position.position_name || "");
  const [choosenDepartment, setChoosenDepartment] = useState(
    departments.find((department) => department.id === Number(position.did)) ||
      {}
  );

  const departmentList =
    departments.length &&
    departments.map((department) => (
      <button
        className="cursor-pointer border-b DO_NOT_CLOSE_MODAL"
        key={department.id}
        onClick={() => setChoosenDepartment(department)}
      >
        {department.department_name}
      </button>
    ));

  const dropdown = (
    <div className="mt-5">
      <Dropdown
        content={
          <div className="dropdown-menu DO_NOT_CLOSE_MODAL">
            {departmentList}
          </div>
        }
      >
        <Button>
          {choosenDepartment?.department_name
            ? choosenDepartment.department_name
            : "აირჩიეთ დეპარტამენტი"}
          <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
        </Button>
      </Dropdown>
    </div>
  );

  return (
    <Modal active={isOpen} centered onClose={() => setIsOpen(false)}>
      <ModalHeader>პოზიციის ცვლილება</ModalHeader>
      <ModalBody>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        {dropdown}
      </ModalBody>
      <ModalFooter>
        <div className="flex ltr:ml-auto rtl:mr-auto">
          <Button color="secondary" onClick={() => setIsOpen(false)}>
            უკან დაბრუნება
          </Button>
          <Button
            onClick={() =>
              action({
                position_name: input,
                did: choosenDepartment.id,
                id: position.id,
              })
            }
            className="ltr:ml-2 rtl:mr-2"
          >
            {loading ? (
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

export default EditPositionModal;
