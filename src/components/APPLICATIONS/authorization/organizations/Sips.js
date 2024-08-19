import Footer from "partials/Footer";

import Button from "components/Button";
import List from "components/list/List";
import Alert from "components/Alert";
import LoadingSpinner from "components/icons/LoadingSpinner";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import AuthForm from "../authForm/AuthForm";
import { orgArr } from "components/APPLICATIONS/billing/formArrays/authArr";
import { SIPTYPEID } from "data/applications";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addOrganization,
  deleteOrganization,
  getOrganizations,
  updateOrganization,
} from "services/organizations";
import { useEffect, useState } from "react";
import { getOrganizationsTypes } from "services/organization-type";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Sips = () => {
  const { typeId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParam] = useSearchParams();
  const createSearchParam = searchParam.get("create");

  const [choosenOrganization, setChoosenOrganization] = useState({});
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });
  const [openModal, setOpenModal] = useState({
    open: false,
    action: "",
    orgTypeId: 0,
  });

  const { data: organizationData = { data: [] }, isLoading: orgsLoading } =
    useQuery({
      queryKey: "getOrganizationsData",
      queryFn: () => getOrganizations().then((res) => res.data),
    });

  const organizations = organizationData.data.filter(
    (item) => item.member_id === null
  );

  const { data: types = [] } = useQuery({
    queryKey: "organizationTypes",
    queryFn: () => getOrganizationsTypes().then((res) => res.data.data),
  });
  useEffect(() => {
    if (createSearchParam) {
      setOpenModal({
        open: true,
        action: "დამატება",
        orgTypeId: typeId,
      });
    }
  }, [createSearchParam, typeId]);

  const { mutate: addMutate, isLoading: addLoading } = useMutation({
    mutationFn: (data) =>
      addOrganization({
        ...data,
        reseller: 1,
        sip: 1,
        type: SIPTYPEID,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries("getOrganizationsData");
      setAlert({
        type: "success",
        message: "წარმატებით შეიქმნა",
      });
      setTimeout(() => {
        setOpenModal({
          open: false,
          action: "",
        });
        navigate(`/departments/${data.data.id}`);
      }, 1500);
      setTimeout(() => {
        setAlert({
          type: "success",
          message: "",
        });
      }, 3000);
    },
    onError: (data) => {
      setAlert({
        message: data.response.data.message,
        type: "danger",
      });
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries("getOrganizationsData");
      setAlert({
        type: "success",
        message: "წარმატებით შეიცვალა",
      });
      setTimeout(() => {
        setOpenModal({
          open: false,
          action: "",
        });
      }, 1500);
      setTimeout(() => {
        setAlert({
          type: "success",
          message: "",
        });
      }, 3000);
    },
    onError: (data) => {
      setAlert({
        message: data.response.data.message,
        type: "danger",
      });
    },
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: () => deleteOrganization(choosenOrganization.id),
    onSuccess: () => {
      queryClient.invalidateQueries("getOrganizationsData");
      setAlert({
        type: "success",
        message: "წარმატებით წაიშალა",
      });
      setTimeout(() => {
        setOpenModal({
          open: false,
          action: "",
        });
      }, 1500);
      setTimeout(() => {
        setAlert({
          type: "success",
          message: "",
        });
      }, 3000);
    },
  });

  return (
    <main className="workspace">
      <Alert message={alert.message} color={alert.type} dismissable />

      <Modal
        active={openModal.open}
        centered
        onClose={() => {
          setOpenModal({ open: false });
          setChoosenOrganization({ id: "" });
        }}
      >
        <ModalHeader>სახელმწიფო უწყების {openModal.action}</ModalHeader>
        {openModal.action === "შეცვლა" && (
          <div className="p-5 overflow-y-auto h-[90vh]">
            <AuthForm
              // formArray={orgArr}
              formArray={orgArr.filter(
                (item) => item.name !== "type" && item.name !== "user_quota"
              )}
              submitHandler={(data) =>
                updateMutate({ ...data, tell: `995${data?.tell}` })
              }
              isLoading={updateLoading}
              defaultValues={{
                ...choosenOrganization,
                tell: choosenOrganization?.tell?.startsWith("995")
                  ? choosenOrganization?.tell?.slice(3)
                  : choosenOrganization?.tell,
              }}
              optionsObj={{
                type: types,
                reseller: [
                  {
                    name: "არის რესელერი",
                    id: 1,
                  },
                  {
                    name: "არ არის რესელერი",
                    id: 0,
                  },
                ],
              }}
            />
          </div>
        )}
        {openModal.action === "დამატება" && (
          <div className="p-5 overflow-y-auto h-[90vh] min-w-80">
            <AuthForm
              // formArray={orgArr}
              formArray={orgArr.filter(
                (item) => item.name !== "type" && item.name !== "user_quota"
              )}
              submitHandler={(data) =>
                addMutate({ ...data, tell: `995${data?.tell}` })
              }
              isLoading={addLoading}
              optionsObj={{
                type: types,
                reseller: [
                  {
                    name: "არის რესელერი",
                    id: 1,
                  },
                  {
                    name: "არ არის რესელერი",
                    id: 0,
                  },
                ],
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
                  onClick={() => deleteMutate(choosenOrganization.id)}
                >
                  {deleteLoading ? <LoadingSpinner /> : "დადასტურება"}
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>

      <div className="card p-5">
        <div className="flex justify-between items-center">
          <h3>სახელმწიფო უწყებები</h3>
          <Button
            onClick={() =>
              setOpenModal({
                open: true,
                action: "დამატება",
                orgTypeId: SIPTYPEID,
              })
            }
            className="p-2 px-3 md:text-sm text-xs"
          >
            უწყების რეგისტრაცია
          </Button>
        </div>
      </div>
      <div className="card p-5">
        {orgsLoading ? (
          <div className="flex flex-col items-center justify-center">
            იტვირთება... <LoadingSpinner />
          </div>
        ) : organizations?.length ? (
          <List
            openDelete={() => {
              setOpenModal({
                open: true,
                action: "წაშლა",
              });
            }}
            openEdit={() => {
              setOpenModal({
                open: true,
                action: "შეცვლა",
              });
            }}
            setChoosenItem={setChoosenOrganization}
            items={organizations}
            title={"დასახელება"}
            toUsers={"/users/organisation/"}
            toDepartments={"/departments/"}
            toServices="/billing/services?ownerID="
          />
        ) : (
          <p>უწყებები არ მოიძებნა</p>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Sips;
