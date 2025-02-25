import ApiCredentials from "components/APPLICATIONS/billing/apiCredentials/ApiCredentials";
import ApiCredentialsForm from "components/APPLICATIONS/billing/apiCredentials/apiCredentialsForm/ApiCredentialsForm";
import BillingPackages from "components/APPLICATIONS/billing/billingPackages/BillingPackages";
import BillingPackagesForm from "components/APPLICATIONS/billing/billingPackages/billingPackagesForm/BillingPackagesForm";
import Bills from "components/APPLICATIONS/billing/bills/Bills";
import CategoryProduction from "components/APPLICATIONS/billing/categoryProduction/CategoryProduction";
import CategoryProductionForm from "components/APPLICATIONS/billing/categoryProduction/categoryProductionForm/CategoryProductionForm";
import CategoryProductionDetails from "components/APPLICATIONS/billing/categoryProduction/details/CategoryProductionDetails";
import Charges from "components/APPLICATIONS/billing/charges/Charges";
import ChargesForm from "components/APPLICATIONS/billing/charges/chargesForm/ChargesForm";
import PackageProductions from "components/APPLICATIONS/billing/packageProduction/PackageProductions";
import PackageProductionForm from "components/APPLICATIONS/billing/packageProduction/packageProductionForm/PackageProductionForm";
import Sales from "components/APPLICATIONS/billing/sales/Sales";
import SalesForm from "components/APPLICATIONS/billing/sales/salesForm/SalesForm";
import ServiceCategories from "components/APPLICATIONS/billing/serviceCategories/ServiceCategories";
import ServiceCategoriesDetails from "components/APPLICATIONS/billing/serviceCategories/details/ServiceCategoriesDetails";
import ServiceCategoriesForm from "components/APPLICATIONS/billing/serviceCategories/serviceCategoriesForm/ServiceCategoriesForm";
import ServiceProductions from "components/APPLICATIONS/billing/serviceProductions/ServiceProductions";
import ServiceProductionDetails from "components/APPLICATIONS/billing/serviceProductions/details/ServiceProductionDetails";
import ServiceProductionForm from "components/APPLICATIONS/billing/serviceProductions/serviceProductionForm/ServiceProductionForm";
import Services from "components/APPLICATIONS/billing/services/Services";
import ServiceDetails from "components/APPLICATIONS/billing/services/details/ServiceDetails";
import ServicesForm from "components/APPLICATIONS/billing/services/servicesForm/ServicesForm";
import MonthlyStatistic from "components/APPLICATIONS/billing/statistic/MonthlyStatistic";
import Statistic from "components/APPLICATIONS/billing/statistic/Statistic";
import Transactions from "components/APPLICATIONS/billing/transactions/Transactions";
import TransactionDetails from "components/APPLICATIONS/billing/transactions/details/TransactionDetails";
import MakeTransaction from "components/APPLICATIONS/billing/transactions/makeTransactions/MakeTransaction";
import TransactionByCat from "components/APPLICATIONS/billing/transactions/makeTransactions/TransactionByCat";
import DocCatalogs from "components/APPLICATIONS/documents/docCatalogs/DocCatalogs";
import DocCategoryDetails from "components/APPLICATIONS/documents/docCatalogs/DocCategoryDetails";
import DocumentEdit from "components/APPLICATIONS/documents/documentEdit/DocumentEdit";
import Documents from "components/APPLICATIONS/documents/documents/Documents";
import TemplateColumns from "components/APPLICATIONS/documents/templateColumns/TemplateColumns";
import Templates from "components/APPLICATIONS/documents/templates/Templates";

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
  // SERVICES
  {
    route: "/billing/services",
    permission: "bil_services_get",
    element: <Services />,
  },
  {
    route: "/billing/services/:action",
    permission: "bil_services_post_add",
    element: <ServicesForm />,
  },
  {
    route: "/billing/services/:action/:id?",
    permission: "bil_services_put_edit",
    element: <ServicesForm />,
  },
  {
    route: "/billing/services/details/:id",
    permission: "bil_services_get_id",
    element: <ServiceDetails />,
  },
  //   SERVICE PRODUCTION
  {
    route: "/billing/service-productions",
    permission: "bil_service_production_get",
    element: <ServiceProductions />,
  },
  {
    route: "/billing/service-productions/:action",
    permission: "bil_service_production_post_add",
    element: <ServiceProductionForm />,
  },
  {
    route: "/billing/service-productions/:action/:id?",
    permission: "bil_service_production_put_edit",
    element: <ServiceProductionForm />,
  },
  {
    route: "/billing/service-productions/details/:id",
    permission: "bil_service_production_get_id",
    element: <ServiceProductionDetails />,
  },

  // CATEGORY PRODUCTION
  {
    route: "/billing/category-production",
    permission: "bil_category_production_get",
    element: <CategoryProduction />,
  },
  {
    route: "/billing/category-production/:action",
    permission: "bil_category_production_post_add",
    element: <CategoryProductionForm />,
  },
  {
    route: "/billing/category-production/:action/:id?",
    permission: "bil_category_production_put_edit",
    element: <CategoryProductionForm />,
  },
  {
    route: "/billing/category-production/details/:id",
    permission: "bil_category_production_get_id",
    element: <CategoryProductionDetails />,
  },

  // SERVICE CATEGORIES
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
  // CHARGES
  {
    route: "/billing/charges",
    permission: "dga_admin",
    element: <Charges />,
  },
  {
    route: "/billing/charges/:action/:id?",
    permission: "dga_admin",
    element: <ChargesForm />,
  },
  // API CREDENTIALS
  {
    route: "/billing/api-credentials",
    permission: "dga_admin",
    element: <ApiCredentials />,
  },
  {
    route: "/billing/api-credentials/:action/:id?",
    permission: "dga_admin",
    element: <ApiCredentialsForm />,
  },
  //   SALES
  {
    route: "/billing/sales",
    permission: "dga_admin",
    element: <Sales />,
  },
  {
    route: "/billing/sales/:action/:id?",
    permission: "dga_admin",
    element: <SalesForm />,
  },
  // BILLING PACKAGES
  {
    route: "/billing/packages",
    permission: "bil_packages_get",
    element: <BillingPackages />,
  },
  {
    route: "/billing/packages/:action",
    permission: "bil_packages_post_add",
    element: <BillingPackagesForm />,
  },
  {
    route: "/billing/packages/:action/:id?",
    permission: "bil_packages_put_edit",
    element: <BillingPackagesForm />,
  },
  // PACKAGE PRODUCTION
  {
    route: "/billing/package-production",
    permission: "bil_packages_production_get",
    element: <PackageProductions />,
  },
  {
    route: "/billing/package-production/:action",
    permission: "bil_packages_production_post_add",
    element: <PackageProductionForm />,
  },
  {
    route: "/billing/package-production/:action/:id?",
    permission: "bil_packages_production_put_edit",
    element: <PackageProductionForm />,
  },
  // STATISTICS
  {
    route: "/billing/statistic/:user",
    permission: "bil_statistic_get",
    element: <Statistic />,
  },
  {
    route: "/billing/statistic/monthly/:user",
    permission: "bil_monthly_statistic_get",
    element: <MonthlyStatistic />,
  },
  // MAKE TRANSACTIONS
  {
    route: "/billing/transactions/make-transaction",
    permission: "bil_payments_post",
    element: <MakeTransaction />,
  },
  {
    route: "/billing/transactions/make-transaction-by-cat",
    permission: "bil_payments_post",
    element: <TransactionByCat />,
  },
  // BILLS
  {
    route: "/billing/bills",
    permission: "bil_transactions_get_sum_amount",
    element: <Bills />,
  },
  // DOCUMENTSs
  {
    route: "/documents/documents",
    permission: "doc_documents_get",
    element: <Documents />,
  },
  {
    route: "/documents/documents/edit/:id",
    permission: "doc_documents_get",
    element: <DocumentEdit />,
  },
  // DOC CATEGORIES
  {
    route: "/documents/categories",
    permission: "doc_catalog_get",
    element: <DocCatalogs />,
  },
  {
    route: "/documents/categories/:id",
    permission: "doc_catalog_get",
    element: <DocCategoryDetails />,
  },
  // TEMPLATES
  {
    route: "/documents/templates",
    permission: "doc_templates_get",
    element: <Templates />,
  },
  // TEMPLATE COLUMNS
  {
    route: "/documents/templateColumns/:id",
    permission: "doc_template_columns_get",
    element: <TemplateColumns />,
  },
];
