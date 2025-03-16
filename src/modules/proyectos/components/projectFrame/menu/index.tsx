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
import { IconButton, SvgIconProps } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
  {
    icon: <SupervisedUserCircleIcon />,
    text: "Adicionales",
    id: 4,
  },
];

interface MenuProps{
  currentOption: number,
  setCurrentOption: React.Dispatch<number>,
  open: boolean,
  setOpen: React.Dispatch<boolean>
}
const  MenuOptions: React.FC<MenuProps> = ({currentOption, setCurrentOption, open, setOpen} : MenuProps) => {

  return (
    <Paper
      sx={{
        width: open ? {xs: '100%', sm: 300} : 64,
        overflow: "hidden",
        transition: "width 0.3s ease-in-out",
      }}
    >
      <IconButton
        sx={{ padding: 2, display: { md: "none" } }}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon sx={{ fontSize: 32 }} />
      </IconButton>
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
            {open && (
              <Typography marginLeft={1} variant="h6">
                {option.text}
              </Typography>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}

export default MenuOptions;
