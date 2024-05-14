import DownArrowIcon from "components/icons/DownArrowIcon";
import UpArrowIcon from "components/icons/UpArrowIcon";
import SelectSearch from "./SelectSearch";
import TableInput from "./TableInput";
import Button from "components/Button";
import Actions from "./Actions";
import Dropdown from "components/Dropdown";
import Checkbox from "components/form/Checkbox";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useCheckPermission from "helpers/useCheckPermission";
import { billingPermissionsObject } from "data/permissionsObject";
import ExcelExport from "./ExcelExport";

const Table = ({
  staticArr,
  fetchedArr,
  sortHandler,
  sortConfig,
  searchSubmit = () => {},
  optionsObj = {},
  excelExporFunc,
  filter = { filter: {}, setFilter: () => {} },
  actions,
}) => {
  const { pathname } = useLocation();

  const [tableHeaders, setTableHeaders] = useState(
    JSON.parse(localStorage.getItem(pathname)) || staticArr
  );
  useEffect(() => {
    setTableHeaders(JSON.parse(localStorage.getItem(pathname)) || staticArr);
  }, [staticArr, pathname]);

  useEffect(() => {
    localStorage.setItem(pathname, JSON.stringify(tableHeaders));
  }, [tableHeaders, pathname]);

  const handleCheckboxChange = (event, item) => {
    const isChecked = event.target.checked;

    if (!isChecked) {
      setTableHeaders((prevHeaders) =>
        prevHeaders.filter((header) => header.name !== item.name)
      );
    } else {
      setTableHeaders((prevHeaders) => [...prevHeaders, item]);
    }
  };
  const target = pathname.split("/")[2];

  return (
    <table className="table table_bordered w-full mt-3 text-xs">
      <thead>
        <tr>
          <th className="w-24">
            <Dropdown
              content={
                <div className="flex flex-col p-2 gap-1 max-h-64 overflow-y-scroll">
                  <Checkbox
                    checked={tableHeaders.length === staticArr.length}
                    onChange={() => setTableHeaders(staticArr)}
                    label={"ყველა"}
                  />
                  {staticArr.map((item) => (
                    <Checkbox
                      key={item.id + Math.random().toString()}
                      label={item.label}
                      checked={tableHeaders.find((h) => h.name === item.name)}
                      onChange={(event) => handleCheckboxChange(event, item)}
                    />
                  ))}
                </div>
              }
            >
              <Button className="rounded-lg w-full justify-center bg-info text-white flex gap-1 px-2 py-1 text-sm font-normal">
                დამალვა
                <span className="text-gray-300 dark:text-gray-700 la la-eye text-xl leading-none"></span>
              </Button>
            </Dropdown>
          </th>
          {tableHeaders.map((item) => (
            <th
              key={item.name}
              className="ltr:text-left rtl:text-right uppercase min-w-[7rem]"
            >
              <div className="flex items-center justify-between gap-2 text-center">
                <span>{item.label}</span>
                <button
                  onClick={() =>
                    sortHandler &&
                    sortHandler(
                      item.name,
                      sortConfig?.direction === "asc" ? "desc" : "asc"
                    )
                  }
                >
                  {sortConfig?.direction === "asc" &&
                  sortConfig?.column === item.name ? (
                    <UpArrowIcon />
                  ) : (
                    <DownArrowIcon />
                  )}
                </button>
              </div>
            </th>
          ))}
        </tr>

        <tr
          className={`${
            staticArr.find((stArr) => stArr.filter) ? "" : "hidden"
          }`}
        >
          <th>
            <div className="flex flex-col gap-2">
              {useCheckPermission(
                billingPermissionsObject[target]?.find((p) =>
                  p.includes("filter")
                )
              ) && (
                <Button
                  onClick={() => searchSubmit({})}
                  className="rounded-lg text-white flex gap-1 px-2 py-1 text-sm font-normal justify-center"
                >
                  <span className="la la-search text-white"></span>
                  <span className="text-white">ძებნა</span>
                </Button>
              )}
              {excelExporFunc && (
                <ExcelExport excelExporFunc={excelExporFunc} fileName="dato" />
              )}
            </div>
          </th>
          {tableHeaders.map((item) => {
            if (
              item.filter === "select" &&
              Object.values(optionsObj)[0]?.length !== 0
            ) {
              return (
                <th key={item.name + item.label}>
                  <SelectSearch
                    filter={filter}
                    searchOnChoose={searchSubmit}
                    options={optionsObj[item.name]}
                    colName={item.name}
                  />
                </th>
              );
            } else if (!item.filter) {
              return <th key={item.name + item.label}></th>;
            } else {
              return (
                <th key={item.name + item.label}>
                  <TableInput
                    filter={filter}
                    fieldName={item.name}
                    type={item.filter}
                  />
                </th>
              );
            }
          })}
        </tr>
      </thead>

      <tbody>
        {fetchedArr?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              <Actions target={target} element={row} actions={actions} />
            </td>
            {tableHeaders.map((value, columnIndex) => (
              <td key={columnIndex}>
                {value.name === "image" ? (
                  <img
                    className="rounded-lg h-10"
                    alt={value.name}
                    src={row[value.name]}
                  />
                ) : (
                  row[value.name]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
