import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getTransactionSumAmount } from "services/transactions";

const Bills = () => {
  const { authorizedUser } = useSelector((store) => store.user);

  const { data } = useQuery({
    queryFn: () => getTransactionSumAmount(authorizedUser.id),
  });

  console.log(data);
  return (
    <main className="workspace overflow-hidden pb-8 relative">
      <div className="card p-5"></div>
    </main>
  );
};

export default Bills;
