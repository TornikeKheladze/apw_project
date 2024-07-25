import LoadingSpinner from "components/icons/LoadingSpinner";
import { useMutation } from "react-query";
import { getLogInfo } from "services/statistics";
import { useEffect, useState } from "react";
import Pagination from "components/Pagination";
import { logArr } from "components/APPLICATIONS/billing/formArrays/authArr";
import LogTable from "./LogTable";
import { convertDate } from "helpers/convertDate";
import { removeEmpty } from "helpers/removeEmpty";
import Modal, { ModalBody, ModalHeader } from "components/Modal";

const Logs = () => {
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({
    open: false,
    data: {
      request: "[]",
    },
  });

  const {
    mutate,
    data: logData = { data: [{}], per_page: 1, total: 1 },
    isLoading,
  } = useMutation({
    mutationFn: (filterData = {}, pageIndex = 1) =>
      getLogInfo(removeEmpty(filterData), pageIndex || page).then(
        (res) => res.data.logs
      ),
    onSuccess: () => {},
  });

  useEffect(() => {
    mutate();
    // eslint-disable-next-line
  }, []);

  const requestBody = Array.isArray(JSON.parse(modal.data.request))
    ? null
    : JSON.parse(modal.data.request);

  return (
    <main className="workspace">
      {isLoading ? <LoadingSpinner blur /> : <></>}
      <Modal
        active={modal.open}
        onClose={() => setModal({ open: false, data: { request: "[]" } })}
      >
        <ModalHeader></ModalHeader>
        <ModalBody>
          <strong>URL</strong>
          <p>{modal.data.url}</p>
          <strong>ელ. ფოსტა</strong>
          <p>{modal.data.email}</p>
          <strong>IP მისამართი</strong>
          <p>{modal.data.ip_address}</p>
          <strong>თარიღი</strong>
          <p>{convertDate(modal.data.created_at || "")}</p>
          <strong>REQUEST BODY</strong>
          {requestBody ? (
            <div>
              {Object.keys(requestBody).map((key) => (
                <p key={`${key}${requestBody[key]}`}>
                  {key}: {requestBody[key]}
                </p>
              ))}
            </div>
          ) : (
            <p>{"{}"}</p>
          )}
          {/* <p>{modal.data.request ? JSON.parse(modal.data.request) : ""} </p> */}
        </ModalBody>
      </Modal>

      <div className="card p-5 overflow-x-auto">
        <LogTable
          staticArr={logArr}
          fetchedArr={logData.data.map((item) => ({
            ...item,
            created_at: item.created_at ? convertDate(item.created_at) : "",
          }))}
          filter={{ filter, setFilter }}
          page={{ page, setPage }}
          search={mutate}
          actions={{
            detailClick: (item) => setModal({ open: true, data: item }),
          }}
        />
      </div>
      {isLoading ? (
        <></>
      ) : (
        <div className="mt-5">
          <Pagination
            currentPage={page}
            totalCount={logData.total}
            pageSize={logData.per_page}
            onPageChange={(page) => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setPage(page);
              mutate(filter);
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Logs;
