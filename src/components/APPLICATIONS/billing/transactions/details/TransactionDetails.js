import { useParams } from "react-router-dom";
import DetailComponent from "../../detailComponent/DetailComponent";
import { transactionArr } from "../../formArrays/transactionArr";
import { useQuery } from "react-query";
import { getTransactionById } from "services/transactions";
import { getAllServices } from "services/services";
import { idToName } from "helpers/idToName";
import { getOrganizations } from "services/organizations";

const TransactionDetails = () => {
  const { id } = useParams();

  const { data: transaction = {}, isLoading: transactionLoading } = useQuery({
    queryKey: ["getTransactionById", id],
    queryFn: () => getTransactionById(id).then((res) => res.data),
  });

  const { data: services = [{}], isLoading: categoriesLoading } = useQuery({
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
      title="ტრანზაქციის"
      staticArray={transactionArr}
      updatedData={{
        ...transaction,
        serviceID: idToName(
          services.map((service) => {
            return { ...service, id: service.serviceID };
          }),
          transaction.serviceID
        ),
        ownerID: idToName(organizations, transaction.ownerID),
        agentID: idToName(organizations, transaction.agentID),
      }}
      loading={transactionLoading || categoriesLoading || orgLoading}
    />
  );
};

export default TransactionDetails;
