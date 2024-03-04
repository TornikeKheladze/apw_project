import DetailComponent from "../../detailComponent/DetailComponent";
import { serviceCategoriesArrr } from "../../formArrays/formArrays";
import useServiceCategoriesDetails from "./useServiceCategoriesDetails";

const ServiceCategoriesDetails = () => {
  const { serviceCategory, loading } = useServiceCategoriesDetails();

  return (
    <DetailComponent
      title="სერვისების"
      staticArray={serviceCategoriesArrr}
      updatedData={serviceCategory}
      loading={loading}
    />
  );
};

export default ServiceCategoriesDetails;
