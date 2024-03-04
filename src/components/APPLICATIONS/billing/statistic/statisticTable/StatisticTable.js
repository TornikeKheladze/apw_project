const StatisticTable = ({ data, headers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-400">
        <thead className="bg-gray-200 dark:bg-foreground dark:text-gray-300">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="p-2 border border-gray-400 text-left font-semibold"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="p-2 border border-gray-400 text-left"
                >
                  {row[header.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticTable;
