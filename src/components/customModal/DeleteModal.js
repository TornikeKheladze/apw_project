import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";

const DeleteModal = ({ isOpen, setIsOpen, action, title, loading }) => {
  return (
    <Modal active={isOpen} centered onClose={() => setIsOpen(false)}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>დარწმუნებული ხართ რომ გსურთ წაშლა?</ModalBody>
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
            color="danger"
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

export default DeleteModal;
