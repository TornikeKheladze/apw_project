import Tippy from "@tippyjs/react";
import Alert from "components/Alert";
import Button from "components/Button";
import Modal, { ModalFooter, ModalHeader } from "components/Modal";
import CheckedIcon from "components/icons/CheckedIcon";
import ErrorIcon from "components/icons/ErrorIcon";
import LoadingSpinner from "components/icons/LoadingSpinner";
import PlusIcon from "components/icons/PlusIcon";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { updateUserData } from "services/users";

const UserList = ({ users, isLoading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const queriClient = useQueryClient();

  const { isLoading: activateLoading, mutate: editMutate } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queriClient.invalidateQueries("getUsers");
      setSuccessMessage(
        `მომხმარებელი ${selectedUser.name} ${
          selectedUser.active ? "არა აქტიურია" : "აქტიურია"
        }`
      );
      setTimeout(() => {
        setOpenModal(false);
      }, 1600);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  return (
    <>
      <Alert message={successMessage} color="success" dismissable />
      <Modal active={openModal} centered onClose={() => setOpenModal(false)}>
        <ModalHeader>მომხმარებლის სტატუსი</ModalHeader>
        <div className="p-5">
          მომხმარებელი {selectedUser.name}
          {selectedUser.active ? (
            <span className="text-success"> აქტიურია</span>
          ) : (
            <span className="text-danger"> არ არის აქტიური</span>
          )}
        </div>
        <ModalFooter>
          <Button
            className="w-32"
            onClick={() =>
              editMutate({
                ...selectedUser,
                id: selectedUser.id,
                active: selectedUser.active ? 0 : 1,
              })
            }
            color={selectedUser.active ? "danger" : "success"}
          >
            {activateLoading ? (
              <LoadingSpinner />
            ) : selectedUser.active ? (
              "დეაქტივაცია"
            ) : (
              "აქტივაცია"
            )}
          </Button>
        </ModalFooter>
      </Modal>
      <div className="flex justify-between px-2">
        <h4>მომხმარებლები</h4>
        <Link
          className="bg-success text-white px-2 py-2 rounded flex items-center gap-1 font-bold"
          to="/user/create"
        >
          <span>დამატება</span>
          <span>
            <PlusIcon />
          </span>
        </Link>
      </div>
      <table className="table w-full mt-3">
        <tbody>
          {isLoading ? (
            <tr>
              <td>
                იტვირთება... <LoadingSpinner />
              </td>
            </tr>
          ) : users.length && !isLoading ? (
            users.map((user, index) => (
              <tr key={user.id + user.email}>
                <td>{index + 1}</td>
                <td className="text-base">{user.name}</td>
                <td className="flex-grow-1 justify-self-right  flex justify-end gap-2">
                  <Tippy
                    theme="light-border tooltip"
                    touch={["hold", 500]}
                    offset={[0, 12]}
                    interactive
                    animation="scale"
                    appendTo={document.body}
                    content="რედაქტირება"
                  >
                    <Link
                      to={`/user/edit/${user.id}`}
                      className="btn btn-icon btn_outlined btn_secondary group"
                    >
                      <span className="la la-pen-fancy"></span>
                    </Link>
                  </Tippy>

                  <Tippy
                    theme="light-border tooltip"
                    touch={["hold", 500]}
                    offset={[0, 12]}
                    interactive
                    animation="scale"
                    appendTo={document.body}
                    content={user.active ? "აქტიური" : "არააქტიური"}
                  >
                    {user.active ? (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenModal(true);
                        }}
                        className="btn btn-icon btn_outlined btn_success p-1 text-success"
                      >
                        <CheckedIcon />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenModal(true);
                        }}
                        className="btn btn-icon btn_outlined btn_danger bg-danger text-danger"
                      >
                        <ErrorIcon />
                      </button>
                    )}
                  </Tippy>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>მომხმარებლები არ მოიძებნა</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
