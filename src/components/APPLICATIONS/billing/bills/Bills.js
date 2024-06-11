import Button from "components/Button";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getTransactionSumAmount } from "services/transactions";
import { getAllUsers } from "services/users";

const Bills = () => {
  const { authorizedUser } = useSelector((store) => store.user);

  const { data = [], isLoading } = useQuery({
    queryKey: ["getTransactionSumAmount", authorizedUser.id],
    queryFn: () =>
      getTransactionSumAmount(authorizedUser.id).then((res) => res.data),
  });

  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  const loading = isLoading || isUsersLoading;
  return (
    <main className="workspace overflow-hidden pb-8 relative">
      <div className="card p-5">
        <h4>დავალიანება</h4>
        {loading ? (
          <LoadingSpinner blur />
        ) : !loading && data.length === 0 ? (
          <div>დავალიანება ვერ მოიძებნა</div>
        ) : (
          data.map((item) => (
            <div key={item.sumTransaction + item.ownerID}>
              <span>{authorizedUser.name}-ს აქვს</span>
              <span>დავალიანება {item?.sumTransaction}.</span>
              <span>
                {" "}
                {users.find((user) => user.id === item?.ownerID)?.name ||
                  item?.ownerID}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="card p-5 mt-3">
        <Button>ანგარიშსწორება</Button>
      </div>
    </main>
  );
};

export default Bills;
