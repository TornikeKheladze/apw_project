import Button from "components/Button";
import Actions from "../authTable/AuthActions";
import FilterIcon from "components/icons/FilterIcon";
import TableInput from "components/APPLICATIONS/billing/table/TableInput";

const StatementTable = ({
  staticArr,
  fetchedArr,
  actions = {},
  filter,
  search,
  page,
}) => {
  return (
    <table className="table table_bordered w-full mt-3 text-xs">
      <thead>
        <tr>
          <th></th>
          {staticArr.map((item) => (
            <th
              key={item.name}
              className="ltr:text-left rtl:text-right uppercase min-w-[7rem]"
            >
              <div className="flex items-center justify-between gap-2 text-center">
                <span>{item.label}</span>
              </div>
            </th>
          ))}
        </tr>
        <tr>
          <th>
            <div className="w-28 flex flex-col gap-1">
              <Button
                onClick={() => {
                  page.setPage(1);
                  search(filter.filter, 1);
                }}
                className="p-1 text-[10px] flex justify-center gap-1"
              >
                ძებნა
                <FilterIcon className="w-3 h-3" />
              </Button>
              <Button
                className="p-1 text-[10px] flex justify-center"
                onClick={() => {
                  page.setPage(1);
                  filter.setFilter({}, 1);
                  search({});
                }}
              >
                ფილტრის მოხსნა
              </Button>
            </div>
          </th>
          {staticArr.map((item) => (
            <th key={item.name + item.label}>
              <TableInput
                filter={filter}
                fieldName={item.name}
                type={item.filter}
              />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {fetchedArr?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className="w-32">
              <Actions
                // deleteClick={actions.deleteClick}
                // editClick={actions.editClick}
                // detailClick={actions.detailClick}
                actions={actions}
                row={row}
              />
            </td>
            {staticArr.map((value, columnIndex) => (
              <td key={columnIndex}>
                {value.name.includes("_id") || value.isId
                  ? row[`${value.name}_displayName`] || row[value.name]
                  : row[value.name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatementTable;
