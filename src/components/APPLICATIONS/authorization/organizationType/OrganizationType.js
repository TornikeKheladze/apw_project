import Footer from "partials/Footer";
import Input from "components/form/Input";
import Label from "components/form/Label";
import Button from "components/Button";

import useOrganizationType from "./useOrganizationType";
import List from "components/list/List";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import DeleteModal from "components/customModal/DeleteModal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Alert from "components/Alert";

const OrganizationType = () => {
  const {
    types,
    loadings: { addLoading, updateLoading, deleteLoading, isLoading },
    mutates: { deleteTypeMutate, updateTypeMutate, addTypeMutate },
    states: {
      isEditModalOpen,
      isDeleteModalOpen,
      currentType,
      successMessage,
      input,
    },
    setStates: {
      setEditModalOpen,
      setDeleteModalOpen,
      setCurrentType,
      setInput,
    },
  } = useOrganizationType();

  const editModal = (
    <Modal
      active={isEditModalOpen}
      centered
      onClose={() => setEditModalOpen(false)}
    >
      <ModalHeader>ტიპის ცვლილება</ModalHeader>
      <ModalBody>
        <Input
          value={currentType.name}
          onChange={(e) =>
            setCurrentType({ ...currentType, name: e.target.value })
          }
          id="type"
        />
      </ModalBody>
      <ModalFooter>
        <div className="flex ltr:ml-auto rtl:mr-auto">
          <Button
            color="secondary"
            className="uppercase"
            onClick={() => setEditModalOpen(false)}
          >
            უკან დაბრუნება
          </Button>
          <Button
            onClick={() =>
              updateTypeMutate({ id: currentType.id, name: currentType.name })
            }
            className="ltr:ml-2 rtl:mr-2 uppercase"
          >
            {updateLoading ? <LoadingSpinner /> : "დადასტურება"}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );

  const deleteModal = (
    <DeleteModal
      isOpen={isDeleteModalOpen}
      setIsOpen={setDeleteModalOpen}
      action={deleteTypeMutate}
      title={"ტიპის წაშლა"}
      loading={deleteLoading}
    />
  );

  return (
    <main className="workspace">
      <Alert message={successMessage} color="success" dismissable />
      {editModal}
      {deleteModal}
      <div className="lg:col-span-2 xl:col-span-3 mb-4">
        <div className="card p-5">
          <Label className="block mb-2" htmlFor="organization">
            ორგანიზაციის ტიპის დამატება
          </Label>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="organization"
          />
          <Button
            disabled={!input ? true : false}
            onClick={addTypeMutate}
            className="mt-4"
          >
            {addLoading ? <LoadingSpinner /> : "დამატება"}
          </Button>
        </div>
      </div>
      <div className="card p-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : types.length ? (
          <List
            openDelete={setDeleteModalOpen}
            openEdit={setEditModalOpen}
            setChoosenItem={setCurrentType}
            items={types}
            title={"ტიპის დასახელება"}
          />
        ) : (
          <p>ტიპები არ მოიძებნა</p>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default OrganizationType;
