import { useEffect, useState } from "react";
import { getAllServices } from "services/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCategories } from "services/serviceCategories";
import { makeTransactionsArr } from "../../formArrays/transactionArr";
import { makeTransactionByCategory } from "services/transactions";
import { getSales } from "services/sales";
import { getServiceParametersByServiceID } from "services/serviceParameters";
import { useSelector } from "react-redux";
import { getOrganizationById, getOrganizations } from "services/organizations";

export const useTransactionByCat = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceID = searchParams.get("serviceID");
  const { authorizedUser } = useSelector((store) => store.user);

  const [chosenCategory, setChosenCategory] = useState({});
  const [alert, setAlert] = useState({
    message: "",
    type: "success",
  });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  // გატარებისას რო გავიგო რესელერია თუ არა ორგანიზაცია რომელიც ავტორიზებული
  // იუზერის მივედვით მომაქვს
  const { data: org = {} } = useQuery({
    queryKey: ["getOrganizationById", authorizedUser.oid],
    queryFn: () =>
      getOrganizationById(authorizedUser.oid).then((res) => res.data.data),
    enabled: authorizedUser.oid ? true : false,
  });

  const { data: categoriesData = [{}], isLoading: categoriesLoading } =
    useQuery({
      queryKey: "getCategories",
      queryFn: () => getCategories().then((res) => res.data),
    });
  const {
    data: organizationData = { data: [], member: null, dga: [] },
    isLoading: orgLoading,
  } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data),
  });

  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data || [];
  const { data: salesData = [], isLoading: salesLoading } = useQuery({
    queryKey: "getSales",
    queryFn: () => getSales().then((res) => res.data),
  });

  const { data: serviceParameters = [] } = useQuery({
    queryKey: ["getServiceParametersByServiceID", serviceID],
    queryFn: () =>
      getServiceParametersByServiceID(serviceID).then((res) => res.data),
    enabled: serviceID ? true : false,
    staleTime: Infinity,
  });

  const afterRequestHandler = (response, message) => {
    if (response.data.message) {
      setAlert({
        message: `${response.data.message}`,
        type: "danger",
      });
    } else {
      queryClient.invalidateQueries(["transactions"]);
      setAlert({
        message: `${message} წარმატებულია`,
        type: "success",
      });
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    }
  };

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

  const categories = categoriesData.map((category) => ({
    ...category,
    id: category.catID,
    name: category.categoryName,
  }));

  const sales = salesData.map((sale) => ({
    ...sale,
    id: sale.saleID,
    name: `ფიქსირებული ${sale.fixed}, პროცენტი ${sale.percent}`,
  }));

  const { mutate: createMutate, isLoading: createLoading } = useMutation({
    mutationFn: makeTransactionByCategory,
    onSuccess: (res) => {
      afterRequestHandler(res, "ტრანზაქციის გატარება");
    },
  });

  useEffect(() => {
    return () => {
      localStorage.removeItem("formInputData");
    };
  }, []);

  const selectOptions = {
    agentID: organizations,
    serviceID: services,
    saleID: [{ id: 0, name: "სეილის გარეშე" }, ...sales],
  };

  const submitHandler = async (data) => {
    const reseller = org?.reseller;
    createMutate({
      ...data,
      catID: chosenCategory.id,
      reseller: reseller ? 1 : 0,
    });
  };

  const additionalFields = () => {
    if (serviceParameters.length > 0) {
      return serviceParameters.map((param) => ({
        name: param.parameterName,
        label: param.parameterPlaceholder,
        type: "text",
      }));
    }
  };

  const formFields = additionalFields()
    ? [...makeTransactionsArr, ...additionalFields()]
    : makeTransactionsArr;

  return {
    submitHandler,
    categories,
    organizations,
    alert,
    isLoading:
      categoriesLoading || orgLoading || servicesLoading || salesLoading,
    actionLoading: createLoading,
    chosenCategory,
    setChosenCategory,
    formFields,
    selectOptions,
  };
};
