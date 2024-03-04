import Actions from "./AuthActions";

const AuthTable = ({ staticArr, fetchedArr, actions = {} }) => {
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
      </thead>

      <tbody>
        {fetchedArr?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td className="w-32">
              <Actions
                deleteClick={actions.deleteClick}
                editClick={actions.editClick}
                detailClick={actions.detailClick}
                row={row}
              />
            </td>
            {staticArr.map((value, columnIndex) => (
              <td key={columnIndex}>
                {value.name === "image" ? (
                  <img
                    className="rounded-lg h-10"
                    alt={value.name}
                    src={row[value.name]}
                  />
                ) : value.name.includes("_id") || value.isId ? (
                  row[`${value.name}_displayName`] || row[value.name]
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

export default AuthTable;
