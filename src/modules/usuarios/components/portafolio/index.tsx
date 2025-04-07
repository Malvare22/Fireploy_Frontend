import { proyecto1, proyecto2, ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { Usuario } from "@modules/usuarios/types/usuario";
import { showSocialNetworks } from "@modules/usuarios/utils/showSocialNetworks";
import {
  Avatar,
  Box,
  Card,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProjectCard from "@modules/general/components/projectCard";
import useSpringModal from "@modules/general/hooks/useSpringModal";
import SpringModal from "@modules/general/components/springModal";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";
import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrderSelect";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { ShowGoal } from "@modules/general/components/portafolioCard";
import { useParams } from "react-router";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import { getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { labelPortafolio } from "@modules/usuarios/enum/labelPortafolio";
import LoaderElement from "@modules/general/components/loaderElement";
import AlertDialogError from "@modules/general/components/alertDialogError";

/**
 * Portfolio component responsible for rendering a user's public profile and projects.
 * 
 * Fetches and displays user information, a list of their projects, social media links,
 * and achievements. Allows sorting and filtering of the project list and opens a modal
 * for detailed project view.
 *
 * @component
 * @returns {JSX.Element} A full portfolio page for a specific user
 */
const Portafolio = () => {
  const { id } = useParams();

  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryFn: () => getUsuarioService(parseInt(id || "-1"), token),
    queryKey: [],
  });

  const {
    handleClose: handleCloseFailFetch,
    open: openFailFetch,
    handleOpen: handleOpenFailFetch,
  } = useAlertDialog();

  useEffect(() => {
    if (isSuccess && data) {
      setUsuario(adaptUser(data));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      handleOpenFailFetch();
    }
  }, [isError]);

  const proyectos: ProyectoCard[] = [proyecto1, proyecto2, proyecto1, proyecto2];
  const [selectProyecto, setSelectProyecto] = useState<ProyectoCard | undefined>(undefined);
  const { handleClose, handleOpen, open } = useSpringModal();
  const { filterData } = useFilters<ProyectoCard>();

  /**
   * Handles the selection of a project and opens the modal to display its details.
   *
   * @param {ProyectoCard} proyecto - The project selected by the user
   */
  const handleCard = (proyecto: ProyectoCard) => {
    setSelectProyecto(proyecto);
    handleOpen();
  };

  const { handleRequestSort, orderBy, stableSort } = useOrderSelect<ProyectoCard>();

  const logros = { titulo: "Repositorios en GitHub", valor: "50+" };

  return (
    <>
      {error && (
        <AlertDialogError
          error={error}
          handleClose={handleCloseFailFetch}
          open={openFailFetch}
          title="Consultar Portafolios"
        />
      )}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <>
          {usuario ? (
            <Box>
              <SpringModal handleClose={handleClose} open={open}>
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
              <Stack direction={{ md: "row", xs: "column" }} spacing={4} marginTop={3}>
                <Card sx={{ width: { md: 360, xs: "100%" }, height: "100%" }}>
                  <Stack spacing={2} sx={{ margin: 2, marginBottom: 4 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {labelPortafolio.ordenarPor}
                    </Typography>

                    <FormControl variant="standard" sx={{ width: "100%" }}>
                      <InputLabel id="puntuacion-label">{labelPortafolio.puntuacion}</InputLabel>
                      <Select
                        labelId="puntuacion-label"
                        value={orderBy.puntuacion}
                        onChange={(e) =>
                          handleRequestSort("puntuacion", (e.target.value as Order) || undefined)
                        }
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>No aplicar</em>
                        </MenuItem>
                        <MenuItem value="asc">{labelSelects.mayor}</MenuItem>
                        <MenuItem value="desc">{labelSelects.menor}</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl variant="standard" sx={{ width: "100%" }}>
                      <InputLabel id="semestre-label">{labelPortafolio.semestre}</InputLabel>
                      <Select
                        labelId="semestre-label"
                        value={orderBy.semestre}
                        onChange={(e) =>
                          handleRequestSort("semestre", (e.target.value as Order) || undefined)
                        }
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>No aplicar</em>
                        </MenuItem>
                        <MenuItem value="asc">{labelSelects.mayor}</MenuItem>
                        <MenuItem value="desc">{labelSelects.menor}</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Card>

                <Box sx={{ flexGrow: 1 }}>
                  <Grid2 container spacing={1} rowSpacing={4} justifyContent={"space-between"}>
                    {filterData(stableSort(proyectos)).map((proyecto) => (
                      <Grid2
                        size={{ xl: 4, sm: 6, xs: 12 }}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <ProjectCard
                          tipo="portafolio"
                          handleOpen={() => handleCard(proyecto)}
                          proyecto={proyecto}
                        />
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
