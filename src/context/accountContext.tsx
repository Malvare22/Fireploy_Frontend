import React, { createContext } from "react";

export const AccountContext = createContext<
  { sesion: boolean; setSesion: React.Dispatch<boolean> } | undefined
>(undefined);
