import Input from "components/form/Input";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setFilter } from "reducers/FilterReducer";

const SelectSearch = ({ options = [], colName, searchOnChoose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { pathname } = useLocation();

  const { filter } = useSelector((store) => store.filter);

  const dispatch = useDispatch();

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (inputValue) => {
    setSearchTerm(inputValue);
    const filtered = options.filter((option) => {
      // temporary name
      const name = option.name || option.name_geo || option.currency_name;
      return name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilteredOptions(filtered);
  };

  const handleSelect = (selectedValue) => {
    if (selectedValue) {
      setSearchTerm(
        selectedValue.name ||
          selectedValue.name_geo ||
          selectedValue.currency_name
      );
      dispatch(setFilter({ ...filter, [colName]: selectedValue.id }));
      if (
        pathname === "/billing/transactions" ||
        pathname === "/billing/customers" ||
        pathname === "/billing/transactions/returned"
      ) {
        searchOnChoose({ ...filter, [colName]: selectedValue.id });
      }
    } else {
      setSearchTerm("");
      dispatch(setFilter({ ...filter, [colName]: selectedValue }));
      if (
        pathname === "/billing/transactions" ||
        pathname === "/billing/customers" ||
        pathname === "/billing/transactions/returned"
      ) {
        searchOnChoose({ ...filter, [colName]: selectedValue });
      }
    }
    setFilteredOptions(options);
    setShowSuggestions(false);
  };

  // useEffect(() => {
  //   if (
  //     !options.find(({ id }) => {
  //       if (typeof id === "string") {
  //         return id === filter[colName];
  //       } else {
  //         return +id === +filter[colName];
  //       }
  //     })?.name
  //   ) {
  //     setSearchTerm("");
  //   }
  // }, [colName, filter, options]);

  useEffect(() => {
    if (!searchTerm) {
      dispatch(setFilter({ ...filter, [colName]: null }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colName, dispatch, searchTerm]);

  return (
    <div ref={ref} className="relative inline-block text-left cursor-pointer">
      <Input
        type="text"
        placeholder="ძებნა..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onClick={() => setShowSuggestions(true)}
      />
      {showSuggestions && (
        <ul className="p-1 absolute z-10 w-full mt-2 bg-input rounded-md shadow-md max-h-[10rem] overflow-y-auto">
          <li
            className="hover:bg-gray-300 text-xs mb-2"
            onClick={() => handleSelect(null)}
          >
            ყველა
          </li>
          {filteredOptions.map((option) => (
            <li
              className="hover:bg-gray-300 text-xs font-light mb-2"
              key={option.id}
              onClick={() => handleSelect(option)}
            >
              {/* temporary name */}
              {option.name || option.name_geo || option.currency_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectSearch;
