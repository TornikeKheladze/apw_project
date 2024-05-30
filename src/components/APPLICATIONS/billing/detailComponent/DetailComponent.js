import LoadingSpinner from "components/icons/LoadingSpinner";
import { Link } from "react-router-dom";

const DetailComponent = ({
  staticArray,
  updatedData,
  title,
  loading,
  links,
  curl,
}) => {
  const renderLink = () => {
    const link = {};
    if (updatedData?.contract_number) {
      link.to = `/billing/balance-history/${updatedData.id}`;
      link.label = "ბალანსის ისტორია";
    }
    if (updatedData?.type === "owner") {
      link.to = `/billing/owner-error-list/show/${updatedData.id}`;
      link.label = "ერორები";
    }
    if (updatedData?.transaction_number) {
      link.to = `/billing/payers/${updatedData.id}`;
      link.label = "გადამხდელი";
    }
    if (link.to && link.label) {
      return (
        <Link
          className="bg-primary px-3 transition-all duration-400 text-white py-2 rounded-lg dark:hover:bg-white hover:bg-gray-300"
          to={link.to}
        >
          {link.label}
        </Link>
      );
    }
  };

  return (
    <main className="workspace p-5">
      {links && links}
      <div className="card p-5 relative">
        <div className="flex justify-between items-center">
          <h4>{title} დეტალები</h4>
          {renderLink()}
        </div>
        {loading ? (
          <LoadingSpinner blur />
        ) : (
          <table className="table table_bordered w-full mt-3">
            <thead>
              <tr>
                <th className="ltr:text-left rtl:text-right uppercase">
                  პარამეტრის სახელი
                </th>
                <th className="ltr:text-left rtl:text-right uppercase">
                  პარამეტრის მნიშვნელობა
                </th>
              </tr>
            </thead>
            <tbody>
              {staticArray.map((item, index) => (
                <tr key={index}>
                  <td>{item.label}</td>
                  <td>
                    {item.name === "image" ? (
                      <img
                        className="rounded-lg max-w-xs h-10"
                        alt={item.name}
                        src={updatedData[item.name]}
                      />
                    ) : (
                      updatedData[item.name]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {curl && curl}
    </main>
  );
};
export default DetailComponent;
