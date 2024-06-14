import Alert from "components/Alert";
import Button from "components/Button";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { createInvoice, createInvoiceDetails } from "services/billingPackages";
import { getOrganizations } from "services/organizations";
import { getPrices } from "services/servicePrices";
import { getTransactionSumAmount } from "services/transactions";

const Bills = () => {
  const { authorizedUser } = useSelector((store) => store.user);

  const { data = [], isLoading } = useQuery({
    queryKey: ["getTransactionSumAmount", authorizedUser.oid],
    queryFn: () =>
      getTransactionSumAmount(authorizedUser.oid).then((res) => res.data),
    enabled: !!authorizedUser.oid,
  });
  const [alert, setAlert] = useState({ message: "", type: "success" });

  const { data: organizations = [{}], isLoading: orgLoading } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });

  const { data: pricesData = [], isLoading: pricesLoading } = useQuery({
    queryKey: "getPrices",
    queryFn: () => getPrices().then((res) => res.data),
  });

  const { mutate: invoiceDetailsMutate, isLoading: detailsLoading } =
    useMutation({
      mutationFn: createInvoiceDetails,
      onSuccess: () => {
        setAlert({
          message: "ინვოისის დეტალები წარმატებით დაემატა",
          type: "success",
        });
        setTimeout(() => {
          setAlert({ message: "", type: "success" });
        }, 2500);
      },
    });

  const { mutate: invoiceMutate, isLoading: invoiceLoading } = useMutation({
    mutationFn: createInvoice,
    onSuccess: (response) => {
      const sumAmountData = data.find(
        (item) =>
          item.ownerID === response.data.ownerID &&
          item.agentID === response.data.agentID
      );
      if (!sumAmountData) return;

      invoiceDetailsMutate({
        invoiceID: response.data.invoiceID,
        amount: pricesData.find(
          (item) => item.serviceID === sumAmountData?.serviceID
        )?.price,
        transactionQuantity: sumAmountData?.countTransaction,
        totalAmount: sumAmountData?.sumTransaction,
        unit: "SERVICE",
        serviceID: sumAmountData?.serviceID,
      });

      setAlert({ message: "ინვოისი წარმატებით დაემატა", type: "success" });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
  });

  const loading = isLoading || orgLoading || pricesLoading;
  return (
    <main className="workspace overflow-hidden pb-8 relative">
      <Alert dismissable message={alert.message} color={alert.type} />
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
                {organizations.find((org) => org.id === item?.agentID)?.name ||
                  item?.agentID}
                -ს აქვს
              </span>
              <span>
                {" "}
                {organizations.find((org) => org.id === item?.ownerID)?.name ||
                  item?.ownerID}
                -ს{" "}
              </span>
              <span>ვალი {item?.sumTransaction}</span>
              <Button
                onClick={() => {
                  invoiceMutate({
                    agentID: item?.agentID,
                    ownerID: item?.ownerID,
                  });
                }}
                className="p-1 text-xs ml-2 min-w-20 text-center"
              >
                {invoiceLoading || detailsLoading ? (
                  <LoadingSpinner />
                ) : (
                  "ანგარიშსწორება"
                )}
              </Button>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Bills;
