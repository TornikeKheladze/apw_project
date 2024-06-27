import CustomDropdown from "./CustomDropdown";

import { getOrganizations } from "services/organizations";

import { getDepartments } from "services/departments";
import { getPositionByDepartmentId } from "services/positions";
import { useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { buildMemberList } from "helpers/treeMenuBuilder";
import { useSelector } from "react-redux";

const FormDropdowns = ({ setValue, formObject, errors }) => {
  const [searchParam] = useSearchParams();
  const { authorizedUser } = useSelector((store) => store.user);
  const oid = searchParam.get("oid");
  const did = searchParam.get("did");
  const pid = searchParam.get("pid");

  const orgInput =
    useWatch({
      name: "oid",
      control: formObject.control,
    }) || {};
  const depInput =
    useWatch({
      name: "did",
      control: formObject.control,
    }) || {};
  const posInput =
    useWatch({
      name: "pid",
      control: formObject.control,
    }) || {};

  const setOrg = (item) => {
    setValue("oid", item);
    formObject.resetField("did");
    formObject.resetField("pid");
  };

  const setDep = (item) => {
    setValue("did", item);
    formObject.resetField("pid");
  };

  const setPos = (item) => {
    setValue("pid", item);
  };

  const { data: organizationData = { data: [], member: null, dga: [] } } =
    useQuery({
      queryKey: "getOrganizations",
      queryFn: () => getOrganizations().then((res) => res.data),
      onSuccess: (data) => {
        if (oid) {
          const orgData = data.data || [];
          const member = data.member || [];
          const org = [...orgData, ...member].find((org) => +org.id === +oid);
          setOrg(org);
        }
      },
    });

  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data || [];

  const oidForFetch = orgInput?.id || oid;
  const { data: departmentData = { data: [], member: null } } = useQuery({
    queryKey: ["departments", oidForFetch],
    queryFn: () => getDepartments(oidForFetch).then((res) => res.data),
    enabled: !!oidForFetch,
    onSuccess: (data) => {
      if (oid && did) {
        const depData = data.data || [];
        const member = data.member || [];
        const dep = [...depData, ...member].find((dep) => +dep.id === +did);
        if (+dep.oid === +oidForFetch) setDep(dep);
      }
    },
  });

  const departments = buildMemberList(
    departmentData,
    authorizedUser,
    oidForFetch
  );

  const didForFetch = depInput?.id || did;
  const { data: positionsData = { data: [], member: null } } = useQuery({
    queryKey: ["positions", didForFetch],
    queryFn: () =>
      getPositionByDepartmentId(didForFetch).then((res) => res.data),
    enabled: !!didForFetch,
    onSuccess: (data) => {
      if (oid && did && pid) {
        const posData = data.data || [];
        const member = data.member || [];
        const pos = [...posData, ...member].find((pos) => +pos.id === +pid);
        if (+pos.did === +didForFetch) setPos(pos);
      }
    },
  });
  const positions = buildMemberList(positionsData, authorizedUser, orgInput.id);

  const disable = +!depInput || positions.length === 0;

  return (
    <>
      {!oid && (
        <CustomDropdown
          disabled={false}
          label="აირჩიეთ უწყება ან ავტ. პირი"
          list={organizations}
          active={orgInput}
          setActive={setOrg}
          hasError={errors?.oid}
        />
      )}
      {!did && (
        <CustomDropdown
          label="აირჩიეთ დეპარტამენტი"
          disabled={departments.length === 0 ? true : false}
          list={departments}
          active={depInput}
          setActive={setDep}
          hasError={errors?.did}
        />
      )}
      {!pid && (
        <CustomDropdown
          label="აირჩიეთ პოზიცია"
          disabled={disable}
          list={positions}
          active={posInput}
          setActive={setPos}
          hasError={errors?.pid}
        />
      )}
    </>
  );
};

export default FormDropdowns;
