import Tippy from "@tippyjs/react";
import Alert from "components/Alert";
import Button from "components/Button";
import Modal, { ModalFooter, ModalHeader } from "components/Modal";
import Switch from "components/form/Switch";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getPositionById } from "services/positions";
import { deleteUser, updateUserData } from "services/users";

const UserList = ({ users, isLoading, departments }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: "" });
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const queryClient = useQueryClient();
  const { type, id } = useParams();

  const { data: positionByIdData = { member: [], data: [] } } = useQuery({
    queryKey: ["getPositionById", id],
    queryFn: () => getPositionById(id).then((res) => res.data),
    enabled: type === "positions",
  });

  const position = positionByIdData.member?.length
    ? positionByIdData.member[0]
    : positionByIdData.data[0] || {};

  const createUserUrl = () => {
    if (type === "organisation") {
      return `/user/create/?oid=${id}`;
    } else if (type === "departments") {
      const department = departments.find((d) => +d.id === +id) || {};
      return `/user/create?oid=${department.oid}&did=${department.id}`;
    } else if (type === "positions") {
      return `/user/create?oid=${position.oid}&did=${position.did}&pid=${position.id}`;
    } else {
      return `/user/create`;
    }
  };
  const afterRequestHandler = (message, type) => {
    queryClient.invalidateQueries(["getUsers", type, id]);
    setAlert({
      message,
      type,
    });

    setTimeout(() => {
      setAlert({
        message: "",
        type,
      });
    }, 3000);
  };

  const { isLoading: activateLoading, mutate: editMutate } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => afterRequestHandler("Success", "success"),
    onError: (data) =>
      afterRequestHandler(data.response.data.description, "danger"),
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: () => deleteUser(selectedUser.id),
    onSuccess: () =>
      afterRequestHandler(
        `მომხმარებელი ${selectedUser.name} ${selectedUser.l_name} წაიშალა`,
        "success"
      ),
    onError: (data) =>
      afterRequestHandler(data.response.data.description, "danger"),
  });

  return (
    <>
      <Alert message={alert.message} color={alert.type} dismissable />
      {activateLoading && <LoadingSpinner blur />}
      <Modal
        active={deleteModal}
        centered
        onClose={() => setDeleteModal(false)}
      >
        <ModalHeader>მომხმარებლის წაშლა</ModalHeader>
        <div className="p-5">
          გსურთ მომხმარებლის {`${selectedUser.name} ${selectedUser.l_name}`}{" "}
          წაშლა?
        </div>
        <ModalFooter>
          <Button className="w-24" onClick={deleteMutate} color="danger">
            {deleteLoading ? <LoadingSpinner /> : "წაშლა"}
          </Button>
        </ModalFooter>
      </Modal>
      <div className="flex justify-between px-2">
        <h4>მომხმარებლები</h4>
        <div className="flex md:flex-row flex-col gap-2">
          {users.length && type !== "all" && id !== "all" ? (
            <Link to="role">
              <Button className="w-full flex justify-center md:px-3 px-1 py-1 md:text-sm text-xs font-light bg-custom-purple hover:!bg-custom-purple hover:!bg-opacity-75 ">
                როლის მინიჭება
              </Button>
            </Link>
          ) : (
            <></>
          )}
          <Link to={createUserUrl()}>
            <Button
              color="success"
              className="md:px-3 px-1 py-1 md:text-sm text-xs font-light "
            >
              მომხმარებლის დამატება
            </Button>
          </Link>
        </div>
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
                <td className="w-4">{index + 1}</td>
                <td className="text-base">{`${user.name} ${user.l_name}`}</td>
                <td className="flex-grow-1 justify-self-right  flex justify-end gap-2">
                  <Tippy
                    theme="light-border tooltip"
                    touch={["hold", 500]}
                    offset={[0, 12]}
                    interactive
                    animation="scale"
                    appendTo={document.body}
                    content="სტატუსის გააქტიურება"
                  >
                    <Switch
                      onChange={(e) => {
                        editMutate({
                          ...user,
                          id: user.id,
                          active: e.target.checked ? 1 : 0,
                        });
                      }}
                      defaultChecked={user.active}
                    />
                  </Tippy>
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
                    content="წაშლა"
                  >
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setDeleteModal(true);
                      }}
                      className="btn btn-icon btn_outlined btn_danger"
                    >
                      <span className="la la-trash-alt"></span>
                    </button>
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
