import BalanceHistory from "components/APPLICATIONS/billing/balance/balanceHistory/BalanceHistory";
import Currency from "components/APPLICATIONS/billing/currency/Currency";
import CurrencyForm from "components/APPLICATIONS/billing/currency/currencyForm/CurrencyForm";
import Customers from "components/APPLICATIONS/billing/customers/Customers";
import CustomersForm from "components/APPLICATIONS/billing/customers/customersForm/CustomersForm";
import CustomersDetails from "components/APPLICATIONS/billing/customers/details/CustomerDetails";
import LegalForms from "components/APPLICATIONS/billing/legalForms/LegalForms";
import LegalFormsForm from "components/APPLICATIONS/billing/legalForms/legalFormForms/LegalFormsForm";
import ReturnedTransactions from "components/APPLICATIONS/billing/returnedTransactions/ReturnedTransactions";
import ServiceCategories from "components/APPLICATIONS/billing/serviceCategories/ServiceCategories";
import ServiceCategoriesDetails from "components/APPLICATIONS/billing/serviceCategories/details/ServiceCategoriesDetails";
import ServiceCategoriesForm from "components/APPLICATIONS/billing/serviceCategories/serviceCategoriesForm/ServiceCategoriesForm";
import ServiceProduction from "components/APPLICATIONS/billing/serviceProduction/ServiceProduction";
import ServiceProductionDetails from "components/APPLICATIONS/billing/serviceProduction/details/ServiceProductionDetails";
import ServiceProductionForm from "components/APPLICATIONS/billing/serviceProduction/serviceProductionForm/ServiceProductionForm";
import Services from "components/APPLICATIONS/billing/services/Services";
import ServiceDetails from "components/APPLICATIONS/billing/services/details/ServiceDetails";
import ServicesForm from "components/APPLICATIONS/billing/services/servicesForm/ServicesForm";
import Transactions from "components/APPLICATIONS/billing/transactions/Transactions";
import TransactionDetails from "components/APPLICATIONS/billing/transactions/details/TransactionDetails";
import TransactionsForm from "components/APPLICATIONS/billing/transactions/transactionsForm/TransactionsForm";

export const routePermissions = [
  // transactions
  {
    route: "/billing/transactions",
    permission: "bil_transaction_all_get",
    element: <Transactions />,
  },
  {
    route: "/billing/transactions/returned",
    permission: "bil_transaction_all_get",
    element: <ReturnedTransactions />,
  },
  {
    route: "/billing/transactions/:action/:id",
    permission: "bil_transaction_id_put",
    element: <TransactionsForm />,
  },
  {
    route: "/billing/transactions/:action",
    permission: "bil_transaction_add_post",
    element: <TransactionsForm />,
  },
  {
    route: "/billing/transactions/details/:id",
    permission: "bil_transaction_id_get",
    element: <TransactionDetails />,
  },
  // customers
  {
    route: "/billing/customers",
    permission: "bil_customers_all_get",
    element: <Customers />,
  },
  {
    route: "/billing/customers/:action",
    permission: "bil_customers_add_post",
    element: <CustomersForm />,
  },
  {
    route: "/billing/customers/:action/:id",
    permission: "bil_customers_id_put",
    element: <CustomersForm />,
  },
  {
    route: "/billing/customers/details/:id",
    permission: "bil_customers_id_get",
    element: <CustomersDetails />,
  },
  // services
  {
    route: "/billing/services",
    permission: "bil_services_all_get",
    element: <Services />,
  },
  {
    route: "/billing/services/:action",
    permission: "bil_services_add_post",
    element: <ServicesForm />,
  },
  {
    route: "/billing/services/:action/:id",
    permission: "bil_services_id_put",
    element: <ServicesForm />,
  },
  {
    route: "/billing/services/details/:id",
    permission: "bil_services_id_get",
    element: <ServiceDetails />,
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
  // service production
  {
    route: "/billing/service-production",
    permission: "bil_service_production_all_get",
    element: <ServiceProduction />,
  },
  {
    route: "/billing/service-production/:action",
    permission: "bil_service_production_add_post",
    element: <ServiceProductionForm />,
  },
  {
    route: "/billing/service-production/:action/:id",
    permission: "bil_service_production_id_put",
    element: <ServiceProductionForm />,
  },
  {
    route: "/billing/service-production/details/:id",
    permission: "bil_service_production_id_get",
    element: <ServiceProductionDetails />,
  },
  // currencies
  {
    route: "/billing/currency",
    permission: "bil_currency_all_get",
    element: <Currency />,
  },
  {
    route: "/billing/currency/:action/:id",
    permission: "bil_currency_id_put",
    element: <CurrencyForm />,
  },
  {
    route: "/billing/currency/:action",
    permission: "bil_currency_add_post",
    element: <CurrencyForm />,
  },
  // balance history
  {
    route: "/billing/balance-history",
    permission: "bil_balance_history_all_get",
    element: <BalanceHistory />,
  },
  {
    route: "/billing/balance-history/:customerId?",
    permission: "bil_balance_history_all_get",
    element: <BalanceHistory />,
  },
  // legal forms
  {
    route: "/billing/legalForm",
    permission: "bil_legal_form_all_get",
    element: <LegalForms />,
  },
  {
    route: "/billing/legalForm/:action",
    permission: "bil_legal_form_add_post",
    element: <LegalFormsForm />,
  },
  {
    route: "/billing/legalForm/:action/:id",
    permission: "bil_legal_form_id_put",
    element: <LegalFormsForm />,
  },
];
