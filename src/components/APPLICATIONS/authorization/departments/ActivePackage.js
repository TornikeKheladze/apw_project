import Footer from "partials/Footer";
import Button from "components/Button";

import useDepartmentsTree from "./useDepartmentsTree.js";
import Alert from "components/Alert.js";
import LoadingSpinner from "components/icons/LoadingSpinner.js";
import Modal, { ModalHeader } from "components/Modal.js";
import AuthForm from "../authForm/AuthForm.js";
import { orgPackageArr } from "components/APPLICATIONS/billing/formArrays/packageArr.js";
import DeleteModal from "components/customModal/DeleteModal.js";

const ActivePackage = () => {
  const {
    packages,
    bindOrgToPackage,
    authorizedUser,
    orgPackages,
    mutates: {
      deleteOrgPackageMutate,
      getDocumentByUUIDMutate,
      activatePackageMutate,
    },
    states: { alert, packageModal, deleteModal, activatePackageModal },
    setStates: { setPackageModal, setDeleteModal, setActivatePackateModal },
    loadings: {
      insertOrgPackageLoading,
      deleteOrgPackageLoading,
      createInvoiceLoading,
      getDocumentLoading,
      activatePackageLoading,
    },
  } = useDepartmentsTree();

  return (
    <main className="workspace">
      <Alert message={alert.message} color={alert.type} dismissable />

      <Modal
        active={activatePackageModal.isOpen}
        centered
        onClose={() => {
          setActivatePackateModal({
            isOpen: false,
            package: {},
          });
        }}
      >
        <ModalHeader>პაკეტის აქტივაცია</ModalHeader>
        <div className="p-5 flex gap-3">
          <Button
            onClick={() => {
              setActivatePackateModal({
                isOpen: false,
                package: {},
              });
            }}
            color="danger"
          >
            გაუქმება
          </Button>
          <Button onClick={activatePackageMutate} color="success">
            {activatePackageLoading ? <LoadingSpinner /> : "დადასტურება"}
          </Button>
        </div>
      </Modal>
      <Modal
        active={packageModal}
        centered
        onClose={() => {
          setPackageModal(false);
        }}
      >
        <ModalHeader>პაკეტის დამატება</ModalHeader>
        <div className="p-5">
          <AuthForm
            isLoading={insertOrgPackageLoading || createInvoiceLoading}
            formArray={orgPackageArr}
            submitHandler={bindOrgToPackage}
            optionsObj={{
              package_id: packages?.map((item) => {
                return {
                  ...item,
                  name: `მომხმარებელი:${item.count}, ვადა:${item.exp} თვე, ფასი: ${item.price}`,
                };
              }),
            }}
          />
        </div>
      </Modal>
      <DeleteModal
        action={() => deleteOrgPackageMutate(deleteModal.id)}
        isOpen={deleteModal.isOpen}
        setIsOpen={() => setDeleteModal({ isOpen: false })}
        loading={deleteOrgPackageLoading}
        title={"პაკეტის წაშლა"}
      />
      <div className="card relative p-5 md:text-base text-xs">
        <div className="flex items-center justify-between">
          <h3 className="mb-3 text-base">მიმდინარე პაკეტები</h3>
          <Button onClick={() => setPackageModal(true)}>
            პაკეტის დამატება
          </Button>
        </div>
        {orgPackages.length ? (
          <div className="overflow-x-auto mt-2">
            {getDocumentLoading && <LoadingSpinner blur />}
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th>სტატუსი</th>
                  <th>რაოდენობა</th>
                  <th>დაწყების თარიღი</th>
                  <th>დასრულების თარიღი</th>
                </tr>
              </thead>
              <tbody>
                {orgPackages.map((item) => (
                  <tr key={item.id + Math.random()}>
                    <td>
                      <Button
                        color={item.active === 1 ? "success" : "danger"}
                        className={`text-xs rounded-lg p-1 w-20 justify-center
                           ${
                             authorizedUser.superAdmin
                               ? "cursor-pointer"
                               : //  temporary
                                 //  : "cursor-default"
                                 "cursor-pointer"
                           }
                        `}
                        onClick={() => {
                          // if (authorizedUser.superAdmin) {
                          //   setActivatePackateModal({
                          //     isOpen: true,
                          //     package: item,
                          //   });
                          // }
                          setActivatePackateModal({
                            isOpen: true,
                            package: item,
                          });
                        }}
                      >
                        {item.active === 1 ? "აქტიური" : "არააქტიური"}
                      </Button>
                    </td>
                    <td>{item.count}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>
                      <button
                        onClick={() =>
                          setDeleteModal({
                            isOpen: true,
                            id: item.id,
                          })
                        }
                        className="btn-icon btn_outlined btn_danger flex justify-center items-center"
                      >
                        <span className="la la-trash-alt"></span>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => getDocumentByUUIDMutate(item.uuid)}
                        className="btn-icon btn_outlined flex justify-center items-center"
                      >
                        <span className="la la-download"></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>პაკეტები არ მოიძებნა</p>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ActivePackage;
