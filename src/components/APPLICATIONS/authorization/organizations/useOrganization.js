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
  const { typeId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { authorizedUser } = useSelector((state) => state.user);
  const [choosenOrganization, setChoosenOrganization] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [openModal, setOpenModal] = useState({
    open: false,
    action: "",
  });

  const { data: organizations = [], isLoading: orgsLoading } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });
  const { data: types = [], isLoading: orgTypesLoading } = useQuery({
    queryKey: "organizationTypes",
    queryFn: () => getOrganizationsTypes().then((res) => res.data.data),
  });

  const { mutate: addMutate, isLoading: addLoading } = useMutation({
    mutationFn: addOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries("organizations");
      setSuccessMessage("ორგანიზაცია წარმატებით შეიქმნა");
      setTimeout(() => {
        setOpenModal({
          open: false,
          action: "",
        });
      }, 1500);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries("organizations");
      setSuccessMessage("ორგანიზაცია წარმატებით შეიცვალა");
      setTimeout(() => {
        setOpenModal({
          open: false,
          action: "",
        });
      }, 1500);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: () => deleteOrganization(choosenOrganization.id),
    onSuccess: () => {
      queryClient.invalidateQueries("organizations");
      setSuccessMessage("ორგანიზაცია წარმატებით წაიშალა");
      setTimeout(() => {
        setOpenModal({
          open: false,
          action: "",
        });
      }, 1500);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  return {
    organizations,
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
    states: { choosenOrganization, successMessage, openModal },
    setStates: { setChoosenOrganization, setOpenModal },
    mutates: { deleteMutate, updateMutate, addMutate },
  };
};

export default useOrganization;
