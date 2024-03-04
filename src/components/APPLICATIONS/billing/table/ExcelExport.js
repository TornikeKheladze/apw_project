import React from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const ExcelExport = ({ fileName, excelExporFunc }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const res = await excelExporFunc();
    const ws = XLSX.utils.json_to_sheet(res);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="bg-success text-white py-1 rounded-lg px-2 flex items-center gap-1 justify-center font-normal"
      onClick={(e) => exportToExcel(fileName)}
    >
      <span className="la la-arrow-circle-down "></span>
      ექსპორტი
    </button>
  );
};

export default ExcelExport;
