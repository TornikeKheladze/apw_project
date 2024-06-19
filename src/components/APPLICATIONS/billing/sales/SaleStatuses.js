import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Button from "components/Button";
import Modal, { ModalHeader, ModalBody, ModalFooter } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import List from "components/list/List";
import {
  createSaleStatus,
  deleteSaleStatus,
  getSaleStatuses,
  updateSaleStatus,
} from "services/sales";
import Input from "components/form/Input";
import Alert from "components/Alert";
import PlusIcon from "components/icons/PlusIcon";

const SaleStatuses = () => {
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [chosenSaleStatus, setChosenSaleStatus] = useState({});
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  const { data: saleStatuses = [{}], isLoading } = useQuery({
    queryKey: "getSaleStatuses",
    queryFn: () => getSaleStatuses().then((res) => res.data),
  });

  const getMutateConfig = (mutationFn, successMessage) => ({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries("getSaleStatuses");
      setIsDeleteModalOpen(false);
      setIsEditModalOpen(false);
      setCreateModalOpen(false);
      setAlert({ message: successMessage, type: "success" });
      setTimeout(() => setAlert({ message: "", type: "success" }), 2500);
    },
  });
  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation(
    getMutateConfig(
      () => deleteSaleStatus(chosenSaleStatus.id),
      "ფასდაკლების სტატუსი შეიცვალა"
    )
  );

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation(
    getMutateConfig(
      () => updateSaleStatus({ ...chosenSaleStatus, saleStatusName: input }),
      "ფასდაკლების სტატუსი წაიშლა"
    )
  );

  const { mutate: createMutate, isLoading: createLoading } = useMutation(
    getMutateConfig(
      () => createSaleStatus({ saleStatusName: input }),
      "ფასდაკლების სტატუსი დაემატა"
    )
  );

  return (
    <div className="card p-5 relative">
      <div className="flex items-center justify-between">
        <h3>ფასდაკლების სტატუსები</h3>
        <Button
          onClick={() => {
            setCreateModalOpen(true);
            setInput("");
          }}
          className="btn btn_primary flex items-center gap-1"
        >
          დამატება
          <PlusIcon />
        </Button>
      </div>

      <Alert message={alert.message} color={alert.type} />
      {isLoading && <LoadingSpinner blur />}
      <List
        items={saleStatuses.map((saleStatus) => ({
          ...saleStatus,
          id: saleStatus.saleStatusID,
          name: saleStatus.saleStatusName,
        }))}
        openDelete={setIsDeleteModalOpen}
        openEdit={setIsEditModalOpen}
        setChoosenItem={(item) => {
          setChosenSaleStatus(item);
          setInput(item.name);
        }}
      />
      <Modal
        active={isDeleteModalOpen}
        centered
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <ModalHeader>sale status: {chosenSaleStatus.name}</ModalHeader>
        <ModalBody>დარწმუნებული ხართ რომ გსურთ წაშლა?</ModalBody>
        <ModalFooter>
          <div className="flex ltr:ml-auto rtl:mr-auto">
            <Button
              color="secondary"
              className="uppercase"
              onClick={() => setIsEditModalOpen(false)}
            >
              უკან დაბრუნება
            </Button>
            <Button
              onClick={() => deleteMutate(chosenSaleStatus.id)}
              color="danger"
              className="ltr:ml-2 rtl:mr-2 uppercase"
            >
              {deleteLoading ? (
                <span className="w-[5.8rem]">
                  <LoadingSpinner />
                </span>
              ) : (
                "დადასტურება"
              )}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <Modal
        active={isEditModalOpen}
        centered
        onClose={() => setIsEditModalOpen(false)}
      >
        <ModalHeader>sale status: {chosenSaleStatus.name}</ModalHeader>
        <ModalBody>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <div className="flex ltr:ml-auto rtl:mr-auto">
            <Button
              color="secondary"
              className="uppercase"
              onClick={() => setIsEditModalOpen(false)}
            >
              უკან დაბრუნება
            </Button>
            <Button
              onClick={updateMutate}
              color="primary"
              className="ltr:ml-2 rtl:mr-2 uppercase"
            >
              {updateLoading ? (
                <span className="w-[5.8rem]">
                  <LoadingSpinner />
                </span>
              ) : (
                "შეცვლა"
              )}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
      <Modal
        active={createModalOpen}
        centered
        onClose={() => setCreateModalOpen(false)}
      >
        <ModalHeader>sale status: დამატება</ModalHeader>
        <ModalBody>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <div className="flex ltr:ml-auto rtl:mr-auto">
            <Button
              color="secondary"
              className="uppercase"
              onClick={() => setIsEditModalOpen(false)}
            >
              უკან დაბრუნება
            </Button>
            <Button
              onClick={createMutate}
              color="primary"
              className="ltr:ml-2 rtl:mr-2 uppercase"
            >
              {createLoading ? (
                <span className="w-[5.8rem]">
                  <LoadingSpinner />
                </span>
              ) : (
                "დადასტურება"
              )}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SaleStatuses;
