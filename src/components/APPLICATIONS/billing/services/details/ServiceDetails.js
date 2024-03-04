import DetailComponent from "../../detailComponent/DetailComponent";
import { servicesArr } from "../../formArrays/formArrays";
import { useServiceDetails } from "./useServiceDetails";

const ServiceDetails = () => {
  const { loading, updated } = useServiceDetails();

  return (
    <DetailComponent
      title="სერვისების"
      staticArray={servicesArr}
      updatedData={updated}
      loading={loading}
    />
  );
};

export default ServiceDetails;
