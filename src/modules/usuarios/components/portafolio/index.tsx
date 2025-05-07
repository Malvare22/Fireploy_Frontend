import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { Usuario } from "@modules/usuarios/types/usuario";
import { showSocialNetworks } from "@modules/usuarios/utils/showSocialNetworks";
import { Avatar, Box, Card, Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProjectCard from "@modules/general/components/projectCard";
import SpringModal from "@modules/general/components/springModal";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";
import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrder";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { ShowGoal } from "@modules/general/components/portafolioCard";
import { useParams } from "react-router";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import { labelPortafolio } from "@modules/usuarios/enum/labelPortafolio";
import LoaderElement from "@modules/general/components/loaderElement";
import { getProjectByUserId } from "@modules/proyectos/services/get.project";
import { adaptProject, adaptProjectToCard } from "@modules/proyectos/utils/adapt.proyecto";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { useModal } from "@modules/general/components/modal/hooks/useModal";

/**
 * Portfolio component – responsible for rendering a user's public profile and projects.
 * 
 * This component fetches and displays user information, a list of their projects, social media links,
 * and achievements. It allows sorting and filtering of the project list and opens a modal
 * for viewing project details.
 *
 * It uses Material-UI components for layout and styling, with the option to customize project
 * filtering, sorting by score and semester, and viewing detailed information in modals.
 *
 * @component
 * @returns {JSX.Element} A full portfolio page showcasing a user's profile and projects.
 * 
 * @example
 * ```tsx
 * <Portafolio />
 * ```
 */
const Portafolio = () => {
  const { id } = useParams();

  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);
  const [projects, setProjects] = useState<ProyectoCard[]>([]);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryFn: async () => {
      const userInfo = await getUsuarioService(parseInt(id || "-1"), token);
      const projectInfo = await getProjectByUserId(token, parseInt(id || "-1"));
      return { userInfo, projectInfo };
    },
    queryKey: ["Project & User Information"],
  });

  const { showDialog, handleAccept, title, type, open, message } = useAlertDialog2();
  const { setError } = useErrorReader(showDialog);
  useEffect(() => {
    if (isSuccess && data) {
      setUsuario(adaptUser(data.userInfo));
      setProjects(data.projectInfo.map((project) => adaptProjectToCard(adaptProject(project))));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  const [selectProyecto, setSelectProyecto] = useState<ProyectoCard | undefined>(undefined);
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  /**
   * Handles the selection of a project and opens the modal to display its details.
   *
   * @param {ProyectoCard} proyecto - The project selected by the user
   */
  const handleCard = (proyecto: ProyectoCard) => {
    setSelectProyecto(proyecto);
    handleOpenModal();
  };

  const { handleOrder, orderDataFn } = useOrderSelect<ProyectoCard>();

  const { filterDataFn } = useFilters<ProyectoCard>();

  const logros = { titulo: "Repositorios en GitHub", valor: "50+" };

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        type={type}
        textBody={message}
      />
      {isLoading ? (
        <LoaderElement />
      ) : (
        <>
          {usuario ? (
            <Box>
              <SpringModal handleClose={handleCloseModal} open={openModal}>
                {selectProyecto != undefined && (
                  <ModalProyectoPortafolio proyecto={selectProyecto} />
                )}
              </SpringModal>
              <Card
                sx={{
                  padding: 6,
                }}
              >
                <Stack spacing={3}>
                  <Stack spacing={3} alignItems={"center"}>
                    <Avatar src={usuario.fotoDePerfil} sx={{ width: 96, height: 96 }} />
                    <Typography variant="h4" textAlign={"center"}>
                      {`${usuario.nombres} ${usuario.apellidos}`}
                    </Typography>
                    <Stack alignItems={"center"} marginTop={3} spacing={4}>
                      <Stack spacing={2}>
                        <Typography variant="h6" textAlign={"center"}>
                          {labelPortafolio.acercaDe}
                        </Typography>
                        <Typography variant="body1" textAlign={"center"} maxWidth={850}>
                          {usuario.descripcion}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack alignItems={"center"} spacing={3}>
                    <Stack direction="row" spacing={2}>
                      {showSocialNetworks(usuario.redSocial)}
                    </Stack>
                    <Grid2 container spacing={2} display={"flex"} justifyContent={"center"}>
                      {[0, 1, 2].map(() => (
                        <Grid2 size={{ xs: 6, md: 4 }}>
                          <ShowGoal logro={logros} />
                        </Grid2>
                      ))}
                    </Grid2>
                  </Stack>
                </Stack>
              </Card>
              <Stack spacing={4} marginTop={3}>
                <Card sx={{ width: "100%" }}>
                  <Grid2
                    container
                    spacing={2}
                    direction={"row"}
                    alignItems={"center"}
                    sx={{ margin: 2, marginBottom: 4 }}
                  >
                    <Grid2
                      size={{ md: 2, xs: 12 }}
                      height={"100%"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography variant="body1" fontWeight="bold" marginTop={2}>
                        {labelPortafolio.ordenarPor}
                      </Typography>
                    </Grid2>
                    <Grid2 size={{ md: 4, xs: 12 }}>
                      <TextField
                        select
                        onChange={(e) => handleOrder("puntuacion", e.target.value as Order)}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        label={labelPortafolio.puntuacion}
                        fullWidth
                      >
                        <MenuItem value="No Aplicar">
                          <em>No aplicar</em>
                        </MenuItem>
                        <MenuItem value="asc">{labelSelects.mayor}</MenuItem>
                        <MenuItem value="desc">{labelSelects.menor}</MenuItem>
                      </TextField>
                    </Grid2>

                    <Grid2 size={{ md: 4, xs: 12 }}>
                      <TextField
                        onChange={(e) =>
                          handleOrder("semestre", (e.target.value as Order) || undefined)
                        }
                        select
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        label={labelPortafolio.semestre}
                        fullWidth
                      >
                        <MenuItem value="No Aplicar">
                          <em>No aplicar</em>
                        </MenuItem>
                        <MenuItem value="asc">{labelSelects.mayor}</MenuItem>
                        <MenuItem value="desc">{labelSelects.menor}</MenuItem>
                      </TextField>
                    </Grid2>
                  </Grid2>
                </Card>

                <Box sx={{ flexGrow: 1 }}>
                  <Grid2 container spacing={1} rowSpacing={4} justifyContent={"space-between"}>
                    {filterDataFn(orderDataFn(projects)).map((proyecto) => (
                      <Grid2
                        size={{ xl: 4, sm: 6, xs: 12 }}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <ProjectCard handleOpen={() => handleCard(proyecto)} proyecto={proyecto} />
                      </Grid2>
                    ))}
                  </Grid2>
                </Box>
              </Stack>
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Portafolio;
