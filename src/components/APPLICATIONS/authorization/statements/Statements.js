import Alert from "components/Alert";
import Button from "components/Button";
import Modal, { ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { IDENTIFY_CODE_SIP } from "data/applications";
import { convertDate } from "helpers/convertDate";
import { downloadPDF } from "helpers/downloadPDF";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getDocumentByUUID } from "services/documents";
import {
  firstStep,
  getStatementById,
  getStatements,
} from "services/organizations";
import AuthTable from "../authTable/AuthTable";
// import StatementTable from "./StatementTable";
import Pagination from "components/Pagination";
import { useNavigate } from "react-router-dom";
import {
  statementArr,
  statementFilterArr,
} from "components/APPLICATIONS/billing/formArrays/agreementArr";
import FilterIcon from "components/icons/FilterIcon";
import Tippy from "@tippyjs/react";
import AuthForm from "../authForm/AuthForm";
import { removeEmpty } from "helpers/removeEmpty";
import FilterOff from "components/icons/FilterOff";

const Statements = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(1);
  const [commentInput, setCommentInput] = useState({
    show: false,
    value: "",
    label: "",
    actionUrl: "",
  });
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const navigate = useNavigate();

  const [filterModal, setFilterModal] = useState({ isOpen: false, filter: {} });

  const {
    data: statementData = {
      data: {
        data: [],
        per_page: 30,
        total: 0,
      },
      request_chanel: [],
    },
    isLoading,
    mutate: searchMutate,
  } = useMutation({
    mutationFn: (filterData = { page: 1 }) =>
      getStatements(
        {
          identify_code: IDENTIFY_CODE_SIP,
          gov: 5,
          status: 2,
          ...removeEmpty(filterData),
        },
        filterData.page
      ).then((res) => res.data),
  });

  useEffect(() => {
    searchMutate();
  }, [searchMutate]);

  const {
    data: statement = {
      package: [],
      auth_user: {},
      document: [],
      users: [{}],
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

  const loading = statementLoading || isLoading;

  const govStatements = statementData.data.data;

  function addMonthsToDate(months) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + months);
    return currentDate.toISOString().split("T")[0];
  }

  return (
    <main className="workspace">
      <Alert color={alert.type} message={alert.message} />
      <div className="card p-5 mb-3">
        <h3 className="mb-2">განცხადებები</h3>
        <table className="table table_bordered w-full mt-3 text-xs">
          <thead>
            <tr>
              <th>განმცხადებელი</th>
              <th>განცხადების ინიცირების არხი</th>
              <th>თარიღი</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {govStatements.length === 0 && !loading ? (
              <tr>
                <td colSpan={6}>განცხადება არ მოიძებნა</td>
              </tr>
            ) : (
              govStatements.map((item, index) => (
                <tr
                  key={item.id + index + Math.random()}
                  className="border-b border-gray-400"
                >
                  <td className="border-x border-gray-400 px-1">
                    {item.name} / {`${item.user_name} ${item.user_l_name}`}
                  </td>
                  {/* <td className="border-x border-gray-400 px-1">{`${item.user_name} ${item.user_l_name}`}</td> */}
                  <td className="border-x border-gray-400 px-1">
                    {
                      statementData.request_chanel.find(
                        (channel) => channel.id === item.gov
                      )?.app_name
                    }
                  </td>
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
      <Modal
        centered
        active={filterModal.isOpen}
        onClose={() =>
          setFilterModal((prevState) => ({ ...prevState, isOpen: false }))
        }
      >
        <ModalHeader>ფილტრი</ModalHeader>
        <div className="p-5">
          <AuthForm
            formArray={statementFilterArr}
            isLoading={isLoading}
            submitHandler={(data) => {
              setFilterModal((prevState) => ({ ...prevState, filter: data }));
              searchMutate({ ...data, page: 1 });
              setPage(1);
            }}
            defaultValues={filterModal.filter}
          />
        </div>
      </Modal>
      <div className="card p-5 overflow-x-auto">
        <div className="flex justify-between mb-2">
          <h3 className="">განცხადებები</h3>
          <div className="flex gap-2 items-center">
            <Tippy
              theme="light-border tooltip"
              touch={["hold", 500]}
              offset={[0, 12]}
              interactive
              animation="scale"
              appendTo={document.body}
              content="ფილტრის მოხსნა"
            >
              <button
                onClick={() => {
                  searchMutate();
                  setFilterModal({ isOpen: false, filter: {} });
                  setPage(1);
                }}
                className="btn btn-icon btn_outlined btn_secondary group"
              >
                <FilterOff className="w-6 h-6" />
              </button>
            </Tippy>
            <Tippy
              theme="light-border tooltip"
              touch={["hold", 500]}
              offset={[0, 12]}
              interactive
              animation="scale"
              appendTo={document.body}
              content="ფილტრი"
            >
              <button
                onClick={() =>
                  setFilterModal((prevState) => ({
                    ...prevState,
                    isOpen: true,
                  }))
                }
                className="btn btn-icon btn_outlined btn_secondary group"
              >
                <FilterIcon className="w-5 h-5" />
              </button>
            </Tippy>
          </div>
        </div>
        <AuthTable
          staticArr={statementArr}
          fetchedArr={govStatements.map((item) => ({
            ...item,
            name: `${item.name} / ${item.user_name} ${item.user_l_name}`,
            channel: statementData.request_chanel.find(
              (channel) => channel.id === item.gov
            )?.app_name,
            created_at: item.created_at ? convertDate(item.created_at) : "",
          }))}
          actions={{
            detailClick: (item) => navigate(`/agreements/details/${item.id}`),
          }}
        />
      </div>
      {isLoading ? (
        <></>
      ) : (
        <div className="mt-5">
          <Pagination
            currentPage={page}
            totalCount={statementData.data.total}
            pageSize={statementData.data.per_page}
            onPageChange={(page) => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setPage(page);
              searchMutate({ ...filterModal.filter, page });
            }}
          />
        </div>
      )}

      <Modal active={modal} centered onClose={() => setModal(false)}>
        <ModalHeader>განცხადება</ModalHeader>
        {/* <ModalBody> */}
        <div className="p-5 overflow-y-auto h-[90vh]">
          <div className="relative">
            {getDocumentLoading || downloadLoading || firstStepLoading ? (
              <LoadingSpinner blur />
            ) : (
              <></>
            )}
            <p>
              <strong>ხელშეკრულების ვადა : </strong>
              {addMonthsToDate(0)} - {statement.package[0]?.end_date}
            </p>
            <p>
              <strong>გადახდის პერიოდულობა : </strong>{" "}
              {statement.package[0]?.payment_period}{" "}
              {statement.package[0]?.payment_period.includes("კონკრეტული") &&
                `(${addMonthsToDate(0)})`}
            </p>
            <p>
              <strong>ინფორმაცია : </strong> {statement.auth_user.description}
            </p>

            {conviction && (
              <div className="flex justify-between items-center w-full border-b border-gray-400">
                <span className="text-primary-600 font-bold">
                  {conviction.doc_name}
                </span>
                <button
                  onClick={() => getDocumentByUUIDMutate(conviction.uuid)}
                  className="btn-icon btn_outlined flex justify-center items-center"
                >
                  <span className="la la-download"></span>
                </button>
              </div>
            )}
            {health && (
              <div className="flex justify-between items-center w-full border-b border-gray-400">
                <span className="text-primary-600 font-bold">
                  {health.doc_name}
                </span>
                <button
                  onClick={() => getDocumentByUUIDMutate(health.uuid)}
                  className="btn-icon btn_outlined flex justify-center items-center"
                >
                  <span className="la la-download"></span>
                </button>
              </div>
            )}
            {additionalFiles.length > 0 && (
              <div className="mt-3">
                <strong>დამატებითი ფაილები: </strong>
                {additionalFiles.map((item) => (
                  <div
                    className="flex justify-between items-center w-full border-b border-gray-400"
                    key={item.id}
                  >
                    <span className="text-primary-600 font-bold">
                      {item.doc_name}
                    </span>
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
            <div className="mt-2 border rounded-md p-1">
              <h4>ფიზიკური პირი</h4>
              <p>სახელი: {statement.users[1]?.name}</p>
              <p>გვარი: {statement.users[1]?.l_name}</p>
              <p>პირადი ნომერი: {statement.users[1]?.personal_number}</p>
            </div>
            <div className="mt-2 border rounded-md p-1">
              <div>
                <h4>იურიდიული პირი</h4>
                <p>დასახელება: {statement.auth_user.name}</p>
                <p>
                  საიდენტიფიკაციო ნომერი: {statement.auth_user.identify_code}
                </p>
                <p>იურიდიული მისამართი: {statement.auth_user.address}</p>
              </div>
              <div className="p-2">
                <h4>უფლებამოსილი პირი</h4>
                <p>სახელი: {statement.users[0]?.name}</p>
                <p>გვარი: {statement.users[0]?.l_name}</p>
                <p>პირადი ნომერი: {statement.users[0]?.personal_number}</p>
              </div>
            </div>
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
                className="p-1 text-sm rounded-lg"
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
                className="p-1 text-sm rounded-lg"
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
                className="p-1 text-sm rounded-lg"
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
                className="p-1 text-sm rounded-lg"
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
                className="p-1 text-sm rounded-lg"
                color="success"
              >
                დადასტურება
              </Button>
            </div>
          )}
        </div>
        {/* </ModalBody> */}
      </Modal>
      {loading && <LoadingSpinner blur />}
    </main>
  );
};

export default Statements;
