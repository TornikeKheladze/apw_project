import AuthForm from "components/APPLICATIONS/authorization/authForm/AuthForm";
import AuthTable from "components/APPLICATIONS/authorization/authTable/AuthTable";
import { templateColumnsArr } from "components/APPLICATIONS/billing/formArrays/documentsArrs";
import Alert from "components/Alert";
import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import PlusIcon from "components/icons/PlusIcon";
import { idToName } from "helpers/idToName";
import Footer from "partials/Footer";
import { useTemplateColumns } from "./useTemplateColumns";
import { useParams } from "react-router-dom";

const TemplateColumns = () => {
  const { id } = useParams();
  const {
    templateColumns,
    templateColumnsType,
    templates,
    setStates: { setOpenModal, setSelectedColumn },
    states: { alert, openModal, selectedColumn },
    loadings: { isLoading, createLoading, editLoading, deleteLoading },
    mutates: { createMutate, editMutate, deleteMutate },
  } = useTemplateColumns();
  return (
    <main className="workspace overflow-hidden">
      <Alert message={alert.message} color={alert.type} dismissable />

      <Modal
        active={openModal.open}
        centered
        onClose={() => {
          setOpenModal({ open: false });
          setSelectedColumn({ id: "" });
        }}
      >
        <ModalHeader>შაბლონის {openModal.action}</ModalHeader>
        {openModal.action === "შეცვლა" && (
          <div className="p-5">
            <AuthForm
              formArray={templateColumnsArr}
              submitHandler={editMutate}
              isLoading={editLoading}
              defaultValues={selectedColumn}
              optionsObj={{
                template_id: templates.map((item) => {
                  return { ...item, name: item.template_name };
                }),
                column_type_id: templateColumnsType.map((item) => {
                  return { ...item, name: item.column_type };
                }),
              }}
            />
          </div>
        )}
        {openModal.action === "დამატება" && (
          <div className="p-5">
            <AuthForm
              formArray={templateColumnsArr}
              submitHandler={createMutate}
              isLoading={createLoading}
              optionsObj={{
                template_id: templates.map((item) => {
                  return { ...item, name: item.template_name };
                }),
                column_type_id: templateColumnsType.map((item) => {
                  return { ...item, name: item.column_type };
                }),
              }}
            />
          </div>
        )}
        {openModal.action === "წაშლა" && (
          <>
            <ModalBody>
              <p>ნამდვილად გსურთ წაშლა?</p>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between gap-3">
                <Button
                  color="secondary"
                  onClick={() => setOpenModal({ open: false })}
                >
                  გაუქმება
                </Button>
                <Button
                  className="min-w-[135px]"
                  onClick={() => deleteMutate(selectedColumn.id)}
                >
                  {deleteLoading ? <LoadingSpinner /> : "დადასტურება"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>
      <div className="w-full flex justify-between mb-4">
        <h3>ცვლადები</h3>
        <Button
          onClick={() => setOpenModal({ open: true, action: "დამატება" })}
        >
          <span>დამატება</span> <PlusIcon />
        </Button>
      </div>

      <div className="card p-5 overflow-x-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : templateColumns?.filter(
            (template) => template.template_id?.toString() === id?.toString()
          )?.length ? (
          <AuthTable
            staticArr={templateColumnsArr}
            fetchedArr={templateColumns
              ?.filter(
                (template) =>
                  template.template_id?.toString() === id?.toString()
              )
              .map((item) => {
                return {
                  ...item,
                  template_id_displayName: idToName(
                    templates,
                    item.template_id
                  ),
                  column_type_id_displayName: idToName(
                    templateColumnsType,
                    item.column_type_id
                  ),
                };
              })}
            actions={{
              editClick: (item) => {
                setOpenModal({ open: true, action: "შეცვლა" });
                setSelectedColumn(item);
              },
              deleteClick: (item) => {
                setOpenModal({
                  open: true,
                  action: "წაშლა",
                });
                setSelectedColumn(item);
              },
            }}
          />
        ) : (
          <p>ცვლადები არ მოიძებნა</p>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default TemplateColumns;
