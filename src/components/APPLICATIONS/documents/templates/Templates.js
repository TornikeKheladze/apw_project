import AuthForm from "components/APPLICATIONS/authorization/authForm/AuthForm";
import AuthTable from "components/APPLICATIONS/authorization/authTable/AuthTable";
import {
  editTemplateArr,
  templateArr,
} from "components/APPLICATIONS/billing/formArrays/documentsArrs";
import Alert from "components/Alert";
import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import PlusIcon from "components/icons/PlusIcon";
import { idToName } from "helpers/idToName";
import Footer from "partials/Footer";
import { useTemplates } from "./useTemplates";
import { useEffect } from "react";
import { filterArray } from "helpers/filterArray";
import { removeEmpty } from "helpers/removeEmpty";
import CatalogTreeMenu from "../docCatalogs/CatalogTreeMenu";
import { convertDate } from "helpers/convertDate";

const Templates = () => {
  const {
    templates,
    catalogs,
    organizations,
    navigate,
    authorizedUser,
    states: { alert, openModal, selectedTemplate, chosenCategory, filter },
    setStates: {
      setOpenModal,
      setSelectedTemplate,
      setChosenCategory,
      setFilter,
    },
    mutates: { createMutate, editMutate, deleteMutate },
    loadings: { createLoading, editLoading, deleteLoading, isLoading },
  } = useTemplates();

  const buildCategoryTree = (categories, parentId = 0) => {
    return categories
      .filter((category) => category.parent_id === parentId)
      .map((category) => ({
        ...category,
        children: buildCategoryTree(categories, category.id),
      }));
  };

  const updatedList = filterArray(templates, removeEmpty(filter))?.map(
    (item) => {
      return {
        ...item,
        cat_id_displayName: idToName(catalogs, item.cat_id),
      };
    }
  );

  useEffect(() => {
    setFilter((prevState) => ({ ...prevState, cat_id: chosenCategory.id }));
  }, [chosenCategory, setFilter]);

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
              formArray={editTemplateArr}
              submitHandler={(data) => {
                // const currentTemplateCode = templates.find(
                //   (item) => item.id === data.id
                // )?.template_code;
                // console.log(selectedTemplate.template_code);
                // console.log(templates.find((item) => item.id === data.id));
                // console.log(data);
                editMutate(data);
              }}
              isLoading={editLoading}
              defaultValues={selectedTemplate}
              optionsObj={{
                cat_id: catalogs?.filter((item) =>
                  authorizedUser?.superAdmin
                    ? item
                    : item.org_id === authorizedUser?.oid
                ),
                org_id: organizations,
                active: [
                  { id: 1, label: "აქტიური" },
                  { id: 0, label: "დაარქივებული" },
                ],
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
                cat_id: catalogs?.filter((item) =>
                  authorizedUser?.superAdmin
                    ? item
                    : item.org_id === authorizedUser?.oid
                ),
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
        <h3>{filter?.active === 0 ? "დაარქივებული შაბლონები" : "შაბლონები"}</h3>
        <Button
          onClick={() => setOpenModal({ open: true, action: "დამატება" })}
        >
          <span>დამატება</span> <PlusIcon />
        </Button>
      </div>
      <div className="mb-2">
        <Button
          onClick={() => {
            setFilter((prevState) => ({
              ...prevState,
              active: prevState.active === 0 ? 1 : 0,
            }));
          }}
          className="p-2 text-xs"
        >
          {filter?.active === 0
            ? "აქტიური შაბლონების ნახვა"
            : "შაბლონების ისტორიის ნახვა"}
        </Button>
      </div>
      <div className="card p-5 mb-4 !text-xs">
        <h2 className="text-sm mb-4">კატეგორიები</h2>
        <CatalogTreeMenu
          catalogs={buildCategoryTree(
            catalogs
              ?.filter((item) =>
                authorizedUser?.superAdmin
                  ? item
                  : item.org_id === authorizedUser?.oid
              )
              .map((catalog) => {
                return {
                  ...catalog,
                  catID: catalog.id,
                  parentID: catalog.parent_id,
                  categoryName: catalog.name,
                };
              })
            // catalogs
          )}
          chosenItem={chosenCategory}
          setChosenItem={setChosenCategory}
        />
      </div>

      <div className="card p-5 overflow-x-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : updatedList?.length ? (
          <AuthTable
            staticArr={
              filter.active === 1
                ? templateArr
                : [
                    ...templateArr,
                    { name: "created_at", label: "შექმნის თარიღი" },
                    { name: "updated_at", label: "ბოლო რედაქტირების თარიღი" },
                  ]
            }
            fetchedArr={updatedList
              ?.filter((item) =>
                authorizedUser?.superAdmin
                  ? item
                  : item.org_id === authorizedUser?.oid
              )
              ?.map((item) => {
                return {
                  ...item,
                  org_id_displayName: idToName(organizations, item.org_id),
                  cat_id_displayName: idToName(catalogs, item.cat_id),
                  created_at: convertDate(item.created_at),
                  updated_at: convertDate(item.updated_at),
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
