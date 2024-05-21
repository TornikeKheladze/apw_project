import { useParams } from "react-router-dom";
import DetailComponent from "../../detailComponent/DetailComponent";
import { transactionArr } from "../../formArrays/transactionArr";
import { useQuery } from "react-query";
import { getTransactionById } from "services/transactions";
import { getAllUsers } from "services/users";
import { getAllServices } from "services/services";
import { idToName } from "helpers/idToName";

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
  const { data: users = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

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
        ownerID: idToName(users, transaction.ownerID),
        agentID: idToName(users, transaction.agentID),
      }}
      loading={transactionLoading || categoriesLoading || usersLoading}
    />
  );
};

export default TransactionDetails;
