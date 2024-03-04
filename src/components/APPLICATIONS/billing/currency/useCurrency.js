import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setFilter } from "reducers/FilterReducer";
import { deleteCurrency, getCurrencies } from "services/currency";

export const useCurrency = () => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { isLoading: loading, data } = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  const currencies = data?.data || [];

  const { mutate: deleteAndUpdate } = useMutation({
    mutationFn: deleteCurrency,
    onSuccess: () => {
      queryClient.invalidateQueries("currencies");
    },
  });

  useEffect(() => {
    return () => {
      dispatch(setFilter({}));
    };
  }, [dispatch]);

  return { loading, currencies, deleteAndUpdate };
};
