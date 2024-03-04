import Button from "components/Button";
import Dropdown from "components/Dropdown";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import Input from "components/form/Input";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useEffect, useState } from "react";

const EditOrganizationModal = ({
  isOpen,
  setIsOpen,
  organization,
  action,
  loading,
  types,
}) => {
  const [input, setInput] = useState("");
  const [choosenType, setChoosenType] = useState({ name: "", id: "" });
  useEffect(() => {
    setChoosenType({
      name: organization.organization_type,
      id: organization.type,
    });
    setInput(organization.name);
  }, [setChoosenType, organization, setInput]);

  const typeList =
    types.length &&
    types.map(({ id, name }) => (
      <button
        className="cursor-pointer border-b DO_NOT_CLOSE_MODAL"
        key={id + name}
        onClick={() => setChoosenType({ id, name })}
      >
        {name}
      </button>
    ));

  const dropdown = (
    <div className="mt-5">
      <Dropdown
        content={
          <div className="dropdown-menu DO_NOT_CLOSE_MODAL">{typeList}</div>
        }
      >
        <Button className="uppercase">
          {choosenType.name ? choosenType.name : "აირჩიეთ ტიპი"}
          <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
        </Button>
      </Dropdown>
    </div>
  );

  return (
    <Modal active={isOpen} centered onClose={() => setIsOpen(false)}>
      <ModalHeader>ორგანიზაციის ცვლილება</ModalHeader>
      <ModalBody>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="organization"
        />
        {dropdown}
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
            onClick={() =>
              action({ id: organization.id, name: input, type: choosenType.id })
            }
            className="ltr:ml-2 rtl:mr-2 uppercase"
          >
            {loading ? <LoadingSpinner /> : "დადასტურება"}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default EditOrganizationModal;
