import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Footer from "partials/Footer";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deletePackage,
  getPackages,
  insertPackage,
  updatePackage,
} from "services/packages";
import AuthTable from "../authTable/AuthTable";
import { packageArr } from "components/APPLICATIONS/billing/formArrays/packageArr";
import Button from "components/Button";
import PlusIcon from "components/icons/PlusIcon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import AuthForm from "../authForm/AuthForm";

const Packages = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [openModal, setOpenModal] = useState({
    open: false,
    action: "",
  });
  const [selectedPackage, setSelectedPackage] = useState({ id: "" });
  const queryClient = useQueryClient();

  const { isLoading, data: packages = [] } = useQuery({
    queryKey: ["getPackages"],
    queryFn: getPackages().then((res) => res.data),
  });

  const { isLoading: createLoading, mutate: createMutate } = useMutation({
    mutationFn: insertPackage,
    onSuccess: () => {
      queryClient.invalidateQueries("getPackages");
      setSuccessMessage("პაკეტი წარმატებით დაემატა");
      setTimeout(() => {
        setSuccessMessage("");
        setOpenModal({ open: false });
      }, 1500);
    },
  });
  const { isLoading: deleteLoading, mutate: deleteMutate } = useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries("getPackages");
      setSuccessMessage("პაკეტი წარმატებით წაიშალა");
      setTimeout(() => {
        setSuccessMessage("");
        setOpenModal({ open: false });
      }, 1500);
    },
  });
  const { isLoading: editLoading, mutate: editMutate } = useMutation({
    mutationFn: updatePackage,
    onSuccess: () => {
      queryClient.invalidateQueries("getPackages");
      setSuccessMessage("პაკეტი წარმატებით შეიცვალა");
      setTimeout(() => {
        setSuccessMessage("");
        setOpenModal({ open: false });
      }, 1500);
    },
  });

  return (
    <main className="workspace overflow-hidden">
      <Alert message={successMessage} color="success" dismissable />

      <Modal
        active={openModal.open}
        centered
        onClose={() => {
          setOpenModal({ open: false });
          setSelectedPackage({ id: "" });
        }}
      >
        <ModalHeader>პაკეტის {openModal.action}</ModalHeader>
        {openModal.action === "შეცვლა" && (
          <div className="p-5">
            <AuthForm
              formArray={packageArr}
              submitHandler={editMutate}
              isLoading={editLoading}
              defaultValues={selectedPackage}
            />
          </div>
        )}
        {openModal.action === "დამატება" && (
          <div className="p-5">
            <AuthForm
              formArray={packageArr}
              submitHandler={createMutate}
              isLoading={createLoading}
            />
          </div>
        )}
        {openModal.action === "წაშლა" && (
          <>
            <ModalBody>
              <p>ნამდვილად გსურთ წაშლა?</p>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between gap-3">
                <Button
                  color="secondary"
                  onClick={() => setOpenModal({ open: false })}
                >
                  გაუქმება
                </Button>
                <Button
                  className="min-w-[135px]"
                  onClick={() => deleteMutate(selectedPackage.id)}
                >
                  {deleteLoading ? <LoadingSpinner /> : "დადასტურება"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>
      <div className="w-full flex justify-between mb-4">
        <h3>პაკეტები</h3>
        <Button
          onClick={() => setOpenModal({ open: true, action: "დამატება" })}
        >
          <span>დამატება</span> <PlusIcon />
        </Button>
      </div>

      <div className="card p-5 overflow-x-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : packages?.length ? (
          <AuthTable
            staticArr={packageArr}
            fetchedArr={packages}
            actions={{
              editClick: (item) => {
                setOpenModal({ open: true, action: "შეცვლა" });
                setSelectedPackage(item);
              },
              deleteClick: (item) => {
                setOpenModal({
                  open: true,
                  action: "წაშლა",
                });
                setSelectedPackage(item);
              },
            }}
          />
        ) : (
          <p>პაკეტები არ მოიძებნა</p>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Packages;
