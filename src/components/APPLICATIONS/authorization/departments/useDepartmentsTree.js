import { addDepartment, getDepartments } from "services/departments";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { buildDepartmentTree, buildMemberList } from "helpers/treeMenuBuilder";
import { getOrganizations } from "services/organizations";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { activatePackage, getPackages } from "services/packages";
import {
  deleteOrgPackage,
  insertOrgPackage,
  searchOrgPackage,
} from "services/orgPackages";
import {
  createUserInvoiceDoc,
  getAllTemplates,
  getDocumentByUUID,
  getTemplateColumnsByTemplateId,
} from "services/documents";
import { createInvoice } from "services/billingPackages";
import { downloadPDF } from "helpers/downloadPDF";
import { useSelector } from "react-redux";

const useDepartmentsTree = () => {
  const queriClient = useQueryClient();
  const { oid } = useParams();
  const [input, setInput] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });
  const [packageModal, setPackageModal] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
  });
  const [activatePackageModal, setActivatePackateModal] = useState({
    isOpen: false,
    package: {},
  });

  const [chosenDepartment, setChosenDepartment] = useState({
    id: 0,
    department_name: "",
  });
  const { authorizedUser } = useSelector((store) => store.user);

  const { data: departmentData = { data: [], member: null }, isLoading } =
    useQuery({
      queryKey: ["departments", oid],
      queryFn: () => getDepartments(oid).then((res) => res.data),
    });

  const {
    data: organizationData = { data: [], member: null, dga: [] },
    isLoading: isLoadingOrgs,
  } = useQuery({
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
    });

  const { mutate: addDepartmentMutate, isLoading: addDepartmentLoading } =
    useMutation({
      mutationFn: () =>
        addDepartment({
          department_name: input,
          parent_id: chosenDepartment.id,
          oid,
        }),
      onSuccess: () => {
        queriClient.invalidateQueries(["departments", oid]);
        setAlert({
          message: "დეპარტამენტი წარმატებით შეიქმნა",
          type: "success",
        });
        setInput("");
        setTimeout(() => {
          setAlert({ message: "", type: "success" });
        }, 3000);
      },
    });

  const { mutate: insertOrgPackageMutate, isLoading: insertOrgPackageLoading } =
    useMutation({
      mutationFn: insertOrgPackage,
      onSuccess: (data) => {
        createInvoiceMutate({
          package_id: data.data.package_id,
          invoice_id: data.data.uuid,
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
    });

  // to bind organization to package
  const { data: templates = [] } = useQuery({
    queryKey: "getAllTemplates",
    queryFn: () => getAllTemplates().then((res) => res.data.data),
  });

  const templateForActiveOrganization =
    templates.filter((template) => +template.org_id === +oid)[0] || {};

  const { data: templateColums = [] } = useQuery({
    queryKey: [
      "getTemplateColumnsByTemplateId",
      templateForActiveOrganization.id,
    ],
    queryFn: () =>
      getTemplateColumnsByTemplateId(templateForActiveOrganization.id).then(
        (res) => res.data.data
      ),
    enabled: templateForActiveOrganization.id ? true : false,
  });

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
        end_date: addMonthsToDate(selectedPackage.exp),
        template_id: templateForActiveOrganization.id,
        cat_id: templateForActiveOrganization.cat_id,
        invoice_id: res.data.invoiceNumber,
      };

      templateColums.forEach((item) => {
        insertData[item.column_marker] = `test ${item.column_marker}`;
      });
      insertOrgPackageMutate(insertData);
    } catch (error) {
      console.log(error);
      setAlert({
        message: "Something Went Wrong",
        type: "danger",
      });
    }
  };

  // თუ მემბერი მოყვება ანუ თავისი შექმნილი ორგანიზაცია
  // ორ ერეის ვაერთიანებ. თუ არმოყვება სტანდარტულად ვუშვებ
  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data;

  const departments = buildMemberList(departmentData, authorizedUser, oid);

  const departmentTree = buildDepartmentTree(departments);
  const organization = organizations.find((org) => +org?.id === +oid) || {};
  const initialLoading = isLoading || isLoadingOrgs;

  return {
    departments,
    organization,
    organizations,
    departmentTree,
    packages,
    bindOrgToPackage,
    orgPackages,
    authorizedUser,
    mutates: {
      insertOrgPackageMutate,
      createInvoiceMutate,
      addDepartmentMutate,
      deleteOrgPackageMutate,
      getDocumentByUUIDMutate,
      activatePackageMutate,
    },
    states: {
      input,
      chosenDepartment,
      alert,
      packageModal,
      deleteModal,
      activatePackageModal,
    },
    setStates: {
      setInput,
      setChosenDepartment,
      setPackageModal,
      setDeleteModal,
      setActivatePackateModal,
    },
    loadings: {
      addDepartmentLoading,
      initialLoading,
      insertOrgPackageLoading,
      deleteOrgPackageLoading,
      createInvoiceLoading,
      getDocumentLoading: getDocumentLoading || downloadLoading,
      activatePackageLoading,
    },
  };
};

export default useDepartmentsTree;
