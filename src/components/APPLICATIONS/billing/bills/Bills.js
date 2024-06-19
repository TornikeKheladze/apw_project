import CustomDropdown from "components/APPLICATIONS/authorization/users/userForm/formDropdown/CustomDropdown";
import Alert from "components/Alert";
import Button from "components/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "components/Modal";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import {
  createInvoice,
  createInvoiceDetails,
  getBillingPackages,
} from "services/billingPackages";
import { generateDocument, getAmountByWord } from "services/documents";
import { getOrganizations } from "services/organizations";
import { getSales } from "services/sales";
import { getPrices } from "services/servicePrices";
import { getAllServices } from "services/services";
import { getTransactionSumAmount } from "services/transactions";
import { getAllUsers } from "services/users";

const Bills = () => {
  const { authorizedUser } = useSelector((store) => store.user);
  const [alert, setAlert] = useState({ message: "", type: "success" });
  const [isOpen, setIsOpen] = useState(false);
  const [chosenPackage, setChosenPackage] = useState({});
  // const [invocieID, setInvoiceID] = useState();

  const [documentData, setDocumentData] = useState({});

  const { data = [], isLoading } = useQuery({
    queryKey: ["getTransactionSumAmount", authorizedUser.oid],
    queryFn: () =>
      getTransactionSumAmount(authorizedUser.oid).then((res) => res.data),
    enabled: !!authorizedUser.oid,
  });

  const { data: organizations = [{}], isLoading: orgLoading } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data.data),
  });

  const { data: pricesData = [], isLoading: pricesLoading } = useQuery({
    queryKey: "getPrices",
    queryFn: () => getPrices().then((res) => res.data),
  });

  const { data: servicesData = [{}] } = useQuery({
    queryKey: "getAllServices",
    queryFn: () => getAllServices().then((res) => res.data),
  });

  const { data: users = [] } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  const {
    mutate: invoiceDetailsMutate,
    isLoading: detailsLoading,
    isSuccess: invoiceSuccess,
  } = useMutation({
    mutationFn: createInvoiceDetails,
    onSuccess: (res) => {
      // setInvoiceID(res.data.invoiceID);
      setAlert({
        message: "ინვოისის წარმატებით დაემატა",
        type: "success",
      });
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

      const invoiceDetailData = {
        invoiceID: response.data.invoiceID,
        amount: pricesData.find(
          (item) => item.serviceID === sumAmountData?.serviceID
        )?.price,
        transactionQuantity: sumAmountData?.countTransaction,
        totalAmount: sumAmountData?.sumTransaction,
        unit: "SERVICE",
        serviceID: sumAmountData?.serviceID,
      };
      setDocumentData({ ...response.data, ...invoiceDetailData });

      invoiceDetailsMutate(invoiceDetailData);
    },
  });

  const { mutate: generateMutate, isLoading: generateLoading } = useMutation({
    mutationFn: generateDocument,
    onSuccess: () => {
      setAlert({
        type: "success",
        message: "დოკუმენტი წარმატებით დაემატა",
      });
      setTimeout(() => {
        setAlert({ message: "", type: "success" });
      }, 2500);
    },
    onError: (error) => {
      setAlert({
        type: "danger",
        message: "დოკუმენტის შექმნა ვერ მოხერხდა",
      });
    },
  });

  const { data: packagesData = [{}], isLoading: packageLoading } = useQuery({
    queryKey: "getBillingPackages",
    queryFn: () => getBillingPackages().then((res) => res.data),
  });

  const packages = packagesData.map((p) => ({
    ...p,
    id: p.packageID,
    name: `ფასი:${p.price}, რაოდენობა:${p.quantity}`,
  }));

  const { data: salesData = [] } = useQuery({
    queryKey: "getSales",
    queryFn: () => getSales().then((res) => res.data),
  });

  const generate = async () => {
    const agentOrg =
      organizations.find((item) => item.id === documentData.agentID) || {};
    const ownerOrg =
      organizations.find((item) => item.id === documentData.ownerID) || {};
    const service =
      servicesData.find((item) => item.serviceID === documentData.serviceID) ||
      {};
    const sale =
      salesData.find((item) => item.serviceID === documentData.serviceID) || {};
    const signaturePerson =
      users.find(
        (item) => item.oid === documentData.ownerID && item.signature === 1
      ) || {};
    const price =
      pricesData.find((item) => item.serviceID === documentData.serviceID) ||
      {};
    const amountByWodrd = getAmountByWord(
      documentData.sumTransaction - sale.fixed || 0
    );

    const invoice = {
      // Invoice
      invoiceNumber: documentData.invoiceNumber,
      invoiceCreateDate: documentData.createdAt,
      invoiceDateExpiration: documentData.dateExpiration,
      // Agent
      organizationName: agentOrg.name,
      legalPersonAddress: agentOrg.address,
      organizationIdNumber: agentOrg.id,
      legalPersonPhoneNumber: agentOrg.phoneNumber, // ორგანიზაციას არააქვს
      legalPersonEmail: agentOrg.email,
      // Specific Service
      product: service.name,
      unit: documentData.unit,
      quantity: documentData.countTransaction,
      price: price.price,
      sumPrice: documentData.sumTransaction,
      // Total Invoice
      totalPrice: documentData.totalAmount,
      commission: 0,
      sale: sale.fixed,
      finalPrice: documentData.sumTransaction - sale.fixed,
      // Owner
      ownerOrganizationName: ownerOrg.name,
      ownerOrganizationIdNumber: ownerOrg.id,
      ownerAddress: ownerOrg.address,
      ownerIban: ownerOrg.bank_account_number,
      ownerSwift: ownerOrg.bank_number,
      ownerPhoneNumber: ownerOrg.phoneNumber,
      ownerEmail: ownerOrg.email,

      // Invoice
      amountByWord: amountByWodrd, // Amount in words
      signaturePerson: signaturePerson.name,
      status: documentData.invoiceStatus,
    };

    generateMutate(invoice);
  };

  const loading = isLoading || orgLoading || pricesLoading || packageLoading;
  return (
    <main className="workspace overflow-hidden pb-8 relative">
      <Alert dismissable message={alert.message} color={alert.type} />
      <Modal
        active={isOpen}
        centered
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalHeader>ინვოისის გენერირება</ModalHeader>
        <ModalBody>
          <CustomDropdown
            list={packages}
            active={chosenPackage}
            setActive={setChosenPackage}
            label={"აირჩიეთ პაკეტი"}
          />
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-between w-full">
            <Button color="danger" onClick={() => setIsOpen(false)}>
              გაუქმება
            </Button>
            <Button color="primary">დადასტურება</Button>
          </div>
        </ModalFooter>
      </Modal>
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
              {invoiceSuccess && (
                <Button
                  className="p-1 text-xs ml-2 min-w-20 text-center"
                  color="primary"
                  onClick={() => generate()}
                >
                  {generateLoading ? (
                    <LoadingSpinner />
                  ) : (
                    "დოკუმენტის გენერირება"
                  )}
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Bills;
