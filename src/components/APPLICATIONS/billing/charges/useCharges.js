import { useState } from "react";
import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";
import { filterArray } from "helpers/filterArray";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteCharge, getCharges } from "services/charges";
import { getCategories } from "services/serviceCategories";

export const useCharges = () => {
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [filter, setFilter] = useState({});

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => deleteCharge(id),
    onSuccess: () => {
      queryClient.invalidateQueries("getCharges");
      setAlert({
        message: "მოსაკრებელი წარმატებით წაიშალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const { data: chargesData = [], isLoading: chargesLoading } = useQuery({
    queryKey: "getCharges",
    queryFn: () => getCharges().then((res) => res.data),
  });

  const { data: categoriesData = [{}], isLoading: categoriesLoading } =
    useQuery({
      queryKey: "getCategories",
      queryFn: () => getCategories().then((res) => res.data),
    });

  const charges = chargesData.map((price) => ({
    ...price,
    id: price.priceID,
  }));

  const categories = categoriesData.map((cat) => ({
    ...cat,
    id: cat.catID,
    name: cat.categoryName,
  }));

  const updatedList = filterArray(charges, removeEmpty(filter))?.map(
    (charge) => {
      return {
        ...charge,
        id: charge.chargeID,
        catID: idToName(categories, charge.catID),
      };
    }
  );

  return {
    loading: categoriesLoading || chargesLoading,
    deleteMutate,
    deleteLoading,
    alert,
    updatedList,
    categories,
    filter,
    setFilter,
    deleteItem: {
      deleteMutate,
      deleteLoading,
    },
  };
};
