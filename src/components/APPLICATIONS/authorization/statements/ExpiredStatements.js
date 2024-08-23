import Modal, { ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { IDENTIFY_CODE_SIP } from "data/applications";
import { convertDate } from "helpers/convertDate";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getStatements } from "services/organizations";
import AuthForm from "../authForm/AuthForm";
import {
  statementArr,
  statementFilterArr,
} from "components/APPLICATIONS/billing/formArrays/agreementArr";
import FilterIcon from "components/icons/FilterIcon";
import AuthTable from "../authTable/AuthTable";
import Pagination from "components/Pagination";
import Tippy from "@tippyjs/react";
import FilterOff from "components/icons/FilterOff";
import { useNavigate } from "react-router-dom";
import { removeEmpty } from "helpers/removeEmpty";

const ExpiredStatements = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const [filterModal, setFilterModal] = useState({ isOpen: false, filter: {} });

  const todayDate = new Date();

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
          // აქ გვინდა კიდე რო სტატუსი არ იყოს ნოლი
          end: todayDate.toISOString().split("T")[0],
          ...removeEmpty(filterData),
        },
        filterData.page
      ).then((res) => res.data),
  });

  useEffect(() => {
    searchMutate();
  }, [searchMutate]);

  const loading = isLoading;

  const activeStatements = statementData.data.data;

  return (
    <main className="workspace">
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
          <h3 className="">ვადა ამოწურული ხელშეკრულებები</h3>
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
          fetchedArr={activeStatements.map((item) => ({
            ...item,
            name: `${item.name} / ${item.user_name} ${item.user_l_name}`,
            channel: statementData.request_chanel.find(
              (channel) => channel.id === item.gov
            )?.app_name,
            created_at: item.created_at ? convertDate(item.created_at) : "",
          }))}
          actions={{
            statementDetails: (item) =>
              navigate(`/agreements/details/${item.id}`),
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

      {loading && <LoadingSpinner blur />}
    </main>
  );
};

export default ExpiredStatements;
