import Tippy from "@tippyjs/react";
import LoadingSpinner from "components/icons/LoadingSpinner";
import useUserRoles from "./useUserRoles";
import Alert from "components/Alert";

export default function UserRoles() {
  const {
    searchQuery,
    filteredRoles,
    roleChooseHandler,
    removeFromSelectedRoles,
    isLoading,
    setSearchQuery,
    selectedRoles,
    availableRoles,
    actionLoading,
    alert,
  } = useUserRoles();

  console.log(availableRoles);

  return (
    <div className=" relative h-max ">
      <Alert message={alert.message} color={alert.type} dismissable />
      <h4>მომხმარებლის როლები</h4>
      {isLoading ? (
        <p className="mt-6">იტვირთება...</p>
      ) : (
        <div className="search-select mt-5">
          <Tippy
            className=" h-full"
            content={
              <div className="search-select-menu max-h-72 overflow-y-auto">
                {searchQuery
                  ? filteredRoles?.map((role) => (
                      <div
                        key={role.id}
                        className="item"
                        onClick={() => roleChooseHandler(role)}
                      >
                        {role.name}
                      </div>
                    ))
                  : availableRoles?.map((role) => (
                      <div
                        key={role.id}
                        className="item"
                        onClick={() => roleChooseHandler(role)}
                      >
                        {role.name}
                      </div>
                    ))}
              </div>
            }
            theme="light-border"
            offset={[0, 8]}
            maxWidth="none"
            arrow={false}
            placement="bottom-start"
            trigger="click"
            interactive
            allowHTML
            animation="shift-toward-extreme"
            disabled={actionLoading}
          >
            <label className="form-control-addon-within flex-row-reverse relative py-2">
              {actionLoading && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2">
                  <LoadingSpinner />
                </span>
              )}
              <input
                className="form-control ltr:pl-2 rtl:pr-2 border-none md:w-[70%] w-1/3 h-10"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="flex gap-1 items-center ltr:pl-2 rtl:pr-2 md:w-[30%]  w-2/3 flex-wrap">
                {selectedRoles.map((selectedRole) => (
                  <span
                    key={selectedRole.id}
                    className="badge badge_primary w-max"
                  >
                    {selectedRole.name}
                    <button
                      type="button"
                      className="ltr:ml-1 rtl:mr-1 la la-times"
                      onClick={() => removeFromSelectedRoles(selectedRole)}
                    ></button>
                  </span>
                ))}
              </span>
            </label>
          </Tippy>
        </div>
      )}
    </div>
  );
}
