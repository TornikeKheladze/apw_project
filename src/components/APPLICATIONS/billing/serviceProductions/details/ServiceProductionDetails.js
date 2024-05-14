import DetailComponent from "../../detailComponent/DetailComponent";
import { serviceProductionArr } from "../../formArrays/serviceArr";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllServices } from "services/services";
import { idToName } from "helpers/idToName";
import { getAllUsers } from "services/users";
import { getServiceProductionById } from "services/serviceProduction";

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

  const { data: users = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  return (
    <DetailComponent
      title="service productions"
      staticArray={serviceProductionArr}
      updatedData={{
        ...serviceProduction,
        serviceID: idToName(
          services.map((s) => ({ ...s, id: s.serviceID })),
          serviceProduction.serviceID
        ),
        ownerID: idToName(
          users.map((user) => ({ ...user, id: user.user_id })),
          serviceProduction.ownerID
        ),
        agentID: idToName(
          users.map((user) => ({ ...user, id: user.user_id })),
          serviceProduction.agentID
        ),
      }}
      loading={serviceProductionLoading || servicesLoading || usersLoading}
    />
  );
};

export default ServiceProductionDetails;
