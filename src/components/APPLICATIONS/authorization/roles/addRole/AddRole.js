import Button from "components/Button";
import CustomSelect from "components/form/CustomSelect";
import Input from "components/form/Input";
import Label from "components/form/Label";
import { APPLICATIONS } from "data/applications";
import { useState } from "react";
import PermissionSelect from "../PermissionSelect";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { permissionsObj } from "data/permissions";

const AddRole = ({ add, loading, permissions }) => {
  const [aid, setAid] = useState();
  const [input, setInput] = useState("");

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    const regex = /^[A-Za-z]+$/;
    if (input === "" || regex.test(input)) {
      setInput(input);
    }
  };

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
        placeholder="როლის სახელი ლათინური სიმბოლოებით"
      />
      <CustomSelect onChange={(e) => setAid(e.target.value)}>
        <option value="">აპლიკაცია</option>
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
      <PermissionSelect
        options={permissions.map((p) => {
          return { ...p, name: permissionsObj[p.name] };
        })}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
      />

      <Button
        disabled={!input || !aid}
        onClick={() => {
          add({
            aid,
            permission: selectedPermissions.map((p) => p.id),
            role_name: input,
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
