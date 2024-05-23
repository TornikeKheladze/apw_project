import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteApiCredentials,
  getApiCredentials,
} from "services/apiCredentials";

export const useApiCredentials = () => {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [filter, setFilter] = useState({});

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => deleteApiCredentials(id),
    onSuccess: () => {
      queryClient.invalidateQueries("getApiCredentials");
      setAlert({
        message: "Api credential წარმატებით წაიშალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const { data: apiCredentials = [{}], isLoading: apiLoading } = useQuery({
    queryKey: "getApiCredentials",
    queryFn: () => getApiCredentials().then((res) => res.data),
  });

  return {
    loading: apiLoading,
    alert,
    filter,
    setFilter,
    apiCredentials,
    deleteItem: {
      deleteMutate,
      deleteLoading,
    },
  };
};
