import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import Input from "components/form/Input";
import Textarea from "components/form/Textarea";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useState } from "react";
import { act } from "react-dom/test-utils";

const RejectModal = ({
  isOpen,
  setIsOpen,
  action,
  title,
  loading,
  setSuccessMessage,
}) => {
  const [rejectReasonValue, setRejectReasonValue] = useState("");

  return (
    <Modal active={isOpen} centered onClose={() => setIsOpen(false)}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Textarea
          value={rejectReasonValue}
          onChange={(e) => setRejectReasonValue(e.target.value)}
          rows="5"
        ></Textarea>
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
            disabled={rejectReasonValue.length === 0}
            onClick={() => action(rejectReasonValue)}
            className="ltr:ml-2 rtl:mr-2 uppercase"
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

export default RejectModal;
