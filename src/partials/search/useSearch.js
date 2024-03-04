import { useState } from "react";
import { useSelector } from "react-redux";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const user = useSelector((state) => state.user.authorizedUser);

  const staticSuggestions = [
    { id: 1, name: "დეპარტამენტები", url: `/departments/${user?.oid}` },
    { id: 2, name: "ორგანიზაციები", url: "/organizations" },
    { id: 3, name: "როლები", url: "/roles" },
    { id: 4, name: "მომხმარებლის რეგისტრაცია", url: "/user/create" },
    { id: 5, name: "მომხმარებლები", url: `users/organisation/${user?.oid}` },
  ];

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;

    setQuery(inputValue);

    const suggestedItems = staticSuggestions.filter((item) =>
      item.name.includes(inputValue)
    );
    setSuggestions(suggestedItems);
  };

  return { handleInputChange, query, setQuery, suggestions };
};

export default useSearch;
