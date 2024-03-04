import {
  deleteDepartment,
  editDepartment,
  getDepartments,
} from "services/departments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrganizationById, getOrganizations } from "services/organizations";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useDepartments = () => {
  const { oid, did } = useParams();
  const queriClient = useQueryClient();
  const [choosenDepartment, setChoosenDepartment] = useState({});
  const [parentDepartment, setParentDepartment] = useState({
    id: 0,
    department_name: "",
  });
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [chosenOrganization, setChosenOrganization] = useState({});
  const [filteredDepartments, setFilteredDepartmens] = useState(null);
  const [orderedDepartments, setOrderedDepartments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  // const [departmentsFromOtherOrg, setDepartmentsFromOtherOrg] = useState([]);

  const { data: departments = [], isLoading } = useQuery({
    queryKey: ["departments", oid],
    queryFn: () => getDepartments(oid).then((res) => res.data.data),
  });

  const { data: organizations = [] } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });

  const { data: organization = {}, isLoading: isLoadingOrg } = useQuery({
    queryKey: "getOrganizationById",
    queryFn: () => getOrganizationById(oid).then((res) => res.data.data),
  });

  const { data: departmentsFromOtherOrg = [] } = useQuery({
    queryKey: ["departmentsFromOtherOrg", chosenOrganization.id],
    queryFn: () =>
      getDepartments(chosenOrganization.id).then((res) => res.data.data),
    enabled: chosenOrganization.id ? true : false,
  });

  useEffect(() => {
    if (departments.length > 0) {
      const deparmentsToRender = departments.filter((department) => {
        return department.id === +did || department.parent_id === +did;
      });
      setFilteredDepartmens(deparmentsToRender);
    }
  }, [departments, did]);

  useEffect(() => {
    if (filteredDepartments?.length > 0) {
      const parentDep = filteredDepartments.find(
        (department) => department.id === +did
      );
      const depsWithoutParent = filteredDepartments.filter(
        (department) => department.id !== +did
      );
      setOrderedDepartments([parentDep, ...depsWithoutParent]);
    } else {
      setOrderedDepartments([]);
    }
  }, [did, filteredDepartments]);

  const { mutate: editMutate } = useMutation({
    mutationFn: () =>
      editDepartment({
        department_name: newDepartmentName,
        parent_id: parentDepartment?.id || 0,
        oid: chosenOrganization.id || organization.id,
        id: choosenDepartment.id,
      }),
    onSuccess: () => {
      queriClient.invalidateQueries(["departments", oid]);
      setSuccessMessage("დეპარტამენტი წარმატებით შეიცვალა");
      setTimeout(() => {
        setIsEditModalOpen(false);
      }, 1500);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: () => deleteDepartment(choosenDepartment.id),
    onSuccess: () => {
      queriClient.invalidateQueries(["departments", oid]);
      setSuccessMessage("დეპარტამენტი წარმატებით წაიშალა");
      setTimeout(() => {
        setIsDeleteModalOpen(false);
      }, 1500);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const loading = isLoading || isLoadingOrg;

  return {
    departments,
    organization,
    loading,
    did,
    oid,
    orderedDepartments,
    successMessage,
    departmentsFromOtherOrg,
    organizations,
    editMutate,
    deleteMutate,
    setStates: {
      setChoosenDepartment,
      setNewDepartmentName,
      setIsDeleteModalOpen,
      setIsEditModalOpen,
      setChosenOrganization,
      setParentDepartment,
    },
    states: {
      choosenDepartment,
      newDepartmentName,
      isDeleteModalOpen,
      isEditModalOpen,
      chosenOrganization,
      parentDepartment,
    },
  };
};

export default useDepartments;
