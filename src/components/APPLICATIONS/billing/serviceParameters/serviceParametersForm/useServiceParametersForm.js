import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createServiceParameter,
  getServiceParameterById,
  getServiceParameterTypes,
  updateServiceParameter,
} from "services/serviceParameters";
import { getAllServices } from "services/services";
import { useNavigate } from "react-router-dom";

export const useServiceParametersForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const { action, id } = useParams();

  const [alert, setAlert] = useState({
    type: "success",
    message: "",
  });

  const mutateHandler = (response, message) => {
    if (response.data.message || response.data.error) {
      setAlert({
        message: `${message} ვერ მოხერხდა`,
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "danger",
        });
      }, 2500);
    } else {
      queryClient.invalidateQueries("getServiceParameters");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        navigate(-1);
        queryClient.invalidateQueries(["getServiceParameterById", id]);
      }, 1500);
    }
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createServiceParameter,
    onSuccess(data) {
      mutateHandler(data, "სერვის პარამეტრის დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateServiceParameter,
    onSuccess(data) {
      mutateHandler(data, "სერვის პარამეტრის ცვლილება");
    },
  });

  const {
    data: serviceParameter = {},
    isLoading: serviceParameterLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getServiceParameterById", id],
    queryFn: () => getServiceParameterById(id).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
    staleTime: Infinity,
  });

  const { data: types = [{}], isLoading: typesLoading } = useQuery({
    queryKey: "getServiceParameterTypes",
    queryFn: () => getServiceParameterTypes().then((res) => res.data),
  });

  const { data: services = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const serviceID = searchParam.get("serviceID") || serviceParameter.serviceID;

  const service =
    services.find((service) => +service.serviceID === +serviceID) || {};

  const submitHandler = (data) => {
    if (action === "create") {
      createMutate({
        ...data,
        catID: service.categoryID,
        serviceID,
      });
    } else {
      updateMutate({
        ...data,
        serviceParameterID: id,
        catID: service.categoryID,
        serviceID,
      });
    }
  };

  return {
    action,
    loading:
      serviceParameterLoading || typesLoading || servicesLoading || isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    serviceParameter,
    types,
    services,
    service,
  };
};
