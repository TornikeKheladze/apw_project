import DownArrowIcon from "components/icons/DownArrowIcon";
import FolderIcon from "components/icons/FolderIcon";
import PackageIcon from "components/icons/PackageIcon";
import RightArrowIcon from "components/icons/RIghtArrowIcon";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CatalogTreeMenu = ({
  catalogs = [],
  chosenItem = {},
  setChosenItem = () => {},
}) => {
  const [expandedCatalogs, setExpandedCatalogs] = useState([]);
  const navigate = useNavigate();

  const toggleCatalog = (catalogId) => {
    if (expandedCatalogs.includes(catalogId)) {
      setExpandedCatalogs((prev) => prev.filter((id) => id !== catalogId));
    } else {
      setExpandedCatalogs((prev) => [...prev, catalogId]);
    }
  };

  return (
    <ul className="text-lg ">
      {catalogs.map((catalog) => (
        <li key={catalog.id} className="pl-4 ">
          <div className="flex items-center ">
            <div
              onClick={() => toggleCatalog(catalog.id)}
              className=" text-blue-600 mr-2 focus:outline-none flex items-center justify-center cursor-pointer"
            >
              <span className="">
                {expandedCatalogs.includes(catalog.id) ? (
                  <DownArrowIcon />
                ) : (
                  <RightArrowIcon />
                )}
              </span>
            </div>
            <button
              className={`flex gap-1 items-center ${
                catalog.id === chosenItem?.id ? "border-b-2 border-primary" : ""
              }`}
              onClick={() => {
                setChosenItem(catalog);
                navigate(`/documents/categories/${catalog.id}`);
              }}
            >
              {catalog.name}
              {catalog.type === 0 ? (
                <FolderIcon className="ml-2 !w-4 !h-4" />
              ) : (
                <PackageIcon className="ml-2 !w-4 !h-4" />
              )}
            </button>
          </div>
          {expandedCatalogs.includes(catalog.id) &&
            catalog.children &&
            catalog.children.length > 0 && (
              <CatalogTreeMenu
                setChosenItem={setChosenItem}
                chosenItem={chosenItem}
                catalogs={catalog.children}
              />
            )}
        </li>
      ))}
    </ul>
  );
};

export default CatalogTreeMenu;
