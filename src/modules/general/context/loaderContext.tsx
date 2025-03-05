import { createContext } from "react";

type Tipo = {
    loading: boolean,
    setLoading: React.Dispatch<boolean>
}

export const LoaderContext = createContext<undefined | Tipo>(undefined);