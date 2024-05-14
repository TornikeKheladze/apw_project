import { useParams } from "react-router-dom";
import DetailComponent from "../../detailComponent/DetailComponent";
import { categoryProductionArr } from "../../formArrays/serviceArr";
import {
  getCategories,
  getCategoryProductionById,
} from "services/serviceCategories";
import { useQuery } from "react-query";
import { idToName } from "helpers/idToName";
import { getAllUsers } from "services/users";

const CategoryProductionDetails = () => {
  const { id } = useParams();
  const { data: categoryProduction = {}, isLoading: categoryLoading } =
    useQuery({
      queryKey: ["getCategoryProductionById", id],
      queryFn: () => getCategoryProductionById(id).then((res) => res.data),
    });

  const { data: categoriesArr = [{}], isLoading: categoriesLoading } = useQuery(
    {
      queryKey: "getCategories",
      queryFn: () => getCategories().then((res) => res.data),
      staleTime: Infinity,
    }
  );

  const { data: users = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

  return (
    <DetailComponent
      title="categoryProduction"
      staticArray={categoryProductionArr}
      updatedData={{
        ...categoryProduction,
        catID: idToName(
          categoriesArr.map((cat) => {
            return { ...cat, id: cat.catID };
          }),
          categoryProduction.catID
        ),
        agentID: idToName(
          users.map((user) => {
            return { ...user, id: user.user_id };
          }),
          categoryProduction.agentID
        ),
        status: idToName(
          [
            { id: 1, name: "აქტიური" },
            { id: 0, name: "არააქტიური" },
          ],
          categoryProduction.status
        ),
      }}
      loading={categoryLoading || categoriesLoading || usersLoading}
    />
  );
};

export default CategoryProductionDetails;
