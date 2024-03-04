import { addDepartment, getDepartments } from "services/departments";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { buildDepartmentTree } from "helpers/treeMenuBuilder";
import { getOrganizations } from "services/organizations";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getPackages } from "services/packages";
import {
  deleteOrgPackage,
  insertOrgPackage,
  searchOrgPackage,
} from "services/orgPackages";
import {
  getAllTemplates,
  getTemplateColumnsByTemplateId,
} from "services/documents";

const useDepartmentsTree = () => {
  const queriClient = useQueryClient();
  const { oid } = useParams();
  const [input, setInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [packageModal, setPackageModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
  });
  const [chosenDepartment, setChosenDepartment] = useState({
    id: 0,
    department_name: "",
  });

  const { data: departments = [], isLoading } = useQuery({
    queryKey: ["departments", oid],
    queryFn: () => getDepartments(oid).then((res) => res.data.data),
  });

  const { data: organizations = [], isLoading: isLoadingOrgs } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });
  const { data: packages = [] } = useQuery({
    queryKey: ["getPackages"],
    queryFn: () => getPackages().then((res) => res.data),
  });

  const { data: orgPackages = [] } = useQuery({
    queryKey: ["searchOrgPackage", oid],
    queryFn: () =>
      searchOrgPackage({
        fild: "oid",
        value: oid,
      }).then((res) => res.data),
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
        setSuccessMessage("დეპარტამენტი წარმატებით შეიქმნა");
        setInput("");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      },
    });

  const { mutate: insertOrgPackageMutate, isLoading: insertOrgPackageLoading } =
    useMutation({
      mutationFn: insertOrgPackage,
      onSuccess: () => {
        queriClient.invalidateQueries(["searchOrgPackage", oid]);
        setSuccessMessage("პაკეტი წარმატებით დაემატა");
        setPackageModal(false);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      },
    });
  const { mutate: deleteOrgPackageMutate, isLoading: deleteOrgPackageLoading } =
    useMutation({
      mutationFn: deleteOrgPackage,
      onSuccess: () => {
        queriClient.invalidateQueries(["searchOrgPackage", oid]);
        setSuccessMessage("პაკეტი წარმატებით წაიშალა");
        setDeleteModal({ isOpen: false });
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
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

  const bindOrgToPackage = (data) => {
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
    };

    templateColums.forEach((item) => {
      insertData[item.column_marker] = `test ${item.column_marker}`;
    });

    insertOrgPackageMutate(insertData);
  };

  const departmentTree = buildDepartmentTree(departments);
  const organization = organizations.find((org) => +org?.id === +oid) || {};
  const initialLoading = isLoading || isLoadingOrgs;

  return {
    departments,
    organization,
    organizations,
    departmentTree,
    addDepartmentMutate,
    packages,
    bindOrgToPackage,
    orgPackages,
    deleteOrgPackageMutate,
    states: {
      input,
      chosenDepartment,
      successMessage,
      packageModal,
      deleteModal,
    },
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
    },
  };
};

export default useDepartmentsTree;
