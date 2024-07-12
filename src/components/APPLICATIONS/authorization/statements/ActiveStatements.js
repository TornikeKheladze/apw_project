import Alert from "components/Alert";
import Button from "components/Button";
import Modal, { ModalBody, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { IDENTIFY_CODE_SIP } from "data/applications";
import { convertDate } from "helpers/convertDate";
import { downloadPDF } from "helpers/downloadPDF";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getDocumentByUUID } from "services/documents";
import {
  firstStep,
  getStatementById,
  getStatements,
} from "services/organizations";

const ActiveStatements = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  const [commentInput, setCommentInput] = useState({
    show: false,
    value: "",
    label: "",
    actionUrl: "",
  });
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "success" });

  const { data: statementData = { data: [], request_chanel: [] }, isLoading } =
    useQuery({
      queryKey: "getStatements",
      queryFn: () =>
        getStatements({
          identify_code: IDENTIFY_CODE_SIP,
        }).then((res) => res.data),
    });

  const {
    data: statement = {
      package: [],
      auth_user: {},
      document: [],
    },
    mutate: getStatementMutate,
    isLoading: statementLoading,
  } = useMutation({
    mutationFn: (id) => getStatementById(id).then((res) => res.data.data),
    onSuccess: () => setModal(true),
  });
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

  const { mutate: firstStepMutate, isLoading: firstStepLoading } = useMutation({
    mutationFn: firstStep,
    onSuccess: () => {
      setAlert({ message: "ქმედება წარმატებულია", type: "success" });
      queryClient.invalidateQueries("getStatements");
      setTimeout(() => {
        setModal(false);
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
    onError: (data) => {
      setAlert({ message: data.response.data.message, type: "danger" });
      setTimeout(() => {
        setAlert({ message: "", type: "danger" });
      }, 2500);
    },
  });

  const conviction = statement.document.find(
    (doc) => doc.doc_name === "ცნობა ნასამართლეობის შესახებ"
  );

  const health = statement.document.find(
    (doc) => doc.doc_name === "ცნობა ჯანმრთელობის შესახებ"
  );
  const additionalFiles =
    statement.document.filter(
      (doc) =>
        doc.doc_name !== "ცნობა ნასამართლეობის შესახებ" &&
        doc.doc_name !== "ცნობა ჯანმრთელობის შესახებ"
    ) || [];

  const activeStatements =
    statementData.data.filter((statement) => +statement.status === 1) || [];

  const loading = statementLoading || isLoading;
  return (
    <main className="workspace">
      <Alert color={alert.type} message={alert.message} />
      <div className="card p-5">
        <h3 className="mb-2">აქტიური ხელშეკრულებები</h3>
        <table className="table table_bordered w-full mt-3 text-xs">
          <thead>
            <tr className="">
              <th className="">განმცხადებელი</th>
              <th className="">უფლებამოსილი პირი</th>
              <th className="">განცხადების ინიცირების არხი</th>
              <th className="">ხელშეკრულების სტატუსი</th>
              <th className="">თარიღი</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {activeStatements.length === 0 && !loading ? (
              <tr>
                <td colSpan={6}>ხელშეკრულება არ მოიძებნა</td>
              </tr>
            ) : (
              activeStatements.map((item, index) => (
                <tr
                  key={item.id + index + Math.random()}
                  className="border-b border-gray-400"
                >
                  <td className="border-x border-gray-400 px-1">{item.name}</td>
                  <td className="border-x border-gray-400 px-1">{`${item.user_name} ${item.user_l_name}`}</td>
                  <td className="border-x border-gray-400 px-1">
                    {
                      statementData.request_chanel.find(
                        (channel) => channel.id === item.gov
                      )?.app_name
                    }
                  </td>
                  <td className="border-x border-gray-400 px-1">აქტიური</td>
                  <td className="border-x border-gray-400 px-1">
                    {convertDate(item.created_at)}
                  </td>
                  <td
                    onClick={() => getStatementMutate(item.id)}
                    className="cursor-pointer"
                  >
                    <Button className="rounded-lg text-white flex gap-1 p-2 text-lg w-full font-normal justify-center">
                      <span className="la la-search text-white w-4"></span>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal active={modal} centered onClose={() => setModal(false)}>
        <ModalHeader>განცხადება</ModalHeader>
        <ModalBody>
          <div className="p-5 overflow-y-auto h-[80vh]">
            <div className="relative">
              {getDocumentLoading || downloadLoading || firstStepLoading ? (
                <LoadingSpinner blur />
              ) : (
                <></>
              )}
              <p>ხელშეკრულების ვადა: {statement.package[0]?.end_date} </p>
              <p>
                გადახდის პერიოდულობა: {statement.package[0]?.payment_period}{" "}
              </p>
              <p>ინფორმაცია:{statement.auth_user.description}</p>

              {conviction && (
                <div className="flex justify-between items-center w-full border-b border-gray-700">
                  {conviction.doc_name}
                  <button
                    onClick={() => getDocumentByUUIDMutate(conviction.uuid)}
                    className="btn-icon btn_outlined flex justify-center items-center"
                  >
                    <span className="la la-download"></span>
                  </button>
                </div>
              )}
              {health && (
                <div className="flex justify-between items-center w-full border-b border-gray-700">
                  {health.doc_name}
                  <button
                    onClick={() => getDocumentByUUIDMutate(health.uuid)}
                    className="btn-icon btn_outlined flex justify-center items-center"
                  >
                    <span className="la la-download"></span>
                  </button>
                </div>
              )}
              {additionalFiles.length > 0 && (
                <div>
                  <p>დამატებითი ფაილები: </p>
                  {additionalFiles.map((item) => (
                    <div
                      className="flex justify-between items-center w-full border-b border-gray-700"
                      key={item.id}
                    >
                      {item.doc_name}
                      <button
                        onClick={() => getDocumentByUUIDMutate(item.uuid)}
                        className="btn-icon btn_outlined flex justify-center items-center"
                      >
                        <span className="la la-download"></span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {commentInput.show && (
              <div className="my-2">
                <label className="label" htmlFor="comment">
                  {commentInput.label}
                </label>
                <textarea
                  id="comment"
                  className="form-control"
                  value={commentInput.value}
                  onChange={(e) =>
                    setCommentInput((prevState) => ({
                      ...prevState,
                      value: e.target.value,
                    }))
                  }
                />
              </div>
            )}
            {commentInput.show ? (
              <div className="flex gap-2">
                <Button
                  onClick={() => setCommentInput({ show: false, value: "" })}
                  color="secondary"
                  className="p-1 text-sm"
                >
                  გაუქმება
                </Button>
                <Button
                  onClick={() =>
                    firstStepMutate({
                      action: commentInput.actionUrl,
                      comment: commentInput.value,
                      oid: statement.auth_user.id,
                    })
                  }
                  color="primary"
                  className="p-1 text-sm"
                  disabled={!commentInput.value}
                >
                  დადასტურება
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={() => {
                    setCommentInput({
                      show: true,
                      value: "",
                      label: "უარყოფის მიზეზი",
                      actionUrl: "failed",
                    });
                  }}
                  className="p-1 text-sm"
                  color="danger"
                >
                  უარყოფა
                </Button>
                <Button
                  onClick={() => {
                    setCommentInput({
                      show: true,
                      value: "",
                      label: "დახარვეზების მიზეზი",
                      actionUrl: "comment",
                    });
                  }}
                  className="p-1 text-sm"
                >
                  დახარვეზება
                </Button>
                <Button
                  onClick={() =>
                    firstStepMutate({
                      oid: statement.auth_user.id,
                      action: "success",
                    })
                  }
                  className="p-1 text-sm"
                  color="success"
                >
                  დადასტურება
                </Button>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
      {loading && <LoadingSpinner blur />}
    </main>
  );
};

export default ActiveStatements;
