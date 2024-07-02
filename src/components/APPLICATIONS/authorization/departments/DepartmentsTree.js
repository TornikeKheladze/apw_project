import Footer from "partials/Footer";
import Label from "components/form/Label";
import Input from "components/form/Input";
import Button from "components/Button";
// import Paths from "components/paths/Paths";

import TreeMenu from "./TreeMenu.js";
import useDepartmentsTree from "./useDepartmentsTree.js";
import DepDropdown from "./DepDropdown.js";
import Alert from "components/Alert.js";
import LoadingSpinner from "components/icons/LoadingSpinner.js";
import Dropdown from "components/Dropdown.js";
import { Link } from "react-router-dom";
import { truncateText } from "helpers/truncateText.js";

const DepartmentsTree = () => {
  const {
    departments,
    organization,
    organizations,
    departmentTree,
    mutates: { addDepartmentMutate },
    states: { input, chosenDepartment, alert },
    setStates: { setInput, setChosenDepartment },
    loadings: { addDepartmentLoading, initialLoading },
  } = useDepartmentsTree();

  return (
    <main className="workspace">
      {/* <Paths /> */}
      <Alert message={alert.message} color={alert.type} dismissable />

      <div className="lg:col-span-2 xl:col-span-3 mb-4">
        <h3 className="mb-3 text-base">დასახელება:</h3>
        <Dropdown
          content={
            <div className="dropdown-menu min-w-[12rem]">
              {organizations
                ?.filter((org) => org.id !== organization.id)
                .map((org) => (
                  <Link
                    key={org.id + Math.random()}
                    to={`/departments/${org.id}`}
                  >
                    {org.name}
                  </Link>
                ))}
            </div>
          }
        >
          <Button className="uppercase mb-6 min-w-[12rem] flex justify-between w-1/2">
            {truncateText(organization?.name, 40)}
            <span className="ltr:ml-3 rtl:mr-3 la la-caret-down text-xl leading-none"></span>
          </Button>
        </Dropdown>
        <div className="card p-5">
          <Label className="block mb-2" htmlFor="organization">
            დეპარტამენტის დამატება
          </Label>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <DepDropdown
            loading={initialLoading}
            departments={departments}
            chosenDepartment={chosenDepartment}
            setChosenDepartment={setChosenDepartment}
            departmentTree={departmentTree}
          />
          <Button
            disabled={!input ? true : false}
            onClick={addDepartmentMutate}
            className="mt-4"
          >
            {addDepartmentLoading ? <LoadingSpinner /> : "დამატება"}
          </Button>
        </div>
      </div>
      <div className="card p-5 mb-4">
        {initialLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : departments.length && !initialLoading ? (
          <TreeMenu departments={departmentTree} />
        ) : (
          <p>დეპარტამენტები არ მოიძებნა</p>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default DepartmentsTree;
