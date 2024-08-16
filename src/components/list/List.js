import Button from "components/Button";
import { Link, useNavigate, useParams } from "react-router-dom";

const List = ({
  items,
  openDelete,
  openEdit,
  setChoosenItem,
  title,
  toUsers,
  toDepartments,
  toPositions,
  toServices,
}) => {
  const navigate = useNavigate();
  const { did } = useParams();
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
                className="flex lg:flex-row justify-between flex-col"
                key={item.id + Math.random()}
              >
                <td
                  onClick={() =>
                    toDepartments && navigate(`${toDepartments}${item.id}`)
                  }
                  className={`cursor-pointer ${
                    item.id === +did && toPositions
                      ? "text-primary font-bold"
                      : ""
                  }`}
                >
                  {item.name ||
                    item.position_name ||
                    item.department_name ||
                    item.api_name ||
                    item.key}
                </td>

                <td className="flex gap-1 items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {toUsers && (
                      <Link className="mr-2 " to={`${toUsers}${item.id}`}>
                        <Button className="md:px-3 px-1 py-1 md:text-sm text-xs font-light bg-custom-yellow hover:!bg-custom-yellow hover:!bg-opacity-75 ">
                          მომხმარებლები
                        </Button>
                      </Link>
                    )}
                    {toDepartments && (
                      <Link className="mr-2" to={`${toDepartments}${item.id}`}>
                        <Button
                          color="success"
                          className="md:px-3 px-1 py-1 md:text-sm text-xs font-light "
                        >
                          დეპარტამენტები
                        </Button>
                      </Link>
                    )}
                    {toServices && (
                      <Link className="mr-2" to={`${toServices}${item.id}`}>
                        <Button
                          color="info"
                          className="md:px-3 px-1 py-1 md:text-sm text-xs font-light "
                        >
                          სერვისები
                        </Button>
                      </Link>
                    )}

                    {toPositions && (
                      <Link to={`${toPositions}/${item.id}`}>
                        <Button className="md:px-3 px-1 py-1 md:text-sm text-xs font-light">
                          პოზიციები
                        </Button>
                      </Link>
                    )}
                  </div>
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
