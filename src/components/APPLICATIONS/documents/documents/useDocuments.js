import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  deleteDocument,
  getAllCatalogs,
  getAllDocuments,
  getAllTemplates,
  signDocument,
} from "services/documents";
import { getOrganizations } from "services/organizations";

export const useDocuments = () => {
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [openModal, setOpenModal] = useState({ open: false, action: "" });
  const [selectedDocument, setSelectedDocument] = useState({ id: "" });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function afterRequestHandler(message, type, closeModal = true) {
    return () => {
      queryClient.invalidateQueries("getAllDocuments");
      setAlert({ message, type });
      setTimeout(() => {
        setAlert({ message: "" });
        if (closeModal) setOpenModal({ open: false });
      }, 1500);
    };
  }

  const { data: documents = [], isLoading } = useQuery({
    queryKey: "getAllDocuments",
    queryFn: () => getAllDocuments().then((res) => res.data.data),
  });

  // const {
  //   data: document,
  //   isLoading: documentByIdLoading,
  //   refetch: getDocumentByIdRefetch,
  // } = useQuery({
  //   queryKey: "getDocumentById",
  //   queryFn: (id) => getDocumentById(id).then((res) => res.data.data),
  // });

  const { data: catalogs = [] } = useQuery({
    queryKey: "getAllCatalogs",
    queryFn: () => getAllCatalogs().then((res) => res.data.data),
  });

  const { data: templates = [] } = useQuery({
    queryKey: "getAllTemplates",
    queryFn: () => getAllTemplates().then((res) => res.data.data),
  });

  const { data: organizations = [] } = useQuery({
    queryKey: "getOrganizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: deleteDocument,
    onSuccess: afterRequestHandler("დოკუმენტი წარმატებით წაიშალა", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });

  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  const { mutate: signMutate, isLoading: signLoading } = useMutation({
    mutationFn: signDocument,
    onSuccess: afterRequestHandler(
      "ხელმოწერის მოთხოვნა წარმატებით გაიგზავნა",
      "success"
    ),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });

  const { mutate: signMutateForIdCard, isLoading: signLoadingForIdCard } =
    useMutation({
      mutationFn: signDocument,
      onSuccess: (data) => {
        console.log(data?.data?.url);
        handleExternalLink(data?.data?.url);
      },
      onError: afterRequestHandler("error.response.data.message", "danger"),
    });

  const { mutate: unsignedDownloadMutate, isLoading: unsignedDownloadLoading } =
    useMutation({
      mutationFn: signDocument,
      onSuccess: (data) => {
        queryClient.invalidateQueries(["getDocumentById", selectedDocument.id]);
        setAlert({
          message: "ჩამოტვირთვის მოთხოვნა წარმატებით გაიგზავნა",
          type: "success",
        });
        setTimeout(() => {
          setAlert({ message: "" });
        }, 1500);
      },
      onError: afterRequestHandler("error.response.data.message", "danger"),
    });

  return {
    documents,
    document,
    catalogs,
    organizations,
    templates,
    navigate,
    states: { alert, openModal, selectedDocument },
    setStates: { setOpenModal, setSelectedDocument },
    mutates: {
      deleteMutate,
      signMutate,
      unsignedDownloadMutate,
      signMutateForIdCard,
    },
    loadings: {
      deleteLoading,
      isLoading,
      signLoading,
      unsignedDownloadLoading,
      signLoadingForIdCard,
    },
  };
};
