import Alert from "components/Alert";
import Button from "components/Button";
import Checkbox from "components/form/Checkbox";
import CustomSelect from "components/form/CustomSelect";
import useGrantRoleToUsers from "./useGrantRoleToUsers";
import LoadingSpinner from "components/icons/LoadingSpinner";

const GrantRoleToUsers = () => {
  const {
    allRoles,
    selectedUsers,
    users,
    roleGranted,
    isLoading,
    roleChangeHandler,
    submitHandler,
    handleCheckboxChange,
    selectedRole,
  } = useGrantRoleToUsers();

  return (
    <main className="workspace">
      <div className="lg:w-1/2 w-full mx-auto card mb-3 p-5">
        <h3 className="text-base sm:text-lg mb-4 text-primary">
          მომხმარებლებლები
        </h3>
        <div className="  grid gap-y-4 sm:grid-cols-3 grid-cols-1  w-full ">
          {users.length > 0 ? (
            users?.map((user) => (
              <Checkbox
                key={user.id + Math.random().toString()}
                label={user.name}
                checked={selectedUsers.includes(user.user_id)}
                onChange={(event) => handleCheckboxChange(event, user.user_id)}
              />
            ))
          ) : (
            <div className="flex flex-col gap-2 items-center mx-auto col-span-3">
              <LoadingSpinner />
              <p>იტვირთება...</p>
            </div>
          )}
        </div>
      </div>
      <div className="card p-5 lg:w-1/2 w-full mx-auto">
        <div className="mt-5">
          <CustomSelect value={selectedRole} onChange={roleChangeHandler}>
            <option>აირჩიეთ როლი</option>
            {allRoles?.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </CustomSelect>

          <div className="flex items-center justify-between mt-6">
            <Button
              disabled={isNaN(selectedRole) || selectedUsers.length === 0}
              onClick={submitHandler}
              className="block "
            >
              დადასტურება
            </Button>
            {isLoading && !roleGranted && <LoadingSpinner />}
          </div>
        </div>
      </div>
      {roleGranted && !isLoading && (
        <div className="lg:w-1/2 w-full mx-auto mt-4">
          <Alert color="success" dismissable>
            როლი წარმატებით მიენიჭა
          </Alert>
        </div>
      )}
    </main>
  );
};

export default GrantRoleToUsers;
