import Tippy from "@tippyjs/react";
import Alert from "components/Alert";
import DeleteModal from "components/customModal/DeleteModal";
import DetailsIcon from "components/icons/DetailsIcon";
import { billingPermissionsObject } from "data/permissionsObject";
import useCheckPermission from "helpers/useCheckPermission";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmModal from "../returnedTransactions/modals/ConfirmModal";
import RejectModal from "../returnedTransactions/modals/RejectModal";
import ReturnIcon from "components/icons/ReturnIcon";
import { editTransactionStatus } from "services/transactions";
import { useDispatch, useSelector } from "react-redux";
import { saveTransactions } from "reducers/TransactionsReducer";

const Actions = ({ target, element, deleteAndUpdate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { transactions } = useSelector((state) => state.transaction);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReturnedTransactionModalOpen, setIsReturnedTransactionModalOpen] =
    useState(false);
  const [afterReturnRejectModalOpen, setAfterReturnRejectModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const isTransactionReturnPage = pathname.split("/")[3] === "returned";

  const transactionReturnHandler = async (approved) => {
    if (approved) {
      try {
        setLoading(true);
        await editTransactionStatus(element.id, {
          // ...element,
          status_id: 5,
          // status_id: 2,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      setSuccessMessage("ტრანზაქცია წარმატებით დაბრუნდა");
      setTimeout(() => {
        setSuccessMessage("");
        setIsReturnedTransactionModalOpen(false);
        dispatch(
          saveTransactions(
            transactions?.filter((transaction) => transaction.id !== element.id)
          )
        );
      }, 1500);
    } else {
      setAfterReturnRejectModalOpen(true);
      setIsReturnedTransactionModalOpen(false);
    }
  };

  const rejectSubmitHandler = async (comment) => {
    setLoading(true);
    await editTransactionStatus(element.id, {
      // ...element,
      status_id: 4,
      comment: comment,
    });

    setLoading(false);
    setSuccessMessage("ტრანზაქციის დაბრუნება დაიბლოკა");

    setTimeout(() => {
      setAfterReturnRejectModalOpen(false);
      setSuccessMessage("");
      dispatch(
        saveTransactions(
          transactions?.filter((transaction) => transaction.id !== element.id)
        )
      );
    }, 1500);
  };

  const permissionsForTarget = billingPermissionsObject[target] || [];

  const deleteHandler = async (id) => {
    setDeleteLoading(true);
    await deleteAndUpdate(id);
    setSuccessMessage("წარმატებით წაიშალა");
    setDeleteLoading(false);
    setTimeout(() => {
      setIsDeleteModalOpen(false);
      setSuccessMessage("");
    }, 1500);
  };

  const showDeleteButtonInBalanceHistory = () => {
    if (target === "balance-history") {
      if (element.type === 7) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };
  return (
    <div className="flex gap-2 justify-evenly">
      {useCheckPermission(
        permissionsForTarget?.find((p) => p.includes("id_get"))
      ) &&
        target !== "balance-history" &&
        target !== "currency" &&
        target !== "our-error-list" &&
        target !== "owner-error-list" &&
        target !== "legalform" && (
          <Tippy
            theme="light-border tooltip"
            touch={["hold", 500]}
            offset={[0, 12]}
            interactive
            animation="scale"
            appendTo={document.body}
            content="დეტალები"
          >
            <button
              onClick={() =>
                navigate(`/billing/${target}/details/${element.id}`)
              }
              className="btn btn-icon btn_outlined btn_secondary group"
            >
              <DetailsIcon />
            </button>
          </Tippy>
        )}

      {useCheckPermission(
        permissionsForTarget.find((p) => p.includes("id_put"))
      ) &&
        target !== "balance-history" &&
        target !== "transactions" && (
          <Tippy
            theme="light-border tooltip"
            touch={["hold", 500]}
            offset={[0, 12]}
            interactive
            animation="scale"
            appendTo={document.body}
            content="რედაქტირება"
          >
            <button
              onClick={() => {
                navigate(`/billing/${target}/edit/${element.id}`);
              }}
              className="btn btn-icon btn_outlined btn_secondary"
            >
              <span className="la la-pen-fancy"></span>
            </button>
          </Tippy>
        )}

      {useCheckPermission(
        permissionsForTarget.find((p) => p.includes("delete"))
      ) &&
        target !== "transactions" &&
        showDeleteButtonInBalanceHistory() && (
          <Tippy
            theme="light-border tooltip"
            touch={["hold", 500]}
            offset={[0, 12]}
            interactive
            animation="scale"
            appendTo={document.body}
            content="წაშლა"
          >
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="btn btn-icon btn_outlined btn_danger flex justify-center items-center"
            >
              <span className="la la-trash-alt"></span>
            </button>
          </Tippy>
        )}
      {isTransactionReturnPage && (
        <Tippy
          theme="light-border tooltip"
          touch={["hold", 500]}
          offset={[0, 12]}
          interactive
          animation="scale"
          appendTo={document.body}
          content="დაბრუნება"
        >
          <button
            onClick={() => setIsReturnedTransactionModalOpen(true)}
            className="btn btn-icon btn_outlined btn_secondary p-1"
          >
            <ReturnIcon />
          </button>
        </Tippy>
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        action={() => deleteHandler(element.id)}
        title={"წაშლა"}
        loading={deleteLoading}
      />
      {isTransactionReturnPage && (
        <ConfirmModal
          isOpen={isReturnedTransactionModalOpen}
          setIsOpen={setIsReturnedTransactionModalOpen}
          action={transactionReturnHandler}
          title={"ტრანზაქციის დაბრუნება"}
          loading={loading}
        />
      )}
      {isTransactionReturnPage && (
        <RejectModal
          isOpen={afterReturnRejectModalOpen}
          setIsOpen={setAfterReturnRejectModalOpen}
          action={rejectSubmitHandler}
          title={"უარყოფის მიზეზი"}
          setSuccessMessage={setSuccessMessage}
          loading={loading}
        />
      )}
      <Alert message={successMessage} color="success" dismissable />
    </div>
  );
};

export default Actions;
