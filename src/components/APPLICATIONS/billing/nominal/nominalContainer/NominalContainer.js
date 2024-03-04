import Collapse from "components/collapse/Collapse";
import NominalCollapseTable from "../nominalCollapseTable/NominalCollapseTable";
import ExcelExport from "../../table/ExcelExport";

const NominalContainer = ({
  title,
  mainTableData,
  incomeData,
  outcomeData,
  staticArray,
  data,
  moneyData,
  type,
}) => {
  return (
    <div className="mb-10  w-full ">
      <div className="bg-success w-full text-center text-white py-2 rounded-t">
        {title} ფული
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full  table-auto border-collapse border border-gray-400">
          <thead className="bg-gray-200 dark:bg-foreground dark:text-gray-300">
            <tr>
              {staticArray.map((customer) => (
                <th
                  key={customer.name + Math.random()}
                  className="p-2 border border-gray-400 text-left font-semibold min-w-[10rem]"
                >
                  {customer.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.length === 0 ? (
              <tr>
                {staticArray.map((value, columnIndex) => (
                  <td
                    className="p-2 border border-gray-400 text-left"
                    key={columnIndex + Math.random()}
                  >
                    0.00
                  </td>
                ))}
              </tr>
            ) : (
              data?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {staticArray.map((value, columnIndex) => (
                    <td
                      className="p-2 border border-gray-400 text-left"
                      key={columnIndex}
                    >
                      {row[value.name] || "0.00"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {type !== "client" && (
        <Collapse label={"შემოსავალი"}>
          <NominalCollapseTable
            type="income"
            data={moneyData}
            title={title}
            incomeData={incomeData}
          />
        </Collapse>
      )}

      <Collapse label={"გასავალი"}>
        {type === "client" && (
          <div className="mt-3">
            <ExcelExport
              excelExporFunc={() =>
                moneyData.map((data) => {
                  return { მომხმარებელი: data.user, თანხა: data.amount };
                })
              }
              fileName="dato"
            />
          </div>
        )}
        <NominalCollapseTable
          type="outcome"
          title={title}
          data={moneyData}
          outcomeData={outcomeData}
          main
        />
      </Collapse>
    </div>
  );
};

export default NominalContainer;
