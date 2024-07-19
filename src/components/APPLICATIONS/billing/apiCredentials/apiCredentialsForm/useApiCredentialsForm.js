import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  createApiCredentials,
  getApiCredentialsById,
  updateApiCredentials,
} from "services/apiCredentials";

export const useApiCredentialsForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
      queryClient.invalidateQueries("getApiCredentials");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["getApiCredentialsById", id]);
        navigate(-1);
      }, 1500);
    }
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createApiCredentials,
    onSuccess(data) {
      mutateHandler(data, "api credential დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateApiCredentials,
    onSuccess(data) {
      mutateHandler(data, "api credential ცვლილება");
    },
  });

  const {
    data: apiCredential = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getApiCredentialsById", id],
    queryFn: () => getApiCredentialsById(id).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
    staleTime: Infinity,
  });

  const submitHandler = (data) => {
    if (action === "create") {
      createMutate(data);
    } else {
      updateMutate({
        ...data,
        id,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (action === "edit") {
        localStorage.removeItem("formInputData");
      }
    };
  }, [action]);

  return {
    action,
    loading: isLoading || isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    apiCredential,
  };
};
