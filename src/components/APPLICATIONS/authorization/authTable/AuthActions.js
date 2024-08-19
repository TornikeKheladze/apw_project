import Tippy from "@tippyjs/react";
import Button from "components/Button";
import CheckOrNotIcon from "components/icons/CheckOrNotIcon";
import DetailsIcon from "components/icons/DetailsIcon";
import DownloadIcon from "components/icons/DownloadIcon";
import NewSignIcon from "components/icons/NewSignIcon";

const AuthActions = ({ actions, row }) => {
  return (
    <div className="flex gap-2 justify-evenly">
      {actions.statementDetails && (
        <Button
          color="info"
          onClick={() => actions.statementDetails(row)}
          className="p-1 text-xs whitespace-nowrap"
        >
          განცხადების ნახვა
        </Button>
      )}
      {actions.detailClick && (
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
            onClick={() => actions.detailClick(row)}
            className="btn btn-icon btn_outlined btn_secondary group"
          >
            <DetailsIcon />
          </button>
        </Tippy>
      )}
      {actions.sign && (
        <Tippy
          theme="light-border tooltip"
          touch={["hold", 500]}
          offset={[0, 12]}
          interactive
          animation="scale"
          appendTo={document.body}
          content="ხელმოწერა"
        >
          <button
            onClick={() => actions.sign(row)}
            className="btn btn-icon btn_outlined btn_secondary group flex justify-center items-center"
          >
            <NewSignIcon />
          </button>
        </Tippy>
      )}

      {actions.editClick && (
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
            onClick={() => actions.editClick(row)}
            className="btn btn-icon btn_outlined btn_secondary"
          >
            <span className="la la-pen-fancy"></span>
          </button>
        </Tippy>
      )}

      {actions.check && (
        <Tippy
          theme="light-border tooltip"
          touch={["hold", 500]}
          offset={[0, 12]}
          interactive
          animation="scale"
          appendTo={document.body}
          content="შემოწმება"
        >
          <button
            onClick={() => actions.check(row)}
            className="btn btn-icon btn_outlined btn_secondary group flex justify-center items-center"
          >
            <CheckOrNotIcon />
          </button>
        </Tippy>
      )}

      {actions.unsignedDownload && (
        <Tippy
          theme="light-border tooltip"
          touch={["hold", 500]}
          offset={[0, 12]}
          interactive
          animation="scale"
          appendTo={document.body}
          content="ჩამოტვირთვა ხელმოწერის გარეშე"
        >
          <button
            onClick={() => actions.unsignedDownload(row)}
            className="btn btn-icon btn_outlined btn_secondary group flex justify-center items-center"
          >
            <DownloadIcon />
          </button>
        </Tippy>
      )}

      {actions.deleteClick && (
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
            onClick={() => actions.deleteClick(row)}
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
