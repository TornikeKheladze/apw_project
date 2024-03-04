import Dropdown from "components/Dropdown";
import TreeMenu from "./TreeMenu";
import Button from "components/Button";

const DepDropdown = ({
  loading,
  departments,
  chosenDepartment,
  setChosenDepartment,
  departmentTree,
}) => {
  return (
    <div className="mt-5">
      <Dropdown
        content={
          <div className="dropdown-menu min-w-300 DO_NOT_CLOSE_MODAL">
            <>
              {loading ? (
                <p>იტვირთება...</p>
              ) : departments.length && !loading ? (
                <>
                  <button
                    className="DO_NOT_CLOSE_MODAL pl-5"
                    onClick={() =>
                      setChosenDepartment({ id: 0, department_name: "" })
                    }
                  >
                    მთავარი დეპარტამენტი
                  </button>
                  <TreeMenu
                    chosenDepartment={chosenDepartment}
                    setChosenDepartment={setChosenDepartment}
                    type="dropdown"
                    departments={departmentTree}
                  />
                </>
              ) : (
                <p>დეპარტამენტები არ მოიძებნა</p>
              )}
            </>
          </div>
        }
      >
        <Button className="min-w-300 uppercase flex justify-between">
          {chosenDepartment?.department_name
            ? chosenDepartment?.department_name
            : "მთავარი დეპარტამენტი"}
          <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default DepDropdown;
