import Button from "components/Button";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { createInvoice } from "services/billingPackages";
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

  const { mutate: invoiceMutate, isLoading: invoiceLoading } = useMutation({
    mutationFn: createInvoice,
    onSuccess: (response) => {
      console.log(response);
    },
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
              <span>
                {users.find((user) => user.id === item?.agentID)?.name ||
                  item?.agentID}
                -ს აქვს
              </span>
              <span>
                {" "}
                {users.find((user) => user.id === item?.ownerID)?.name ||
                  item?.ownerID}
                -ს{" "}
              </span>
              <span>ვალი {item?.sumTransaction}</span>
              <Button
                onClick={() =>
                  invoiceMutate({
                    agentID: item?.agentID,
                    ownerID: item?.ownerID,
                  })
                }
                className="p-1 text-xs ml-2 min-w-20 text-center"
              >
                {invoiceLoading ? <LoadingSpinner /> : "ანგარიშსწორება"}
              </Button>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Bills;
