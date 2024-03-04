import { Link } from "react-router-dom";
import useSearch from "./useSearch";

const Search = () => {
  const { handleInputChange, query, setQuery, suggestions } = useSearch();

  return (
    <div className="relative ">
      <form className="hidden md:block ltr:ml-10 rtl:mr-10">
        <label className="form-control-addon-within rounded-full">
          <input
            onChange={handleInputChange}
            className="form-control border-none"
            placeholder="Search"
            value={query}
          />
          <button className="text-gray-300 dark:text-gray-700 text-xl leading-none la la-search ltr:mr-4 rtl:ml-4"></button>
        </label>
      </form>
      {query.length !== 0 ? (
        <div className="absolute top-12 left-11 w-[14.7rem] bg-gray-100 text-white rounded overflow-hidden dark:bg-gray-700">
          {suggestions?.map((item) => (
            <Link
              key={item.id.toString() + Math.random()}
              to={item.url}
              onClick={() => setQuery("")}
              className="border-b border-gray-400 block px-2 py-2 dark:hover:bg-gray-600 hover:bg-gray-300 text-sm "
            >
              {item.name}
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
