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
import UserForm from "components/APPLICATIONS/authorization/users/userForm/UserForm";
import UserEdit from "components/APPLICATIONS/authorization/users/UserEdit";
import Roles from "components/APPLICATIONS/authorization/roles/Roles";
import Login from "components/APPLICATIONS/authorization/login/Login";
import GrantRoleToUsers from "components/APPLICATIONS/authorization/users/grantRoleToUsers/GrantRoleToUsers";
import Home from "components/home/Home";
import DepartmentsTree from "components/APPLICATIONS/authorization/departments/DepartmentsTree";

import { routePermissions } from "./routePermissions";
import React from "react";
import CheckPermission from "./CheckPermission";
import OurErrorList from "components/APPLICATIONS/billing/errors/ourErrorList/OurErrorList";
import OurErrorListForm from "components/APPLICATIONS/billing/errors/ourErrorList/ourErrorListForm/OurErrorListForm";
import OwnerErrorList from "components/APPLICATIONS/billing/errors/ownerErrorList/OwnerErrorList";
import OwnerErrorListForm from "components/APPLICATIONS/billing/errors/ownerErrorList/ownerErrorListForm/OwnerErrorListForm";
import Payers from "components/APPLICATIONS/billing/payers/Payers";
import Statistic from "components/APPLICATIONS/billing/statistic/Statistic";
import CurrentBalance from "components/APPLICATIONS/billing/currentBalance/CurrentBalance";
import Nominal from "components/APPLICATIONS/billing/nominal/Nominal";
import ComparisonAct from "components/APPLICATIONS/billing/comparisonAct/ComparisonAct";
import ComparisonActGenerate from "components/APPLICATIONS/billing/comparisonAct/comparisonActGenerate/ComparisonActGenerate";
import ComparisonActDetails from "components/APPLICATIONS/billing/comparisonAct/comparisonActDetails/ComparisonActDetails";
import BalanceRecount from "components/APPLICATIONS/billing/balance/recount/BalanceRecount";
import BalanceNullify from "components/APPLICATIONS/billing/balance/nullify/BalanceNullify";
import AddBalance from "components/APPLICATIONS/billing/balance/addBalance/AddBalance";
import CurrencyRates from "components/APPLICATIONS/billing/balance/currencyRates/CurrencyRates";
import DocEditor from "components/APPLICATIONS/documents/DocEditor";
import Packages from "components/APPLICATIONS/authorization/packages/Packages";
import DocCatalogs from "components/APPLICATIONS/documents/docCatalogs/DocCatalogs";
import Templates from "components/APPLICATIONS/documents/templates/Templates";
import TemplateColumns from "components/APPLICATIONS/documents/templateColumns/TemplateColumns";
import TemplateDetails from "components/APPLICATIONS/documents/templateDetails/TemplateDetails";

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
          <Route path="user/:action" element={<UserForm />} />
          <Route path="user/:action/:id" element={<UserEdit />} />
          <Route path="roles" element={<Roles />} />
          <Route path="/department/:did/:oid" element={<Departments />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/packages" element={<Packages />} />

          {routes}

          <Route path="/billing/statistic" element={<Statistic />} />
          <Route path="/billing/current-balance" element={<CurrentBalance />} />
          <Route path="/billing/nominal-balance" element={<Nominal />} />
          <Route
            path="/billing/balance/action/:action"
            element={<AddBalance />}
          />
          <Route path="/billing/balance/rates" element={<CurrencyRates />} />
          <Route path="/billing/balance/recount" element={<BalanceRecount />} />
          <Route path="/billing/balance/nullify" element={<BalanceNullify />} />
          <Route path="/billing/comparison-act" element={<ComparisonAct />} />

          {/*new routes for new project */}

          <Route path="/documents/editor" element={<DocEditor />} />
          <Route path="/documents/categories" element={<DocCatalogs />} />
          <Route path="/documents/templates" element={<Templates />} />
          <Route
            path="/documents/templates/:templateId"
            element={<TemplateDetails />}
          />
          <Route
            path="/documents/templateColumns"
            element={<TemplateColumns />}
          />

          {/*new routes for new project end*/}

          {/* error list temporary */}
          <Route path="/billing/our-error-list" element={<OurErrorList />} />
          <Route
            path="/billing/our-error-list/:action/:id?"
            element={<OurErrorListForm />}
          />
          <Route
            path="/billing/owner-error-list/show/:id"
            element={<OwnerErrorList />}
          />
          <Route
            path="/billing/owner-error-list/:action/:id?"
            element={<OwnerErrorListForm />}
          />
          {/* error list temporary */}

          <Route path="/billing/payers/:transactionId" element={<Payers />} />

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

        <Route
          path="/billing/comparison-act/generate"
          element={<ComparisonActGenerate />}
        />
        <Route
          path="/billing/comparison-act/details"
          element={<ComparisonActDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
