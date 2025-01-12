import { theme } from "@core/themes";
import { TypeProject } from "./TypeProject";

export const getStatusColor = (status: TypeProject["estado"]): string => {
  switch (status) {
    case "cargando":
      return theme.palette.warning.main;
    case "offline":
      return theme.palette.customGrey.main;
    case "online":
      return theme.palette.success.main;
    case "pausado":
      return theme.palette.customGrey.main;
    case "error":
      return theme.palette.error.main;
  }
};
