import DetailComponent from "../../detailComponent/DetailComponent";
import { serviceProductionsArr } from "../../formArrays/formArrays";
import useServiceProductionDetails from "./useServiceProductionDetails";

const ServiceProductionDetails = () => {
  const { updatedServiceProduction, loading } = useServiceProductionDetails();
  return (
    <DetailComponent
      title="სერვისების ფროდაქშენის"
      staticArray={serviceProductionsArr}
      updatedData={updatedServiceProduction}
      loading={loading}
    />
  );
};

export default ServiceProductionDetails;
