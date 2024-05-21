import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { createCharge, getChargeById, updateCharge } from "services/charges";
import { getCategories } from "services/serviceCategories";

export const useChargesForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { action, id } = useParams();

  const [chosenCategory, setChosenCategory] = useState({});
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
      queryClient.invalidateQueries("getCharges");
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["getChargeById", id]);
        navigate(-1);
      }, 1500);
    }
  };

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: createCharge,
    onSuccess(data) {
      mutateHandler(data, "charge დამატება");
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: updateCharge,
    onSuccess(data) {
      mutateHandler(data, "charge ცვლილება");
    },
  });

  const {
    data: charge = {},
    isLoading: chargeLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getChargeById", id],
    queryFn: () => getChargeById(id).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("formInputData", JSON.stringify(data));
    },
    enabled: action === "edit" ? true : false,
    staleTime: Infinity,
  });

  const { data: categoriesData = [{}], isLoading: categoriesLoading } =
    useQuery({
      queryKey: "getCategories",
      queryFn: () => getCategories().then((res) => res.data),
    });

  const categories = categoriesData.map((cat) => ({
    ...cat,
    id: cat.catID,
    name: cat.categoryName,
  }));

  const submitHandler = (data) => {
    if (action === "create") {
      createMutate({ ...data, catID: chosenCategory.id });
    } else {
      updateMutate({
        ...data,
        chargeID: id,
        catID: chosenCategory.id,
      });
    }
  };

  useEffect(() => {
    if (action === "edit")
      setChosenCategory({
        id: charge.catID,
      });
    return () => {
      if (action === "edit") {
        localStorage.removeItem("formInputData");
      }
    };
  }, [action, charge.catID]);

  return {
    action,
    loading: chargeLoading || categoriesLoading || isFetching,
    submitHandler,
    actionLoading: createLoading || updateLoading,
    alert,
    categories,
    charge,
    chosenCategory,
    setChosenCategory,
  };
};
