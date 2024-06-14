import AuthTable from "components/APPLICATIONS/authorization/authTable/AuthTable";
import { documentsArr } from "components/APPLICATIONS/billing/formArrays/documentsArrs";
import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Footer from "partials/Footer";
import { useDocuments } from "./useDocuments";
import Button from "components/Button";
import PlusIcon from "components/icons/PlusIcon";
import { idToName } from "helpers/idToName";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import { useQuery } from "react-query";
import { getDocumentById } from "services/documents";
import { useEffect, useState } from "react";
import { filterArray } from "helpers/filterArray";
import { removeEmpty } from "helpers/removeEmpty";
import ServiceCategoryTreeMenu from "components/APPLICATIONS/billing/serviceCategories/ServiceCategoryTreeMenu";

const Documents = () => {
  const {
    documents,
    catalogs,
    templates,
    navigate,
    states: { alert, selectedDocument, openModal },
    setStates: { setSelectedDocument, setOpenModal },
    mutates: {
      deleteMutate,
      signMutate,
      unsignedDownloadMutate,
      signMutateForIdCard,
    },
    loadings: {
      deleteLoading,
      isLoading,
      signLoading,
      unsignedDownloadLoading,
      signLoadingForIdCard,
    },
  } = useDocuments();

  const [downloadLoading, setDownloadLoading] = useState(false);

  const [filter, setFilter] = useState({});
  const [chosenCategory, setChosenCategory] = useState({});

  const buildCategoryTree = (categories, parentId = 0) => {
    return categories
      .filter((category) => category.parent_id === parentId)
      .map((category) => ({
        ...category,
        children: buildCategoryTree(categories, category.id),
      }));
  };

  const updatedList = filterArray(documents, removeEmpty(filter))?.map(
    (item) => {
      return {
        ...item,
        cat_id: idToName(catalogs, item.cat_id),
      };
    }
  );

  useEffect(() => {
    setFilter((prevState) => ({ ...prevState, cat_id: chosenCategory.id }));
  }, [chosenCategory]);

  const {
    data: documentById,
    refetch: getDocumentByIdRefetch,
    isFetching,
  } = useQuery({
    queryKey: ["getDocumentById", selectedDocument.id],
    queryFn: () =>
      getDocumentById(selectedDocument.id).then((res) => res.data.data),
    enabled: selectedDocument.id ? true : false,
  });

  const token = localStorage.getItem("token");
  const downloadPDF = (id) => {
    setDownloadLoading(true);
    fetch(
      `https://test-dga-authorisation.apw.ge/api/document/doc-file/html-tu-pdf-download/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${token}`, // Add authorizati
        },
      }
    )
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "your_file_name.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setDownloadLoading(false);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
        setDownloadLoading(false);
      });
  };

  useEffect(() => {
    getDocumentByIdRefetch();
  }, [selectedDocument?.id, getDocumentByIdRefetch]);

  // const { mutate: unsignedDownloadMutate, isLoading: unsignedDownloadLoading } =
  //   useMutation({
  //     mutationFn: signDocument,
  //     onSuccess: (data) => {
  //       getDocumentByIdRefetch(selectedDocument.id);
  //       setAlert({
  //         message: "ჩამოტვირთვის მოთხოვნა წარმატებით გაიგზავნა",
  //         type: "success",
  //       });
  //       setTimeout(() => {
  //         setAlert({ message: "" });
  //       }, 1500);
  //     },
  //     onError: () => {},
  //   });

  return (
    <main className="workspace overflow-hidden">
      <Alert message={alert.message} color={alert.type} dismissable />

      <Modal
        active={openModal.open}
        centered
        onClose={() => {
          setOpenModal({ open: false });
          setSelectedDocument({ id: "" });
        }}
      >
        <ModalHeader>დოკუმენტის {openModal.action}</ModalHeader>

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
                  onClick={() => deleteMutate(selectedDocument.id)}
                >
                  {deleteLoading ? <LoadingSpinner /> : "დადასტურება"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
        {openModal.action === "ხელმოწერა" && (
          <>
            <ModalBody>
              <div>
                {/* {documentById?.signature_doc
                  ? "ეს დოკუმენტი უკვე ხელმოწერილია"
                  : documentById?.not_signature_doc
                  ? "დოკუმენტი უკვე ჩამოტვირთUლია ხელმოწერის გარეშე"
                  : "ნამდვილად გსურთ დოკუმენტის ხელმოწერა?"} */}
                {documentById?.signature_doc ? (
                  "ეს დოკუმენტი უკვე ხელმოწერილია"
                ) : documentById?.not_signature_doc ? (
                  "დოკუმენტი უკვე ჩამოტვირთUლია ხელმოწერის გარეშე"
                ) : (
                  <div>
                    <p className="mb-6">აირჩიეთ მეთოდი</p>
                    {/* <button className="bg-primary rounded px-2 py-1 text-white">
                      ციფრული
                    </button> */}
                    <div className="flex gap-4">
                      {!documentById?.signature_doc &&
                        !documentById?.not_signature_doc && (
                          <button
                            className="bg-primary rounded px-2 py-1 text-white hover:text-white mr-4"
                            onClick={() =>
                              signMutate({
                                doc_id: selectedDocument.id,
                                signatureType: 1,
                                inv_id: 2,
                                visualSignature:
                                  selectedDocument?.document_code.includes(
                                    "TEST"
                                  )
                                    ? 1
                                    : 0,
                                html: selectedDocument.document_code
                                  .replaceAll('"', "'")
                                  .replace(
                                    "<span style='width: 160px; height:70px; border: 1px dashed red; color: red; margin-right: 80px; margin-left: 160px; display: flex; justify-content: center; align-items: center;'>TEST</span>",
                                    "<span style='width: 160px; height:70px; border: 1px dashed white; color: white; opacity: 0.01; margin-right: 80px; margin-left: 160px; display: flex; justify-content: center; align-items: center;'>TEST</span>"
                                  )
                                  .trim(),
                              })
                            }
                          >
                            {signLoading ? <LoadingSpinner /> : "ციფრული"}
                          </button>
                        )}
                      {/* <button className="bg-primary rounded px-2 py-1 text-white">
                      ID ბარათი
                    </button> */}
                      {!documentById?.signature_doc &&
                        !documentById?.not_signature_doc && (
                          <button
                            className="bg-primary rounded px-2 py-1 text-white hover:text-white mr-4"
                            onClick={() =>
                              signMutateForIdCard({
                                doc_id: selectedDocument.id,
                                signatureType: 2,
                                inv_id: 2,
                                visualSignature: 1,
                                html: selectedDocument.document_code
                                  .replaceAll('"', "'")
                                  .replace(
                                    "<span style='width: 160px; height:70px; border: 1px dashed red; color: red; margin-right: 80px; margin-left: 160px; display: flex; justify-content: center; align-items: center;'>TEST</span>",
                                    "<span style='width: 160px; height:70px; border: 1px dashed white; color: white; opacity: 0.01; margin-right: 80px; margin-left: 160px; display: flex; justify-content: center; align-items: center;'>TEST</span>"
                                  )
                                  .trim(),
                              })
                            }
                          >
                            {signLoadingForIdCard ? (
                              <LoadingSpinner />
                            ) : (
                              "ID ბარათი"
                            )}
                          </button>
                        )}
                      {/* {signLoading && <LoadingSpinner />} */}
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between gap-3">
                <Button
                  color="secondary"
                  onClick={() => setOpenModal({ open: false })}
                >
                  გაუქმება
                </Button>
                {/* {!documentById?.signature_doc &&
                  !documentById?.not_signature_doc && (
                    <Button
                      className="min-w-[135px]"
                      onClick={() =>
                        signMutate({
                          doc_id: selectedDocument.id,
                          inv_id: 2,
                          visualSignature:
                            selectedDocument?.document_code.includes("TEST")
                              ? 1
                              : 0,
                          html: selectedDocument.document_code
                            .replaceAll('"', "'")
                            .replace(
                              "<span style='width: 160px; height:70px; border: 1px dashed red; color: red; margin-right: 80px; margin-left: 160px; display: flex; justify-content: center; align-items: center;'>TEST</span>",
                              "<span style='width: 160px; height:70px; border: 1px dashed white; color: white; opacity: 0.01; margin-right: 80px; margin-left: 160px; display: flex; justify-content: center; align-items: center;'>TEST</span>"
                            )
                            .trim(),
                        })
                      }
                    >
                      {signLoading ? <LoadingSpinner /> : "დადასტურება"}
                    </Button>
                  )} */}
              </div>
            </ModalFooter>
          </>
        )}

        {openModal.action === "შემოწმება" && (
          <>
            <ModalBody>
              <p className="mb-10">
                დოკუმენტის სახელი:{" "}
                <span className="font-bold">
                  {selectedDocument?.document_name}
                </span>
              </p>
              <div className="flex justify-between items-center gap-4 mb-10">
                <p>შეამოწმეთ დოკუმენტის ხელმოწერა</p>
                <button
                  className="bg-primary text-white px-2 py-1 rounded min-w-[5.4rem] hover:text-white"
                  onClick={() => {
                    getDocumentByIdRefetch(selectedDocument.id);
                  }}
                >
                  {isFetching ? <LoadingSpinner /> : "შემოწმება"}
                </button>
              </div>
              {/* <p className="mt-10">signature: {documentById?.signature_doc}</p> */}

              <div className="min-h-14">
                {!isFetching &&
                  (documentById?.signature_doc ? (
                    <div className="flex justify-between gap-4 items-center">
                      <p>დოკუმენტი ხელმოწერილია</p>
                      <button
                        className="bg-success px-2 py-1 rounded hover:text-white text-white min-w-28"
                        onClick={() => downloadPDF(documentById.signature_doc)}
                      >
                        {downloadLoading ? <LoadingSpinner /> : "ჩამოტვირთვა"}
                      </button>
                    </div>
                  ) : (
                    <p className="py-1 text-danger">
                      დოკუმენტი ჯერ ხელმოწერილი არ არის
                    </p>
                  ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between gap-3">
                <Button
                  color="secondary"
                  onClick={() => setOpenModal({ open: false })}
                >
                  გაუქმება
                </Button>
                {/* <Button
                  className="min-w-[135px]"
                  onClick={() =>
                    signMutate({
                      doc_id: selectedDocument.id,
                      inv_id: 2,
                      html: selectedDocument.document_code,
                    })
                  }
                >
                  {deleteLoading ? <LoadingSpinner /> : "დადასტურება"}
                </Button> */}
              </div>
            </ModalFooter>
          </>
        )}

        {openModal.action === "ჩამორტვირთვა" && (
          <ModalBody>
            <p className="mb-8">დოკუმენტის ჩამორვირთვა ხელმოწერის გარეშე</p>
            {!documentById?.signature_doc ? (
              <button
                className="bg-primary px-2 py-1 rounded hover:text-white text-white min-w-28"
                onClick={() =>
                  unsignedDownloadMutate({
                    doc_id: selectedDocument.id,
                    inv_id: 2,
                    visualSignature: 3,
                    html: selectedDocument.document_code
                      .replaceAll('"', "'")
                      .replace(
                        "<span style='width: 160px; height:70px; border: 1px dashed red; color: red; margin-right: 80px; margin-left: 160px; display: flex; justify-content: center; align-items: center;'>TEST</span>",
                        "<span style='width: 160px; height:70px; border: 1px dashed white; color: white; opacity: 0.01; margin-right: 80px; margin-left: 160px; display: flex; justify-content: center; align-items: center;'>TEST</span>"
                      )
                      .trim(),
                  })
                }
              >
                {unsignedDownloadLoading ? (
                  <LoadingSpinner />
                ) : (
                  "ჩამოტვირთვის მოთხოვნა"
                )}
              </button>
            ) : (
              <p className="bg-warning rounded p-1">
                ეს დოკუმენტი უკვე ხელმოწერილია
              </p>
            )}

            {documentById?.not_signature_doc ? (
              <button
                className="bg-success px-2 py-1 rounded hover:text-white text-white min-w-28 block mt-10"
                onClick={() => downloadPDF(documentById?.not_signature_doc)}
              >
                {downloadLoading ? <LoadingSpinner /> : "ჩამოტვირთვა"}
              </button>
            ) : (
              ""
            )}
          </ModalBody>
        )}
      </Modal>

      <div className="w-full flex justify-between mb-4">
        <h3>დოკუმენტები</h3>

        <Button onClick={() => navigate("/documents/documents/create")}>
          <span>დამატება</span> <PlusIcon />
        </Button>
      </div>

      <div className="card p-5 mb-4 !text-xs">
        <h2 className="text-sm mb-4">კატეგორიები</h2>
        <ServiceCategoryTreeMenu
          categories={buildCategoryTree(
            catalogs.map((catalog) => {
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
            staticArr={documentsArr}
            fetchedArr={updatedList?.map((item) => {
              return {
                ...item,
                // template_code: truncateText(item?.template_code, 40),
                // org_id_displayName: idToName(organizations, item.org_id),
                template_id_displayName: idToName(templates, item.template_id),
                cat_id_displayName: idToName(catalogs, item.cat_id),
              };
            })}
            actions={{
              // editClick: (item) => {
              //   navigate(`/documents/documents/${item.id}`);
              // },
              deleteClick: (item) => {
                setOpenModal({
                  open: true,
                  action: "წაშლა",
                });
                setSelectedDocument(item);
              },
              unsignedDownload: (item) => {
                setOpenModal({ open: true, action: "ჩამორტვირთვა" });
                setSelectedDocument(item);
              },
              // detailClick: (item) => {
              //   navigate(`/documents/documents/${item.id}`);
              // },
              sign: (item) => {
                setOpenModal({
                  open: true,
                  action: "ხელმოწერა",
                });
                setSelectedDocument(item);
              },
              check: (item) => {
                setOpenModal({
                  open: true,
                  action: "შემოწმება",
                });
                setSelectedDocument(item);
              },
            }}
          />
        ) : (
          <p>დოკუმენტები არ მოიძებნა</p>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Documents;
