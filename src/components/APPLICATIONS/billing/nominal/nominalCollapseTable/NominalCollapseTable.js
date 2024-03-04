const NominalCollapseTable = ({ title, inoutcomeData, data, type }) => {
  return (
    <table className="table border-collapse border border-gray-400 w-full mt-3">
      <thead>
        <tr>
          <th className="p-2 border border-gray-400 text-left">
            {title} სახელი
          </th>
          <th className="p-2 border border-gray-400 text-left">თანხა</th>
        </tr>
      </thead>
      <tbody>
        {/* {inoutcomeData} */}
        {data?.map((item) => (
          <tr key={item.user ? item.user : item.name + Math.random()}>
            <td className="p-2 border border-gray-400 text-left">
              {item.user ? item.user : item.name}
            </td>
            <td className="p-2 border border-gray-400 text-left">
              {item.user
                ? item.amount
                : type === "income"
                ? item.credit || "0.00"
                : item.debt || "0.00"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default NominalCollapseTable;
