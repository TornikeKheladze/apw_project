import AuthForm from "components/APPLICATIONS/authorization/authForm/AuthForm";
import Alert from "components/Alert";
import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { removeEmpty } from "helpers/removeEmpty";
import Footer from "partials/Footer";
import CatalogTreeMenu from "./CatalogTreeMenu";
import { useDocCatalogs } from "./useDocCatalogs";
import FolderIcon from "components/icons/FolderIcon";
import PackageIcon from "components/icons/PackageIcon";
import { buildDepartmentTree } from "helpers/treeMenuBuilder";

const DocCatalogs = () => {
  const {
    catalogs,
    catalogsByOrg,
    fields,
    organizations,
    mutates: { createMutate, deleteMutate, editMutate },
    loadings: { createLoading, deleteLoading, editLoading, loading },
    states: { alert, openModal, selectedCatalog },
    setStates: { setOpenModal, setSelectedCatalog },
    authorizedUser,
  } = useDocCatalogs();

  // console.log(selectedCatalog);

  return (
    <main className="workspace overflow-hidden">
      {loading && <LoadingSpinner blur />}
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
        {openModal.action === "რედაქტირება" && (
          <div className="p-5">
            <AuthForm
              formArray={fields}
              submitHandler={editMutate}
              isLoading={editLoading}
              defaultValues={selectedCatalog}
              optionsObj={{
                org_id: organizations,
                parent_id: catalogs,
              }}
            />
          </div>
        )}
        {openModal.action === "დამატება" && (
          <div className="p-5">
            <AuthForm
              formArray={fields}
              submitHandler={(data) =>
                createMutate(
                  removeEmpty({ ...data, org_id: authorizedUser.oid })
                )
              }
              isLoading={createLoading}
              optionsObj={{
                org_id: organizations,
                parent_id: catalogs,
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
      <div className="w-full flex gap-3 justify-between mb-4">
        <h3>კატეგორიები</h3>
        <div className="flex gap-2 md:flex-row flex-col">
          <Button
            className="p-2 text-sm flex items-center justify-between"
            onClick={() =>
              setOpenModal({ open: true, action: "დამატება", type: 0 })
            }
          >
            <span>კატეგორიის შექმნა</span>{" "}
            <FolderIcon className="ml-2 !w-4 !h-4" />
          </Button>
          <Button
            className="p-2 text-sm flex items-center justify-between"
            onClick={() =>
              setOpenModal({ open: true, action: "დამატება", type: 1 })
            }
          >
            <span>დოკუმენტის პაკეტის შექმნა</span>{" "}
            <PackageIcon className="ml-2 !w-4 !h-4" />
          </Button>
        </div>
      </div>

      {Object.keys(catalogsByOrg).map((key) => (
        <div key={key} className="card p-5 mt-4">
          <h4 className="text-base">
            {organizations.find((item) => +item.id === +key)?.name}
          </h4>
          <CatalogTreeMenu
            catalogs={buildDepartmentTree(
              catalogsByOrg[key]?.filter((item) =>
                authorizedUser?.superAdmin
                  ? item
                  : item.org_id === authorizedUser?.oid
              )
            )}
          />
        </div>
      ))}

      <Footer />
    </main>
  );
};

export default DocCatalogs;
