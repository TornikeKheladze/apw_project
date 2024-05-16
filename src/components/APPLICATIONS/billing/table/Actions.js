import Tippy from "@tippyjs/react";
import ConfirmModal from "components/customModal/ConfirmModal";
import DeleteModal from "components/customModal/DeleteModal";
import CheckedIcon from "components/icons/CheckedIcon";
import DetailsIcon from "components/icons/DetailsIcon";
import ErrorIcon from "components/icons/ErrorIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Actions = ({ target, element, actions = {} }) => {
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);

  // const permissionsForTarget = billingPermissionsObject[target] || [];

  return (
    <div className="flex gap-2 justify-evenly">
      {/* {useCheckPermission(
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
        target !== "transactions" && (
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
        )} */}

      {/* დროებით ფერმიშენების ჩეკი გამოვრთე ეს ქვემოთ რაც წერია ეს 
      ტიპიები შემიძლია წავშალო და ზემოთ რაცაა ამოვაკომენტარებ და იმუშავებს 
      იმ შემთხვევაში თუ ფერმიშენები აქვს */}

      {actions.details && (
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
            onClick={() => navigate(`/billing/${target}/details/${element.id}`)}
            className="btn btn-icon btn_outlined btn_secondary group"
          >
            <DetailsIcon />
          </button>
        </Tippy>
      )}
      {actions.edit && (
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
      {actions.delete && (
        <>
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
          <DeleteModal
            isOpen={isDeleteModalOpen}
            setIsOpen={setIsDeleteModalOpen}
            action={() => {
              actions.delete.deleteMutate(element.id);
              setTimeout(() => {
                setIsDeleteModalOpen(false);
              }, 1500);
            }}
            title={"წაშლა"}
            loading={actions.delete.deleteLoading}
          />
        </>
      )}

      {actions.activation && (
        <>
          <Tippy
            theme="light-border tooltip"
            touch={["hold", 500]}
            offset={[0, 12]}
            interactive
            animation="scale"
            appendTo={document.body}
            content={
              actions.activation.isActive(element.id)
                ? "დეაქტივაცია"
                : "აქტივაცია"
            }
          >
            {actions.activation.isActive(element.id) ? (
              <button
                onClick={() => setIsActivationModalOpen(true)}
                className="btn btn-icon btn_outlined btn_success p-1 text-success"
              >
                <CheckedIcon />
              </button>
            ) : (
              <button
                onClick={() => setIsActivationModalOpen(true)}
                className="btn btn-icon btn_outlined btn_danger bg-danger text-danger"
              >
                <ErrorIcon />
              </button>
            )}
          </Tippy>
          <ConfirmModal
            text={`გსურთ ${
              actions.activation.isActive(element.id)
                ? "დეაქტივაცია"
                : "აქტივაცია"
            }?`}
            isOpen={isActivationModalOpen}
            setIsOpen={setIsActivationModalOpen}
            action={() => {
              actions.activation.activationHandler(element.id);
              setTimeout(() => {
                setIsActivationModalOpen(false);
              }, 1500);
            }}
            title={
              actions.activation.isActive(element.id)
                ? "დეაქტივაცია"
                : "აქტივაცია"
            }
            loading={actions.activation.updateLoading}
          />
        </>
      )}
    </div>
  );
};

export default Actions;
