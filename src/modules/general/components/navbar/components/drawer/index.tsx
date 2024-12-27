import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import { useNavigate } from "react-router-dom";

type PairIcons = {
  icon: React.ReactNode;
  label: string;
  url: string;
};

const myProjects: PairIcons = {
  icon: <AccountTreeIcon />,
  label: "Mis Proyectos",
  url: "myProjects",
};

const myPortafolio: PairIcons = {
  icon: <DocumentScannerIcon />,
  label: "Mi Portafolio",
  url: "myPortafolio",
};

const users: PairIcons = {
  icon: <SupervisedUserCircleIcon />,
  label: "Usuarios",
  url: "users",
};

const subjects: PairIcons = {
  icon: <NoteAltIcon />,
  label: "Materias y Cursos",
  url: "subjects",
};

const projects: PairIcons = {
  icon: <CloudCircleIcon />,
  label: "Proyectos",
  url: "projects",
};

const safari: PairIcons = {
  icon: <ExploreIcon />,
  label: "Explorar Portafolios",
  url: "portafolios",
};

const admin: PairIcons[] = [
  myProjects,
  myPortafolio,
  users,
  subjects,
  projects,
  safari,
];

export default function DrawerCustom() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();

  const DrawerList = (
    <Box
      sx={{ width: { xs: 240, md: 360 } }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {admin.map((option, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(option.url)}>
              <ListItemIcon
                sx={{
                  "& svg": {
                    fontSize: 32,
                  },
                }}
              >
                {option.icon}
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">{option.label}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List></List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ fontSize: 32, color: "white" }}></MenuIcon>
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
