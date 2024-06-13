import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { getAllServices } from "services/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "services/users";
import {
  createServiceProduction,
  getServiceProductionById,
  updateServiceProduction,
} from "services/serviceProduction";
import { serviceProductionArr } from "../../formArrays/serviceArr";

export const useServiceProductionForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { action, id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const ownerID = searchParams.get("ownerID");
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

  const { data: users = [{}], isLoading: usersLoading } = useQuery({
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
    const requestData = {
      ownerID,
      ...data,
      image: JSON.parse(localStorage.getItem("formInputData"))?.image,
    };

    if (action === "create") {
      createMutate({
        ...requestData,
        usedTransactionQuantity: 0,
        usedTransactionSum: 0,
      });
    } else {
      updateMutate({
        ...requestData,
        serviceProductionID: id,
        usedTransactionQuantity: serviceProduction.usedTransactionQuantity,
      });
    }
  };

  const formFields = serviceProductionArr.filter(
    (item) =>
      item.name !== "usedTransactionQuantity" &&
      (!ownerID || item.name !== "ownerID")
  );

  return {
    action,
    submitHandler,
    services,
    alert,
    serviceProduction,
    isLoading: servicesLoading || isLoading || usersLoading || isFetching,
    actionLoading: createLoading || editLoading,
    users,
    formFields,
  };
};
