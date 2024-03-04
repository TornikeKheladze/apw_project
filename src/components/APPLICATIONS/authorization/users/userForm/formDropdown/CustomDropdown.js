import Button from "components/Button";
import Dropdown from "components/Dropdown";

const CustomDropdown = ({
  list,
  active,
  setActive,
  label,
  hasError,
  contentClassName,
  ...props
}) => {
  const dropList =
    list.length &&
    list.map((item) => (
      <button
        className={`cursor-pointer border-b ${contentClassName} DO_NOT_CLOSE_MODAL`}
        key={item.id}
        onClick={() => {
          setActive(item);
        }}
      >
        {item.name ||
          item.department_name ||
          item.position_name ||
          item.method_type ||
          item.tech_type ||
          item.operation_type ||
          item.cmd ||
          item.api_name}
      </button>
    ));

  return (
    <div className="mt-5">
      <Dropdown
        content={
          <div className="dropdown-menu w-full overflow-y-auto max-h-64 DO_NOT_CLOSE_MODAL">
            {dropList}
          </div>
        }
      >
        <Button
          {...props}
          className={`uppercase w-full justify-between ${
            hasError ? "border-danger border-2" : ""
          }`}
          type="button"
        >
          {active?.name ||
            active?.department_name ||
            active?.position_name ||
            active?.method_type ||
            active?.tech_type ||
            active?.operation_type ||
            active?.cmd ||
            active?.api_name ||
            label}
          <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;
