import Button from "components/Button";
import Dropdown from "components/Dropdown";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { buildMemberList } from "helpers/treeMenuBuilder";
import { truncateText } from "helpers/truncateText";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getDepartmentById, getDepartments } from "services/departments";
import { getOrganizations } from "services/organizations";
import { getAllUsers, getUsersByTypeAndId } from "services/users";

const useUsers = () => {
  const { type, id } = useParams();
  const { authorizedUser } = useSelector((store) => store.user);

  // Fetch all users query
  const {
    data: userData = { users: [], member: null },
    isLoading: isUsersLoading,
  } = useQuery(["getUsers", type, id], async () => {
    if (type === "all" && id === "all") {
      return getAllUsers().then((res) => res.data);
    } else {
      return getUsersByTypeAndId(type, id).then((res) => res.data);
    }
  });

  const {
    data: organizationData = { data: [], member: null, dga: [] },
    isLoading: organizationsLoading,
  } = useQuery({
    queryKey: "getOrganizationsData",
    queryFn: () => getOrganizations().then((res) => res.data),
    enabled: type === "organisation",
  });

  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data;

  const organization =
    organizations.find(({ id: orgId }) => +orgId === +id) || {};

  // Fetch department and departments query
  const { data: departmentByIdData = { member: [], data: [] } } = useQuery({
    queryKey: ["department", id],
    queryFn: () => getDepartmentById(id).then((res) => res.data),
    enabled: type === "departments" ? true : false,
  });

  const department = departmentByIdData.member?.length
    ? departmentByIdData.member[0]
    : departmentByIdData.data[0] || {};

  const {
    data: departmentData = { data: [], member: null },
    isLoading: departmentsLoading,
  } = useQuery({
    queryKey: ["departments", department.oid],
    queryFn: () => getDepartments(department.oid).then((res) => res.data),
    enabled: type === "departments" && department.oid ? true : false,
  });

  const oid = type === "departments" ? department.oid : organization.id;

  const idFields = {
    organisation: "oid",
    departments: "did",
    positions: "pid",
  };

  const departments = buildMemberList(departmentData, authorizedUser, oid);
  const users = buildMemberList(userData, authorizedUser, id, idFields[type]);

  const header = () => {
    if (type === "organisation") {
      return (
        <>
          <h4 className="mb-3">ორგანიზაცია</h4>
          <Dropdown
            content={
              <div className="dropdown-menu min-w-[12rem]">
                {organizations
                  ?.filter((org) => org?.id !== organization?.id)
                  .map((org) => (
                    <Link
                      key={org?.id + Math.random()}
                      to={`/users/organisation/${org?.id}`}
                    >
                      {org.name}
                    </Link>
                  ))}
              </div>
            }
          >
            <Button className="uppercase mb-6 min-w-[12rem] flex justify-between w-1/2">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                truncateText(organization?.name, 50)
              )}
              <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
            </Button>
          </Dropdown>
        </>
      );
    } else if (type === "departments") {
      const department = departments.find((dep) => +dep?.id === +id);
      return (
        <>
          <h4 className="mb-3">დეპარტამენტი</h4>
          <Dropdown
            content={
              <div className="dropdown-menu min-w-[12rem]">
                {departments
                  ?.filter((dep) => dep.id !== department.id)
                  .map((dep) => (
                    <Link
                      key={dep.id + Math.random()}
                      to={`/users/departments/${dep.id}`}
                    >
                      {dep.department_name}
                    </Link>
                  ))}
              </div>
            }
          >
            <Button className="uppercase mb-6 min-w-[12rem] flex justify-between w-1/2">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                truncateText(department?.department_name, 50)
              )}
              <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
            </Button>
          </Dropdown>
        </>
      );
    } else if (type === "positions") {
      return `პოზიცია: ${users.length && users[0]?.position_name}`;
    }
  };

  const isLoading =
    isUsersLoading || organizationsLoading || departmentsLoading;

  return { users, departments, header, isLoading, type, id };
};

export default useUsers;
