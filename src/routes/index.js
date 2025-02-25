import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayoutDefault from "layouts/Default";
import LayoutBlank from "layouts/Blank";

import Blank from "views/Blank";

import FormComponents from "views/FormComponents";
import FormInputGroups from "views/FormInputGroups";
import FormLayout from "views/FormLayout";
import FormValidations from "views/FormVaidations";
import FormWizards from "views/FormWizards";
import ComponentsAlerts from "views/ComponentsAlerts";
import ComponentsAvatars from "views/ComponentsAvatars";
import ComponentsBadges from "views/ComponentsBadges";
import ComponentsButtons from "views/ComponentsButtons";
import ComponentsCards from "views/ComponentsCards";
import ComponentsCollapse from "views/ComponentsCollapse";
import ComponentsColors from "views/ComponentsColors";
import ComponentsDropdowns from "views/ComponentsDropdowns";
import ComponentsModal from "views/ComponentsModal";
import ComponentsPopoversTooltips from "views/ComponentsPopoversTooltips";
import ComponentsTables from "views/ComponentsTables";
import ComponentsTabs from "views/ComponentsTabs";
import ComponentsToasts from "views/ComponentsToasts";
import Dashboard from "views/Dashboard";
import ExtrasCarousel from "views/ExtrasCarousel";
import ExtrasCharts from "views/ExtrasCharts";
import ExtrasEditors from "views/ExtrasEditors";
import ExtrasSortable from "views/ExtrasSortable";

import AuthLogin from "views/AuthLogin";
import AuthForgotPassword from "views/AuthForgotPassword";
import AuthRegister from "views/AuthRegister";
import Error403 from "views/Error403";
import Error404 from "views/Error404";
import Error500 from "views/Error500";
import ErrorUnderMaintenance from "views/ErrorUnderMaintenance";
import BlogList from "views/BlogList";
import BlogListCardRows from "views/BlogListCardRows";
import BlogListCardColumns from "views/BlogListCardColumns";
import BlogAdd from "views/BlogAdd";
import PagesPricing from "views/PagesPricing";
import PagesFAQsLayout1 from "views/PagesFAQsLayout1";
import PagesFAQsLayout2 from "views/PagesFAQsLayout2";
import PagesInvoice from "views/PagesInvoice";

import ApplicationsMediaLibrary from "views/ApplicationsMediaLibrary";
import ApplicationsPointOfSale from "views/ApplicationsPointOfSale";
import ApplicationsToDo from "views/ApplicationsToDo";
import ApplicationsChat from "views/ApplicationsChat";
import OrganizationType from "components/APPLICATIONS/authorization/organizationType/OrganizationType";
import Organizations from "components/APPLICATIONS/authorization/organizations/Organizations";
import Departments from "components/APPLICATIONS/authorization/departments/Departments";
import Positions from "components/APPLICATIONS/authorization/positions/Positions";
import Users from "components/APPLICATIONS/authorization/users/Users";
import UserEdit from "components/APPLICATIONS/authorization/users/UserEdit";
import Roles from "components/APPLICATIONS/authorization/roles/Roles";
import Login from "components/APPLICATIONS/authorization/login/Login";
import GrantRoleToUsers from "components/APPLICATIONS/authorization/users/grantRoleToUsers/GrantRoleToUsers";
import Home from "components/home/Home";
import DepartmentsTree from "components/APPLICATIONS/authorization/departments/DepartmentsTree";

import { routePermissions } from "./routePermissions";
import React from "react";
import CheckPermission from "./CheckPermission";
import Packages from "components/APPLICATIONS/authorization/packages/Packages";
import TemplateDetailsJodit from "components/APPLICATIONS/documents/templateDetailsJodit/TemplateDetailsJodit";
import ServiceParameters from "components/APPLICATIONS/billing/serviceParameters/ServiceParameters";
import ServiceParametersDetails from "components/APPLICATIONS/billing/serviceParameters/details/ServiceParametersDetails";
import ServiceParametersForm from "components/APPLICATIONS/billing/serviceParameters/serviceParametersForm/ServiceParametersForm";
import ServiceParameterTypes from "components/APPLICATIONS/billing/serviceParameterTypes/ServiceParameterTypes";
import ServiceParameterTypesForm from "components/APPLICATIONS/billing/serviceParameterTypes/serviceParameterTypesForm/ServiceParameterTypesForm";
import ServicePrices from "components/APPLICATIONS/billing/servicePrices/ServicePrices";
import ServicePricesForm from "components/APPLICATIONS/billing/servicePrices/servicePricesForm/ServicePricesForm";
import SpecPrices from "components/APPLICATIONS/billing/specPrices/SpecPrices";
import SpecPricesForm from "components/APPLICATIONS/billing/specPrices/specPricesForm/SpecPricesForm";
import DocumentForm from "components/APPLICATIONS/documents/documents/documentForm/DocumentForm";
import UserEditForm from "components/APPLICATIONS/authorization/users/userForm/UserEditForm";
import UserStatistic from "components/APPLICATIONS/billing/statistic/UserStatistic";
import ServiceStatistic from "components/APPLICATIONS/billing/statistic/ServiceStatistic";
import TransactionStatistic from "components/APPLICATIONS/billing/statistic/TransactionStatistic";
import ActivePackage from "components/APPLICATIONS/authorization/packages/ActivePackage";
import RingPackages from "components/APPLICATIONS/authorization/packages/RingPackages";
import ActiveRingPackage from "components/APPLICATIONS/authorization/packages/ActiveRingPackage";
import Sms from "components/APPLICATIONS/authorization/sms/Sms";
import SmsCrud from "components/APPLICATIONS/authorization/sms/SmsCrud";
import Statements from "components/APPLICATIONS/authorization/statements/Statements";
import NewAgreement from "components/APPLICATIONS/authorization/agreements/NewAgreement";
import Sips from "components/APPLICATIONS/authorization/organizations/Sips";
import Agreements from "components/APPLICATIONS/authorization/agreements/Agreements";
import PendingStatements from "components/APPLICATIONS/authorization/statements/PendingStatements";
import ActiveStatements from "components/APPLICATIONS/authorization/statements/ActiveStatements";
import ArchivedStatements from "components/APPLICATIONS/authorization/statements/ArchivedStatements";
import ExpInvoiceStatements from "components/APPLICATIONS/authorization/statements/ExpInvoiceStatements";
import ExpiredStatements from "components/APPLICATIONS/authorization/statements/ExpiredStatements";
import BankRegister from "components/APPLICATIONS/billing/bankRegister/BankRegister";
import Logs from "components/APPLICATIONS/authorization/logs/Logs";
import AgreementDetails from "components/APPLICATIONS/authorization/agreements/AgreementDetails";
import BankTransactions from "components/APPLICATIONS/billing/transactions/bankTransactions/BankTransactions";
import Invoices from "components/APPLICATIONS/billing/invoices/Invoices";

const Router = () => {
  const routes = routePermissions.map(({ route, permission, element }) => (
    <Route
      key={route + permission}
      path={route}
      element={<CheckPermission perm={permission}>{element}</CheckPermission>}
    />
  ));

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutDefault />}>
          {/* test routes */}
          <Route path="organization-type-edit" element={<OrganizationType />} />
          <Route path="organizations/:typeId?" element={<Organizations />} />
          <Route path="sips" element={<Sips />} />
          <Route path="departments/:oid" element={<DepartmentsTree />} />
          <Route path="activePackage/:oid" element={<ActivePackage />} />
          <Route
            path="activeRingPackage/:oid"
            element={<ActiveRingPackage />}
          />
          <Route path="positions/:oid/:did" element={<Positions />} />
          <Route path="sms/:oid?" element={<Sms />} />
          <Route path="smsCrud" element={<SmsCrud />} />
          <Route path="users/:type/:id" element={<Users />} />
          <Route path="users/:type/:id/role" element={<GrantRoleToUsers />} />
          <Route
            path="user/:action"
            element={
              <main className="workspace">
                <UserEditForm />
              </main>
            }
          />
          <Route path="user/:action/:id" element={<UserEdit />} />
          <Route path="roles" element={<Roles />} />
          <Route path="/department/:did/:oid" element={<Departments />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/packages" element={<Packages />} />
          <Route path="/ring-packages" element={<RingPackages />} />
          <Route path="/statements" element={<Statements />} />
          <Route path="/registerBank" element={<BankRegister />} />

          <Route path="/agreement" element={<Agreements />} />
          <Route path="/agreements/create" element={<NewAgreement />} />
          <Route
            path="/agreements/details/:id"
            element={<AgreementDetails />}
          />
          <Route path="/agreements/pending" element={<PendingStatements />} />
          <Route path="/agreements/active" element={<ActiveStatements />} />
          <Route path="/archive/agreements" element={<ArchivedStatements />} />
          <Route path="/archive/invoice" element={<ExpInvoiceStatements />} />
          <Route path="/archive/expired" element={<ExpiredStatements />} />

          <Route path="/billing/userStatistic" element={<UserStatistic />} />
          <Route
            path="/billing/serviceStatistic"
            element={<ServiceStatistic />}
          />
          <Route
            path="/billing/transactionStatistic"
            element={<TransactionStatistic />}
          />
          <Route path="/logs" element={<Logs />} />
          <Route
            path="billing/bank-transactions"
            element={<BankTransactions />}
          />
          <Route path="billing/invoices" element={<Invoices />} />

          {routes}

          {/*new routes for new project */}

          {/* <Route
            path="/documents/templates/:templateId"
            element={<TemplateDetails />}
          /> */}
          <Route
            path="/documents/templates/:templateId"
            element={<TemplateDetailsJodit />}
          />

          <Route
            path="/documents/documents/:action"
            element={<DocumentForm />}
          />

          {/* service parameters */}
          <Route
            path="/billing/service-parameters"
            element={<ServiceParameters />}
          />
          <Route
            path="/billing/service-parameters/:action/:id?"
            element={<ServiceParametersForm />}
          />
          <Route
            path="/billing/service-parameters/details/:id"
            element={<ServiceParametersDetails />}
          />

          {/* service parameter types */}
          <Route
            path="/billing/service-parameter-types"
            element={<ServiceParameterTypes />}
          />
          <Route
            path="/billing/service-parameter-types/:action/:id?"
            element={<ServiceParameterTypesForm />}
          />

          {/* service prices */}
          <Route path="/billing/service-prices" element={<ServicePrices />} />
          <Route
            path="/billing/service-prices/:action/:id?"
            element={<ServicePricesForm />}
          />

          {/* spec prices */}
          <Route path="/billing/spec-prices" element={<SpecPrices />} />
          <Route
            path="/billing/spec-prices/:action/:id?"
            element={<SpecPricesForm />}
          />
          {/*new routes for new project end*/}

          {/* test routes end*/}
          <Route path="blank" element={<Blank />} />
          <Route path="form-components" element={<FormComponents />} />
          <Route path="form-input-groups" element={<FormInputGroups />} />
          <Route path="form-layout" element={<FormLayout />} />
          <Route path="form-validations" element={<FormValidations />} />
          <Route path="form-wizards" element={<FormWizards />} />
          <Route path="components-alerts" element={<ComponentsAlerts />} />
          <Route path="components-avatars" element={<ComponentsAvatars />} />
          <Route path="components-badges" element={<ComponentsBadges />} />
          <Route path="components-buttons" element={<ComponentsButtons />} />
          <Route path="components-cards" element={<ComponentsCards />} />
          <Route path="components-collapse" element={<ComponentsCollapse />} />
          <Route path="components-colors" element={<ComponentsColors />} />
          <Route
            path="components-dropdowns"
            element={<ComponentsDropdowns />}
          />
          <Route path="components-modal" element={<ComponentsModal />} />
          <Route
            path="components-popovers-tooltips"
            element={<ComponentsPopoversTooltips />}
          />
          <Route path="components-tabs" element={<ComponentsTabs />} />
          <Route path="components-tables" element={<ComponentsTables />} />
          <Route path="components-toasts" element={<ComponentsToasts />} />
          <Route path="extras-carousel" element={<ExtrasCarousel />} />
          <Route path="extras-charts" element={<ExtrasCharts />} />
          <Route path="extras-editors" element={<ExtrasEditors />} />
          <Route path="extras-sortable" element={<ExtrasSortable />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog-list-card-rows" element={<BlogListCardRows />} />
          <Route
            path="blog-list-card-columns"
            element={<BlogListCardColumns />}
          />
          <Route path="blog-add" element={<BlogAdd />} />
          <Route path="pages-pricing" element={<PagesPricing />} />
          <Route path="pages-faqs-layout-1" element={<PagesFAQsLayout1 />} />
          <Route path="pages-faqs-layout-2" element={<PagesFAQsLayout2 />} />
          <Route path="pages-invoice" element={<PagesInvoice />} />
          <Route
            path="applications-media-library"
            element={<ApplicationsMediaLibrary />}
          />
          <Route
            path="applications-point-of-sale"
            element={<ApplicationsPointOfSale />}
          />
          <Route path="applications-to-do" element={<ApplicationsToDo />} />
          <Route path="applications-chat" element={<ApplicationsChat />} />
        </Route>

        <Route element={<LayoutBlank />}>
          {/* test routes */}
          <Route path="login" element={<Login />} />
          {/* test routes */}

          <Route path="auth-login" element={<AuthLogin />} />
          <Route path="auth-forgot-password" element={<AuthForgotPassword />} />
          <Route path="auth-register" element={<AuthRegister />} />
          <Route path="errors-403" element={<Error403 />} />
          <Route path="errors-404" element={<Error404 />} />
          <Route path="errors-500" element={<Error500 />} />
          <Route
            path="errors-under-maintenance"
            element={<ErrorUnderMaintenance />}
          />
        </Route>

        <Route element={<LayoutBlank />}>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
