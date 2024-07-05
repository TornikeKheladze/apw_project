import DetailComponent from "../../detailComponent/DetailComponent";
import { serviceArr } from "../../formArrays/serviceArr";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getServiceById } from "services/services";
import { idToName } from "helpers/idToName";
import { getCategories } from "services/serviceCategories";
import { getServiceParametersByServiceID } from "services/serviceParameters";
import { getOrganizations } from "services/organizations";

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

  const {
    data: serviceParameters = [{}],
    isLoading: serviceParametersLoading,
  } = useQuery({
    queryKey: ["getServiceParametersByServiceID", id],
    queryFn: () => getServiceParametersByServiceID(id).then((res) => res.data),
  });

  return (
    <DetailComponent
      links={
        <div className="card p-3 mb-3">
          <h4 className="mb-2">მახასიათებლები</h4>
          <div className="flex gap-2 flex-wrap">
            <Link
              to={`/billing/service-parameters?serviceID=${id}`}
              className="btn btn_primary btn_outlined p-1 text-xs"
            >
              სერვისის პარამეტრები
            </Link>
            <Link
              to={`/billing/service-prices?serviceID=${id}`}
              className="btn btn_primary btn_outlined p-1 text-xs"
            >
              სერვისის ფასები
            </Link>
            <Link
              to={`/billing/spec-prices?serviceID=${id}`}
              className="btn btn_primary btn_outlined p-1 text-xs"
            >
              სერვისის სპეც ფასები
            </Link>
            {/* 
            <Link
              to={`/billing/service-parameter-types?serviceID=${id}`}
              className="btn btn_primary btn_outlined p-1 text-xs"
            >
              პარამეტრის ტიპები
            </Link> */}
          </div>
        </div>
      }
      curl={
        <div className="card p-3 mt-3">
          <h4>სერვისის ჩაშენების ინსტრუქცია სერვისის მომხმარებლისთვის</h4>
          <p>--location 'http://localhost:8080/gateway/transaction'</p>
          <p>--header 'apiID: 4'</p>
          <p>--header 'Content-Type: application/json'</p>
          <p>--header 'Authorization: ••••••'</p>
          <p>--data '{"{"}</p>
          <p className="pl-3">"agentID": აგენტის ID,</p>
          <p className="pl-3">"serviceID": სერვისის ID,</p>
          <p className="pl-3">"agentOperationID": აგენტის ოპერაციის ID,</p>
          <p className="pl-3">"amount": რაოდენობა,</p>
          <p className="pl-3">"payerParameter": "გადამხდელის ინფო",</p>
          <p className="pl-3">"saleID": სეილის ID,</p>
          <p className="pl-3">"reseller": რესელერი,</p>
          {serviceParameters.map((s) => (
            <p key={s.parameterName + s.parameterPlaceholder} className="pl-3">
              "{s.parameterName}": {s.parameterPlaceholder},
            </p>
          ))}
          <p>{"}'"}</p>
        </div>
      }
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
        ownerID: idToName(organizations, service.ownerID),
        active: service.active === 1 ? "აქტიური" : "არააქტიური",
      }}
      loading={
        serviceLoading ||
        categoriesLoading ||
        orgLoading ||
        serviceParametersLoading
      }
    />
  );
};

export default ServiceDetails;
