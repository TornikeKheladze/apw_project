import Button from "components/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCatalog,
  deleteCategory,
  getAllCatalogs,
  getDocCategoryById,
  updateCategory,
} from "services/documents";
import CatalogTreeMenu from "./CatalogTreeMenu";
import { useState } from "react";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import AuthForm from "components/APPLICATIONS/authorization/authForm/AuthForm";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useSelector } from "react-redux";
import { docCatalogsArr } from "components/APPLICATIONS/billing/formArrays/documentsArrs";
import { removeEmpty } from "helpers/removeEmpty";
import Alert from "components/Alert";
import FolderIcon from "components/icons/FolderIcon";
import PackageIcon from "components/icons/PackageIcon";

const DocCategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const authorizedUser = useSelector((state) => state.user.authorizedUser);

  const [openModal, setOpenModal] = useState({
    open: false,
    action: "",
  });
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });

  const { data: category = {}, isLoading: categoryLoading } = useQuery({
    queryKey: ["getDocCategoryById", id],
    queryFn: () => getDocCategoryById(id).then((res) => res.data.data),
  });

  const { data: categories = [], listLoading } = useQuery({
    queryKey: "getAllCatalogs",
    queryFn: () => getAllCatalogs().then((res) => res.data.data),
  });

  const { isLoading: createLoading, mutate: createMutate } = useMutation({
    mutationFn: (data) =>
      createCatalog({
        ...data,
        org_id: authorizedUser.superAdmin ? data.org_id : authorizedUser.oid,
      }),
    onSuccess: () =>
      afterRequestHandler("კატეგორია წარმატებით დაემატა", "success"),
    onError: () => afterRequestHandler("error.response.data.message", "danger"),
  });

  const { isLoading: deleteLoading, mutate: deleteMutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      afterRequestHandler("კატეგორია წარმატებით წაიშალა", "success");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    },
    onError: () => afterRequestHandler("error.response.data.message", "danger"),
  });

  const { isLoading: editLoading, mutate: editMutate } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () =>
      afterRequestHandler("კატეგორია წარმატებით შეიცვალა", "success"),
    onError: () => afterRequestHandler("error.response.data.message", "danger"),
  });

  const afterRequestHandler = (message, type) => {
    queryClient.invalidateQueries("getAllCatalogs");
    queryClient.invalidateQueries(["getDocCategoryById", id]);
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: "" });
      setOpenModal({ open: false });
    }, 1500);
  };

  const buildTreeMenu = (categories, parentId = 0) => {
    return categories
      .filter((category) => category.parent_id === parentId)
      .map((category) => ({
        ...category,
        children: buildTreeMenu(categories, category.id),
      }));
  };
  const categoriesTree = buildTreeMenu(categories, +id);
  const fields = docCatalogsArr.filter(
    (item) =>
      item.name !== "org_id" &&
      item.name !== "parent_id" &&
      item.name !== "type"
  );

  const loading = categoryLoading || listLoading;
  return (
    <main className="workspace">
      <Alert message={alert.message} color={alert.type} dismissable />
      <div className="mb-3 flex justify-between items-center">
        <h2 className="text-base">
          კატეგორია: <br className="sm:hidden" /> {category.name}
        </h2>

        <div className="flex gap-1">
          <button
            onClick={() => setOpenModal({ open: true, action: "რედაქტირება" })}
            className="btn btn-icon btn_outlined btn_secondary"
          >
            <span className="la la-pen-fancy"></span>
          </button>

          <button
            onClick={() =>
              setOpenModal({
                open: true,
                action: "წაშლა",
              })
            }
            className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
          >
            <span className="la la-trash-alt"></span>
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner blur />
      ) : (
        <div className="card p-5 mb-3">
          <h4 className="mb-3">ქვეკატეგორიები</h4>
          {categoriesTree.length === 0 ? (
            <p>ქვეკატეგორია ვერ მოიძებნა</p>
          ) : (
            <CatalogTreeMenu catalogs={categoriesTree} />
          )}
          <div className="flex gap-1 mt-3">
            <Button
              className="p-1 text-sm"
              onClick={() =>
                setOpenModal({ open: true, action: "დამატება", type: 0 })
              }
            >
              <span>კატეგორიის შექმნა</span>{" "}
              <FolderIcon className="ml-2 !w-4 !h-4" />
            </Button>
            <Button
              className="p-1 text-sm"
              onClick={() =>
                setOpenModal({ open: true, action: "დამატება", type: 1 })
              }
            >
              <span>დოკუმენტის პაკეტის შექმნა</span>{" "}
              <PackageIcon className="ml-2 !w-4 !h-4" />
            </Button>
          </div>
        </div>
      )}

      <Modal
        active={openModal.open}
        centered
        onClose={() => {
          setOpenModal({ open: false });
        }}
      >
        <ModalHeader>კატეგორიის {openModal.action}</ModalHeader>
        {openModal.action === "რედაქტირება" && (
          <div className="p-5">
            <AuthForm
              formArray={fields}
              submitHandler={editMutate}
              isLoading={editLoading}
              defaultValues={category}
            />
          </div>
        )}
        {openModal.action === "დამატება" && (
          <div className="p-5">
            <AuthForm
              formArray={fields}
              submitHandler={(data) =>
                createMutate(
                  removeEmpty({
                    ...data,
                    org_id: authorizedUser.oid,
                    parent_id: id,
                    type: openModal.type,
                  })
                )
              }
              isLoading={createLoading}
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
                  onClick={() => deleteMutate(id)}
                >
                  {deleteLoading ? <LoadingSpinner /> : "დადასტურება"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>
    </main>
  );
};

export default DocCategoryDetails;
