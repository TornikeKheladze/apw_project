import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  createTemplate,
  deleteTemplate,
  getAllCatalogs,
  getAllTemplates,
  updateTemplate,
} from "services/documents";
import { getOrganizations } from "services/organizations";

export const useTemplates = () => {
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [openModal, setOpenModal] = useState({ open: false, action: "" });
  const [selectedTemplate, setSelectedTemplate] = useState({ id: "" });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function afterRequestHandler(message, type) {
    return () => {
      queryClient.invalidateQueries("getAllTemplates");
      setAlert({ message, type });
      setTimeout(() => {
        setAlert({ message: "" });
        setOpenModal({ open: false });
      }, 1500);
    };
  }

  const { data: templates = [], isLoading } = useQuery({
    queryKey: "getAllTemplates",
    queryFn: () => getAllTemplates().then((res) => res.data.data),
  });

  const { data: catalogs = [] } = useQuery({
    queryKey: "getAllCatalogs",
    queryFn: () => getAllCatalogs().then((res) => res.data.data),
  });

  const { data: organizations = [] } = useQuery({
    queryKey: "getOrganizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createTemplate,
    onSuccess: afterRequestHandler("შაბლონი წარმატებით დაემატა", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });

  const { mutate: editMutate, isLoading: editLoading } = useMutation({
    mutationFn: updateTemplate,
    onSuccess: afterRequestHandler("შაბლონი წარმატებით შეცვლილია", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: deleteTemplate,
    onSuccess: afterRequestHandler("შაბლონი წარმატებით წაიშლა", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });

  return {
    templates,
    catalogs,
    organizations,
    navigate,
    states: { alert, openModal, selectedTemplate },
    setStates: { setOpenModal, setSelectedTemplate },
    mutates: { createMutate, editMutate, deleteMutate },
    loadings: { createLoading, editLoading, deleteLoading, isLoading },
  };
};
