import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";

const ConfirmModal = ({ isOpen, setIsOpen, action, title, loading }) => {
  const approveHandler = () => {
    console.log("ტრანზაქციის დაბრუნება დადასტურდა");
    setIsOpen(false);
  };
  return (
    <Modal active={isOpen} centered onClose={() => setIsOpen(false)}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>ადასტურებთ ტრანზაქციის დაბრუნებას?</ModalBody>
      <ModalFooter>
        <div className="flex ltr:ml-auto rtl:mr-auto">
          <Button
            color="secondary"
            className="uppercase"
            onClick={() => action(true)}
          >
            {loading ? (
              <span className="w-[1.5rem]">
                <LoadingSpinner />
              </span>
            ) : (
              "დიახ"
            )}
          </Button>
          <Button
            onClick={() => action(false)}
            color="danger"
            className="ltr:ml-2 rtl:mr-2 uppercase"
          >
            არა
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
