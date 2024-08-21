import Alert from "components/Alert";
import Button from "components/Button";
import Checkbox from "components/form/Checkbox";
import CustomSelect from "components/form/CustomSelect";
import useGrantRoleToUsers from "./useGrantRoleToUsers";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { Link } from "react-router-dom";

const GrantRoleToUsers = () => {
  const {
    roles,
    selectedUsers,
    setSelectedUsers,
    users,
    isLoading,
    roleChangeHandler,
    submitHandler,
    handleCheckboxChange,
    selectedRole,
    setRoleMutateLoading,
    alert,
  } = useGrantRoleToUsers();

  return (
    <main className="workspace">
      <div className="lg:w-1/2 w-full mx-auto card mb-3 p-5">
        <h3 className="text-base sm:text-lg mb-4 text-primary">
          მომხმარებლებლები
        </h3>
        {users.length > 0 && (
          <button
            className="rounded-md border-primary border-[1px] mb-2 p-1"
            onClick={() =>
              setSelectedUsers(
                selectedUsers.length === users.length
                  ? []
                  : [...users.map((user) => user.id)]
              )
            }
          >
            ყველას მონიშვნა
          </button>
        )}
        <div className="  grid gap-y-4 sm:grid-cols-3 grid-cols-1  w-full ">
          {isLoading ? (
            <div className="flex flex-col gap-2 items-center mx-auto col-span-3">
              <LoadingSpinner />
              <p>იტვირთება...</p>
            </div>
          ) : (
            users?.map((user) => (
              <Checkbox
                key={user.id + Math.random().toString()}
                label={user.name + " " + user.l_name}
                checked={selectedUsers.includes(user.id)}
                onChange={(event) => handleCheckboxChange(event, user.id)}
              />
            ))
          )}
        </div>
      </div>
      <div className="card p-5 lg:w-1/2 w-full mx-auto">
        <div className="mt-5">
          <CustomSelect value={selectedRole} onChange={roleChangeHandler}>
            <option value={null}>აირჩიეთ როლი</option>
            {roles?.map((role) => (
              <option key={role.id + Math.random()} value={role.id}>
                {role.name}
              </option>
            ))}
          </CustomSelect>

          <div className="flex items-center gap-3 mt-6">
            <Link to={-1}>
              <Button
                color="secondary"
                className="w-max min-w-[135px] flex justify-center"
              >
                უკან
              </Button>
            </Link>
            <Button
              disabled={isNaN(selectedRole) || selectedUsers.length === 0}
              onClick={submitHandler}
              className="block "
            >
              დადასტურება
            </Button>
            {setRoleMutateLoading && <LoadingSpinner />}
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 w-full mx-auto mt-4">
        <Alert color={alert.type} message={alert.message} dismissable />
      </div>
    </main>
  );
};

export default GrantRoleToUsers;
