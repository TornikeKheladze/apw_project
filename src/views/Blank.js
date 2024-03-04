import Footer from "partials/Footer";

import Breadcrumb, { BreadcrumbItem } from "components/Breadcrumb";

const Blank = () => {
  return (
    <main className="workspace">
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <Breadcrumb title="Blank Page">
          <BreadcrumbItem link="#no-link">Pages</BreadcrumbItem>
          <BreadcrumbItem>Blank Page</BreadcrumbItem>
        </Breadcrumb>
      </section>

      <Footer />
    </main>
  );
};

export default Blank;
