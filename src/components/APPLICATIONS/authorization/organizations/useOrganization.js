import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrganizationsTypes } from "services/organization-type";
import {
  addOrganization,
  deleteOrganization,
  getOrganizations,
  updateOrganization,
} from "services/organizations";

const useOrganization = () => {
  const specialTypeId = 37;

  const { typeId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { authorizedUser } = useSelector((state) => state.user);
  const [choosenOrganization, setChoosenOrganization] = useState({});
  // const [successMessage, setSuccessMessage] = useState("");
  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });
  const [openModal, setOpenModal] = useState({
    open: false,
    action: "",
    orgTypeId: 0,
  });

  const {
    data: organizationData = { data: [], member: null, dga: [] },
    isLoading: orgsLoading,
  } = useQuery({
    queryKey: "getOrganizationsData",
    queryFn: () => getOrganizations().then((res) => res.data),
  });

  const { data: types = [], isLoading: orgTypesLoading } = useQuery({
    queryKey: "organizationTypes",
    queryFn: () => getOrganizationsTypes().then((res) => res.data.data),
  });

  const { mutate: addMutate, isLoading: addLoading } = useMutation({
    mutationFn: (data) =>
      addOrganization({
        ...data,
        type: openModal.orgTypeId === specialTypeId ? specialTypeId : data.type,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries("getOrganizationsData");
      setAlert({
        type: "success",
        message: "ორგანიზაცია წარმატებით შეიქმნა",
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
    onError: () => {
      setAlert({
        message: "დამატება ვერ მოხერხდა",
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
        message: "ორგანიზაცია წარმატებით შეიცვალა",
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
    onError: () => {
      setAlert({
        message: "ცვლილება ვერ მოხერხდა",
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
        message: "ორგანიზაცია წარმატებით წაიშალა",
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

  return {
    organizations: organizationData.data,
    members: organizationData.member,
    types,
    authorizedUser,
    typeId,
    navigate,
    loadings: {
      addLoading,
      updateLoading,
      deleteLoading,
      orgsLoading,
      orgTypesLoading,
    },
    states: { choosenOrganization, alert, openModal },
    setStates: { setChoosenOrganization, setOpenModal },
    mutates: { deleteMutate, updateMutate, addMutate },
    specialTypeId,
  };
};

export default useOrganization;
