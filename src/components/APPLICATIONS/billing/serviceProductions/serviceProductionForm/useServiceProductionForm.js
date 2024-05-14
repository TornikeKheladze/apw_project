import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllServices } from "services/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "services/users";
import {
  createServiceProduction,
  getServiceProductionById,
  updateServiceProduction,
} from "services/serviceProduction";

export const useServiceProductionForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { action, id } = useParams();
  const navigate = useNavigate();
  const { authorizedUser } = useSelector((store) => store.user);

  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });

  const {
    data: serviceProduction = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getServiceProductionById", id],
    queryFn: () => getServiceProductionById(id).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
    staleTime: Infinity,
  });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const { data: usersData = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  const mutateHandler = (response, message) => {
    if (response.data.message || response.data.error) {
      setAlert({
        message: `${message} ვერ მოხერხდა`,
        type: "danger",
      });
    } else {
      queryClient.invalidateQueries("getServiceProduction");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["getServiceProductionById", id]);
        navigate(-1);
      }, 1500);
    }
  };

  const services = servicesData.map((ser) => ({ ...ser, id: ser.serviceID }));
  const users = usersData.map((user) => ({
    ...user,
    id: user.user_id,
  }));

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createServiceProduction,
    onSuccess: (res) => {
      mutateHandler(res, "სერვისის production დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: editLoading } = useMutation({
    mutationFn: updateServiceProduction,
    onSuccess: (res) => {
      mutateHandler(res, "სერვისის production ცვლილება");
    },
  });

  useEffect(() => {
    return () => {
      if (action === "edit") {
        localStorage.removeItem("formInputData");
      }
    };
  }, [dispatch, action, id]);

  const submitHandler = async (data) => {
    const ownerID = authorizedUser.id;
    const requestData = {
      ...data,
      image: JSON.parse(localStorage.getItem("formInputData"))?.image,
      ownerID,
    };

    if (action === "create") {
      createMutate({ ...requestData, usedTransactionQuantity: 0 });
    } else {
      updateMutate({
        ...requestData,
        serviceProductionID: id,
        usedTransactionQuantity: serviceProduction.usedTransactionQuantity,
      });
    }
  };

  return {
    action,
    submitHandler,
    services,
    alert,
    serviceProduction,
    isLoading: servicesLoading || isLoading || usersLoading || isFetching,
    actionLoading: createLoading || editLoading,
    users,
  };
};
