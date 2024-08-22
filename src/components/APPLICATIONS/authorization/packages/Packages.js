import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Footer from "partials/Footer";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deletePackage,
  getPackageDetails,
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
import { useSelector } from "react-redux";
import { getOrganizations } from "services/organizations";

const Packages = () => {
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
    queryKey: ["getPackages"],
    queryFn: () => getPackages().then((res) => res.data),
  });

  const { isLoading: packageDetailsLoading, mutate: packageDetailsMutate } =
    useMutation({
      mutationFn: (id) => getPackageDetails(id).then((res) => res.data),
      onSuccess: (data) => {
        setSelectedPackage((prevState) => ({
          ...prevState,
          ...data,
          id: prevState.id,
        }));
        setOpenModal({ open: true, action: "შეცვლა" });
      },
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
      queryClient.invalidateQueries("getPackages");
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
    mutationFn: insertPackage,
    onSuccess: () =>
      afterRequestHandler("success", "პაკეტი წარმატებით დაემატა"),
    onError: (data) =>
      afterRequestHandler("danger", data.response.data.message),
  });
  const { isLoading: deleteLoading, mutate: deleteMutate } = useMutation({
    mutationFn: deletePackage,
    onSuccess: () =>
      afterRequestHandler("success", "პაკეტი წარმატებით წაიშალა"),
    onError: () => afterRequestHandler("danger", "პაკეტის წაშლა ვერ მოხერხდა"),
  });
  const { isLoading: editLoading, mutate: editMutate } = useMutation({
    mutationFn: updatePackage,
    onSuccess: () =>
      afterRequestHandler("success", "პაკეტი წარმატებით შეიცვალა"),
    onError: () =>
      afterRequestHandler("danger", "პაკეტის ცვლილება ვერ მოხერხდა"),
  });

  const updatedPackageArr = authorizedUser.superAdmin
    ? [
        ...packageArr,
        {
          name: "oid",
          label: "ავტ.პირი ან უწყება",
          type: "select",
        },
      ]
    : packageArr;

  const renderPackages = authorizedUser.superAdmin
    ? packages
    : packages.filter((item) => +item.oid === +authorizedUser.oid);

  return (
    <main className="workspace overflow-hidden">
      <Alert message={alert.message} color={alert.type} dismissable />
      {packageDetailsLoading && <LoadingSpinner blur />}

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
          <div className="p-5 overflow-y-auto h-[90vh]">
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
          <div className="p-5 overflow-y-auto h-[90vh]">
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
        <h3>მომხმარებლის პაკეტები</h3>
        <Button
          onClick={() => setOpenModal({ open: true, action: "დამატება" })}
        >
          <span>პაკეტის დამატება</span> <PlusIcon />
        </Button>
      </div>

      <div className="card p-5 overflow-x-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : renderPackages?.length ? (
          <AuthTable
            staticArr={updatedPackageArr.filter(
              (item) =>
                item.name !== "description" &&
                item.name !== "conditions" &&
                item.name !== "obligations" &&
                item.name !== "additional_terms"
            )}
            fetchedArr={renderPackages.map((item) => ({
              ...item,
              oid:
                organizations.find((org) => +org.id === +item.oid)?.name ||
                item.oid,
            }))}
            actions={{
              editClick: (item) => {
                packageDetailsMutate(item.id);
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
