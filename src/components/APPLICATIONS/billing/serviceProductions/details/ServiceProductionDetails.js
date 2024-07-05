import DetailComponent from "../../detailComponent/DetailComponent";
import { serviceProductionArr } from "../../formArrays/serviceArr";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllServices } from "services/services";
import { idToName } from "helpers/idToName";
import { getServiceProductionById } from "services/serviceProduction";
import { getOrganizations } from "services/organizations";

const ServiceProductionDetails = () => {
  const { id } = useParams();

  const { data: serviceProduction = {}, isLoading: serviceProductionLoading } =
    useQuery({
      queryKey: ["getServiceProductionById", id],
      queryFn: () => getServiceProductionById(id).then((res) => res.data),
    });

  const { data: services = [{}], isLoading: servicesLoading } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
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
  return (
    <DetailComponent
      title="სერვისის მიწოდების"
      staticArray={serviceProductionArr}
      updatedData={{
        ...serviceProduction,
        serviceID: idToName(
          services.map((s) => ({ ...s, id: s.serviceID })),
          serviceProduction.serviceID
        ),
        ownerID: idToName(organizations, serviceProduction.ownerID),
        agentID: idToName(organizations, serviceProduction.agentID),
      }}
      loading={serviceProductionLoading || servicesLoading || orgLoading}
    />
  );
};

export default ServiceProductionDetails;
