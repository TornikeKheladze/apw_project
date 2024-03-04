import PdfLayout from "../PdfLayout";
import { comparisonActArray } from "data/comparisonActData";
import { getDaysInMonth } from "helpers/getDaysInMonth";

import { useComparisonActGenerate } from "./useComparisonActGenerate";

const ComparisonActGenerate = () => {
  const {
    agentId,
    month,
    year,
    agentData,
    monthsInGeorgian,
    currency,
    numbersValues,
    loading,
  } = useComparisonActGenerate();

  return (
    <PdfLayout
      actID={`${agentId}/${month}/${year}`}
      actDate={`${getDaysInMonth(month)}/${month}/${year}`}
      agentData={agentData}
      loading={loading}
    >
      <table className="border-collapse border border-gray-500 text-[10px] w-full">
        <tbody>
          <tr className="border border-gray-500">
            <td></td>
            <td className="border border-gray-500 px-2 py-1">
              საანგარიშო პერიოდის დასაწყისი
            </td>
            <td className="border border-gray-500 px-2 py-1 whitespace-nowrap">
              {/* {`1 ${
                monthsInGeorgian.find((item) => item.label === month).month
              } ${year}`} */}
              <input
                defaultValue={`1 ${
                  monthsInGeorgian.find((item) => item.label === month).month
                } ${year}`}
                className="border-none"
              />
            </td>
            <td className="border border-gray-500 px-2 py-1">00:00:00 სთ.</td>
          </tr>
          <tr className="border border-gray-500">
            <td></td>
            <td className="border border-gray-500 px-2 py-1 whitespace-nowrap">
              საანგარიშო პერიოდის დასასრული
            </td>
            <td className="border border-gray-500 px-2 py-1 whitespace-nowrap">
              <input
                className="border-none"
                defaultValue={`${getDaysInMonth(month)} ${
                  monthsInGeorgian.find((item) => item.label === month).month
                } ${year}`}
              />
              {/* {`${getDaysInMonth(month)} ${
                monthsInGeorgian.find((item) => item.label === month).month
              } ${year}`} */}
            </td>
            <td className="border border-gray-500 px-2 py-1">23:59:59 სთ.</td>
          </tr>
          <tr className="border border-gray-500">
            <td className="text-center px-2 py-1" colSpan="4">
              {currency}
            </td>
          </tr>

          {comparisonActArray.map((item) => (
            <tr
              key={item.id + Math.random()}
              className="border border-gray-500"
            >
              <td className="border border-gray-500 ">{item.id}</td>
              <td className="border border-gray-500 w-max">{item.label}</td>
              <td className="border border-gray-500  w-max">
                {numbersValues.length > 0 && (
                  <textarea
                    rows={2}
                    defaultValue={parseFloat(
                      +numbersValues[item.id - 1]?.numeric
                    ).toFixed(3)}
                    className="border-none block bg- w-full resize-none p-1"
                  ></textarea>
                )}
              </td>
              <td className="border border-gray-500 min-w-[200px]">
                {numbersValues.length > 0 && (
                  <>
                    {/* <input
                      defaultValue={numbersValues[item.id - 1]?.verbal}
                      className="border-none block bg- w-full"
                    /> */}
                    <textarea
                      rows={2}
                      defaultValue={numbersValues[item.id - 1]?.verbal}
                      className="border-none block bg- w-full resize-none p-1"
                    ></textarea>
                    {/* <p className="opac">{numbersValues[item.id - 1]?.verbal}</p> */}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </PdfLayout>
  );
};

export default ComparisonActGenerate;
