import { docCatalogsArr } from "components/APPLICATIONS/billing/formArrays/documentsArrs";
import { groupBy } from "helpers/objectFunctions";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import {
  createCatalog,
  deleteCategory,
  getAllCatalogs,
  updateCategory,
} from "services/documents";
import { getOrganizations } from "services/organizations";

export const useDocCatalogs = () => {
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });
  const authorizedUser = useSelector((state) => state.user.authorizedUser);
  const [openModal, setOpenModal] = useState({
    open: false,
    action: "",
  });
  const [selectedCatalog, setSelectedCatalog] = useState({ id: "" });
  const queryClient = useQueryClient();

  const { data: catalogsData = [], isLoading } = useQuery({
    queryKey: "getAllCatalogs",
    queryFn: () => getAllCatalogs().then((res) => res.data.data),
  });
  const catalogs = authorizedUser.superAdmin
    ? catalogsData
    : catalogsData.filter((catalog) => +catalog.org_id === +authorizedUser.oid);

  const {
    data: organizationData = { data: [], member: null },
    isLoading: organizationsLoading,
  } = useQuery({
    queryKey: "getOrganizations",
    queryFn: () => getOrganizations().then((res) => res.data),
  });

  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data || [];

  const { isLoading: createLoading, mutate: createMutate } = useMutation({
    mutationFn: (data) =>
      createCatalog({
        ...data,
        org_id: authorizedUser.superAdmin ? data.org_id : authorizedUser.oid,
        type: openModal.type,
      }),
    onSuccess: afterRequestHandler("კატეგორია წარმატებით დაემატა", "success"),
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
  const catalogsByOrg = groupBy(catalogs, "org_id");

  const fields = docCatalogsArr.filter(
    (item) =>
      item.name !== "org_id" &&
      item.name !== "parent_id" &&
      item.name !== "type"
  );

  const loading = isLoading || organizationsLoading;

  return {
    catalogs,
    catalogsByOrg,
    organizations,
    fields,
    authorizedUser,
    mutates: { createMutate, deleteMutate, editMutate },
    loadings: { createLoading, deleteLoading, editLoading, loading },
    states: { alert, openModal, selectedCatalog },
    setStates: { setOpenModal, setSelectedCatalog },
  };
};
