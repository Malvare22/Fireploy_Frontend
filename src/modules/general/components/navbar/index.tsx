import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import { styles } from "./styles";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { useEffect, useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavbarLabel } from "../../enums/navbarLabel";
import { useNavigate } from "react-router-dom";
import { usersData } from "../../../users/utils/dataDummy/usersDataDummy";

/**
 * type 0 administrator
 * type 1 teacher
 * type 2 student,
 *
 */
function Navbar() {
  const [type, setType] = useState(-1);

  useEffect(() => {
    const t = localStorage.getItem("rol");
    let x: number;
    switch (t) {
      case "A":
        x = 0;
        break;
      case "E":
        x = 2;
        break;
      case "D":
        x = 1;
        break;
      default:
        x = -1;
        break;
    }
    setType(x);
  });

  return (
    <Box sx={styles.container}>
      <Box sx={styles.buttonsContainer}>
        {type == 0 && (
          <>
            <Box>
              <Button
                variant="navbarOption"
                href="/projects"
                sx={styles.option}
              >
                {NavbarLabel.projects}
              </Button>
            </Box>
            <Box>
              <Button
                variant="navbarOption"
                href="/subjects"
                sx={styles.option}
              >
                {NavbarLabel.subjects}
              </Button>
            </Box>
            <Box>
              <Button
                variant="navbarOption"
                href="/teachers"
                sx={styles.option}
              >
                {NavbarLabel.teachers}
              </Button>
            </Box>
            <Box>
              <Button
                variant="navbarOption"
                href="/students"
                sx={styles.option}
              >
                {NavbarLabel.students}
              </Button>
            </Box>
          </>
        )}
        {(type == 1 || type == 2) && (
          <>
            <Box>
              <Button
                variant="navbarOption"
                href="/myProjects"
                sx={styles.option}
              >
                {NavbarLabel.myProjects}
              </Button>
            </Box>
            <Box>
              <Button
                variant="navbarOption"
                href="/myPortfolio"
                sx={styles.option}
              >
                {NavbarLabel.myPortfolio}
              </Button>
            </Box>
            <Box>
              <Button
                variant="navbarOption"
                href="/otherPortfolios"
                sx={styles.option}
              >
                {NavbarLabel.otherPortfolios}
              </Button>
            </Box>
          </>
        )}
        {type == 2 && (
          <>
            <Box>
              <Button
                variant="navbarOption"
                href="/projects"
                sx={styles.option}
              >
                {NavbarLabel.projects}
              </Button>
            </Box>
            <Box>
              <Button
                variant="navbarOption"
                href="/subjects"
                sx={styles.option}
              >
                {NavbarLabel.subjects}
              </Button>
            </Box>
          </>
        )}
      </Box>
      <ProfileSection />
    </Box>
  );
}

export default Navbar;

function ProfileSection() {
  const [open, setOpen] = useState(false);

  const [rol, setRol] = useState("");

  const [userName, setUserName] = useState("");

  const [img, setImg] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("rol");
    let x: string = "";
    switch (t) {
      case "A":
        x = NavbarLabel.A;
        break;
      case "E":
        x = NavbarLabel.E;
        break;
      case "D":
        x = NavbarLabel.D;
        break;
    }
    setRol(x);
    x = "";
    if (localStorage.getItem("userName") != null) {
      x = localStorage.getItem("userName") as string;
    }
    setUserName(x);

    const code = localStorage.getItem("code") as string;

    const user = usersData.find((u) => u.code.toString() == code);

    if (user != undefined) setImg(user?.img);
  });

  const handleButton = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={styles.profileContainer}>
        <Box sx={styles.img} component={'img'} src={img}></Box>
        <Box
          sx={{
            marginLeft: 4,
            marginRight: 4,
          }}
        >
          <Typography variant="h5" color="primary">
            {userName}
          </Typography>
          {rol != null && (
            <Typography variant="h6" color="customGrey.light">
              {rol}
            </Typography>
          )}
        </Box>
        <Box>
          <IconButton onClick={handleButton}>
            <ArrowCircleDownIcon
              sx={{
                fill: "white",
                fontSize: 32,
                transform: open ? "rotate(180deg)" : "",
              }}
            />
          </IconButton>
        </Box>
      </Box>
      {open && <IconMenu />}
    </Box>
  );
}

export function IconMenu() {
  const router = useNavigate();

  const handleOption = (href: string) => {
    router(href);
  };

  return (
    <Paper sx={styles.profileOptionsContainer}>
      <MenuList>
        <MenuItem onClick={() => handleOption("/myProfile")}>
          <ListItemText>
            <Typography variant="h6">{NavbarLabel.myProfile}</Typography>
          </ListItemText>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={() => handleOption("/")}>
          <ListItemText>
            <Typography variant="h6" color="error">
              {NavbarLabel.closeSession}
            </Typography>
          </ListItemText>
          <ListItemIcon>
            <PowerSettingsNewIcon color="error" />
          </ListItemIcon>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
