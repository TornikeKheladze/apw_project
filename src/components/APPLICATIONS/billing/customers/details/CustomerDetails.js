import DetailComponent from "../../detailComponent/DetailComponent";
import { customers } from "../../formArrays/formArrays";
import { useCustomersDetails } from "./useCustomerDetails";

const CustomersDetails = () => {
  const { loading, updatedCustomer } = useCustomersDetails();

  return (
    <DetailComponent
      title="მომხმარებლის"
      staticArray={customers}
      updatedData={updatedCustomer}
      loading={loading}
    />
  );
};

export default CustomersDetails;
