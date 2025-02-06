import { Proyecto } from "@modules/proyectos/types/proyecto";
import { CuadroPerfil } from "@modules/usuarios/components/perfil";
import { Usuario } from "@modules/usuarios/types/usuario";
import { Box, Button, Card, Divider, Typography } from "@mui/material";

import React, { useState } from "react";
import Modal, { useModal } from "@modules/general/components/modal";
import VistaPreviaUsuario from "@modules/usuarios/components/VistaPreviaUsuario";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
import IconoRedondo from "@modules/general/components/iconoRedondo";
import { TecnologiasPrueba } from "@modules/proyectos/test/data/tecnologias.prueba";
import EstadoBoton from "@modules/usuarios/components/estadoBoton";
import RedesSociales from "../redesSociales";
import { LabelPortafolio } from "@modules/usuarios/enum/LabelPortafolio";

interface Props {
  usuario: Usuario;
  proyectos: Proyecto[];
}

const Portafolio: React.FC<Props> = ({ usuario, proyectos }: Props) => {

  const { handleClose, handleOpen, open } = useModal();

  const [modalProyecto, setModalProyecto] = useState<Proyecto | undefined>(
    undefined
  );

  const handleModal = (proyecto: Proyecto) => {
    setModalProyecto(proyecto);
    handleOpen();
  };

  const RenderModal = () =>
    modalProyecto ? (
      <Modal open={open} handleClose={handleClose} sx={{ width: "90%" }}>
        <CardProyecto proyecto={modalProyecto} tipo="modal" />
      </Modal>
    ) : (
      <></>
    );

  return (
    <Box sx={{ border: "none", width: "70%" }}>
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
        <Typography variant="h5">{LabelPortafolio.redesSociales}</Typography>
        <RedesSociales usuario={usuario} />
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
          <Typography variant="title">{LabelPortafolio.descripcion}</Typography>
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
          <CardProyecto
            key={i}
            proyecto={proyecto}
            tipo="básico"
            handleModal={handleModal}
          />
        ))}
      </Card>
    </Box>
  );
};

export const CardProyecto: React.FC<{
  proyecto: Proyecto;
  tipo: "básico" | "modal";
  handleModal?: (proyecto: Proyecto) => void;
}> = ({ proyecto, tipo = "básico", handleModal }) => {
  const ContenidoModal = () => (
    <>
      <Box>
        <Typography variant="titleBold">
          {LabelPortafolio.integrantes}
        </Typography>
      </Box>
      <Box
        sx={{
          display: { md: "grid", xs: "flex" },
          flexDirection: "column",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          marginY: 2,
        }}
      >
        <VistaPreviaUsuario type="portafolio" usuario={usuariosPrueba[0]} />
        <VistaPreviaUsuario type="portafolio" usuario={usuariosPrueba[1]} />
        <VistaPreviaUsuario type="portafolio" usuario={usuariosPrueba[0]} />
        <VistaPreviaUsuario type="portafolio" usuario={usuariosPrueba[1]} />
      </Box>
    </>
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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: tipo == "básico" ? "space-between" : "start",
          }}
        >
          <Box>
            <Typography variant={"titleBold"}>{proyecto.titulo}</Typography>
          </Box>
          <EstadoBoton estado={proyecto.estadoDeEjecucion} url={proyecto.url} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Box
            component={"img"}
            sx={{ width: { md: "30%", xs: "100%" } }}
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
            <Typography variant={tipo == "básico" ? "title2Bold" : "titleBold"}>
              {"Tecnologías "}
            </Typography>
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
            {
              <IconoRedondo
                key={0}
                imagen={TecnologiasPrueba[2].logo}
                nombre={TecnologiasPrueba[2].nombre}
                dimensiones={
                  tipo == "modal"
                    ? {
                        height: { xs: 24, md: 48 },
                        width: { xs: 24, md: 48 },
                      }
                    : undefined
                }
              />
            }
          </Box>
          {tipo == "básico" && handleModal && (
            <Box>
              <Button variant="contained" onClick={() => handleModal(proyecto)}>
                {LabelPortafolio.verMas}
              </Button>
            </Box>
          )}
        </Box>
        {tipo == "modal" && <ContenidoModal />}
      </Box>
      <Divider />
    </>
  );
};

export default Portafolio;
