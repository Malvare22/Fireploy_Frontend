import FormContainer from "@modules/general/components/formContainer";
import { Proyecto } from "@modules/projects/types/proyecto";
import { CuadroPerfil } from "@modules/usuarios/components/perfil";
import { Usuario } from "@modules/usuarios/types/usuario";
import { RedSocialUsuario } from "@modules/usuarios/types/usuario.redSocial";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Divider,
  Typography,
} from "@mui/material";
import RedSocialIcon from "@modules/general/components/redSocialIcon";
import Facebook from "@modules/general/assets/redesSociales/facebook.png";
import Instagram from "@modules/general/assets/redesSociales/instagram.png";
import X from "@modules/general/assets/redesSociales/x.png";
import Linkedin from "@modules/general/assets/redesSociales/linkedin.png";
import { LabelRedesSociales } from "@modules/usuarios/enum/LabelRedesSociales";
import React, { ReactNode } from "react";
import { LabelUsuario } from "@modules/usuarios/enum/LabelUsuario";

interface Props {
  usuario: Usuario;
  proyectos: Proyecto[];
}

const VerPortafolioPorId: React.FC<Props> = ({ usuario, proyectos }: Props) => {
  const RenderRedesSociales = () => {
    let redesSociales: ReactNode[] = [];
    for (let key in usuario.redSocial) {
      const validKey = key as keyof RedSocialUsuario;
      let elemento: any;
      switch (validKey) {
        case "facebook":
          elemento = (
            <RedSocialIcon
              imagen={Facebook}
              nombre={LabelRedesSociales.facebook}
            />
          );
          break;

        case "linkedin":
          elemento = (
            <RedSocialIcon
              imagen={Linkedin}
              nombre={LabelRedesSociales.linkedin}
            />
          );
          break;

        case "instagram":
          elemento = (
            <RedSocialIcon
              imagen={Instagram}
              nombre={LabelRedesSociales.instagram}
            />
          );
          break;
      }

      redesSociales.push(elemento);
    }

    return redesSociales;
  };

  return (
    <Box sx={{ border: "none", width: "70%" }}>
      <CuadroPerfil usuario={usuario} tipo="ver" />
      <Card
        sx={{
          marginY: 2,
          display: "flex",
          justifyContent: "center",
          gap: 4,
          padding: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Redes Sociales</Typography>
        <RenderRedesSociales />
      </Card>
      <Card
        sx={{
          marginY: 2,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
          {" "}
          <Typography variant="title">{LabelUsuario.descripcion}</Typography>
        </Box>
        <Box>
          <Typography variant="title2">{usuario.descripcion}</Typography>
        </Box>
      </Card>
      <Card
        sx={{
          marginY: 2,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {proyectos.map((proyecto, i) => (
          <CardProyecto key={i} proyecto={proyecto} />
        ))}
      </Card>
    </Box>
  );
};

export const CardProyecto: React.FC<{ proyecto: Proyecto }> = ({
  proyecto,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="titleBold">{proyecto.titulo}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            component={"img"}
            sx={{ border: "1px solid red", width: "30%" }}
            src={proyecto.imagen}
          />
          <Box sx={{ width: "70%", border: "1px solid black", padding: 2 }}>
            <Typography variant="title2">{proyecto.descripcion}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography variant="title2Bold">{"Tecnologías: "}</Typography>
            {proyecto.repositorios.map((repositorio, i) => {
              return (
                <RedSocialIcon
                  imagen={repositorio.tecnologia.logo}
                  nombre={repositorio.tecnologia.nombre}
                />
              );
            })}
          </Box>
          <Box>
            <Button variant="contained">Ver más</Button>
          </Box>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default VerPortafolioPorId;
