import ServiceCategories from "components/APPLICATIONS/billing/serviceCategories/ServiceCategories";
import ServiceCategoriesDetails from "components/APPLICATIONS/billing/serviceCategories/details/ServiceCategoriesDetails";
import ServiceCategoriesForm from "components/APPLICATIONS/billing/serviceCategories/serviceCategoriesForm/ServiceCategoriesForm";
import Transactions from "components/APPLICATIONS/billing/transactions/Transactions";
import TransactionDetails from "components/APPLICATIONS/billing/transactions/details/TransactionDetails";

export const routePermissions = [
  // transactions
  {
    route: "/billing/transactions",
    permission: "bil_transaction_all_get",
    element: <Transactions />,
  },
  {
    route: "/billing/transactions/details/:id",
    permission: "bil_transaction_id_get",
    element: <TransactionDetails />,
  },

  // service categories
  {
    route: "/billing/service-categories",
    permission: "bil_service_categories_all_get",
    element: <ServiceCategories />,
  },
  {
    route: "/billing/service-categories/:action",
    permission: "bil_service_categories_add_post",
    element: <ServiceCategoriesForm />,
  },
  {
    route: "/billing/service-categories/:action/:id?",
    permission: "bil_service_categories_id_put",
    element: <ServiceCategoriesForm />,
  },
  {
    route: "/billing/service-categories/details/:id",
    permission: "bil_service_categories_id_get",
    element: <ServiceCategoriesDetails />,
  },
];
