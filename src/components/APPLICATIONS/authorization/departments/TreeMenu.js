import DownArrowIcon from "components/icons/DownArrowIcon";
import RightArrowIcon from "components/icons/RIghtArrowIcon";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TreeMenu = ({
  departments,
  type,
  chosenDepartment,
  setChosenDepartment,
}) => {
  const [expandedDepartments, setExpandedDepartments] = useState([]);

  const toggleDepartment = (departmentId) => {
    if (expandedDepartments.includes(departmentId)) {
      setExpandedDepartments((prev) =>
        prev.filter((id) => id !== departmentId)
      );
    } else {
      setExpandedDepartments((prev) => [...prev, departmentId]);
    }
  };

  const navigate = useNavigate();

  return (
    <ul className="text-lg DO_NOT_CLOSE_MODAL">
      {departments.map((department) => (
        <li key={department.id} className="pl-4 DO_NOT_CLOSE_MODAL">
          <div className="flex items-center DO_NOT_CLOSE_MODAL">
            <div
              onClick={() => toggleDepartment(department.id)}
              className="DO_NOT_CLOSE_MODAL text-blue-600 mr-2 focus:outline-none flex items-center justify-center cursor-pointer"
            >
              <span className="DO_NOT_CLOSE_MODAL">
                {expandedDepartments.includes(department.id) ? (
                  <DownArrowIcon />
                ) : (
                  <RightArrowIcon />
                )}
              </span>
            </div>
            <button
              className={`DO_NOT_CLOSE_MODAL ${
                department.id === chosenDepartment?.id && type === "dropdown"
                  ? "border-b-2 border-primary"
                  : ""
              }`}
              to={`/department/${department.id}/${department.oid}`}
              onClick={() => {
                type !== "dropdown"
                  ? navigate(`/department/${department.id}/${department.oid}`)
                  : setChosenDepartment(department);
              }}
            >
              {department.department_name}
            </button>
          </div>
          {expandedDepartments.includes(department.id) &&
            department.children &&
            department.children.length > 0 && (
              <TreeMenu
                setChosenDepartment={setChosenDepartment}
                chosenDepartment={chosenDepartment}
                type={type}
                departments={department.children}
              />
            )}
        </li>
      ))}
    </ul>
  );
};

export default TreeMenu;
