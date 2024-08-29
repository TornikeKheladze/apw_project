import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { downloadPDF } from "helpers/downloadPDF";
import { useState } from "react";
import { useMutation } from "react-query";
import { getDocumentByUUID } from "services/documents";

const FileDownload = ({ name, docId }) => {
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const { isLoading: getDocumentLoading, mutate: getDocumentByUUIDMutate } =
    useMutation({
      mutationFn: getDocumentByUUID,
      onSuccess: (data) => {
        const doc = data.data.data[0];
        if (doc) {
          downloadPDF(doc.not_signature_doc, setDownloadLoading);
        } else {
          setAlert({
            message: "დოკუმენტი არ მოიძებნა",
            type: "danger",
          });
          setTimeout(() => {
            setAlert({
              message: "",
              type: "danger",
            });
          }, 2500);
        }
      },
    });
  return (
    <div className="label flex justify-between items-center w-full border rounded-lg p-2 border-gray-700 mb-2">
      {getDocumentLoading || downloadLoading ? <LoadingSpinner blur /> : <></>}
      <Alert dismissable color={alert.type} message={alert.message} />
      {name}
      <button
        type="button"
        onClick={() => getDocumentByUUIDMutate(docId)}
        className="btn-icon btn_outlined flex justify-center items-center"
      >
        <span className="la la-download"></span>
      </button>
    </div>
  );
};

export default FileDownload;
