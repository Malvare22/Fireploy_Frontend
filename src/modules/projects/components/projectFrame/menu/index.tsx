import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import GridViewIcon from "@mui/icons-material/GridView";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import StorageIcon from "@mui/icons-material/Storage";
import DescriptionIcon from "@mui/icons-material/Description";
import { SvgIconProps } from "@mui/material";

interface TypeOption {
  icon: React.ReactElement<SvgIconProps>;
  text: string;
  id: number;
}

const optionsAside: TypeOption[] = [
  {
    icon: <GridViewIcon />,
    text: "Repositorios",
    id: 0,
  },
  {
    icon: <DescriptionIcon />,
    text: "Logs & Mensajes",
    id: 1,
  },
  {
    icon: <StorageIcon />,
    text: "Base de Datos",
    id: 2,
  },
  {
    icon: <SupervisedUserCircleIcon />,
    text: "Colaboradores",
    id: 3,
  },
];

export default function IconMenu() {
  const [currentOption, setCurrentOption] = React.useState(0);

  return (
    <Paper sx={{ width: 360, height: "100%" }}>
      <MenuList>
        {optionsAside.map((option) => (
          <MenuItem
            key={option.id}
            sx={[
              {
                padding: 2,
                ":hover": {
                  color: "warning.main",
                },
              },
              currentOption == option.id && { color: "warning.main" },
            ]}
            onClick={() => setCurrentOption(option.id)}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {option.icon &&
                React.isValidElement(option.icon) &&
                React.cloneElement(option.icon, {
                  sx: {
                    fontSize: 32,
                    color: currentOption == option.id ? "warning.main" : "",
                  },
                })}
            </ListItemIcon>
            <Typography variant="h6">{option.text}</Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}
