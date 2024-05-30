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
import DocEditor from "components/APPLICATIONS/documents/DocEditor";
import Packages from "components/APPLICATIONS/authorization/packages/Packages";
import DocCatalogs from "components/APPLICATIONS/documents/docCatalogs/DocCatalogs";
import Templates from "components/APPLICATIONS/documents/templates/Templates";
import TemplateColumns from "components/APPLICATIONS/documents/templateColumns/TemplateColumns";
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
import Charges from "components/APPLICATIONS/billing/charges/Charges";
import ChargesForm from "components/APPLICATIONS/billing/charges/chargesForm/ChargesForm";
import Sales from "components/APPLICATIONS/billing/sales/Sales";
import SalesForm from "components/APPLICATIONS/billing/sales/salesForm/SalesForm";
import BillingPackages from "components/APPLICATIONS/billing/billingPackages/BillingPackages";
import BillingPackagesForm from "components/APPLICATIONS/billing/billingPackages/billingPackagesForm/BillingPackagesForm";
import ServiceProductions from "components/APPLICATIONS/billing/serviceProductions/ServiceProductions";
import ServiceProductionForm from "components/APPLICATIONS/billing/serviceProductions/serviceProductionForm/ServiceProductionForm";
import ServiceProductionDetails from "components/APPLICATIONS/billing/serviceProductions/details/ServiceProductionDetails";
import PackageProductions from "components/APPLICATIONS/billing/packageProduction/PackageProductions";
import PackageProductionForm from "components/APPLICATIONS/billing/packageProduction/packageProductionForm/PackageProductionForm";
import Documents from "components/APPLICATIONS/documents/documents/Documents";
import DocumentForm from "components/APPLICATIONS/documents/documents/documentForm/DocumentForm";
import CategoryProduction from "components/APPLICATIONS/billing/categoryProduction/CategoryProduction";
import CategoryProductionForm from "components/APPLICATIONS/billing/categoryProduction/categoryProductionForm/CategoryProductionForm";
import CategoryProductionDetails from "components/APPLICATIONS/billing/categoryProduction/details/CategoryProductionDetails";
import Statistic from "components/APPLICATIONS/billing/statistic/Statistic";
import MonthlyStatistic from "components/APPLICATIONS/billing/statistic/MonthlyStatistic";
import Services from "components/APPLICATIONS/billing/services/Services";
import ServicesForm from "components/APPLICATIONS/billing/services/servicesForm/ServicesForm";
import ServiceDetails from "components/APPLICATIONS/billing/services/details/ServiceDetails";
import ApiCredentials from "components/APPLICATIONS/billing/apiCredentials/ApiCredentials";
import ApiCredentialsForm from "components/APPLICATIONS/billing/apiCredentials/apiCredentialsForm/ApiCredentialsForm";
import UserEditForm from "components/APPLICATIONS/authorization/users/userForm/UserEditForm";

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
          <Route path="departments/:oid" element={<DepartmentsTree />} />
          <Route path="positions/:oid/:did" element={<Positions />} />
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

          {routes}

          <Route path="/billing/statistic/:user" element={<Statistic />} />
          <Route
            path="/billing/statistic/monthly/:user"
            element={<MonthlyStatistic />}
          />
          {/*new routes for new project */}

          <Route path="/documents/editor" element={<DocEditor />} />
          <Route path="/documents/categories" element={<DocCatalogs />} />
          <Route path="/documents/templates" element={<Templates />} />
          {/* <Route
            path="/documents/templates/:templateId"
            element={<TemplateDetails />}
          /> */}
          <Route
            path="/documents/templates/:templateId"
            element={<TemplateDetailsJodit />}
          />
          <Route
            path="/documents/templateColumns"
            element={<TemplateColumns />}
          />
          <Route path="/documents/documents" element={<Documents />} />
          <Route
            path="/documents/documents/:action"
            element={<DocumentForm />}
          />

          {/* service */}
          <Route path="/billing/services" element={<Services />} />
          <Route
            path="/billing/services/:action/:id?"
            element={<ServicesForm />}
          />
          <Route
            path="/billing/services/details/:id"
            element={<ServiceDetails />}
          />

          {/* service production */}
          <Route
            path="/billing/service-production"
            element={<ServiceProductions />}
          />

          <Route
            path="/billing/service-production/:action/:id?"
            element={<ServiceProductionForm />}
          />
          <Route
            path="/billing/service-production/details/:id"
            element={<ServiceProductionDetails />}
          />

          {/* category production */}
          <Route
            path="/billing/category-production"
            element={<CategoryProduction />}
          />
          <Route
            path="/billing/category-production/:action/:id?"
            element={<CategoryProductionForm />}
          />
          <Route
            path="/billing/category-production/details/:id"
            element={<CategoryProductionDetails />}
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

          {/* charges */}
          <Route path="/billing/charges" element={<Charges />} />
          <Route
            path="/billing/charges/:action/:id?"
            element={<ChargesForm />}
          />

          {/* api credentials */}
          <Route path="/billing/api-credentials" element={<ApiCredentials />} />
          <Route
            path="/billing/api-credentials/:action/:id?"
            element={<ApiCredentialsForm />}
          />

          {/* sales */}
          <Route path="/billing/sales" element={<Sales />} />
          <Route path="/billing/sales/:action/:id?" element={<SalesForm />} />

          {/* billing packages */}
          <Route path="/billing/packages" element={<BillingPackages />} />
          <Route
            path="/billing/packages/:action/:id?"
            element={<BillingPackagesForm />}
          />

          {/* package production */}
          <Route
            path="/billing/package-production"
            element={<PackageProductions />}
          />
          <Route
            path="/billing/package-production/:action/:id?"
            element={<PackageProductionForm />}
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
