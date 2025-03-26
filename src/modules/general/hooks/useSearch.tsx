import { useState } from "react";

function useSearch() {
  const [searchValue, setSearchValue] = useState("");

  return { searchValue, setSearchValue };
}

export default useSearch;
