import { useSearchParams } from "react-router-dom";

export const useParamsCustom = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    console.log(searchParams, key, value);
    setSearchParams(newParams);
  };

  return {
    searchParams,
    setSearchParams,
    updateSearchParams,
  };
};
