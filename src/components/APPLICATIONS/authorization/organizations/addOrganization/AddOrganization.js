import Button from "components/Button";
import Dropdown from "components/Dropdown";
import Input from "components/form/Input";
import Label from "components/form/Label";
import LoadingSpinner from "components/icons/LoadingSpinner";

const AddOrganization = ({
  input,
  setInput,
  choosenType,
  setChoosenType,
  types,
  add,
  loading,
}) => {
  const typeList =
    types.length &&
    types.map(({ id, name }) => (
      <button
        className="cursor-pointer border-b"
        key={id + name}
        onClick={() => setChoosenType({ id, name })}
      >
        {name}
      </button>
    ));

  const dropdown = (
    <div className="mt-5">
      <Dropdown content={<div className="dropdown-menu">{typeList}</div>}>
        <Button className="uppercase">
          {choosenType.name ? choosenType.name : "აირჩიეთ ტიპი"}
          <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
        </Button>
      </Dropdown>
    </div>
  );

  return (
    <div className="lg:col-span-2 xl:col-span-3 mb-4">
      <div className="card p-5">
        <Label className="block mb-2" htmlFor="organization">
          ორგანიზაციის დამატება
        </Label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="organization"
        />
        {dropdown}
        <Button
          onClick={add}
          className="mt-5"
          disabled={!input || !choosenType.id ? true : false}
        >
          {loading ? <LoadingSpinner /> : "დამახსოვრება"}
        </Button>
      </div>
    </div>
  );
};

export default AddOrganization;
