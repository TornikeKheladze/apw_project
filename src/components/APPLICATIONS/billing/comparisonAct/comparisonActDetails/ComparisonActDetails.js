import PdfLayout from "../PdfLayout";
import { getDaysInMonth } from "helpers/getDaysInMonth";

import { useComparisonActDetails } from "./useComparisonActDetails";

const ComparisonActDetails = () => {
  const {
    agentId,
    month,
    year,
    agentData,
    monthsInGeorgian,
    currency,
    dataForRender,
    loading,
  } = useComparisonActDetails();

  console.log(dataForRender);

  return (
    <PdfLayout
      actID={`${agentId}/${month}/${year}`}
      actDate={`${getDaysInMonth(month)}/${month}/${year}`}
      agentData={agentData}
      loading={loading}
    >
      <table className="border-collapse border border-gray-500 w-full text-[10px]">
        <tbody>
          <tr className="border border-gray-500">
            <td></td>
            <td className="border border-gray-500 ">
              საანგარიშო პერიოდის დასაწყისი
            </td>
            <td colSpan="2" className="border border-gray-500 ">
              {`1 ${
                monthsInGeorgian.find((item) => item.label === month).month
              } ${year}`}
            </td>
            <td colSpan="2" className="border border-gray-500 ">
              00:00:00 სთ.
            </td>
          </tr>
          <tr className="border border-gray-500">
            <td></td>
            <td className="border border-gray-500 ">
              საანგარიშო პერიოდის დასასრული
            </td>
            <td colSpan="2" className="border border-gray-500 ">
              {`${getDaysInMonth(month)} ${
                monthsInGeorgian.find((item) => item.label === month).month
              } ${year}`}
            </td>
            <td colSpan="2" className="border border-gray-500 ">
              23:59:59 სთ.
            </td>
          </tr>
          <tr className="border border-gray-500">
            <td></td>
            <td className="border border-gray-500 ">პროვაიდერი/სერვისი</td>
            <td className="border border-gray-500  text-center">
              ოპერაციის რაოდენობა
            </td>
            <td className="border border-gray-500  text-center">ბრუნვა</td>
            <td className="border border-gray-500  text-center">
              აგენტის მისაღები საკომისიო
            </td>
            <td className="border border-gray-500  text-center">
              აგენტის მიერ გადასახდელი საკომისიო
            </td>
          </tr>
          <tr className="border border-gray-500">
            <td className="text-center " colSpan="6">
              {currency}
            </td>
          </tr>
          {dataForRender?.map((item, index) => (
            <tr key={index + Math.random()} className="border border-gray-500">
              <td className="border border-gray-500 ">{index + 1}</td>
              <td className="border border-gray-500 ">{item.services_name}</td>
              <td className="border border-gray-500 ">
                <input
                  defaultValue={item.count}
                  className="resize-none border-none w-full"
                />
              </td>
              <td className="border border-gray-500 ">
                <input
                  defaultValue={item.amount}
                  className="resize-none border-none w-full"
                />
              </td>
              <td className="border border-gray-500 ">
                <input
                  defaultValue={item.agent_profit}
                  className="resize-none border-none w-full"
                />
              </td>
              <td className="border border-gray-500 ">
                <input
                  defaultValue={item.agent_expence}
                  className="resize-none border-none w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </PdfLayout>
  );
};

export default ComparisonActDetails;
