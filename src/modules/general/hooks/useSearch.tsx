import { useState } from "react";

function useSearch() {
  const [searchValue, setSearchValue] = useState("");

  const [buffer, setBuffer] = useState("");

  const filteredData = <T,>(
    data: T[] | undefined,
    filter: (items: T[]) => T[]
  ): T[] => {
    if (!data) return [];
    if (searchValue.trim() === "") return data;
    return filter(data);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(buffer);
    }
  };

  return {
    searchValue,
    setSearchValue,
    buffer,
    setBuffer,
    handleKeyDown,
    filteredData,
  };
}

export default useSearch;
