import Button from "components/Button";

import Alert from "components/Alert.js";
import LoadingSpinner from "components/icons/LoadingSpinner.js";
import Modal, { ModalBody, ModalHeader } from "components/Modal.js";
import { orgPackageArr } from "components/APPLICATIONS/billing/formArrays/packageArr.js";
import DeleteModal from "components/customModal/DeleteModal.js";
import { createInvoice } from "services/billingPackages.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createUserInvoiceDoc,
  getAllTemplates,
  getDocumentByUUID,
} from "services/documents.js";
import {
  activatePackage,
  getPackages,
  getPaymentDiagram,
} from "services/packages.js";
import {
  deleteOrgPackage,
  getPaymentMethods,
  insertOrgPackage,
  searchOrgPackage,
} from "services/orgPackages.js";
import { downloadPDF } from "helpers/downloadPDF.js";
import { getOrganizations } from "services/organizations.js";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Dropdown from "components/Dropdown.js";
import { truncateText } from "helpers/truncateText.js";
import { useForm, useWatch } from "react-hook-form";
import Label from "components/form/Label.js";
import CustomSelect from "components/form/CustomSelect.js";

const ActivePackage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({});

  const payment_period = useWatch({
    control,
    name: "payment_period",
  });

  const queriClient = useQueryClient();
  const { oid } = useParams();
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });
  const [packageModal, setPackageModal] = useState(false);
  // eslint-disable-next-line
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
  });
  const [activatePackageModal, setActivatePackateModal] = useState({
    isOpen: false,
    package: {},
  });
  const [diagramModal, setDiagramModal] = useState(false);

  const { authorizedUser } = useSelector((store) => store.user);

  const { data: organizationData = { data: [], member: null, dga: [] } } =
    useQuery({
      queryKey: "getOrganizationsData",
      queryFn: () => getOrganizations().then((res) => res.data),
    });

  const { data: packages = [] } = useQuery({
    queryKey: ["getPackages"],
    queryFn: () => getPackages().then((res) => res.data),
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
    queryKey: ["searchOrgPackage", oid],
    queryFn: () =>
      searchOrgPackage({
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
      onError: (data) => {
        setAlert({
          type: "danger",
          message: data.response.data.message,
        });
      },
    });

  const { mutate: insertOrgPackageMutate, isLoading: insertOrgPackageLoading } =
    useMutation({
      mutationFn: insertOrgPackage,
      onSuccess: (data) => {
        createInvoiceMutate({
          invoice_number: data.data.data.id,
          oid,
        });
        queriClient.invalidateQueries(["searchOrgPackage", oid]);
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
      onError: (data) => {
        setAlert({
          type: "danger",
          message: data.response.data.message,
        });
      },
    });
  const { mutate: deleteOrgPackageMutate, isLoading: deleteOrgPackageLoading } =
    useMutation({
      mutationFn: deleteOrgPackage,
      onSuccess: () => {
        queriClient.invalidateQueries(["searchOrgPackage", oid]);
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
        queriClient.invalidateQueries(["searchOrgPackage", oid]);
        setAlert({ message: "პაკეტი წარმატებით გააქტიურდა", type: "success" });
        setActivatePackateModal({ isOpen: false, package: {} });
        setTimeout(() => {
          setAlert({ message: "", type: "success" });
        }, 2500);
      },
      onError: (data) => {
        setAlert({
          type: "danger",
          message: data.response.data.message,
        });
        setTimeout(() => {
          setAlert({ message: "", type: "danger" });
        }, 2500);
      },
    });

  const { data: templates = [] } = useQuery({
    queryKey: "getAllTemplates",
    queryFn: () => getAllTemplates().then((res) => res.data.data),
  });

  const { data: paymentMethods = [] } = useQuery({
    queryKey: "getPaymentMethods",
    queryFn: () => getPaymentMethods().then((res) => res.data.data),
  });

  const {
    data: paymentDiagram = [],
    isLoading: paymentDiagramLoading,
    mutate: getPaymentDiagramMutate,
  } = useMutation({
    mutationFn: (id) => getPaymentDiagram(id).then((res) => res.data),
    onSuccess: () => setDiagramModal(true),
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
        ...data,
        oid,
        count: selectedPackage.count,
        start_date: new Date().toISOString().split("T")[0],
        end_date: addMonthsToDate(selectedPackage.exp),
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
  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data;
  const organization = organizations.find((org) => +org?.id === +oid) || {};

  const optionsObj = {
    package_id: renderPackages?.map((item) => {
      return {
        ...item,
        name: `მომხმარებელი:${item.count}, ვადა:${item.exp} თვე, ფასი: ${item.price}`,
      };
    }),
    payment_period: paymentMethods,
  };

  const formArr =
    +payment_period === 5
      ? [
          ...orgPackageArr,
          {
            name: "payment_methos_data",
            label: "აირჩიეთ თარიღი",
            type: "date",
          },
        ]
      : orgPackageArr;

  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <main className="workspace">
      <Alert message={alert.message} color={alert.type} dismissable />
      {getDocumentLoading || paymentDiagramLoading ? (
        <LoadingSpinner blur />
      ) : (
        <></>
      )}

      <Modal
        active={diagramModal}
        centered
        onClose={() => setDiagramModal(false)}
      >
        <ModalHeader>გადახდების დიაგრამა</ModalHeader>
        <ModalBody>
          <table>
            <thead>
              <tr>
                <th className="pr-1">თარიღი</th>
                <th className="pr-1">გადასახდელი</th>
                <th className="pr-1">სრული</th>
                <th className="pr-1">დარჩენილი</th>
              </tr>
            </thead>
            <tbody>
              {paymentDiagram.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="text-center">{item.month}</td>
                    <td className="text-center">{item.pay}</td>
                    <td className="text-center">{item.pay_after}</td>
                    <td className="text-center">{item.to_sav}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ModalBody>
      </Modal>
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
          <form
            onSubmit={handleSubmit(bindOrgToPackage)}
            // onSubmit={handleSubmit((დატა) => console.log(დატა))}
            className="flex flex-col gap-4"
          >
            {formArr.map(({ name, label, type }) => {
              if (type === "select") {
                return (
                  <div key={name}>
                    <Label
                      className={`block mb-1  ${
                        errors[name] ? "text-danger" : ""
                      }`}
                    >
                      {label}
                    </Label>
                    <CustomSelect
                      name={name}
                      register={register}
                      className={`${errors[name] ? "border-danger" : ""}`}
                      rules={{ required: "ველი აუცილებელია" }}
                    >
                      <option value="">{label}</option>
                      {optionsObj &&
                        optionsObj[name]?.map((item) => (
                          <option
                            className="p-3"
                            key={item.id.toString() + item.name}
                            value={item.id}
                          >
                            {item.label || item.name}
                          </option>
                        ))}
                    </CustomSelect>
                  </div>
                );
              } else {
                return (
                  <div key={name}>
                    <Label
                      className={`block mb-1  ${
                        errors[name] ? "text-danger" : ""
                      }`}
                    >
                      {label}
                    </Label>
                    <input
                      type="date"
                      name={name}
                      min={formatDate(today)}
                      max={formatDate(endOfYear)}
                      {...register(name, {
                        required: "ველი აუცილებელია",
                      })}
                      className={`${
                        errors[name] ? "border-danger" : ""
                      } form-control`}
                    />
                  </div>
                );
              }
            })}
            <div className="flex items-center justify-between">
              <Button
                disabled={insertOrgPackageLoading || createInvoiceLoading}
                className="w-max"
              >
                {insertOrgPackageLoading || createInvoiceLoading ? (
                  <LoadingSpinner />
                ) : (
                  "დადასტურება"
                )}
              </Button>
            </div>
          </form>
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
        {authorizedUser.isSip ? (
          <>
            <h4>ავტორიზირებული პირი</h4>
            <Dropdown
              content={
                <div className="dropdown-menu min-w-[12rem]">
                  {organizations
                    ?.filter((org) => org.id !== organization.id)
                    .map((org) => (
                      <Link
                        key={org.id + Math.random()}
                        to={`/activePackage/${org.id}`}
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
          </>
        ) : (
          <></>
        )}

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
                  <th>სტატუსი</th>
                  <th>რაოდენობა</th>
                  <th>დაწყების თარიღი</th>
                  <th>დასრულების თარიღი</th>
                  <th>გადახდის დიაგრამა</th>
                  <th></th>
                  <th></th>
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
                             authorizedUser.isSip
                               ? "cursor-pointer"
                               : "cursor-default"
                           }
                        `}
                        onClick={() => {
                          if (authorizedUser.isSip) {
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
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>
                      <button
                        type="button"
                        className="dark:text-gray-700 text-sm leading-none"
                        onClick={() => getPaymentDiagramMutate(item.id)}
                      >
                        ნახვა
                        <span className="la la-eye ml-1"></span>
                      </button>
                    </td>
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
    </main>
  );
};

export default ActivePackage;
