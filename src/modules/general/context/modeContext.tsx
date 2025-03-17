import { PaletteMode } from "@mui/material";
import React, { createContext } from "react";

export const ModeContext = createContext<{
  mode: PaletteMode | undefined;
  setMode: React.Dispatch<PaletteMode | undefined>;
}>({ mode: undefined, setMode: () => {} });
