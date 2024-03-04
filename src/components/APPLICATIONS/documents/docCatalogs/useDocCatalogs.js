import { buildDepartmentTree } from "helpers/treeMenuBuilder";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createCatalog,
  deleteCategory,
  getAllCatalogTypes,
  getAllCatalogs,
  updateCategory,
} from "services/documents";
import { getOrganizations } from "services/organizations";

export const useDocCatalogs = () => {
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });
  const [openModal, setOpenModal] = useState({
    open: false,
    action: "",
  });
  const [selectedCatalog, setSelectedCatalog] = useState({ id: "" });
  const queryClient = useQueryClient();

  const { data: catalogs = [], isLoading } = useQuery({
    queryKey: "getAllCatalogs",
    queryFn: () => getAllCatalogs().then((res) => res.data.data),
  });

  const { data: organizations = [], isLoading: organizationsLoading } =
    useQuery({
      queryKey: "getOrganizations",
      queryFn: () => getOrganizations().then((res) => res.data.data),
    });

  const { data: catalogTypes = [], isLoading: catalogTypesLoading } = useQuery({
    queryKey: "getAllCatalogTypes",
    queryFn: () => getAllCatalogTypes().then((res) => res.data.data),
  });

  const { isLoading: createLoading, mutate: createMutate } = useMutation({
    mutationFn: createCatalog,
    onSuccess: afterRequestHandler("კატალოგი წარმატებით დაემატა", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });

  const { isLoading: deleteLoading, mutate: deleteMutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: afterRequestHandler("კატეგორია წარმატებით წაიშალა", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });

  const { isLoading: editLoading, mutate: editMutate } = useMutation({
    mutationFn: updateCategory,
    onSuccess: afterRequestHandler("კატეგორია წარმატებით შეიცვალა", "success"),
    onError: afterRequestHandler("error.response.data.message", "danger"),
  });

  function afterRequestHandler(message, type) {
    return () => {
      queryClient.invalidateQueries("getAllCatalogs");
      setAlert({ message, type });
      setTimeout(() => {
        setAlert({ message: "" });
        setOpenModal({ open: false });
      }, 1500);
    };
  }

  const catalogsTree = buildDepartmentTree(catalogs);

  const loading = isLoading || organizationsLoading || catalogTypesLoading;

  return {
    catalogs,
    catalogsTree,
    catalogTypes,
    organizations,
    mutates: { createMutate, deleteMutate, editMutate },
    loadings: { createLoading, deleteLoading, editLoading, loading },
    states: { alert, openModal, selectedCatalog },
    setStates: { setOpenModal, setSelectedCatalog },
  };
};
