import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createTemplateColumn,
  deleteTemplateColumn,
  getAllTemplateColumns,
  getAllTemplateColumnsType,
  getAllTemplates,
  updateTemplateColumn,
} from "services/documents";

export const useTemplateColumns = () => {
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [openModal, setOpenModal] = useState({ open: false, action: "" });
  const [selectedColumn, setSelectedColumn] = useState({ id: "" });

  const queryClient = useQueryClient();

  function afterRequestHandler(message, type) {
    return () => {
      queryClient.invalidateQueries("getAllTemplateColumns");
      setAlert({ message, type });
      setTimeout(() => {
        setAlert({ message: "" });
        setOpenModal({ open: false });
      }, 1500);
    };
  }

  const { data: templateColumns = [], isLoading } = useQuery({
    queryKey: "getAllTemplateColumns",
    queryFn: () => getAllTemplateColumns().then((res) => res.data.data),
  });

  const { data: templateColumnsType = [] } = useQuery({
    queryKey: "getAllTemplateColumnsType",
    queryFn: () => getAllTemplateColumnsType().then((res) => res.data.data),
  });

  const { data: templates = [] } = useQuery({
    queryKey: "getAllTemplates",
    queryFn: () => getAllTemplates().then((res) => res.data.data),
  });

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createTemplateColumn,
    onSuccess: afterRequestHandler("column წარმატებით დაემატა", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });
  const { mutate: editMutate, isLoading: editLoading } = useMutation({
    mutationFn: updateTemplateColumn,
    onSuccess: afterRequestHandler("column წარმატებით შეცვლილია", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });
  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: deleteTemplateColumn,
    onSuccess: afterRequestHandler("column წარმატებით წაიშალა", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });

  return {
    templateColumns,
    templateColumnsType,
    templates,
    setStates: { setOpenModal, setSelectedColumn },
    states: { alert, openModal, selectedColumn },
    loadings: { isLoading, createLoading, editLoading, deleteLoading },
    mutates: { createMutate, editMutate, deleteMutate },
  };
};
