import ServiceCategories from "components/APPLICATIONS/billing/serviceCategories/ServiceCategories";
import ServiceCategoriesDetails from "components/APPLICATIONS/billing/serviceCategories/details/ServiceCategoriesDetails";
import ServiceCategoriesForm from "components/APPLICATIONS/billing/serviceCategories/serviceCategoriesForm/ServiceCategoriesForm";
import Transactions from "components/APPLICATIONS/billing/transactions/Transactions";
import TransactionDetails from "components/APPLICATIONS/billing/transactions/details/TransactionDetails";

export const routePermissions = [
  // transactions
  {
    route: "/billing/transactions",
    permission: "bil_transactions_get",
    element: <Transactions />,
  },
  {
    route: "/billing/transactions/details/:id",
    permission: "bil_payments_get_id",
    element: <TransactionDetails />,
  },
  // service categories
  {
    route: "/billing/service-categories",
    permission: "bil_categories_get",
    element: <ServiceCategories />,
  },
  {
    route: "/billing/service-categories/:action",
    permission: "bil_categories_post_add",
    element: <ServiceCategoriesForm />,
  },
  {
    route: "/billing/service-categories/:action/:id?",
    permission: "bil_categories_put_edit",
    element: <ServiceCategoriesForm />,
  },
  {
    route: "/billing/service-categories/details/:id",
    permission: "bil_categories_get_id",
    element: <ServiceCategoriesDetails />,
  },
];
