import { useParams } from "react-router-dom";
import DetailComponent from "../../detailComponent/DetailComponent";
import { categoryProductionArr } from "../../formArrays/serviceArr";
import {
  getCategories,
  getCategoryProductionById,
} from "services/serviceCategories";
import { useQuery } from "react-query";
import { idToName } from "helpers/idToName";
import { getOrganizations } from "services/organizations";

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

  const {
    data: organizationData = { data: [], member: null, dga: [] },
    isLoading: orgLoading,
  } = useQuery({
    queryKey: "organizations",
    queryFn: () => getOrganizations().then((res) => res.data),
  });

  const organizations = organizationData.member
    ? [...organizationData.member, ...organizationData.data]
    : organizationData.data || [];
  return (
    <DetailComponent
      title="კარეგორიის მიწოდების"
      staticArray={categoryProductionArr}
      updatedData={{
        ...categoryProduction,
        catID: idToName(
          categoriesArr.map((cat) => {
            return { ...cat, id: cat.catID };
          }),
          categoryProduction.catID
        ),
        agentID: idToName(organizations, categoryProduction.agentID),
        status: idToName(
          [
            { id: 1, name: "აქტიური" },
            { id: 0, name: "არააქტიური" },
          ],
          categoryProduction.status
        ),
      }}
      loading={categoryLoading || categoriesLoading || orgLoading}
    />
  );
};

export default CategoryProductionDetails;
