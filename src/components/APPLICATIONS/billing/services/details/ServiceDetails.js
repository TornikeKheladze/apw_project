import DetailComponent from "../../detailComponent/DetailComponent";
import { serviceArr } from "../../formArrays/serviceArr";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getServiceById } from "services/services";
import { idToName } from "helpers/idToName";
import { getCategories } from "services/serviceCategories";
import { getAllUsers } from "services/users";

const ServiceDetails = () => {
  const { id } = useParams();

  const { data: service = {}, isLoading: serviceLoading } = useQuery({
    queryKey: ["getServiceById", id],
    queryFn: () => getServiceById(id).then((res) => res.data),
  });

  const { data: categories = [{}], isLoading: categoriesLoading } = useQuery({
    queryKey: "getCategories",
    queryFn: () => getCategories().then((res) => res.data),
  });
  const { data: users = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  return (
    <DetailComponent
      title="სერვისების"
      staticArray={serviceArr}
      updatedData={{
        ...service,
        categoryID: idToName(
          categories.map((cat) => {
            return { ...cat, id: cat.catID };
          }),
          service.categoryID
        ),
        ownerID: idToName(users, service.ownerID),
      }}
      loading={serviceLoading || categoriesLoading || usersLoading}
    />
  );
};

export default ServiceDetails;
