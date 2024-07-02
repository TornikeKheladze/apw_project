import { addDepartment, getDepartments } from "services/departments";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buildDepartmentTree, buildMemberList } from "helpers/treeMenuBuilder";
import { getOrganizations } from "services/organizations";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

const useDepartmentsTree = () => {
  const queriClient = useQueryClient();
  const { oid } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
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

  const { mutate: addDepartmentMutate, isLoading: addDepartmentLoading } =
    useMutation({
      mutationFn: () =>
        addDepartment({
          department_name: input,
          parent_id: chosenDepartment.id,
          oid,
        }),
      onSuccess: (data) => {
        queriClient.invalidateQueries(["departments", oid]);
        setAlert({
          message: "დეპარტამენტი წარმატებით შეიქმნა",
          type: "success",
        });
        setTimeout(() => {
          navigate(`/positions/${oid}/${data.data.id}`);
        }, 1500);
        setInput("");
        setTimeout(() => {
          setAlert({ message: "", type: "success" });
        }, 3000);
      },
    });

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
    mutates: { addDepartmentMutate },
    states: { input, chosenDepartment, alert },
    setStates: { setInput, setChosenDepartment },
    loadings: { addDepartmentLoading, initialLoading },
  };
};

export default useDepartmentsTree;
