import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "actions";

import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";
import Tippy, { useSingleton } from "@tippyjs/react";

import Backdrop from "components/Backdrop";
import DefaultCollapse from "components/DefaultCollapse";
import Avatar from "components/Avatar";

import useOnClickOutside from "utilities/hooks/useOnClickOutside";
import useBrandedMenu from "utilities/hooks/useBrandedMenu";
import useMenuType from "utilities/hooks/useMenuType";
import useWindowSize from "utilities/hooks/useWindowSize";
import HomeIcon from "components/icons/HomeIcon";
import HeadersIcon from "components/icons/HeadersIcon";
import AuthIcon from "components/icons/AuthIcon";
import OrgIcon from "components/icons/OrgIcon";
// import AddUserIcon from "components/icons/AddUserIcon";
import BillingIcon from "components/icons/BillingIcon";
import TransactionIcon from "components/icons/TransactionIcon";
import StatisticIcon from "components/icons/StatisticIcon";
import { MenuBarCollapse } from "components/collapse/Collapse";
import DocumentIcon from "components/icons/DocumentIcon";
import PackageIcon from "components/icons/PackageIcon";
import PuzzleIcon from "components/icons/PuzzleIcon";
import AlgIcon from "components/icons/AlgIcon";
import useCheckPermission, { useCheckAID } from "helpers/useCheckPermission";
import { useQuery } from "react-query";
import { getStatements } from "services/organizations";
import { IDENTIFY_CODE_SIP } from "data/applications";
import MessageIcon from "components/icons/MessageIcon";
import StatementIcon from "components/icons/StatementIcon";
import AgreementIcon from "components/icons/AgreementIcon";

const MenuBarContext = createContext();

const SuperAdminMenuBar = () => {
  const dispatch = useDispatch();

  const menuBarVisible = useSelector((state) => state.root.menuBarVisible);

  const [brandedMenu] = useBrandedMenu();
  const [menuType] = useMenuType();
  const windowSize = useWindowSize();

  const [activeMenus, setActiveMenus] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBackdropActive, setIsBackdropActive] = useState(false);
  const [isTooltipDisabled, setIsTooltipDisabled] = useState(false);

  const menuBar = useRef(null);

  const [source, target] = useSingleton();

  // Activate Menu
  const activateMenu = (menuName, withMenuDetail = true) => {
    if (menuType !== "wide") {
      if (activeMenus.includes(menuName) && isMenuOpen) {
        setActiveMenus([]);
        hideMenuDetail();
      } else {
        setActiveMenus([menuName]);

        if (withMenuDetail) {
          setIsMenuOpen(true);
          setIsBackdropActive(true);
        } else {
          hideMenuDetail();
        }
      }
    } else {
      if (activeMenus.includes(menuName)) {
        setActiveMenus([]);
      } else {
        setActiveMenus([menuName]);
      }
    }
  };

  // Check if a Menu is Active
  const isActive = (menuName) => {
    return activeMenus.includes(menuName);
  };

  // Check if a Menu Detail is Open
  const isOpen = (menuName) => {
    return activeMenus.includes(menuName) && isMenuOpen;
  };

  // Hide Menu Detail
  const hideMenuDetail = () => {
    setIsMenuOpen(false);
    setIsBackdropActive(false);
  };

  // Hide Menu Detail - When clicked elsewhere
  useOnClickOutside(menuBar, () => {
    if (menuType !== "wide") {
      hideMenuDetail();
    }
  });

  useEffect(() => {
    if (menuType === "icon-only") {
      setIsTooltipDisabled(true);
    }
  }, [menuType]);

  useEffect(() => {
    if (windowSize.width > 640) {
      dispatch(toggleMenu(true));
    } else {
      dispatch(toggleMenu(false));
    }
  }, [windowSize, dispatch]);

  return (
    <MenuBarContext.Provider value={{ isOpen, hideMenuDetail }}>
      <Backdrop active={isBackdropActive} workspaceOnly={true} />
      <Tippy
        singleton={source}
        touch={["hold", 500]}
        theme="light-border tooltip"
        offset={[0, 12]}
        animation="scale"
        placement="right"
        appendTo={document.body}
        disabled={isTooltipDisabled}
      />

      <aside
        ref={menuBar}
        className={
          classNames(
            "menu-bar",
            "menu-sticky",
            { "menu-hidden": !menuBarVisible },
            {
              menu_branded: brandedMenu,
            },
            "menu-" + menuType
          ) + " "
        }
      >
        <div className="menu-items ">
          <div
            className={classNames("menu-header", {
              hidden: menuType !== "wide",
            })}
          >
            <Link to="/" className="flex items-center mx-8 mt-8">
              <Avatar size="medium">JD</Avatar>
              <div className="ltr:ml-4 rtl:mr-4 ltr:text-left rtl:text-right">
                <h5>John Doe</h5>
                <p className="mt-2">Editor</p>
              </div>
            </Link>
            <hr className="mx-8 my-4" />
          </div>
          {/* მენიუები მაქ დაკომენტარებული აქ */}
          <Tippy content="HOME" singleton={target}>
            <Link
              to="/"
              onClick={() => activateMenu("dashboard", false)}
              className={classNames("link", { active: isActive("dashboard") })}
            >
              <HomeIcon />
            </Link>
          </Tippy>

          {/* AUTH */}
          <Tippy content="ადმინისტრირება" singleton={target}>
            <button
              onClick={() => activateMenu("auth")}
              className={
                classNames("link", {
                  active: isActive("auth"),
                }) + " !pl-0 !pr-0"
              }
            >
              <AuthIcon />
              <span className="title mt-1">ადმინისტრირება</span>
            </button>
          </Tippy>
          {menuType === "wide" ? (
            <DefaultCollapse open={isActive("auth")}>
              <MenuDetailAuth />
            </DefaultCollapse>
          ) : null}
          {useCheckAID(4) && (
            <>
              {/*  Billing */}
              <Tippy content="ბილინგი" singleton={target}>
                <button
                  onClick={() => activateMenu("billing")}
                  className={classNames("link", {
                    active: isActive("billing"),
                  })}
                >
                  <BillingIcon />
                  <span className="title mt-1">ბილინგი</span>
                </button>
              </Tippy>
              {menuType === "wide" ? (
                <DefaultCollapse open={isActive("billing")}>
                  <MenuDetailBilling />
                </DefaultCollapse>
              ) : null}
            </>
          )}
          {useCheckAID(2) && (
            <>
              {/*  Documents */}
              <Tippy content="დოკუმენტები" singleton={target}>
                <button
                  onClick={() => activateMenu("documents")}
                  className={classNames("link", {
                    active: isActive("documents"),
                  })}
                >
                  <DocumentIcon className="h-7 w-7 mx-auto" />
                  <span className="title mt-1">დოკუმენტები</span>
                </button>
              </Tippy>
              {menuType === "wide" ? (
                <DefaultCollapse open={isActive("documents")}>
                  <MenuDetailBilling />
                </DefaultCollapse>
              ) : null}
            </>
          )}

          {/* 
          <Tippy content="UI" singleton={target}>
            <button
              onClick={() => activateMenu("ui")}
              className={classNames("link", { active: isActive("ui") })}
            >
              <span className="icon la la-cube"></span>
              <span className="title">UI</span>
            </button>
          </Tippy>
          {menuType === "wide" ? (
            <DefaultCollapse open={isActive("ui")}>
              <MenuDetailUI />
            </DefaultCollapse>
          ) : null}
           */}

          {/* <Tippy content="Pages" singleton={target}>
            <button
              onClick={() => activateMenu("pages")}
              className={classNames("link", { active: isActive("pages") })}
            >
              <span className="icon la la-file-alt"></span>
              <span className="title">Pages</span>
            </button>
          </Tippy>
          {menuType === "wide" ? (
            <DefaultCollapse open={isActive("pages")}>
              <MenuDetailPages />
            </DefaultCollapse>
          ) : null} */}

          {/* <Tippy content="Applications" singleton={target}>
            <button
              onClick={() => activateMenu("applications")}
              className={classNames("link", {
                active: isActive("applications"),
              })}
            >
              <span className="icon la la-store"></span>
              <span className="title">Applications</span>
            </button>
          </Tippy>
          {menuType === "wide" ? (
            <DefaultCollapse open={isActive("applications")}>
              <MenuDetailApplications />
            </DefaultCollapse>
          ) : null} */}

          {/* <Tippy content="Menu" singleton={target}>
            <button
              onClick={() => activateMenu("menu")}
              className={classNames("link", { active: isActive("menu") })}
            >
              <span className="icon la la-sitemap"></span>
              <span className="title">Menu</span>
            </button>
          </Tippy>
          {menuType === "wide" ? (
            <DefaultCollapse open={isActive("menu")}>
              <MenuDetailMenu />
            </DefaultCollapse>
          ) : null} */}

          {/* <Tippy content="Blank Page" singleton={target}>
            <Link
              to="/blank"
              onClick={() => activateMenu("blank", false)}
              className={classNames("link", { active: isActive("blank") })}
            >
              <span className="icon la la-file"></span>
              <span className="title">Blank Page</span>
            </Link>
          </Tippy>
          <Tippy content="Docs" singleton={target}>
            <a
              href="https://yeti.yetithemes.net/docs/react"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              <span className="icon la la-book-open"></span>
              <span className="title">Docs</span>
            </a>
          </Tippy> */}
        </div>

        {menuType !== "wide" ? (
          <>
            <MenuDetailBilling />
            <MenuDetailDocuments />
            <MenuDetailAuth />
            <MenuDetailUI />
            <MenuDetailPages />
            <MenuDetailApplications />
            <MenuDetailMenu />
          </>
        ) : null}
      </aside>
    </MenuBarContext.Provider>
  );
};

export default SuperAdminMenuBar;

const MenuDetailUI = () => {
  const { isOpen, hideMenuDetail } = useContext(MenuBarContext);

  return (
    <div
      className={classNames("menu-detail", {
        open: isOpen("ui"),
      })}
    >
      <div className="menu-detail-wrapper">
        <h6 className="uppercase">Form</h6>
        <NavLink to="/form-components" onClick={hideMenuDetail}>
          <span className="la la-cubes"></span>
          Components
        </NavLink>
        <NavLink to="/form-input-groups" onClick={hideMenuDetail}>
          <span className="la la-stop"></span>
          Input Groups
        </NavLink>
        <NavLink to="/form-layout" onClick={hideMenuDetail}>
          <span className="la la-th-large"></span>
          Layout
        </NavLink>
        <NavLink to="/form-validations" onClick={hideMenuDetail}>
          <span className="la la-check-circle"></span>
          Validations
        </NavLink>
        <NavLink to="/form-wizards" onClick={hideMenuDetail}>
          <span className="la la-hand-pointer"></span>
          Wizards
        </NavLink>
        <hr />
        <h6 className="uppercase">Components</h6>
        <NavLink to="/components-alerts" onClick={hideMenuDetail}>
          <span className="la la-bell"></span>
          Alerts
        </NavLink>
        <NavLink to="/components-avatars" onClick={hideMenuDetail}>
          <span className="la la-user-circle"></span>
          Avatars
        </NavLink>
        <NavLink to="/components-badges" onClick={hideMenuDetail}>
          <span className="la la-certificate"></span>
          Badges
        </NavLink>
        <NavLink to="/components-buttons" onClick={hideMenuDetail}>
          <span className="la la-play"></span>
          Buttons
        </NavLink>
        <NavLink to="/components-cards" onClick={hideMenuDetail}>
          <span className="la la-layer-group"></span>
          Cards
        </NavLink>
        <NavLink to="/components-collapse" onClick={hideMenuDetail}>
          <span className="la la-arrow-circle-right"></span>
          Collapse
        </NavLink>
        <NavLink to="/components-colors" onClick={hideMenuDetail}>
          <span className="la la-palette"></span>
          Colors
        </NavLink>
        <NavLink to="/components-dropdowns" onClick={hideMenuDetail}>
          <span className="la la-arrow-circle-down"></span>
          Dropdowns
        </NavLink>
        <NavLink to="/components-modal" onClick={hideMenuDetail}>
          <span className="la la-times-circle"></span>
          Modal
        </NavLink>
        <NavLink to="/components-popovers-tooltips" onClick={hideMenuDetail}>
          <span className="la la-thumbtack"></span>
          Popovers & Tooltips
        </NavLink>
        <NavLink to="/components-tabs" onClick={hideMenuDetail}>
          <span className="la la-columns"></span>
          Tabs
        </NavLink>
        <NavLink to="/components-tables" onClick={hideMenuDetail}>
          <span className="la la-table"></span>
          Tables
        </NavLink>
        <NavLink to="/components-toasts" onClick={hideMenuDetail}>
          <span className="la la-bell"></span>
          Toasts
        </NavLink>
        <hr />
        <h6 className="uppercase">Extras</h6>
        <NavLink to="/extras-carousel" onClick={hideMenuDetail}>
          <span className="la la-images"></span>
          Carousel
        </NavLink>
        <NavLink to="/extras-charts" onClick={hideMenuDetail}>
          <span className="la la-chart-area"></span>
          Charts
        </NavLink>
        <NavLink to="/extras-editors" onClick={hideMenuDetail}>
          <span className="la la-keyboard"></span>
          Editors
        </NavLink>
        <NavLink to="/extras-sortable" onClick={hideMenuDetail}>
          <span className="la la-sort"></span>
          Sortable
        </NavLink>
      </div>
    </div>
  );
};
const MenuDetailAuth = () => {
  const { isOpen, hideMenuDetail } = useContext(MenuBarContext);
  const user = useSelector((state) => state.user.authorizedUser);

  const { data: statementData = { data: { data: [] }, request_chanel: [] } } =
    useQuery({
      queryKey: "getStatements",
      queryFn: () =>
        getStatements({
          identify_code: IDENTIFY_CODE_SIP,
        }).then((res) => res.data),
      retry: false,
    });
  const govStatements =
    statementData.data.data.filter(
      (statement) => +statement.gov === 5 && +statement.status === 2
    ) || [];

  return (
    <div
      className={classNames("menu-detail", {
        open: isOpen("auth"),
      })}
    >
      <div className="menu-detail-wrapper">
        {useCheckPermission("user_gov_auth_user_get_auth") && (
          <NavLink to={"statements"} onClick={hideMenuDetail}>
            <StatementIcon className="w-6 h-6 mr-2" />
            <p className="relative">
              განცხადებები
              <span className="absolute -top-2 -right-6 rounded-full !text-white !bg-danger !text-[14px] px-[3px]">
                {govStatements.length !== 0 && govStatements.length}
              </span>
            </p>
          </NavLink>
        )}

        {useCheckPermission("user_gov_auth_user_get_auth") && (
          <MenuBarCollapse
            icon={<AgreementIcon className="w-6 h-6 mr-2" />}
            label={"ხელშეკრულებები"}
            height={"300px"}
          >
            <NavLink to="/agreement" onClick={hideMenuDetail}>
              ახალი ხელშეკრულება
            </NavLink>
            <NavLink to="/agreements/pending" onClick={hideMenuDetail}>
              ქმედების მოლოდინში
            </NavLink>
            <NavLink to="/agreements/active" onClick={hideMenuDetail}>
              აქტიური ხელშეკრულება
            </NavLink>
            <MenuBarCollapse label={"არქივი"}>
              <NavLink to="/archive/agreements" onClick={hideMenuDetail}>
                გაკეთებული განცხადებები
              </NavLink>
              <NavLink to="/archive/invoice" onClick={hideMenuDetail}>
                ინვოისის ვადის გამო <br /> გაუქმებული
              </NavLink>
              <NavLink to="/archive/expired" onClick={hideMenuDetail}>
                ვადა ამოწურული <br /> ხელშეკრულებები
              </NavLink>
              <NavLink to="/archive/templates" onClick={hideMenuDetail}>
                მონახაზები
              </NavLink>
            </MenuBarCollapse>
          </MenuBarCollapse>
        )}

        {user.superAdmin && (
          <MenuBarCollapse
            icon={<OrgIcon className={"w-6 h-6 mr-2"} />}
            label={"სახელმწიფო უწყებები"}
          >
            <NavLink to={`/sips`} onClick={hideMenuDetail}>
              უწყებები
            </NavLink>
            <NavLink to="/roles" onClick={hideMenuDetail}>
              როლები
            </NavLink>
            <NavLink to={`/sips?create=1`} onClick={hideMenuDetail}>
              უწყების რეგისტრაცია
            </NavLink>
          </MenuBarCollapse>
        )}
        {/* ვამოწმებ ავტორიზირებულ პირი არის თუ არა */}
        {user.isSip && !user.superAdmin && (
          <MenuBarCollapse
            icon={<OrgIcon className={"w-6 h-6 mr-2"} />}
            label={"ავტორიზირებული პირები"}
          >
            <NavLink to="/organizations" onClick={hideMenuDetail}>
              ავტორიზირებულ პირების სია
            </NavLink>
            <NavLink to="/roles" onClick={hideMenuDetail}>
              როლები
            </NavLink>
            <NavLink to="/organizations?create=1" onClick={hideMenuDetail}>
              ავტ. პირთა რეგისტრაცია
            </NavLink>
          </MenuBarCollapse>
        )}

        <MenuBarCollapse
          icon={
            <span className="la la-user-circle text-2xl leading-none ltr:mr-2 rtl:ml-2"></span>
          }
          label={"ადმინისტრაცია"}
        >
          <NavLink to="/roles" onClick={hideMenuDetail}>
            {/* <span className="la la-certificate"></span> */}
            როლები
          </NavLink>
          <NavLink
            to={
              user.superAdmin
                ? "/user/create"
                : `/user/create?oid=${user.oid}&did=${user.did}&pid=${user.pid}`
            }
            onClick={hideMenuDetail}
          >
            {/* <AddUserIcon /> */}
            რეგისტრაცია
          </NavLink>
          <NavLink
            to={
              user.superAdmin
                ? "users/all/all"
                : `users/organisation/${user?.oid}`
            }
            onClick={hideMenuDetail}
          >
            მომხმარებლები
          </NavLink>
          {!user.superAdmin ? (
            <NavLink to={`departments/${user?.oid}`} onClick={hideMenuDetail}>
              დეპარტამენტები
            </NavLink>
          ) : (
            <></>
          )}

          {user.superAdmin || user.isSip ? (
            <NavLink to={`/packages`} onClick={hideMenuDetail}>
              {/* <PackageIcon /> */}
              მომხმარებლის პაკეტები
            </NavLink>
          ) : (
            <></>
          )}
          {/* {user.superAdmin || user.isSip ? (
            <NavLink to={`/ring-packages`} onClick={hideMenuDetail}>
              ბეჭდის პაკეტები
            </NavLink>
          ) : (
            <></>
          )}
          {!user.superAdmin && (
            <NavLink
              to={`/activeRingPackage/${user.oid}`}
              onClick={hideMenuDetail}
            >
              ბეჭდის პაკეტის შეძენა
            </NavLink>
          )} */}
          {!user.superAdmin && (
            <NavLink to={`/activePackage/${user.oid}`} onClick={hideMenuDetail}>
              {/* <PackageIcon /> */}
              მომხმარებლის პაკეტის შეძენა
            </NavLink>
          )}
        </MenuBarCollapse>
        {user.superAdmin || user.isSip ? (
          <>
            <NavLink
              to={user.superAdmin ? "/sms" : `/sms/${user.oid}`}
              onClick={hideMenuDetail}
            >
              <MessageIcon />
              SMS-ების გაგზავნა
            </NavLink>
          </>
        ) : (
          <></>
        )}
        {user.superAdmin ? (
          <>
            <NavLink to={"smsCrud"} onClick={hideMenuDetail}>
              <MessageIcon />
              SMS-ების მართვა
            </NavLink>
          </>
        ) : (
          <></>
        )}

        <hr />
      </div>
    </div>
  );
};

// const MenuDetailPayments = () => {
//   const { isOpen, hideMenuDetail } = useContext(MenuBarContext);

//   return (
//     <div
//       className={classNames("menu-detail", {
//         open: isOpen("payments"),
//       })}
//     >
//       <div className="menu-detail-wrapper">
//         <NavLink to="/api" onClick={hideMenuDetail}>
//           <span className="la la-cubes"></span>
//           API
//         </NavLink>
//         <NavLink to="/algorithms" onClick={hideMenuDetail}>
//           <AlgIcon />
//           ალგორითმები
//         </NavLink>
//         <NavLink to="/agent-algorithms" onClick={hideMenuDetail}>
//           <AlgIcon />
//           აგენტის ალგ.
//         </NavLink>
//         <NavLink to="/tags/our-tags" onClick={hideMenuDetail}>
//           <TagIcon />
//           ჩვენი ტეგები
//         </NavLink>
//         <NavLink to="/tags/agent-tags" onClick={hideMenuDetail}>
//           <TagIcon />
//           აგენტის ტეგები
//         </NavLink>
//         <NavLink to="/tags/owner-tags" onClick={hideMenuDetail}>
//           <TagIcon />
//           owner-ის ტეგები
//         </NavLink>
//         <NavLink to="/headers" onClick={hideMenuDetail}>
//           <HeadersIcon />
//           ჰედერები
//         </NavLink>

//         <hr />
//       </div>
//     </div>
//   );
// };

const MenuDetailDocuments = () => {
  const { isOpen, hideMenuDetail } = useContext(MenuBarContext);

  return (
    <div
      className={classNames("menu-detail", {
        open: isOpen("documents"),
      })}
    >
      <div className="menu-detail-wrapper">
        {useCheckPermission("doc_catalog_get") && (
          <NavLink to="/documents/categories" onClick={hideMenuDetail}>
            <PuzzleIcon className="w-6 h-6" />
            კატეგორიები
          </NavLink>
        )}
        {useCheckPermission("doc_templates_get") && (
          <NavLink to="/documents/templates" onClick={hideMenuDetail}>
            <PuzzleIcon className="w-6 h-6" />
            შაბლონები
          </NavLink>
        )}
        {/* {useCheckPermission("doc_template_columns_get") && (
          <NavLink to="/documents/templateColumns" onClick={hideMenuDetail}>
            <PuzzleIcon className="w-6 h-6" />
            ცვლადები
          </NavLink>
        )} */}
        {useCheckPermission("doc_documents_get") && (
          <NavLink to="/documents/documents" onClick={hideMenuDetail}>
            <PuzzleIcon className="w-6 h-6" />
            დოკუმენტები
          </NavLink>
        )}
        <hr />
      </div>
    </div>
  );
};

const MenuDetailBilling = () => {
  const { isOpen, hideMenuDetail } = useContext(MenuBarContext);

  return (
    <div
      className={classNames("menu-detail", {
        open: isOpen("billing"),
      })}
    >
      <div className="menu-detail-wrapper">
        {useCheckPermission("bil_transactions_get") && (
          <NavLink to="/billing/transactions" end onClick={hideMenuDetail}>
            <TransactionIcon /> ტრანზაქციები
          </NavLink>
        )}

        <MenuBarCollapse
          className={useCheckPermission("bil_services_get") ? "" : "hidden"}
          icon={<HeadersIcon />}
          label={"სერვისი"}
        >
          <NavLink to="/billing/services" onClick={hideMenuDetail}>
            სერვისები
          </NavLink>
          {useCheckPermission("bil_categories_get") && (
            <NavLink to="/billing/service-categories" onClick={hideMenuDetail}>
              სერვისის კატალოგები
            </NavLink>
          )}
          {useCheckPermission("bil_service_production_get") && (
            <NavLink to="/billing/service-productions" onClick={hideMenuDetail}>
              სერვისის მიწოდება
            </NavLink>
          )}
          {useCheckPermission("bil_category_production_get") && (
            <NavLink to="/billing/category-production" onClick={hideMenuDetail}>
              კატალოგის მიწოდება
            </NavLink>
          )}
        </MenuBarCollapse>

        <NavLink to="registerBank" end onClick={hideMenuDetail}>
          <TransactionIcon /> ბანკის რეგისტრაცია
        </NavLink>

        {useCheckPermission("dga_admin") && (
          <>
            <NavLink to="/billing/charges" onClick={hideMenuDetail}>
              <span className="la la-dollar"></span>
              მოსაკრებელი
            </NavLink>
            <NavLink to="/billing/sales" onClick={hideMenuDetail}>
              <span className="la la-money"></span>
              ფასდაკლებები
            </NavLink>
            <NavLink to="/billing/api-credentials" onClick={hideMenuDetail}>
              <AlgIcon />
              API-ს რეგისტრაცია
            </NavLink>
          </>
        )}

        <MenuBarCollapse
          className={useCheckPermission("bil_packages_get") ? "" : "hidden"}
          icon={<PackageIcon />}
          label={"პაკეტები"}
        >
          {useCheckPermission("bil_packages_get") && (
            <NavLink to="/billing/packages" onClick={hideMenuDetail}>
              პაკეტები
            </NavLink>
          )}
          {useCheckPermission("bil_packages_production_get") && (
            <NavLink to="/billing/package-production" onClick={hideMenuDetail}>
              პაკეტების მიწოდება
            </NavLink>
          )}
        </MenuBarCollapse>

        <MenuBarCollapse
          icon={
            <span className="mr-2">
              <StatisticIcon />
            </span>
          }
          label={"სტატისტიკა"}
          className={useCheckPermission("bil_statistic_get") ? "" : "hidden"}
        >
          <NavLink
            className="flex items-center gap-2"
            to="/billing/userStatistic"
            onClick={hideMenuDetail}
          >
            მომხმარებლების <br /> სტატისტიკა
          </NavLink>
          <NavLink
            className="flex items-center gap-2"
            to="/billing/transactionStatistic"
            onClick={hideMenuDetail}
          >
            ტრანზაქციების სტატისტიკა
          </NavLink>
          <NavLink
            className="flex items-center gap-2"
            to="/billing/serviceStatistic"
            onClick={hideMenuDetail}
          >
            სერვისების სტატისტიკა
          </NavLink>

          {/* <NavLink
            className="flex items-center gap-2"
            to="/billing/statistic/owner"
            onClick={hideMenuDetail}
          >
            სერვისის მომწოდებლის <br /> სტატისტიკა
          </NavLink>
          <NavLink
            className="flex items-center gap-2"
            to="/billing/statistic/agent"
            onClick={hideMenuDetail}
          >
            სერვისის მიმღების <br /> სტატისტიკა
          </NavLink>
          <NavLink
            className="flex items-center gap-2"
            to="/billing/statistic/monthly/agent"
            onClick={hideMenuDetail}
          >
            სერვისის მიმღების <br /> თვიური სტატისტიკა
          </NavLink>
          <NavLink
            className="flex items-center gap-2"
            to="/billing/statistic/monthly/owner"
            onClick={hideMenuDetail}
          >
            სერვისის მომწოდებლის <br /> თვიური სტატისტიკა
          </NavLink> */}
        </MenuBarCollapse>
        {useCheckPermission("bil_transactions_get_sum_amount") && (
          <NavLink to="/billing/bills" onClick={hideMenuDetail}>
            <span className="la la-dollar"></span>
            დავალიანებები
          </NavLink>
        )}

        <hr />
      </div>
    </div>
  );
};

const MenuDetailPages = () => {
  const { isOpen, hideMenuDetail } = useContext(MenuBarContext);

  return (
    <div className={classNames("menu-detail", { open: isOpen("pages") })}>
      <div className="menu-detail-wrapper">
        <h6 className="uppercase">Authentication</h6>
        <NavLink to="/auth-login" onClick={hideMenuDetail}>
          <span className="la la-user"></span>
          Login
        </NavLink>
        <NavLink to="/auth-forgot-password" onClick={hideMenuDetail}>
          <span className="la la-user-lock"></span>
          Forgot Password
        </NavLink>
        <NavLink to="/auth-register" onClick={hideMenuDetail}>
          <span className="la la-user-plus"></span>
          Register
        </NavLink>
        <hr />
        <h6 className="uppercase">Blog</h6>
        <NavLink to="/blog-list" onClick={hideMenuDetail}>
          <span className="la la-list"></span>
          List
        </NavLink>
        <NavLink to="/blog-list-card-rows" onClick={hideMenuDetail}>
          <span className="la la-list"></span>
          List - Card Rows
        </NavLink>
        <NavLink to="/blog-list-card-columns" onClick={hideMenuDetail}>
          <span className="la la-list"></span>
          List - Card Columns
        </NavLink>
        <NavLink to="/blog-add" onClick={hideMenuDetail}>
          <span className="la la-layer-group"></span>
          Add Post
        </NavLink>
        <hr />
        <h6 className="uppercase">Errors</h6>
        <NavLink to="/errors-403" onClick={hideMenuDetail}>
          <span className="la la-exclamation-circle"></span>
          403 Error
        </NavLink>
        <NavLink to="/errors-404" onClick={hideMenuDetail}>
          <span className="la la-exclamation-circle"></span>
          404 Error
        </NavLink>
        <NavLink to="/errors-500" onClick={hideMenuDetail}>
          <span className="la la-exclamation-circle"></span>
          500 Error
        </NavLink>
        <NavLink to="/errors-under-maintenance" onClick={hideMenuDetail}>
          <span className="la la-exclamation-circle"></span>
          Under Maintenance
        </NavLink>
        <hr />
        <NavLink to="/pages-pricing" onClick={hideMenuDetail}>
          <span className="la la-dollar"></span>
          Pricing
        </NavLink>
        <NavLink to="/pages-faqs-layout-1" onClick={hideMenuDetail}>
          <span className="la la-question-circle"></span>
          FAQs - Layout 1
        </NavLink>
        <NavLink to="/pages-faqs-layout-2" onClick={hideMenuDetail}>
          <span className="la la-question-circle"></span>
          FAQs - Layout 2
        </NavLink>
        <NavLink to="/pages-invoice" onClick={hideMenuDetail}>
          <span className="la la-file-invoice-dollar"></span>
          Invoice
        </NavLink>
      </div>
    </div>
  );
};

const MenuDetailApplications = () => {
  const { isOpen, hideMenuDetail } = useContext(MenuBarContext);

  return (
    <div
      className={classNames("menu-detail", { open: isOpen("applications") })}
    >
      <div className="menu-detail-wrapper">
        <NavLink to="/applications-media-library" onClick={hideMenuDetail}>
          <span className="la la-image"></span>
          Media Library
        </NavLink>
        <NavLink to="/applications-point-of-sale" onClick={hideMenuDetail}>
          <span className="la la-shopping-bag"></span>
          Point Of Sale
        </NavLink>
        <NavLink to="/applications-to-do" onClick={hideMenuDetail}>
          <span className="la la-check-circle"></span>
          To Do
        </NavLink>
        <NavLink to="/applications-chat" onClick={hideMenuDetail}>
          <span className="la la-comment"></span>
          Chat
        </NavLink>
      </div>
    </div>
  );
};

const MenuDetailMenu = () => {
  const { isOpen } = useContext(MenuBarContext);

  const [menuGrandParentCollapse, setMenuGrandParentCollapse] = useState(true);
  const [menuParentCollapse, setMenuParentCollapse] = useState(true);

  const toggleMenuGrandParentCollapse = () => {
    setMenuGrandParentCollapse(!menuGrandParentCollapse);
  };
  const toggleMenuParentCollapse = () => {
    setMenuParentCollapse(!menuParentCollapse);
  };

  return (
    <div className={classNames("menu-detail", { open: isOpen("menu") })}>
      <div className="menu-detail-wrapper">
        <a href="#no-link">
          <span className="la la-cube"></span>
          Default
        </a>
        <a href="#no-link">
          <span className="la la-file-alt"></span>
          Content
        </a>
        <a href="#no-link">
          <span className="la la-shopping-bag"></span>
          Ecommerce
        </a>
        <hr />
        <a href="#no-link">
          <span className="la la-layer-group"></span>
          Main Level
        </a>
        <a href="#no-link">
          <span className="la la-arrow-circle-right"></span>
          Grand Parent
        </a>
        <button
          className={classNames("collapse-header", {
            active: menuGrandParentCollapse,
          })}
          onClick={() => toggleMenuGrandParentCollapse()}
        >
          <span className="collapse-indicator la la-arrow-circle-down"></span>
          Grand Parent Open
        </button>
        <DefaultCollapse open={menuGrandParentCollapse}>
          <a href="#no-link">
            <span className="la la-layer-group"></span>
            Sub Level
          </a>
          <a href="#no-link">
            <span className="la la-arrow-circle-right"></span>
            Parent
          </a>
          <button
            className={classNames("collapse-header", {
              active: menuParentCollapse,
            })}
            onClick={() => toggleMenuParentCollapse()}
          >
            <span className="collapse-indicator la la-arrow-circle-down"></span>
            Parent Open
          </button>
          <DefaultCollapse open={menuParentCollapse}>
            <a href="#no-link">
              <span className="la la-layer-group"></span>
              Sub Level
            </a>
          </DefaultCollapse>
        </DefaultCollapse>
        <hr />
        <h6 className="uppercase">Menu Types</h6>
        <button>
          <span className="la la-hand-point-right"></span>
          Default
        </button>
        <button>
          <span className="la la-hand-point-left"></span>
          Hidden
        </button>
        <button>
          <span className="la la-th-large"></span>
          Icon Only
        </button>
        <button>
          <span className="la la-arrows-alt-h"></span>
          Wide
        </button>
      </div>
    </div>
  );
};
