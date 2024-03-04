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
  const queriClient = useQueryClient();

  const { authorizedUser } = useSelector((state) => state.user);
  const [choosenOrganization, setChoosenOrganization] = useState({});
  const [input, setInput] = useState("");
  const [choosenType, setChoosenType] = useState({ id: "", name: "" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { data: organizations = [], isLoading: orgsLoading } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });
  const { data: types = [], isLoading: orgTypesLoading } = useQuery({
    queryKey: "organizationTypes",
    queryFn: () => getOrganizationsTypes().then((res) => res.data.data),
  });

  const { mutate: addMutate, isLoading: addLoading } = useMutation({
    mutationFn: () => addOrganization(input, choosenType.id),
    onSuccess: () => {
      queriClient.invalidateQueries("organizations");
      setSuccessMessage("ორგანიზაცია წარმატებით შეიქმნა");
      setInput("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      queriClient.invalidateQueries("organizations");
      setSuccessMessage("ორგანიზაცია წარმატებით შეიცვალა");
      setInput("");
      setTimeout(() => {
        setIsEditModalOpen(false);
      }, 1500);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: () => deleteOrganization(choosenOrganization.id),
    onSuccess: () => {
      queriClient.invalidateQueries("organizations");
      setSuccessMessage("ორგანიზაცია წარმატებით წაიშალა");
      setInput("");
      setTimeout(() => {
        setIsDeleteModalOpen(false);
      }, 1500);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const loading = orgsLoading || orgTypesLoading;

  return {
    organizations,
    types,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    choosenOrganization,
    setChoosenOrganization,
    deleteMutate,
    updateMutate,
    addMutate,
    loading,
    authorizedUser,
    typeId,
    navigate,
    successMessage,
    setSuccessMessage,
    choosenType,
    setChoosenType,
    input,
    setInput,
    loadings: {
      addLoading,
      updateLoading,
      deleteLoading,
      orgsLoading,
      orgTypesLoading,
    },
    states: {
      isEditModalOpen,
      isDeleteModalOpen,
      choosenOrganization,
      successMessage,
      choosenType,
      input,
    },
    setStates: {
      setIsEditModalOpen,
      setIsDeleteModalOpen,
      setChoosenOrganization,
      setSuccessMessage,
      setChoosenType,
      setInput,
    },
    mutates: {
      deleteMutate,
      updateMutate,
      addMutate,
    },
  };
};

export default useOrganization;
