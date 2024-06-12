import { Link, useParams } from "react-router-dom";
import { serviceCategoriesArr } from "../../formArrays/serviceArr";
import { getCategories, getCategoryById } from "services/serviceCategories";
import { useQuery } from "react-query";
import { idToName } from "helpers/idToName";
import { getAllUsers } from "services/users";
import ServiceCategoryTreeMenu from "../ServiceCategoryTreeMenu";
import LoadingSpinner from "components/icons/LoadingSpinner";

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

  const { data: users = [{}], isLoading: usersLoading } = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllUsers().then((res) => res?.data?.users),
  });

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
    ownerID: idToName(users, serviceCategory.ownerID),
  };

  const categoriesTree = buildTreeMenu(categoriesArr, +id);

  return (
    <main className="workspace">
      <div className="mb-3 flex justify-between items-center">
        <h2>
          კატეგორია: <br className="sm:hidden" /> {updatedData.categoryName}
        </h2>
        <Link
          to={`/billing/service-categories/edit/${id}`}
          className="btn btn_primary h-10"
        >
          ცვლილება
        </Link>
      </div>
      <div className="card p-5 mb-3">
        <h4 className="mb-3">ქვეკატეგორიები</h4>
        {categoriesTree.length === 0 ? (
          <p>ქვეკატეგორია ვერ მოიძებნა</p>
        ) : (
          <ServiceCategoryTreeMenu categories={categoriesTree} />
        )}
      </div>

      <Link
        className="btn btn_primary mb-3 w-48"
        to={`/billing/services/create?categoryID=${id}`}
      >
        სერვისის დამატება
      </Link>

      <div className="card p-5 relative">
        <div className="flex justify-between items-center">
          <h4>კატეგორიის დეტალები</h4>
        </div>
        {categoryLoading || categoriesLoading || usersLoading ? (
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
