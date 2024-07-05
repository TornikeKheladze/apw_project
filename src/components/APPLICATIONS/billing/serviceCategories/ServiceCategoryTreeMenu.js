import DownArrowIcon from "components/icons/DownArrowIcon";
import FolderIcon from "components/icons/FolderIcon";
import PackageIcon from "components/icons/PackageIcon";
import RightArrowIcon from "components/icons/RIghtArrowIcon";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ServiceCategoryTreeMenu = ({
  categories = [],
  chosenItem = {},
  setChosenItem = () => {},
}) => {
  const [expandedCategories, setExpandedCategories] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const toggleCatalog = (catalogId) => {
    if (expandedCategories.includes(catalogId)) {
      setExpandedCategories((prev) =>
        prev.filter((catID) => catID !== catalogId)
      );
    } else {
      setExpandedCategories((prev) => [...prev, catalogId]);
    }
  };

  return (
    <ul className="text-lg DO_NOT_CLOSE_MODAL mb-3">
      {categories.map((category) => (
        <li key={category.catID} className="pl-4 DO_NOT_CLOSE_MODAL">
          <div className="flex items-center DO_NOT_CLOSE_MODAL">
            <div
              onClick={() => toggleCatalog(category.catID)}
              className="DO_NOT_CLOSE_MODAL text-blue-600 mr-2 focus:outline-none flex items-center justify-center cursor-pointer"
            >
              <span className="DO_NOT_CLOSE_MODAL">
                {expandedCategories.includes(category.catID) ? (
                  <DownArrowIcon />
                ) : (
                  <RightArrowIcon />
                )}
              </span>
            </div>
            <button
              className={`DO_NOT_CLOSE_MODAL flex items-center ${
                category.catID === chosenItem?.id
                  ? "border-b-2 border-primary"
                  : ""
              }`}
              onClick={() => {
                if (
                  pathname === "/billing/service-categories" ||
                  pathname.includes("/billing/service-categories/details/")
                ) {
                  navigate(
                    `/billing/service-categories/details/${category.catID}`
                  );
                } else {
                  setChosenItem(category);
                }
              }}
            >
              {category.categoryName || category?.name}

              {category.catType === 0 ? (
                <FolderIcon className="ml-2 !w-4 !h-4" />
              ) : (
                <PackageIcon className="ml-2 !w-4 !h-4" />
              )}
            </button>
          </div>
          {expandedCategories.includes(category.catID) &&
            category.children &&
            category.children.length > 0 && (
              <ServiceCategoryTreeMenu
                setChosenItem={setChosenItem}
                chosenItem={chosenItem}
                categories={category.children}
              />
            )}
        </li>
      ))}
    </ul>
  );
};

export default ServiceCategoryTreeMenu;
