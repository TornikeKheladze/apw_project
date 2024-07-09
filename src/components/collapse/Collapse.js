import ExcelExport from "components/APPLICATIONS/billing/table/ExcelExport";
import Alert from "components/Alert";
import UpArrowIcon from "components/icons/UpArrowIcon";
import { useState } from "react";

function Collapse({ label, children, mainInfo }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      setSuccessMessage("ტექსტი კოპირებულია!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);
    });
  };

  return (
    <div className="w-full  mx-auto mt-4 border border-gray-400 dark:border-gray-700 rounded">
      <Alert message={successMessage} color="success" dismissable />

      <div
        onClick={toggleCollapse}
        className={`flex cursor-pointer md:flex-row flex-col items-center justify-between gap-2 w-full text-left text-md font-bold bg-foreground rounded-t dark:text-white text-gray-700 py-2 px-4 transform transition-transform ${
          isCollapsed ? "" : "shadow-lg"
        }`}
      >
        {label}
        {mainInfo && (
          <p className="flex items-center gap-1 text-sm font-light dark:text-gray-400 text-gray-700">
            <span
              className="hover:text-primary"
              onClick={() => copyToClipboard(mainInfo.amount)}
            >
              ბრუნვა: {mainInfo.amount},
            </span>
            <span
              className="hover:text-primary"
              onClick={() => copyToClipboard(mainInfo.profit)}
            >
              მოგება: {mainInfo.profit},
            </span>
            <span
              className="hover:text-primary"
              onClick={() => copyToClipboard(mainInfo.quantity)}
            >
              რაოდენობა: {mainInfo.quantity}
            </span>
            {mainInfo.exportOrisFunc ? (
              <ExcelExport
                fileName="oris-codes"
                excelExporFunc={mainInfo.exportOrisFunc}
              />
            ) : (
              <></>
            )}
          </p>
        )}
      </div>

      <div
        className={`overflow-hidden transition-max-height duration-300 ${
          isCollapsed ? "max-h-0 opacity-0" : " opacity-100 min-h-[10rem]"
        }`}
      >
        <div className={`bg-background  rounded-b px-4 pb-4`}>{children}</div>
      </div>
    </div>
  );
}

export default Collapse;

export const MenuBarCollapse = ({
  label,
  children,
  icon,
  className,
  height,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const h = height || children.length * 40 + "px";

  return (
    <div className={className || ""}>
      <button
        onClick={toggleCollapse}
        className="flex items-center focus:outline-none"
      >
        {icon}
        {label}
        <span
          className={`ml-3 transition-transform transform ${
            !isCollapsed ? "rotate-180" : "rotate-90"
          }`}
        >
          <UpArrowIcon />
        </span>
      </button>
      <div
        className={"overflow-hidden transition-all duration-500"}
        style={
          isCollapsed
            ? { opacity: 0, height: 0 }
            : { opacity: 100, height: `${h}` }
        }
      >
        <div className="pt-1 px-6">{children}</div>
      </div>
    </div>
  );
};
