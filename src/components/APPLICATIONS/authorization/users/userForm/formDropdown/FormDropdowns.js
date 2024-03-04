import CustomDropdown from "./CustomDropdown";

import { getOrganizations } from "services/organizations";

import { getDepartments } from "services/departments";
import { getPositionByDepartmentId } from "services/positions";
import { useWatch } from "react-hook-form";
import { useQuery } from "react-query";

const FormDropdowns = ({
  setValue,
  formObject,
  isFormEditing,
  action,
  errors,
}) => {
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
  });

  const { data: departments = [] } = useQuery({
    queryKey: ["departments", orgInput?.id],
    queryFn: () => getDepartments(orgInput.id).then((res) => res.data.data),
    enabled: !!orgInput?.id,
  });

  const { data: positions = [] } = useQuery({
    queryKey: ["positions", depInput?.id],
    queryFn: () =>
      getPositionByDepartmentId(depInput.id).then((res) => res.data.data),
    enabled: !!depInput?.id,
  });

  const disable = () => {
    if (!depInput) {
      return true;
    }
    if (positions.length === 0) {
      return true;
    }
    if (!isFormEditing && action === "edit") {
      return true;
    }
    return false;
  };

  return (
    <>
      <CustomDropdown
        disabled={!isFormEditing && action === "edit"}
        label="აირჩიეთ ორგანიზაცია"
        list={organizations}
        active={orgInput}
        setActive={setOrg}
        hasError={errors?.oid}
      />
      <CustomDropdown
        label="აირჩიეთ დეპარტამენტი"
        disabled={
          departments.length === 0 || (!isFormEditing && action === "edit")
            ? true
            : false
        }
        list={departments}
        active={depInput}
        setActive={setDep}
        hasError={errors?.did}
      />
      <CustomDropdown
        label="აირჩიეთ პოზიცია"
        disabled={disable()}
        list={positions}
        active={posInput}
        setActive={setPos}
        hasError={errors?.pid}
      />
    </>
  );
};

export default FormDropdowns;
