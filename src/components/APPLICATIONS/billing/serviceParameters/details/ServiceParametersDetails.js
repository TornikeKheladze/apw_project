import { useParams } from "react-router-dom";
import DetailComponent from "../../detailComponent/DetailComponent";
import { serviceParametersArr } from "../../formArrays/serviceArr";
import { useQuery } from "react-query";
import {
  getServiceParameterById,
  getServiceParameterTypes,
} from "services/serviceParameters";
import { idToName } from "helpers/idToName";
import { getAllServices } from "services/services";
import { getCategories } from "services/serviceCategories";

const ServiceParametersDetails = () => {
  const { id } = useParams();

  const { data: serviceParameters = {}, isLoading: serviceParametersLoading } =
    useQuery({
      queryKey: ["getServiceParameterById", id],
      queryFn: () => getServiceParameterById(id).then((res) => res.data),
    });

  const { data: services = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const { data: parameterTypes = [{}], isLoading: parameterTypesLoading } =
    useQuery({
      queryKey: "getServiceParameterTypes",
      queryFn: () => getServiceParameterTypes().then((res) => res.data),
    });

  const { data: categories = [{}], isLoading: categoriesLoading } = useQuery({
    queryKey: "getCategories",
    queryFn: () => getCategories().then((res) => res.data),
  });

  return (
    <DetailComponent
      title="სერვისების პარამეტრების"
      staticArray={serviceParametersArr}
      updatedData={{
        ...serviceParameters,
        catID: idToName(
          categories.map((c) => {
            return { ...c, id: c.catID, name: c.categoryName };
          }),
          serviceParameters.catID
        ),
        parameterTypeID: idToName(
          parameterTypes.map((p) => {
            return {
              ...p,
              id: p.serviceParameterTypeID,
              name: p.parameterTypeName,
            };
          }),
          serviceParameters.parameterTypeID
        ),
        serviceID: idToName(
          services.map((s) => {
            return { ...s, id: s.serviceID };
          }),
          serviceParameters.serviceID
        ),
      }}
      loading={
        serviceParametersLoading ||
        servicesLoading ||
        parameterTypesLoading ||
        categoriesLoading
      }
    />
  );
};

export default ServiceParametersDetails;
