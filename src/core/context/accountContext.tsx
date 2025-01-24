import { createContext } from "react";

export const AccountContext = createContext<
  | { localUser: string | null; setLocalUser: React.Dispatch<string | null> }
  | undefined
>(undefined);
