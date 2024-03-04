import { useState } from "react";

import { v4 as uuid } from "uuid";

import Footer from "partials/Footer";

import Breadcrumb, { BreadcrumbItem } from "components/Breadcrumb";
import Toasts from "components/Toasts";

const ComponentsToasts = () => {
  const [toastList, setToastList] = useState([
    {
      id: 1,
      title: "Toast Title",
      time: "just now",
      body: "See? Just like this.",
    },
    {
      id: 2,
      title: "Toast Title",
      time: "2 seconds ago",
      body: "Heads up, toast will stack automatically.",
    },
  ]);

  const newToast = {
    id: uuid(),
    title: "Toast Title",
    time: "just now",
    body: "See? Just like this.",
  };

  const showNewToast = () => {
    setToastList([...toastList, newToast]);
  };

  return (
    <main className="workspace">
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <Breadcrumb title="Toasts">
          <BreadcrumbItem link="#no-link">UI</BreadcrumbItem>
          <BreadcrumbItem link="#no-link">Components</BreadcrumbItem>
          <BreadcrumbItem>Toasts</BreadcrumbItem>
        </Breadcrumb>
      </section>

      <div>
        <button className="btn btn_primary uppercase" onClick={showNewToast}>
          Show Toast
        </button>
      </div>

      <Toasts toastList={toastList} />

      <Footer />
    </main>
  );
};

export default ComponentsToasts;
