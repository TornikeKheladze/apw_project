import { useState } from "react";
import { removeEmpty } from "helpers/removeEmpty";
import { idToName } from "helpers/idToName";
import { getAllServices } from "services/services";
import { filterArray } from "helpers/filterArray";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteServiceParameter,
  getServiceParameterTypes,
  getServiceParameters,
} from "services/serviceParameters";
import { getCategories } from "services/serviceCategories";
import { useSearchParams } from "react-router-dom";

const useServiceParameters = () => {
  const queryClient = useQueryClient();
  const [searchParam] = useSearchParams();
  const serviceID = searchParam.get("serviceID");

  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [filter, setFilter] = useState({});

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationFn: (id) => deleteServiceParameter(id),
    onSuccess: () => {
      queryClient.invalidateQueries("getServiceParameters");
      setAlert({
        message: "სერვისის პარამეტრი წარმატებით წაიშალა",
        type: "success",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const {
    data: serviceParametersData = [],
    isLoading: serviceParametersLoading,
  } = useQuery({
    queryKey: "getServiceParameters",
    queryFn: () => getServiceParameters().then((res) => res.data),
  });

  const { data: servicesData = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const {
    data: serviceParameterTypesData = [{}],
    isLoading: parameterTypesLoading,
  } = useQuery({
    queryKey: "getServiceParameterTypes",
    queryFn: () => getServiceParameterTypes().then((res) => res.data),
  });

  const { data: categoriesArr = [{}], isLoading: categoriesLoading } = useQuery(
    {
      queryKey: "getCategories",
      queryFn: () => getCategories().then((res) => res.data),
    }
  );

  const serviceParameters = serviceParametersData
    .map((parameter) => ({
      ...parameter,
      id: parameter.serviceParameterID,
      name: parameter.parameterName,
    }))
    .filter((sp) => +sp.serviceID === +serviceID);

  const categories = categoriesArr.map((category) => ({
    ...category,
    id: category.catID,
    name: category.categoryName,
  }));

  const services = servicesData.map((service) => ({
    ...service,
    id: service.serviceID,
  }));

  const service =
    services.find((service) => +service.serviceID === +serviceID) || {};

  const serviceParameterTypes = serviceParameterTypesData.map((spt) => ({
    ...spt,
    id: spt.serviceParameterTypeID,
    name: spt.parameterTypeName,
  }));

  const updatedList = filterArray(serviceParameters, removeEmpty(filter))?.map(
    (serParams) => {
      return {
        ...serParams,
        catID: idToName(categories, serParams.catID),
        parameterTypeID: idToName(
          serviceParameterTypes,
          serParams.parameterTypeID
        ),
        serviceID: idToName(services, serParams.serviceID),
      };
    }
  );

  const selectOptions = {
    catID: categories,
    // serviceID: services,
    parameterTypeID: serviceParameterTypes,
  };
  return {
    loading:
      serviceParametersLoading ||
      servicesLoading ||
      categoriesLoading ||
      parameterTypesLoading,
    deleteItem: { deleteMutate, deleteLoading },
    updatedList,
    alert,
    filter,
    setFilter,
    selectOptions,
    service,
  };
};

export default useServiceParameters;
