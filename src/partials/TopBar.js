import { toggleMenu } from "actions";

import classNames from "classnames";

import Avatar from "components/Avatar";
import Dropdown from "components/Dropdown";
import Switch from "components/form/Switch";
import Tooltip from "components/Tooltip";

import { Link } from "react-router-dom";
import { useTopBar } from "./useTopBar";
import Search from "./search/Search";

const TopBar = () => {
  const {
    logoutUser,
    darkMode,
    toggleDarkMode,
    isFullscreen,
    toggleFullscreen,
    menuBarVisible,
    authorizedUser,
    dispatch,
  } = useTopBar();

  const userInitials = () => {
    if (authorizedUser.name) {
      if (authorizedUser.name.split(" ").length > 1) {
        return (
          authorizedUser.name.split(" ")[0][0] +
          authorizedUser.name.split(" ")[1][0]
        );
      } else {
        return authorizedUser.name[0];
      }
    }
  };

  return (
    <header className="top-bar ">
      {/* Menu Toggler */}
      <button
        className="menu-toggler la la-bars"
        onClick={() => dispatch(toggleMenu(!menuBarVisible))}
      ></button>

      {/* Brand */}
      <span className="brand">LOGO</span>

      {/* Search */}
      <Search />

      {/* Right */}
      <div className="flex items-center ltr:ml-auto rtl:mr-auto">
        {/* Dark Mode */}
        <Tooltip content="Toggle Dark Mode">
          <Switch
            outlined
            checked={darkMode}
            onChange={() => toggleDarkMode()}
          />
        </Tooltip>

        {/* Fullscreen */}
        <Tooltip content="Fullscreen">
          <button
            className={classNames(
              "hidden lg:inline-block ltr:ml-3 rtl:mr-3 px-2 text-2xl leading-none la",
              {
                "la-compress-arrows-alt": isFullscreen,
                "la-expand-arrows-alt": !isFullscreen,
              }
            )}
            onClick={toggleFullscreen}
          ></button>
        </Tooltip>

        {/* Navigations */}
        {/* <div className="self-stretch">
          <Dropdown
            arrow={true}
            placement="bottom"
            content={
              <div className="p-5 text-center">
                <div className="flex justify-around">
                  <a
                    href="#no-link"
                    className="p-5 text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="block la la-cog text-5xl leading-none"></span>
                    <span>Settings</span>
                  </a>
                  <a
                    href="#no-link"
                    className="p-5 text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="block la la-users text-5xl leading-none"></span>
                    <span>Users</span>
                  </a>
                </div>
                <div className="flex justify-around">
                  <a
                    href="#no-link"
                    className="p-5 text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="block la la-book text-5xl leading-none"></span>
                    <span>Docs</span>
                  </a>
                  <a
                    href="#no-link"
                    className="p-5 text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="block la la-dollar text-5xl leading-none"></span>
                    <span>Shop</span>
                  </a>
                </div>
              </div>
            }
          >
            <button className="flex items-center h-full ltr:ml-4 rtl:mr-4 lg:ltr:ml-1 lg:rtl:mr-1 px-2 text-2xl leading-none la la-box"></button>
          </Dropdown>
        </div> */}

        {/* Notifications */}
        {/* <div className="self-stretch">
          <Dropdown
            arrow={true}
            content={
              <div>
                <div className="flex items-center px-5 py-2">
                  <h5 className="mb-0 uppercase">Notifications</h5>
                  <button className="btn btn_outlined btn_warning uppercase ltr:ml-auto rtl:mr-auto">
                    Clear All
                  </button>
                </div>
                <hr />
                <div className="p-5 hover:bg-primary-50 dark:hover:bg-primary dark:hover:bg-opacity-5">
                  <a href="#no-link">
                    <h6 className="uppercase">Heading One</h6>
                  </a>
                  <p>Lorem ipsum dolor, sit amet consectetur.</p>
                  <small>Today</small>
                </div>
                <hr />
                <div className="p-5 hover:bg-primary-50 dark:hover:bg-primary dark:hover:bg-opacity-5">
                  <a href="#no-link">
                    <h6 className="uppercase">Heading Two</h6>
                  </a>
                  <p>Mollitia sequi dolor architecto aut deserunt.</p>
                  <small>Yesterday</small>
                </div>
                <hr />
                <div className="p-5 hover:bg-primary-50 dark:hover:bg-primary dark:hover:bg-opacity-5">
                  <a href="#no-link">
                    <h6 className="uppercase">Heading Three</h6>
                  </a>
                  <p>Nobis reprehenderit sed quos deserunt</p>
                  <small>Last Week</small>
                </div>
              </div>
            }
          >
            <button className="relative flex items-center h-full ltr:ml-1 rtl:mr-1 px-2 text-2xl leading-none la la-bell">
              <span className="absolute top-0 right-0 rounded-full border border-primary -mt-1 -mr-1 px-2 leading-tight text-xs font-body text-primary">
                3
              </span>
            </button>
          </Dropdown>
        </div> */}

        {/* User Menu */}

        <div>
          <Dropdown
            arrow={true}
            content={
              <div className="w-64">
                <div className="p-5">
                  <h5 className="uppercase">
                    {authorizedUser.name
                      ? authorizedUser.name
                      : "მომხმარებლის სახელი"}
                  </h5>
                  {/* <p>Editor</p> */}
                </div>
                <hr />
                <div className="p-5">
                  <Link
                    to={`/user/edit/${authorizedUser.id}`}
                    className="flex items-center text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="la la-user-circle text-2xl leading-none ltr:mr-2 rtl:ml-2"></span>
                    მომხმარებლის დეტალები
                  </Link>
                  {/* <a
                    href="#no-link"
                    className="flex items-center text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary mt-5"
                  >
                    <span className="la la-key text-2xl leading-none ltr:mr-2 rtl:ml-2"></span>
                    Change Password
                  </a> */}
                </div>
                <hr />
                <div onClick={logoutUser} className="p-5">
                  <a
                    href="#no-link"
                    className="flex items-center text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary"
                  >
                    <span className="la la-power-off text-2xl leading-none ltr:mr-2 rtl:ml-2"></span>
                    გასვლა
                  </a>
                </div>
              </div>
            }
          >
            <button className="ltr:ml-4 rtl:mr-4 uppercase">
              <Avatar>{userInitials()}</Avatar>
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
