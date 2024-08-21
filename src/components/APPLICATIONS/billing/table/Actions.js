import Tippy from "@tippyjs/react";
import DeleteModal from "components/customModal/DeleteModal";
import DetailsIcon from "components/icons/DetailsIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivationSwitch from "./ActivationSwitch";

const Actions = ({ target, element, actions = {} }) => {
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex gap-2 justify-evenly">
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
        <ActivationSwitch
          data={element}
          isActive={actions.activation.isActive(element.id)}
          activate={actions.activation.activationHandler}
        />
      )}
    </div>
  );
};

export default Actions;
