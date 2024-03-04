import Breadcrumb, { BreadcrumbItem } from "components/Breadcrumb";
import { useLocation, useParams } from "react-router-dom";

const Paths = ({ users = [], departments = [] }) => {
  const { oid, did } = useParams();
  const { pathname } = useLocation();
  const toDepartments = oid ? `/departments/${oid}` : "#no-link";

  let toReturn = <></>;

  if (pathname.includes("users") && pathname.includes("positions")) {
    const orgId = users.length && users[0] && users[0].oid;
    const depId = users.length && users[0] && users[0].did;
    toReturn = (
      <section
        id="positions_breadcrumb"
        className="breadcrumb lg:flex items-start"
      >
        <Breadcrumb>
          <BreadcrumbItem link="/organizations">ორგანიზაციები</BreadcrumbItem>
          {orgId && (
            <BreadcrumbItem link={`/departments/${orgId}`}>
              დეპარტამენტები
            </BreadcrumbItem>
          )}
          {depId && (
            <BreadcrumbItem link={`/positions/${orgId}/${depId}`}>
              პოზიციები
            </BreadcrumbItem>
          )}
          <BreadcrumbItem link="#no-link">მომხმარებლები</BreadcrumbItem>
        </Breadcrumb>
      </section>
    );
  }

  if (pathname.includes("departments")) {
    toReturn = (
      <section
        id="positions_breadcrumb"
        className="breadcrumb lg:flex items-start"
      >
        <Breadcrumb>
          <BreadcrumbItem link="/organizations">ორგანიზაციები</BreadcrumbItem>
          <BreadcrumbItem link={toDepartments}>დეპარტამენტები</BreadcrumbItem>
        </Breadcrumb>
      </section>
    );
  }

  if (pathname.includes("users") && pathname.includes("organisation")) {
    const orgId = users.length && users[0] && users[0].oid;
    toReturn = (
      <section
        id="positions_breadcrumb"
        className="breadcrumb lg:flex items-start"
      >
        <Breadcrumb>
          <BreadcrumbItem link="/organizations">ორგანიზაციები</BreadcrumbItem>
          {orgId && (
            <BreadcrumbItem link={`/departments/${orgId}`}>
              დეპარტამენტები
            </BreadcrumbItem>
          )}
          <BreadcrumbItem link="#no-link">მომხმარებლები</BreadcrumbItem>
        </Breadcrumb>
      </section>
    );
  }

  if (pathname.includes("users") && pathname.includes("departments")) {
    const orgId = users.length && users[0] && users[0].oid;
    toReturn = (
      <section
        id="positions_breadcrumb"
        className="breadcrumb lg:flex items-start"
      >
        <Breadcrumb>
          <BreadcrumbItem link="/organizations">ორგანიზაციები</BreadcrumbItem>
          {orgId && (
            <BreadcrumbItem link={`/departments/${orgId}`}>
              დეპარტამენტები
            </BreadcrumbItem>
          )}
          <BreadcrumbItem link="#no-link">მომხმარებლები</BreadcrumbItem>
        </Breadcrumb>
      </section>
    );
  }

  if (pathname.includes("positions") && !pathname.includes("users")) {
    toReturn = (
      <section className="breadcrumb lg:flex items-start">
        <Breadcrumb>
          <BreadcrumbItem link="/organizations">ორგანიზაციები</BreadcrumbItem>
          <BreadcrumbItem link={toDepartments}>დეპარტამენტები</BreadcrumbItem>
          <BreadcrumbItem link="#no-link">პოზიციები</BreadcrumbItem>
        </Breadcrumb>
      </section>
    );
  }

  if (pathname.includes("user/create")) {
    toReturn = (
      <section className="breadcrumb lg:flex items-start">
        <Breadcrumb>
          <BreadcrumbItem link="/organizations">ორგანიზაციები</BreadcrumbItem>
          <BreadcrumbItem link={toDepartments}>დეპარტამენტები</BreadcrumbItem>
          <BreadcrumbItem link="#no-link">პოზიციები</BreadcrumbItem>
        </Breadcrumb>
      </section>
    );
  }

  if (pathname.includes("department") && oid && did) {
    const title = departments?.find((deps) => deps.id === +did);
    toReturn = (
      <section className="breadcrumb lg:flex items-start">
        <Breadcrumb>
          <BreadcrumbItem link="/organizations">ორგანიზაციები</BreadcrumbItem>
          <BreadcrumbItem link={toDepartments}>დეპარტამენტები</BreadcrumbItem>
          <BreadcrumbItem link="#no-link">
            {title && title.department_name}
          </BreadcrumbItem>
        </Breadcrumb>
      </section>
    );
  }

  return toReturn;
};

export default Paths;
