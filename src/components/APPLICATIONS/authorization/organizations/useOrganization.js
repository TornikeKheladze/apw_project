import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getOrganizationsTypes } from "services/organization-type";
import {
  addOrganization,
  deleteOrganization,
  getOrganizations,
  updateOrganization,
} from "services/organizations";

const useOrganization = () => {
  // instead of 1, this is type of spec organization

  const { typeId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParam] = useSearchParams();
  const createSearchParam = searchParam.get("create");

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
  useEffect(() => {
    if (createSearchParam) {
      setOpenModal({
        open: true,
        action: "დამატება",
      });
    }
  }, [createSearchParam, typeId]);

  const { mutate: addMutate, isLoading: addLoading } = useMutation({
    mutationFn: (data) =>
      addOrganization({
        ...data,
        reseller: 1,
        sip: 0,
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

  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data || [];

  return {
    organizations: organizations.filter((item) => item.member_id !== null),
    types: types.filter((item) => item.name !== "dga"),
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
  };
};

export default useOrganization;
