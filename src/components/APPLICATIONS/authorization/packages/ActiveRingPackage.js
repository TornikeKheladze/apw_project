import Footer from "partials/Footer";
import Button from "components/Button";

import Alert from "components/Alert.js";
import LoadingSpinner from "components/icons/LoadingSpinner.js";
import Modal, { ModalHeader } from "components/Modal.js";
import AuthForm from "../authForm/AuthForm.js";
import { orgPackageArr } from "components/APPLICATIONS/billing/formArrays/packageArr.js";
import DeleteModal from "components/customModal/DeleteModal.js";
import { createInvoice } from "services/billingPackages.js";
import {
  createUserInvoiceDoc,
  getAllTemplates,
  getDocumentByUUID,
} from "services/documents.js";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { getOrganizations } from "services/organizations.js";
import { activatePackage, getRingPackages } from "services/packages.js";
import { downloadPDF } from "helpers/downloadPDF.js";
import {
  deleteRingActivePackage,
  insertRingActivePackage,
  searchRingActivePackage,
} from "services/orgPackages.js";

const ActiveRingPackage = () => {
  const queriClient = useQueryClient();
  const { oid } = useParams();
  // eslint-disable-next-line
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });
  const [packageModal, setPackageModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
  });
  const [activatePackageModal, setActivatePackateModal] = useState({
    isOpen: false,
    package: {},
  });

  const { authorizedUser } = useSelector((store) => store.user);

  const { data: organizationData = { data: [], member: null, dga: [] } } =
    useQuery({
      queryKey: "getOrganizationsData",
      queryFn: () => getOrganizations().then((res) => res.data),
    });

  const { data: packages = [] } = useQuery({
    queryKey: ["getRingPackages"],
    queryFn: () => getRingPackages().then((res) => res.data),
  });

  const { isLoading: getDocumentLoading, mutate: getDocumentByUUIDMutate } =
    useMutation({
      mutationFn: getDocumentByUUID,
      onSuccess: (data) => {
        const doc = data.data.data[0];
        if (doc) {
          downloadPDF(doc.not_signature_doc, setDownloadLoading);
        }
      },
    });

  const { data: orgPackages = [] } = useQuery({
    queryKey: ["searchRingPackage", oid],
    queryFn: () =>
      searchRingActivePackage({
        fild: "oid",
        value: oid,
      }).then((res) => res.data),
  });
  const { mutate: createInvoiceMutate, isLoading: createInvoiceLoading } =
    useMutation({
      mutationFn: createUserInvoiceDoc,
      onSuccess: () => {
        setAlert({
          message: "ინვოისი წარმატებით შეიქმნა",
          type: "success",
        });
      },
    });

  const { mutate: insertOrgPackageMutate, isLoading: insertOrgPackageLoading } =
    useMutation({
      mutationFn: insertRingActivePackage,
      onSuccess: (data) => {
        createInvoiceMutate({
          package_id: data.data.package_id,
          invoice_id: data.data.uuid,
        });
        queriClient.invalidateQueries(["searchRingPackage", oid]);
        setAlert({
          message: "პაკეტი წარმატებით დაემატა",
          type: "success",
        });
        setPackageModal(false);
        setTimeout(() => {
          setAlert({
            message: "",
            type: "success",
          });
        }, 3000);
      },
    });
  const { mutate: deleteOrgPackageMutate, isLoading: deleteOrgPackageLoading } =
    useMutation({
      mutationFn: deleteRingActivePackage,
      onSuccess: () => {
        queriClient.invalidateQueries(["searchRingPackage", oid]);
        setAlert({ message: "პაკეტი წარმატებით წაიშალა", type: "success" });
        setDeleteModal({ isOpen: false });
        setTimeout(() => {
          setAlert({ message: "", type: "success" });
        }, 3000);
      },
    });
  const { mutate: activatePackageMutate, isLoading: activatePackageLoading } =
    useMutation({
      mutationFn: () => activatePackage(activatePackageModal.package.uuid),
      onSuccess: () => {
        queriClient.invalidateQueries(["searchRingPackage", oid]);
        setAlert({ message: "პაკეტი წარმატებით გააქტიურდა", type: "success" });
        setActivatePackateModal({ isOpen: false, package: {} });
        setTimeout(() => {
          setAlert({ message: "", type: "success" });
        }, 2500);
      },
    });

  const { data: templates = [] } = useQuery({
    queryKey: "getAllTemplates",
    queryFn: () => getAllTemplates().then((res) => res.data.data),
  });

  const templateForActiveOrganization =
    templates.filter((template) => +template.org_id === +oid)[0] || {};

  // const { data: templateColums = [] } = useQuery({
  //   queryKey: [
  //     "getTemplateColumnsByTemplateId",
  //     templateForActiveOrganization.id,
  //   ],
  //   queryFn: () =>
  //     getTemplateColumnsByTemplateId(templateForActiveOrganization.id).then(
  //       (res) => res.data.data
  //     ),
  //   enabled: templateForActiveOrganization.id ? true : false,
  // });

  const bindOrgToPackage = async (data) => {
    try {
      const res = await createInvoice({
        ownerID: organizationData.dga[0].id,
        agentID: oid,
      });
      function addMonthsToDate(months) {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + months);
        return currentDate.toISOString().split("T")[0];
      }
      const selectedPackage = packages.find((p) => +p.id === +data.package_id);

      const insertData = {
        oid,
        package_id: data.package_id,
        count: selectedPackage.count,
        start_date: new Date().toISOString().split("T")[0],
        end_date: addMonthsToDate(selectedPackage.invoice_exp),
        template_id: templateForActiveOrganization.id,
        cat_id: templateForActiveOrganization.cat_id,
        invoice_id: res.data.invoiceNumber,
      };

      // templateColums.forEach((item) => {
      //   insertData[item.column_marker] = `test ${item.column_marker}`;
      // });
      insertOrgPackageMutate(insertData);
    } catch (error) {
      console.log(error);
      setAlert({
        message: "Something Went Wrong",
        type: "danger",
      });
    }
  };

  const renderPackages = authorizedUser.superAdmin
    ? packages
    : packages.filter((item) => +item.oid === +authorizedUser.oid);

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
            formArray={orgPackageArr.filter(
              (item) => item.name !== "payment_period"
            )}
            submitHandler={bindOrgToPackage}
            optionsObj={{
              package_id: renderPackages?.map((item) => {
                return {
                  ...item,
                  name: `მომხმარებელი:${item.count}, ფასი: ${item.price}`,
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
          <h3 className="mb-3 text-base">მიმდინარე ბეჭდის პაკეტები</h3>
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
                  <th>აქტიური მომხმარებლები</th>
                  {/* <th>დაწყების თარიღი</th> */}
                  {/* <th>დასრულების თარიღი</th> */}
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
                               : "cursor-default"
                           }
                        `}
                        onClick={() => {
                          if (authorizedUser.superAdmin) {
                            setActivatePackateModal({
                              isOpen: true,
                              package: item,
                            });
                          }
                        }}
                      >
                        {item.active === 1 ? "აქტიური" : "არააქტიური"}
                      </Button>
                    </td>
                    <td>{item.count}</td>
                    <td>{item.active_users}</td>
                    {/* <td>{item.start_date}</td> */}
                    {/* <td>{item.end_date}</td> */}
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

export default ActiveRingPackage;
