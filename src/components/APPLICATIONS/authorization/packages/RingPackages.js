import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Footer from "partials/Footer";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import AuthTable from "../authTable/AuthTable";
import { packageArr } from "components/APPLICATIONS/billing/formArrays/packageArr";
import Button from "components/Button";
import PlusIcon from "components/icons/PlusIcon";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import AuthForm from "../authForm/AuthForm";
import { useSelector } from "react-redux";
import { getOrganizations } from "services/organizations";
import {
  deleteRingPackage,
  getRingPackages,
  insertRingPackage,
  updateRingPackage,
} from "services/packages";

const RingPackages = () => {
  const { authorizedUser } = useSelector((store) => store.user);
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });
  const [openModal, setOpenModal] = useState({
    open: false,
    action: "",
  });
  const [selectedPackage, setSelectedPackage] = useState({ id: "" });
  const queryClient = useQueryClient();

  const { isLoading, data: packages = [] } = useQuery({
    queryKey: ["getRingPackages"],
    queryFn: () => getRingPackages().then((res) => res.data),
  });

  const { data: organizationData = { data: [], member: null, dga: [] } } =
    useQuery({
      queryKey: "getOrganizationsData",
      queryFn: () => getOrganizations().then((res) => res.data),
    });
  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data || [];

  const afterRequestHandler = (type, message) => {
    if (type === "success") {
      queryClient.invalidateQueries("getRingPackages");
    }
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert({
        type: type,
        message: "",
      });
      setOpenModal({ open: false });
    }, 3000);
  };

  const { isLoading: createLoading, mutate: createMutate } = useMutation({
    mutationFn: insertRingPackage,
    onSuccess: () =>
      afterRequestHandler("success", "ბეჭდის პაკეტი წარმატებით დაემატა"),
    onError: (data) =>
      afterRequestHandler("danger", data.response.data.message),
  });
  const { isLoading: deleteLoading, mutate: deleteMutate } = useMutation({
    mutationFn: deleteRingPackage,
    onSuccess: () =>
      afterRequestHandler("success", "ბეჭდის პაკეტი წარმატებით წაიშალა"),
    onError: () => afterRequestHandler("danger", "პაკეტის წაშლა ვერ მოხერხდა"),
  });
  const { isLoading: editLoading, mutate: editMutate } = useMutation({
    mutationFn: updateRingPackage,
    onSuccess: () =>
      afterRequestHandler("success", "ბეჭდის პაკეტი წარმატებით შეიცვალა"),
    onError: (data) =>
      afterRequestHandler("danger", data.response.data.message),
  });

  const updatedPackageArr = authorizedUser.superAdmin
    ? [
        ...packageArr.filter((item) => item.name !== "exp"),
        {
          name: "oid",
          label: "ავტ.პირი ან უწყება",
          type: "select",
        },
      ]
    : [...packageArr.filter((item) => item.name !== "exp")];

  const renderPackages = authorizedUser.superAdmin
    ? packages
    : packages.filter((item) => +item.oid === +authorizedUser.oid);

  return (
    <main className="workspace overflow-hidden">
      <Alert message={alert.message} color={alert.type} dismissable />

      <Modal
        active={openModal.open}
        centered
        onClose={() => {
          setOpenModal({ open: false });
          setSelectedPackage({ id: "" });
        }}
      >
        <ModalHeader>ბეჭდის პაკეტის {openModal.action}</ModalHeader>
        {openModal.action === "შეცვლა" && (
          <div className="p-5">
            <AuthForm
              formArray={updatedPackageArr.filter(
                (item) => item.name !== "oid"
              )}
              submitHandler={editMutate}
              isLoading={editLoading}
              defaultValues={selectedPackage}
            />
          </div>
        )}
        {openModal.action === "დამატება" && (
          <div className="p-5">
            <AuthForm
              formArray={updatedPackageArr}
              submitHandler={(data) =>
                createMutate({ ...data, oid: data.oid || authorizedUser.oid })
              }
              isLoading={createLoading}
              optionsObj={{
                oid: authorizedUser.superAdmin
                  ? organizations
                  : organizations.filter((org) => org.member_id !== null),
              }}
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
        <h3>ბეჭდის პაკეტები</h3>
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
        ) : renderPackages?.length ? (
          <AuthTable
            staticArr={updatedPackageArr}
            fetchedArr={renderPackages.map((item) => ({
              ...item,
              oid:
                organizations.find((org) => +org.id === +item.oid)?.name ||
                item.oid,
            }))}
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
          <p>ბეჭდის პაკეტები არ მოიძებნა</p>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default RingPackages;
