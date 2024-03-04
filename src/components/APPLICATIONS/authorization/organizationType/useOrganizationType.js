import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addOrganizationType,
  deleteOrganizationType,
  getOrganizationsTypes,
  updateOrganizationType,
} from "services/organization-type";

const useOrganizationType = () => {
  const [input, setInput] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState({ name: "", id: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const queriClient = useQueryClient();

  const { data: types = [], isLoading } = useQuery({
    queryKey: "organizationTypes",
    queryFn: () => getOrganizationsTypes().then((res) => res.data.data),
  });

  const { mutate: addTypeMutate, isLoading: addLoading } = useMutation({
    mutationFn: () => addOrganizationType(input),
    onSuccess: () => {
      queriClient.invalidateQueries("organizationTypes");
      setSuccessMessage("ორგანიზაციის ტიპი წარმატებით დაემატა");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setInput("");
    },
  });

  const { mutate: deleteTypeMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: () => deleteOrganizationType(currentType.id),
    onSuccess: () => {
      queriClient.invalidateQueries("organizationTypes");
      setSuccessMessage("ორგანიზაციის ტიპი წარმატებით წაიშალა");
      setTimeout(() => {
        setDeleteModalOpen(false);
      }, 1500);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const { mutate: updateTypeMutate, isLoading: updateLoading } = useMutation({
    mutationFn: (data) => updateOrganizationType(data),
    onSuccess: () => {
      queriClient.invalidateQueries("organizationTypes");
      setSuccessMessage("ორგანიზაციის ტიპი წარმატებით შეიცვალა");
      setTimeout(() => {
        setEditModalOpen(false);
      }, 1500);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  return {
    types,
    loadings: { addLoading, updateLoading, deleteLoading, isLoading },
    mutates: { deleteTypeMutate, updateTypeMutate, addTypeMutate },
    states: {
      isEditModalOpen,
      isDeleteModalOpen,
      currentType,
      successMessage,
      input,
    },
    setStates: {
      setEditModalOpen,
      setDeleteModalOpen,
      setCurrentType,
      setInput,
    },
  };
};

export default useOrganizationType;
