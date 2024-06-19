import { filterDuplicates } from "helpers/filterArray";
import React, { useState, useRef, useEffect } from "react";

const PermissionSelect = ({
  options,
  selectedPermissions: selectedOptions,
  setSelectedPermissions: setSelectedOptions,
}) => {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(({ name = "" }) =>
    name?.toLowerCase().includes(searchText.toLowerCase())
  );
  const handleCheckboxChange = (option, all = false) => {
    if (all) {
      if (selectedOptions.length === filteredOptions.length) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions(
          filterDuplicates([...selectedOptions, ...filteredOptions], "id")
        );
      }
    } else {
      if (selectedOptions.map(({ id }) => id).includes(option.id)) {
        setSelectedOptions(
          selectedOptions.filter(({ id }) => id !== option.id)
        );
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="relative text-left mt-4" ref={dropdownRef}>
      <button
        type="button"
        className=" form-control flex justify-between items-center w-full "
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>უფლებები</span>
        <span className="la la-caret-down"></span>
      </button>
      {isOpen && (
        <div className="origin-top-right dark:bg-gray-900 absolute h-80 py-2 overflow-y-auto w-full z-20 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <input
              type="text"
              className="border form-control rounded w-full px-3 py-2 focus:outline-none focus:border-blue-300"
              placeholder="უფლეებების ძებნა..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <ul className="mt-2">
              <li>
                <input
                  type="checkbox"
                  id="all"
                  className="mr-2 w-4 h-4 form-checkbox text-blue-500 cursor-pointer"
                  checked={selectedOptions.length === filteredOptions.length}
                  onChange={() => handleCheckboxChange({}, true)}
                />
                <label className="cursor-pointer" htmlFor="all">
                  ყველა
                </label>
              </li>
              {filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className="flex items-center hover:text-primary-400"
                >
                  <input
                    type="checkbox"
                    id={option.name}
                    className="w-4 h-4 mr-2 flex-shrink-0 form-checkbox text-blue-500 cursor-pointer"
                    checked={selectedOptions
                      .map(({ name }) => name)
                      .includes(option.name)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  <label className="cursor-pointer" htmlFor={option.name}>
                    {option.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionSelect;
