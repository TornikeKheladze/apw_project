import Tippy from "@tippyjs/react";
import DetailsIcon from "components/icons/DetailsIcon";

const AuthActions = ({ detailClick, editClick, deleteClick, row }) => {
  return (
    <div className="flex gap-2 justify-evenly">
      {detailClick && (
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
            onClick={() => detailClick(row)}
            className="btn btn-icon btn_outlined btn_secondary group"
          >
            <DetailsIcon />
          </button>
        </Tippy>
      )}
      {editClick && (
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
            onClick={() => editClick(row)}
            className="btn btn-icon btn_outlined btn_secondary"
          >
            <span className="la la-pen-fancy"></span>
          </button>
        </Tippy>
      )}
      {deleteClick && (
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
            onClick={() => deleteClick(row)}
            className="btn btn-icon btn_outlined btn_danger flex justify-center items-center"
          >
            <span className="la la-trash-alt"></span>
          </button>
        </Tippy>
      )}
    </div>
  );
};

export default AuthActions;
