import { Link } from "react-router-dom";
import png from "../../../../../assets/images/pdf.png";

const ActRow = ({ data }) => {
  return (
    <tr>
      <td>
        <div className="w-14">
          <img src={png} alt="png" />
        </div>
      </td>
      <td>{data.customer} </td>
      <td>{data.date}</td>
      <td>
        <div className="flex gap-2 justify-between items-center">
          {data.fetchedCurrencies.map(({ name }) => {
            const customerHasMoney = data.currencies.find(
              (item) => item.currency === name
            );
            return (
              <p className="flex flex-col items-center" key={name}>
                <span>{name}</span>
                <span>
                  {customerHasMoney ? customerHasMoney.amount : "0.00"}
                </span>
              </p>
            );
          })}
        </div>
      </td>
      <td className="text-center">დადასტურება</td>
      <td className="text-center">
        <Link
          className="w-20  mx-auto h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-800 transition-colors duration-300"
          to={`/billing/comparison-act/details?id=${data.customer_id}&year=${data.year}&month=${data.month}&currency=${data.currency}`}
        >
          ნახვა
        </Link>
      </td>
      <td className="ltr:text-right rtl:text-left">
        <Link
          className="w-20 mx-auto h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-gray-400 dark:hover:bg-gray-800 transition-colors duration-300"
          to={`/billing/comparison-act/generate?id=${data.customer_id}&year=${data.year}&month=${data.month}&currency=${data.currency}`}
        >
          ნახვა
        </Link>
      </td>
    </tr>
  );
};

export default ActRow;
