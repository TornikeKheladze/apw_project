import AuthForm from "components/APPLICATIONS/authorization/authForm/AuthForm";
import AuthTable from "components/APPLICATIONS/authorization/authTable/AuthTable";
import { templateArr } from "components/APPLICATIONS/billing/formArrays/documentsArrs";
import Alert from "components/Alert";
import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import PlusIcon from "components/icons/PlusIcon";
import { idToName } from "helpers/idToName";
import Footer from "partials/Footer";
import { useTemplates } from "./useTemplates";

const Templates = () => {
  const {
    templates,
    catalogs,
    organizations,
    navigate,
    states: { alert, openModal, selectedTemplate },
    setStates: { setOpenModal, setSelectedTemplate },
    mutates: { createMutate, editMutate, deleteMutate },
    loadings: { createLoading, editLoading, deleteLoading, isLoading },
  } = useTemplates();

  return (
    <main className="workspace overflow-hidden">
      <Alert message={alert.message} color={alert.type} dismissable />

      <Modal
        active={openModal.open}
        centered
        onClose={() => {
          setOpenModal({ open: false });
          setSelectedTemplate({ id: "" });
        }}
      >
        <ModalHeader>შაბლონის {openModal.action}</ModalHeader>
        {openModal.action === "შეცვლა" && (
          <div className="p-5">
            <AuthForm
              formArray={templateArr}
              submitHandler={editMutate}
              isLoading={editLoading}
              defaultValues={selectedTemplate}
              optionsObj={{
                cat_id: catalogs,
                org_id: organizations,
              }}
            />
          </div>
        )}
        {openModal.action === "დამატება" && (
          <div className="p-5">
            <AuthForm
              formArray={templateArr}
              submitHandler={createMutate}
              isLoading={createLoading}
              optionsObj={{
                cat_id: catalogs,
                org_id: organizations,
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
                  onClick={() => deleteMutate(selectedTemplate.id)}
                >
                  {deleteLoading ? <LoadingSpinner /> : "დადასტურება"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>
      <div className="w-full flex justify-between mb-4">
        <h3>შაბლონები</h3>
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
        ) : templates?.length ? (
          <AuthTable
            staticArr={templateArr}
            fetchedArr={templates.map((item) => {
              return {
                ...item,
                org_id_displayName: idToName(organizations, item.org_id),
                cat_id_displayName: idToName(catalogs, item.cat_id),
              };
            })}
            actions={{
              editClick: (item) => {
                setOpenModal({ open: true, action: "შეცვლა" });
                setSelectedTemplate(item);
              },
              deleteClick: (item) => {
                setOpenModal({
                  open: true,
                  action: "წაშლა",
                });
                setSelectedTemplate(item);
              },
              detailClick: (item) => {
                navigate(`/documents/templates/${item.id}`);
              },
            }}
          />
        ) : (
          <p>შაბლონები არ მოიძებნა</p>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Templates;
