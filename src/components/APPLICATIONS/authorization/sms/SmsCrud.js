import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { truncateText } from "helpers/truncateText";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import {
  createMessage,
  deleteMessage,
  getMessageTypes,
  getMessages,
  updateMessage,
} from "services/authorization";
import AuthForm from "../authForm/AuthForm";
import { smsArr } from "components/APPLICATIONS/billing/formArrays/authArr";
import Alert from "components/Alert";

const SmsCrud = () => {
  const queryClient = useQueryClient();
  const { authorizedUser } = useSelector((store) => store.user);
  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });

  const { data: messages = [], isLoading: isMessagesLoading } = useQuery({
    queryKey: "getMessages",
    queryFn: () => getMessages().then((res) => res.data.data),
  });
  const { data: types = [], isLoading: isTypesLoading } = useQuery({
    queryKey: "getMessageTypes",
    queryFn: () => getMessageTypes().then((res) => res.data.data),
  });

  const afterRequestHandler = (type, message) => {
    if (type === "success") {
      queryClient.invalidateQueries("getMessages");
    }
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({
        message: "",
        type: type,
      });
      setModal({ isOpen: false, data: null });
    }, 2500);
  };

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: (data) =>
      updateMessage({
        ...data,
        user_id: authorizedUser.id,
      }),
    onSuccess: () =>
      afterRequestHandler("success", "შეტყობინების განახლება წარმატებულია"),
    onError: (data) =>
      afterRequestHandler("danger", data.response.data.message),
  });

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: (data) =>
      createMessage({
        ...data,
        user_id: authorizedUser.id,
      }),
    onSuccess: () =>
      afterRequestHandler("success", "შეტყობინების წარმატეით დაემატა"),
    onError: (data) =>
      afterRequestHandler("danger", data.response.data.message),
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () =>
      afterRequestHandler("success", "შეტყობინების წარმატებით წაიშალა"),
    onError: (data) =>
      afterRequestHandler("danger", data.response.data.message),
  });

  const isLoading = isMessagesLoading || isTypesLoading;

  return (
    <main className="workspace overflow-hidden">
      <Alert message={alert.message} color={alert.type} />
      <Modal
        active={modal.isOpen}
        centered
        onClose={() => {
          setModal({
            isOpen: false,
            data: null,
          });
        }}
      >
        <ModalHeader>
          შეტყობინების{" "}
          {modal.data === null
            ? "დამატება"
            : modal.action === "delete"
            ? "წაშლა"
            : "რედაქტირება"}
        </ModalHeader>
        {modal.action === "delete" ? (
          <>
            <ModalBody>
              <p>ნამდვილად გსურთ წაშლა?</p>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between gap-3">
                <Button
                  color="secondary"
                  onClick={() =>
                    setModal({
                      isOpen: false,
                      data: null,
                    })
                  }
                >
                  გაუქმება
                </Button>
                <Button
                  className="min-w-[135px]"
                  onClick={() => deleteMutate(modal.data.id)}
                >
                  {deleteLoading ? <LoadingSpinner /> : "დადასტურება"}
                </Button>
              </div>
            </ModalFooter>
          </>
        ) : (
          <div className="p-5 overflow-y-auto max-h-[90vh]">
            <AuthForm
              formArray={smsArr}
              submitHandler={modal.data === null ? createMutate : updateMutate}
              isLoading={updateLoading || createLoading}
              defaultValues={modal.data}
              optionsObj={{
                message_type: types,
              }}
            />
          </div>
        )}
      </Modal>
      <div className="w-full mx-auto card mb-3 p-5">
        <div className="flex justify-between">
          <h3 className="text-base sm:text-lg mb-4 text-primary">
            შეტყობინებები
          </h3>
          <Button
            className="p-2 text-xs h-8"
            onClick={() => setModal({ isOpen: true, data: null })}
          >
            შეტყობინების დამატება
          </Button>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col gap-2 items-center mx-auto col-span-3">
              <LoadingSpinner />
              <p>იტვირთება...</p>
            </div>
          ) : messages.length === 0 ? (
            <p className="col-span-2">შეტყობინებები არ მოიძებნა</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">შეტყობინების ტიპი</th>
                  <th className="text-left">საგანი (subject)</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td>
                      {types.find((type) => type.id === message.message_type)
                        ?.name || message.message_type}
                    </td>
                    <td>{truncateText(message?.subject, 50)}</td>
                    <td>
                      <button
                        onClick={() => {
                          setModal({
                            isOpen: true,
                            data: message,
                          });
                        }}
                        className="btn btn-icon btn_outlined btn_secondary"
                      >
                        <span className="la la-pen-fancy"></span>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setModal({
                            isOpen: true,
                            data: message,
                            action: "delete",
                          });
                        }}
                        className="btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2"
                      >
                        <span className="la la-trash-alt"></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default SmsCrud;
