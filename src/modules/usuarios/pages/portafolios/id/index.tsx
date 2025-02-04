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
import Facebook from "@modules/general/assets/redesSociales/facebook.png";
import Instagram from "@modules/general/assets/redesSociales/instagram.png";
import X from "@modules/general/assets/redesSociales/x.png";
import Linkedin from "@modules/general/assets/redesSociales/linkedin.png";
import { LabelRedesSociales } from "@modules/usuarios/enum/LabelRedesSociales";
import React, { ReactNode } from "react";
import { LabelUsuario } from "@modules/usuarios/enum/LabelUsuario";
import Modal, { useModal } from "@modules/general/components/modal";
import VistaPreviaUsuario from "@modules/usuarios/components/VistaPreviaUsuario";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
import IconoRedondo from "@modules/general/components/iconoRedondo";

interface Props {
  usuario: Usuario;
  proyectos: Proyecto[];
}

const VerPortafolioPorId: React.FC<Props> = ({ usuario, proyectos }: Props) => {
  const { handleClose, handleOpen, open } = useModal();

  const RenderModal = () => (
    <Modal open={open} handleClose={handleClose} sx={{ width: "90%" }}>
      <CardProyecto proyecto={proyectos[0]} tipo="modal" />
    </Modal>
  );

  const RenderRedesSociales = () => {
    let redesSociales: ReactNode[] = [];
    for (let key in usuario.redSocial) {
      const validKey = key as keyof RedSocialUsuario;
      let elemento: any;
      switch (validKey) {
        case "facebook":
          elemento = (
            <IconoRedondo
              imagen={Facebook}
              nombre={LabelRedesSociales.facebook}
            />
          );
          break;

        case "linkedin":
          elemento = (
            <IconoRedondo
              imagen={Linkedin}
              nombre={LabelRedesSociales.linkedin}
            />
          );
          break;

        case "instagram":
          elemento = (
            <IconoRedondo
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
      <Button onClick={handleOpen}>open</Button>
      <RenderModal />
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
          <CardProyecto key={i} proyecto={proyecto} tipo="básico" />
        ))}
      </Card>
    </Box>
  );
};

export const CardProyecto: React.FC<{
  proyecto: Proyecto;
  tipo: "básico" | "modal";
}> = ({ proyecto, tipo = "básico" }) => {
  const Integrantes = () => (
    <Box>
      <Box>
        <Typography variant="titleBold">Integrantes:</Typography>
      </Box>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 3 }}
      >
        <VistaPreviaUsuario type="autocomplete" usuario={usuariosPrueba[0]} />
        <VistaPreviaUsuario type="autocomplete" usuario={usuariosPrueba[0]} />
        <VistaPreviaUsuario type="autocomplete" usuario={usuariosPrueba[0]} />
        <VistaPreviaUsuario type="autocomplete" usuario={usuariosPrueba[0]} />
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: tipo == "básico" ? 0 : 4,
        }}
      >
        <Box>
          <Typography variant="titleBold">{proyecto.titulo}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            justifyContent: "center",
          }}
        >
          <Box
            component={"img"}
            sx={{ border: "1px solid red", width: { md: "30%", xs: "100%" } }}
            src={proyecto.imagen}
          />
          <Box
            sx={{
              width: { md: "70%", xs: "auto" },
              border: "1px solid black",
              padding: 2,
            }}
          >
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
                <IconoRedondo
                  key={i}
                  imagen={repositorio.tecnologia.logo}
                  nombre={repositorio.tecnologia.nombre}
                  dimensiones={
                    tipo == "modal"
                      ? {
                          height: { xs: 24, md: 48 },
                          width: { xs: 24, md: 48 },
                        }
                      : undefined
                  }
                />
              );
            })}
          </Box>
          {tipo == "básico" && (
            <Box>
              <Button variant="contained">Ver más</Button>
            </Box>
          )}
        </Box>
        {tipo == 'modal' && <>
          <Integrantes></Integrantes>
        </>}
      </Box>
      <Divider />
    </>
  );
};

export default VerPortafolioPorId;
