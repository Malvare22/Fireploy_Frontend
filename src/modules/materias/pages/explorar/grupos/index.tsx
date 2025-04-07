import AlertDialogError from "@modules/general/components/alertDialogError";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import CardCurso from "@modules/materias/components/cardCurso";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import { getMateriaById } from "@modules/materias/services/get.materia.services";
import { Materia } from "@modules/materias/types/materia";
import { adaptMateriaServiceToMateria } from "@modules/materias/utils/adapters/materia.service";
import { Alert, Card, Grid2, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Component to display all course groups (cursos) for a specific subject (materia).
 *
 * This component fetches a materia by its ID (from URL params), and renders
 * the materia's name and a list of its associated cursos. If no cursos are
 * present, it shows a warning alert. Errors and loading states are also handled.
 *
 * @component
 */
function VerCursosMateria() {
  // Get subject ID from the route parameters
  const { idMateria } = useParams();

  // Get auth token from context
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  // React Query hook to fetch the materia by its ID
  const { data, isLoading, error } = useQuery({
    queryFn: () => getMateriaById(token, idMateria ?? "-1"),
    queryKey: [],
  });

  // Alert dialog control for error handling
  const { handleClose: handleCloseFailFetch, open: openFailFetch } = useAlertDialog();

  // State to hold the adapted materia object
  const [materia, setMateria] = useState<Materia | undefined>(undefined);

  // Update materia state when data is available
  useEffect(() => {
    if (data) {
      setMateria(adaptMateriaServiceToMateria(data));
    }
  }, [data]);

  return (
    <>
      {/* Display an error dialog if there's a fetch error */}
      {error && (
        <AlertDialogError
          error={error}
          handleClose={handleCloseFailFetch}
          open={openFailFetch}
          title="Consultar Grupos Materia"
        />
      )}

      {/* Show loading indicator or main content */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <>
          {/* Only render if materia exists */}
          {materia && (
            <Stack spacing={3} paddingX={6}>
              {/* Materia name in a card */}
              <Card>
                <Stack spacing={3} margin={4}>
                  <Typography variant="h3">{materia.nombre}</Typography>
                </Stack>
              </Card>

              {/* List of cursos or warning message */}
              {materia.cursos && materia.cursos.length > 0 ? (
                <>
                  <Typography variant="h4">{labelListarCursos.grupos}</Typography>
                  <Grid2 container spacing={4}>
                    {materia.cursos?.map((curso, key) => (
                      <Grid2 size={{ md: 3, sm: 6, xs: 12 }} key={key}>
                        <CardCurso curso={curso} />
                      </Grid2>
                    ))}
                  </Grid2>
                </>
              ) : (
                <Alert severity="warning" sx={{ fontSize: 64 }}>
                  <Typography>{labelListarCursos.noHayGrupos}</Typography>
                </Alert>
              )}
            </Stack>
          )}
        </>
      )}
    </>
  );
}

export default VerCursosMateria;
