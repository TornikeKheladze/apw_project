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
    authorizedUser,
  } = useUserRoles();

  return (
    <div className=" relative h-max ">
      <Alert message={alert.message} color={alert.type} dismissable />
      <h4>როლის მინიჭება</h4>
      {isLoading ? (
        <p className="mt-6">იტვირთება...</p>
      ) : (
        <div className="search-select mt-3">
          <Tippy
            className=" h-full"
            content={
              <div className="search-select-menu max-h-72 overflow-y-auto">
                {searchQuery
                  ? filteredRoles?.map((role) => (
                      <div
                        key={role.id + Math.random()}
                        className="item"
                        onClick={() => roleChooseHandler(role)}
                      >
                        {role.name}
                      </div>
                    ))
                  : availableRoles?.map((role) => (
                      <div
                        key={role.id + Math.random()}
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
            <div className="relative">
              {actionLoading && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2">
                  <LoadingSpinner />
                </span>
              )}
              <input
                className="form-control"
                placeholder="როლის ძიება..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Tippy>
          <h4 className="mt-5 mb-2">მომხმარებლის როლები</h4>
          <div className="flex gap-1 items-center flex-wrap">
            {selectedRoles.map((selectedRole) => (
              <span
                key={selectedRole.id + Math.random()}
                className="badge badge_primary w-max"
              >
                {selectedRole.name}
                {authorizedUser.superAdmin || authorizedUser.isSip ? (
                  <button
                    type="button"
                    className="ltr:ml-1 rtl:mr-1 la la-times"
                    onClick={() => removeFromSelectedRoles(selectedRole)}
                  ></button>
                ) : (
                  <></>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
