import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";

const ConfirmModal = ({ isOpen, setIsOpen, action, title, loading, text }) => {
  return (
    <Modal active={isOpen} centered onClose={() => setIsOpen(false)}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{text}</ModalBody>
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
            onClick={action}
            color="primary"
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

export default ConfirmModal;
