import { buildDepartmentTree } from "helpers/treeMenuBuilder";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useEditDepartmentModal = ({
  setNewDepartmentName,
  choosenDepartment,
  departments,
  setParentDepartment,
}) => {
  const user = useSelector((state) => state.user.authorizedUser);
  useEffect(() => {
    setNewDepartmentName(choosenDepartment?.department_name);
  }, [choosenDepartment?.department_name, setNewDepartmentName]);

  const [departmentTree, setDepartmentTree] = useState([]);

  useEffect(() => {
    setDepartmentTree(
      buildDepartmentTree(
        departments.filter(
          (department) => department.id !== choosenDepartment.id
        )
      )
    );
  }, [choosenDepartment.id, departments]);

  useEffect(() => {
    if (departments.length) {
      const parent = departments.find(
        (department) => +department.id === +choosenDepartment.parent_id
      );
      setParentDepartment(parent);
    }
  }, [choosenDepartment, departments, setParentDepartment]);

  return { departmentTree, user };
};

export default useEditDepartmentModal;
