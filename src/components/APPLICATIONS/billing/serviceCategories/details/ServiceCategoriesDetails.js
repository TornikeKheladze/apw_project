import { Link, useParams } from "react-router-dom";
import { serviceCategoriesArr } from "../../formArrays/serviceArr";
import { getCategories, getCategoryById } from "services/serviceCategories";
import { useQuery } from "react-query";
import { idToName } from "helpers/idToName";
import ServiceCategoryTreeMenu from "../ServiceCategoryTreeMenu";
import LoadingSpinner from "components/icons/LoadingSpinner";
import { getOrganizations } from "services/organizations";

const ServiceCategoriesDetails = () => {
  const { id } = useParams();
  const { data: serviceCategory = {}, isLoading: categoryLoading } = useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: () => getCategoryById(id).then((res) => res.data),
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

  const buildTreeMenu = (categories, parentId = 0) => {
    return categories
      .filter((category) => category.parentID === parentId)
      .map((category) => ({
        ...category,
        children: buildTreeMenu(categories, category.catID),
      }));
  };

  const updatedData = {
    ...serviceCategory,
    parentID: idToName(
      categoriesArr.map((cat) => ({ ...cat, id: cat.catID })),
      serviceCategory.parentID
    ),
    ownerID: idToName(organizations, serviceCategory.ownerID),
    catType: serviceCategory.catType === 1 ? "სერვისების პაკეტი" : "კატალოგი",
  };

  const categoriesTree = buildTreeMenu(categoriesArr, +id);

  const isPaket = serviceCategory?.catType === 1 ? true : false;

  return (
    <main className="workspace">
      <div className="mb-3 flex justify-between items-center">
        <h2>
          კატალოგი: <br className="sm:hidden" /> {updatedData.categoryName}
        </h2>
        <Link
          to={`/billing/service-categories/edit/${id}`}
          className="btn btn_primary h-10"
        >
          ცვლილება
        </Link>
      </div>
      <div className="card p-5 mb-3">
        <h4 className="mb-3">ქვეკატალოგები</h4>
        {categoriesTree.length === 0 ? (
          <p>ქვეკატალოგი ვერ მოიძებნა</p>
        ) : (
          <ServiceCategoryTreeMenu categories={categoriesTree} />
        )}
      </div>
      {isPaket ? (
        <Link
          className="btn btn_primary mb-3 w-48"
          to={`/billing/services/create?categoryID=${id}`}
        >
          სერვისის დამატება
        </Link>
      ) : (
        <div className="flex w-full gap-2">
          <Link
            className="btn btn_primary mb-3"
            to={`/billing/service-categories/create?parentID=${id}&catType=0`}
          >
            კატალოგის დამატება
          </Link>
          <Link
            className="btn btn_primary mb-3"
            to={`/billing/service-categories/create?parentID=${id}&catType=1`}
          >
            სერვისების პაკეტის დამატება
          </Link>
        </div>
      )}
      <div className="card p-5 relative">
        <div className="flex justify-between items-center">
          <h4>კატალოგის დეტალები</h4>
        </div>
        {categoryLoading || categoriesLoading || orgLoading ? (
          <LoadingSpinner blur />
        ) : (
          <table className="table table_bordered w-full mt-3">
            <thead>
              <tr>
                <th className="ltr:text-left rtl:text-right uppercase">
                  პარამეტრის სახელი
                </th>
                <th className="ltr:text-left rtl:text-right uppercase">
                  პარამეტრის მნიშვნელობა
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceCategoriesArr.map((item, index) => (
                <tr key={index}>
                  <td>{item.label}</td>
                  <td>{updatedData[item.name]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default ServiceCategoriesDetails;
