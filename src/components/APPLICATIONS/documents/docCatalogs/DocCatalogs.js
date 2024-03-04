import AuthForm from "components/APPLICATIONS/authorization/authForm/AuthForm";
import AuthTable from "components/APPLICATIONS/authorization/authTable/AuthTable";
import { docCatalogsArr } from "components/APPLICATIONS/billing/formArrays/documentsArrs";
import Alert from "components/Alert";
import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import PlusIcon from "components/icons/PlusIcon";
import { idToName } from "helpers/idToName";
import { removeEmpty } from "helpers/removeEmpty";
import Footer from "partials/Footer";
import CatalogTreeMenu from "./CatalogTreeMenu";
import { useDocCatalogs } from "./useDocCatalogs";

const DocCatalogs = () => {
  const {
    catalogs,
    catalogsTree,
    catalogTypes,
    organizations,
    mutates: { createMutate, deleteMutate, editMutate },
    loadings: { createLoading, deleteLoading, editLoading, loading },
    states: { alert, openModal, selectedCatalog },
    setStates: { setOpenModal, setSelectedCatalog },
  } = useDocCatalogs();

  return (
    <main className="workspace overflow-hidden">
      <Alert message={alert.message} color={alert.type} dismissable />

      <Modal
        active={openModal.open}
        centered
        onClose={() => {
          setOpenModal({ open: false });
          setSelectedCatalog({ id: "" });
        }}
      >
        <ModalHeader>კატეგორიის {openModal.action}</ModalHeader>
        {openModal.action === "შეცვლა" && (
          <div className="p-5">
            <AuthForm
              formArray={docCatalogsArr}
              submitHandler={editMutate}
              isLoading={editLoading}
              defaultValues={selectedCatalog}
              optionsObj={{
                org_id: organizations,
                parent_id: catalogs,
                type: catalogTypes,
              }}
            />
          </div>
        )}
        {openModal.action === "დამატება" && (
          <div className="p-5">
            <AuthForm
              formArray={docCatalogsArr}
              submitHandler={(data) => createMutate(removeEmpty(data))}
              isLoading={createLoading}
              optionsObj={{
                org_id: organizations,
                parent_id: catalogs,
                type: catalogTypes,
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
                  onClick={() => deleteMutate(selectedCatalog.id)}
                >
                  {deleteLoading ? <LoadingSpinner /> : "დადასტურება"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>
      <div className="w-full flex justify-between mb-4">
        <h3>კატალოგები</h3>
        <Button
          onClick={() => setOpenModal({ open: true, action: "დამატება" })}
        >
          <span>დამატება</span> <PlusIcon />
        </Button>
      </div>

      <div className="card p-5 overflow-x-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : catalogs?.length ? (
          <AuthTable
            staticArr={docCatalogsArr}
            fetchedArr={catalogs.map((item) => {
              return {
                ...item,
                org_id_displayName: idToName(organizations, item.org_id),
                parent_id_displayName: idToName(catalogs, item.parent_id),
                type_displayName: idToName(catalogTypes, item.type),
              };
            })}
            actions={{
              editClick: (item) => {
                setOpenModal({ open: true, action: "შეცვლა" });
                setSelectedCatalog(item);
              },
              deleteClick: (item) => {
                setOpenModal({
                  open: true,
                  action: "წაშლა",
                });
                setSelectedCatalog(item);
              },
            }}
          />
        ) : (
          <p>კატალოგები არ მოიძებნა</p>
        )}
      </div>

      <div className="card p-5 mt-4">
        <CatalogTreeMenu
          setChosenItem={setSelectedCatalog}
          chosenItem={selectedCatalog}
          catalogs={catalogsTree}
        />
      </div>

      <Footer />
    </main>
  );
};

export default DocCatalogs;
