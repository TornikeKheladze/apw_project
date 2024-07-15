import Button from "components/Button";
import CustomSelect from "components/form/CustomSelect";
import Input from "components/form/Input";
import Label from "components/form/Label";
import { APPLICATIONS } from "data/applications";
import { useEffect, useState } from "react";
import PermissionSelect from "../PermissionSelect";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { permissionsObj } from "data/permissions";
import { getOrganizations } from "services/organizations";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { convertGeorgianToEnglish } from "helpers/convertGeorgianToEnglish";

const AddRole = ({ add, loading, permissions }) => {
  const [aid, setAid] = useState("1");
  const [oid, setOid] = useState();
  const [input, setInput] = useState("");
  const { authorizedUser } = useSelector((store) => store.user);

  const permissionByAid = () => {
    if (aid === "1") {
      return permissions.filter((item) => item.name.startsWith("user"));
    } else if (aid === "2") {
      return permissions.filter((item) => item.name.startsWith("doc"));
    } else if (aid === "4") {
      return permissions.filter((item) => item.name.startsWith("bil"));
    }
  };

  useEffect(() => {
    if (!authorizedUser.superAdmin) {
      setOid(authorizedUser.oid);
    }
  }, [authorizedUser]);

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { data: organizationData = { data: [], member: null, dga: [] } } =
    useQuery({
      queryKey: "getOrganizationsData",
      queryFn: () => getOrganizations().then((res) => res.data),
      onSuccess: (data) => setOid(data.data[0].id || data.member[0].id),
    });

  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data;

  const handleInputChange = (e) => {
    // const input = e.target.value;
    // const regex = /^[A-Za-z]+$/;
    // if (input === "" || regex.test(input)) {
    //   setInput(input);
    // }
    const input = e.target.value;
    const regex = /^\S*$/;
    if (input === "" || regex.test(input)) {
      setInput(input);
    }
  };
  const activeOrganization =
    organizations.find((item) => +item.id === +oid) || {};
  const activeApplication =
    APPLICATIONS.find((item) => +item.id === +aid) || {};

  const actualRoleName =
    convertGeorgianToEnglish(activeOrganization.short_name || "") +
    "_" +
    activeApplication.nameEng +
    "_" +
    convertGeorgianToEnglish(input);

  return (
    <div className="card p-5 mb-4">
      <h3 className="mb-6">ახალი როლის შექმნა</h3>
      <Label className="block mb-2 mt-4" htmlFor="role">
        როლის დასახელება
      </Label>
      <Input
        value={input}
        onChange={handleInputChange}
        id="role"
        className="mb-4"
        placeholder="როლის სახელი"
      />
      <Label className="block mb-2" htmlFor="aid">
        აირჩიეთ აპლიკაცია
      </Label>
      <CustomSelect id="aid" onChange={(e) => setAid(e.target.value)}>
        {APPLICATIONS.map((item) => (
          <option
            className="p-3"
            key={item.id.toString() + item.name}
            value={item.id}
          >
            {item.name}
          </option>
        ))}
      </CustomSelect>
      {authorizedUser.superAdmin && (
        <>
          <Label className="block mb-2 mt-2" htmlFor="oid">
            აირჩიეთ უწყება ან ავტორიზირებული პირი
          </Label>
          <CustomSelect id="oid" onChange={(e) => setOid(e.target.value)}>
            {organizations.map((item) => (
              <option className="p-3" key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </CustomSelect>
        </>
      )}

      <PermissionSelect
        options={permissionByAid().map((p) => {
          return { ...p, name: permissionsObj[p.name] };
        })}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
      />
      {input && (
        <p className="mt-1">
          როლის სახელი იქნება: <strong>{actualRoleName}</strong>
        </p>
      )}

      <Button
        disabled={!input || !aid || !oid}
        onClick={() => {
          add({
            aid,
            permission: selectedPermissions.map((p) => p.id),
            role_name: actualRoleName,
            oid,
            url: APPLICATIONS.find((app) => +app.id === +aid).url,
          });
          setInput("");
          setSelectedPermissions([]);
        }}
        className="mt-4"
      >
        {loading === "isAdding" ? (
          <span className="w-[5.8rem]">
            <LoadingSpinner />
          </span>
        ) : (
          "დადასტურება"
        )}
      </Button>
    </div>
  );
};

export default AddRole;
