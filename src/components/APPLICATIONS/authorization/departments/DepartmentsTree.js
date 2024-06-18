import Footer from "partials/Footer";
import Label from "components/form/Label";
import Input from "components/form/Input";
import Button from "components/Button";
import Paths from "components/paths/Paths";

import TreeMenu from "./TreeMenu.js";
import useDepartmentsTree from "./useDepartmentsTree.js";
import DepDropdown from "./DepDropdown.js";
import Alert from "components/Alert.js";
import LoadingSpinner from "components/icons/LoadingSpinner.js";
import Dropdown from "components/Dropdown.js";
import { Link } from "react-router-dom";
import { truncateText } from "helpers/truncateText.js";
import Modal, { ModalHeader } from "components/Modal.js";
import AuthForm from "../authForm/AuthForm.js";
import { orgPackageArr } from "components/APPLICATIONS/billing/formArrays/packageArr.js";
import DeleteModal from "components/customModal/DeleteModal.js";

const DepartmentsTree = () => {
  const {
    departments,
    organization,
    organizations,
    departmentTree,
    packages,
    bindOrgToPackage,
    orgPackages,
    mutates: {
      addDepartmentMutate,
      deleteOrgPackageMutate,
      getDocumentByUUIDMutate,
    },
    states: { input, chosenDepartment, alert, packageModal, deleteModal },
    setStates: {
      setInput,
      setChosenDepartment,
      setPackageModal,
      setDeleteModal,
    },
    loadings: {
      addDepartmentLoading,
      initialLoading,
      insertOrgPackageLoading,
      deleteOrgPackageLoading,
      createInvoiceLoading,
      getDocumentLoading,
    },
  } = useDepartmentsTree();

  return (
    <main className="workspace">
      <Paths />
      <Alert message={alert.message} color={alert.type} dismissable />

      <div className="lg:col-span-2 xl:col-span-3 mb-4">
        <h3 className="mb-3">ორგანიზაცია</h3>
        <Dropdown
          content={
            <div className="dropdown-menu min-w-[12rem]">
              {organizations
                ?.filter((org) => org.id !== organization.id)
                .map((org) => (
                  <Link
                    key={org.id + Math.random()}
                    to={`/departments/${org.id}`}
                  >
                    {org.name}
                  </Link>
                ))}
            </div>
          }
        >
          <Button className="uppercase mb-6 min-w-[12rem] flex justify-between w-1/2">
            {truncateText(organization?.name, 40)}
            <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
          </Button>
        </Dropdown>
        <div className="card p-5">
          <Label className="block mb-2" htmlFor="organization">
            დეპარტამენტის დამატება
          </Label>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <DepDropdown
            loading={initialLoading}
            departments={departments}
            chosenDepartment={chosenDepartment}
            setChosenDepartment={setChosenDepartment}
            departmentTree={departmentTree}
          />
          <Button
            disabled={!input ? true : false}
            onClick={addDepartmentMutate}
            className="mt-4"
          >
            {addDepartmentLoading ? <LoadingSpinner /> : "დამატება"}
          </Button>
        </div>
      </div>
      <div className="card p-5 mb-4">
        {initialLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : departments.length && !initialLoading ? (
          <TreeMenu departments={departmentTree} />
        ) : (
          <p>დეპარტამენტები არ მოიძებნა</p>
        )}
      </div>
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
      <div className="card p-5 md:text-base text-xs">
        <div className="flex items-center justify-between">
          <h3 className="mb-3 text-base">მიმდინარე პაკეტები</h3>
          <Button onClick={() => setPackageModal(true)}>
            პაკეტის დამატება
          </Button>
        </div>
        {orgPackages.length ? (
          <div className="overflow-x-auto mt-2">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th>რაოდენობა</th>
                  <th>აქტიური</th>
                  <th>დაწყების თარიღი</th>
                  <th>დასრულების თარიღი</th>
                </tr>
              </thead>
              <tbody>
                {orgPackages.map((item) => (
                  <tr key={item.id + Math.random()}>
                    <td>{item.count}</td>
                    <td>{item.active}</td>
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
                        {getDocumentLoading ? (
                          <LoadingSpinner />
                        ) : (
                          <span className="la la-download"></span>
                        )}
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

export default DepartmentsTree;
