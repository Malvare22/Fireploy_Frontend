import { labelMenu } from "@modules/general/enums/labelMenu";
import {
  ProyectoCard,
} from "@modules/proyectos/types/proyecto.card";
import {
  Box,
  Button,
  Card,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode, useContext, useEffect, useState } from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ExploreIcon from "@mui/icons-material/Explore";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CustomizedSteppers from "../customStepper";
import AnimatedCard from "../animatedCard";
import { TiposUsuario } from "@modules/usuarios/types/usuario";
import useQuery from "@modules/general/hooks/useQuery";
import { getProyectosService } from "@modules/proyectos/services/getProyectosService";
import { AccountContext } from "@modules/general/context/accountContext";
import { EstadoProyecto } from "@modules/proyectos/types/proyecto.tipo";
import AlertDialog from "../alertDialog";

type MenuCardProps = {
  color: string;
  label: string;
  icon: ReactNode;
  url?: string;
};

type MenuProps = {
  type?: TiposUsuario;
};

const Menu: React.FC<MenuProps> = ({ type = "A" }) => {
  const [proyectos, setProyectos] = useState<ProyectoCard[]>([]);

  const { localUser } = useContext(AccountContext);

  const { error, initQuery, responseData, handleAlertClose, open, message } = useQuery<unknown>(
    () => getProyectosService(localUser?.id ?? 0, localUser?.token ?? ""),
    false
  );

  useEffect(() => {
    const fetch = async () => {
      await initQuery();
    };
    if(localUser != null){ fetch();
      console.log(localUser)
    }
  }, [localUser]);

  useEffect(() => {
    if (!responseData) return;
    setProyectos(responseData as ProyectoCard[]);
  }, [responseData]);

  const theme = useTheme();
  const menuOptions: MenuCardProps[] = [
    {
      color: theme.palette.success.main,
      label: "Mis Proyectos",
      icon: <AccountTreeIcon />,
    },
    {
      color: theme.palette.info.main,
      label: "Mis Repositorios",
      icon: <GitHubIcon />,
    },
    {
      color: theme.palette.warning.main,
      label: "Mis Bases de Datos",
      icon: <StorageIcon />,
    },
    {
      color: theme.palette.error.main,
      label: "Materias",
      icon: <MenuBookIcon />,
    },
    {
      color: theme.palette.primary.light,
      label: "Portafolios",
      icon: <TravelExploreIcon />,
    },
    {
      color: theme.palette.secondary.main,
      label: "Proyectos",
      icon: <ExploreIcon />,
    },
    //Propiedades de Administrador
    {
      color: theme.palette.error.main,
      label: "Usuarios",
      icon: <SupervisedUserCircleIcon />,
    },
  ];

  const getMenuOptionsForUser = () => {
    if (type == "A") {
      return menuOptions;
    } else {
      return menuOptions.slice(0, 6);
    }
  };

  const MenuBox = (
    <Grid2
      container
      flexGrow={1}
      padding={4}
      spacing={6}
      rowSpacing={6}
      justifyContent={{ xs: "center", sm: "normal" }}
    >
      {getMenuOptionsForUser().map((option, key) => (
        <Grid2
          size={{ xs: 12, md: 6, xl: 4 }}
          display="flex"
          justifyContent={"center"}
        >
          <MenuCard
            key={key}
            color={option.color}
            icon={option.icon}
            label={option.label}
          />
        </Grid2>
      ))}
    </Grid2>
  );
  return (
    <Stack
      direction={{ md: "row", sm: "column" }}
      padding={2}
      justifyContent={"space-around"}
    >
      {proyectos.length != 0 && <TopProjects proyectos={proyectos} />}
      <Box paddingY={1}>{MenuBox}</Box>
      {error && <AlertDialog handleClose={handleAlertClose} open={open} title="Cargar información" textBody={message}/>}
    </Stack>
  );
};

const MenuCard: React.FC<MenuCardProps> = ({ color, icon, label }) => {
  return (
    <AnimatedCard
      sx={{
        backgroundColor: color,
        color: "white",
        width: 300,
        height: 80,
        position: "relative",
        padding: 2,
        cursor: "pointer",
      }}
    >
      <Box sx={{ width: 200 }}>
        <Typography variant="h4" fontWeight={"bold"}>
          {label}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 4,
          right: 4,
          "& svg": {
            fontSize: 48,
          },
        }}
      >
        {icon}
      </Box>
    </AnimatedCard>
  );
};

type TopProjectsProps = {
  proyectos: ProyectoCard[];
};

const TopProjects: React.FC<TopProjectsProps> = ({ proyectos }) => {
  const theme = useTheme();

  function ProjectItem(status: EstadoProyecto, label: string) {
    const ViewStatus = (
      <Box
        sx={{
          width: 16,
          height: 16,
          backgroundColor:
            status == "A"
              ? theme.palette.success.main
              : theme.palette.warning.main,
          borderRadius: "100%",
          animation: "blink 1s infinite alternate",
          "@keyframes blink": {
            "0%": { opacity: 1 },
            "50%": { opacity: 0.7 },
            "100%": { opacity: 1 },
          },
          marginTop: 0.5,
        }}
      />
    );

    return (
      <Stack direction={"row"} spacing={1}>
        <Box>{ViewStatus}</Box>
        <Button
          variant="text"
          sx={{ textTransform: "none", textAlign: "start", padding: 0 }}
        >
          <Typography>{label}</Typography>
        </Button>
      </Stack>
    );
  }

  return (
    <Card sx={{ width: { md: 600, xs: "100%" } }}>
      <Stack spacing={1} margin={2}>
        <Typography>{labelMenu.topProyectos}</Typography>
        {proyectos.map((proyecto) =>
          ProjectItem(proyecto.estado, proyecto.titulo)
        )}
      </Stack>
    </Card>
  );
};

const Stepper = () => {
  return <CustomizedSteppers />;
};

function ChangesFrame() {
  return (
    <Card>
      <Typography>{labelMenu.ultimosCambios}</Typography>
      <Stepper />
    </Card>
  );
}

export default Menu;
