const RoleList = ({ items, openDelete, openEdit, setChoosenItem, title }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-auto table_hoverable w-full">
        <thead>
          <tr>
            <th className="ltr:text-left rtl:text-right uppercase">{title}</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => {
            return (
              <tr
                className="flex md:flex-row justify-between flex-col"
                key={item.id + Math.random()}
              >
                <td className="cursor-pointer">{item.name}</td>

                <td className="flex gap-1 items-center justify-between">
                  {item.oid && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          openEdit(true);
                          setChoosenItem(item);
                        }}
                        className="btn btn-icon btn_outlined btn_secondary"
                      >
                        <span className="la la-pen-fancy"></span>
                      </button>
                      <button
                        onClick={() => {
                          openDelete(true);
                          setChoosenItem(item);
                        }}
                        className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
                      >
                        <span className="la la-trash-alt"></span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RoleList;
