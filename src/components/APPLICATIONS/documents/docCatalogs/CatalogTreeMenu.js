import DownArrowIcon from "components/icons/DownArrowIcon";
import RightArrowIcon from "components/icons/RIghtArrowIcon";
import React, { useState } from "react";

const CatalogTreeMenu = ({
  catalogs = [],
  type,
  chosenItem,
  setChosenItem,
}) => {
  const [expandedCatalogs, setExpandedCatalogs] = useState([]);

  const toggleCatalog = (catalogId) => {
    if (expandedCatalogs.includes(catalogId)) {
      setExpandedCatalogs((prev) => prev.filter((id) => id !== catalogId));
    } else {
      setExpandedCatalogs((prev) => [...prev, catalogId]);
    }
  };

  return (
    <ul className="text-lg DO_NOT_CLOSE_MODAL">
      {catalogs.map((catalog) => (
        <li key={catalog.id} className="pl-4 DO_NOT_CLOSE_MODAL">
          <div className="flex items-center DO_NOT_CLOSE_MODAL">
            <div
              onClick={() => toggleCatalog(catalog.id)}
              className="DO_NOT_CLOSE_MODAL text-blue-600 mr-2 focus:outline-none flex items-center justify-center cursor-pointer"
            >
              <span className="DO_NOT_CLOSE_MODAL">
                {expandedCatalogs.includes(catalog.id) ? (
                  <DownArrowIcon />
                ) : (
                  <RightArrowIcon />
                )}
              </span>
            </div>
            <button
              className={`DO_NOT_CLOSE_MODAL ${
                catalog.id === chosenItem?.id && type === "dropdown"
                  ? "border-b-2 border-primary"
                  : ""
              }`}
              onClick={() => {
                setChosenItem(catalog);
              }}
            >
              {catalog.name}
            </button>
          </div>
          {expandedCatalogs.includes(catalog.id) &&
            catalog.children &&
            catalog.children.length > 0 && (
              <CatalogTreeMenu
                setChosenItem={setChosenItem}
                chosenItem={chosenItem}
                type={type}
                catalogs={catalog.children}
              />
            )}
        </li>
      ))}
    </ul>
  );
};

export default CatalogTreeMenu;
