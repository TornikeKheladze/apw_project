import LoadingSpinner from "components/icons/LoadingSpinner";
import { useQuery } from "react-query";
import { getInvoices } from "services/billingPackages";
import Table from "../table/Table";

const Invoices = () => {
  const { data: invoiceData = {}, isLoading: loading } = useQuery({
    queryKey: "getInvoices",
    queryFn: () => getInvoices().then((res) => res.data),
  });

  console.log(invoiceData);

  const invoiceArr = [
    {
      name: "invoiceNumber",
      label: "ინვოისის ნომერი",
    },
    {
      name: "invoiceStatus",
      label: "ინვოისის სტატუსი",
    },
    {
      name: "createdAt",
      label: "ინვოისის შექმნის თარიღი",
    },
  ];
  return (
    <main className="workspace">
      {loading ? (
        <LoadingSpinner blur />
      ) : (
        <Table
          //   filter={{ filter, setFilter }}
          //   searchSubmit={filterHandler}
          staticArr={invoiceArr}
          fetchedArr={[]}
          //   optionsObj={searchOptions}
          //   actions={{ details: true }}
        />
      )}
    </main>
  );
};

export default Invoices;
