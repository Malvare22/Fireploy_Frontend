import { createContext } from "react";
import { URLSearchParamsInit } from "react-router";

type ParamsContextType = {
  searchParams: URLSearchParams;
  setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: { replace?: boolean }) => void;
  updateSearchParams: (key: string, value: string) => void
};

export const ParamsContext = createContext<ParamsContextType>({
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
  updateSearchParams: () => {}
});