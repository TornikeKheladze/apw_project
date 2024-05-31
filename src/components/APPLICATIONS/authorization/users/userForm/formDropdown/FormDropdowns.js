import CustomDropdown from "./CustomDropdown";

import { getOrganizations } from "services/organizations";

import { getDepartments } from "services/departments";
import { getPositionByDepartmentId } from "services/positions";
import { useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

const FormDropdowns = ({ setValue, formObject, errors }) => {
  const [searchParam] = useSearchParams();
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

  const { data: organizations = [] } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
    onSuccess: (data) => {
      if (oid) {
        const org = data.find((org) => +org.id === +oid);
        setOrg(org);
      }
    },
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["departments", orgInput?.id],
    queryFn: () => getDepartments(orgInput.id).then((res) => res.data.data),
    enabled: !!orgInput?.id,
    onSuccess: (data) => {
      if (oid && did) {
        const dep = data.find((dep) => +dep.id === +did);
        setDep(dep);
      }
    },
  });

  const { data: positions = [] } = useQuery({
    queryKey: ["positions", depInput?.id],
    queryFn: () =>
      getPositionByDepartmentId(depInput.id).then((res) => res.data.data),
    enabled: !!depInput?.id,
    onSuccess: (data) => {
      if (oid && did && pid) {
        const pos = data.find((pos) => +pos.id === +pid);
        setPos(pos);
      }
    },
  });

  const disable = +!depInput || positions.length === 0;

  return (
    <>
      <CustomDropdown
        disabled={false}
        label="აირჩიეთ ორგანიზაცია"
        list={organizations}
        active={orgInput}
        setActive={setOrg}
        hasError={errors?.oid}
      />
      <CustomDropdown
        label="აირჩიეთ დეპარტამენტი"
        disabled={departments.length === 0 ? true : false}
        list={departments}
        active={depInput}
        setActive={setDep}
        hasError={errors?.did}
      />
      <CustomDropdown
        label="აირჩიეთ პოზიცია"
        disabled={disable}
        list={positions}
        active={posInput}
        setActive={setPos}
        hasError={errors?.pid}
      />
    </>
  );
};

export default FormDropdowns;
