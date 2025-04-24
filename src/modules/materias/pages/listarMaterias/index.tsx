/**
 * Component to list and manage subjects (materias) in the system.
 * It handles data fetching, filtering, and displaying the table of subjects.
 */

import TablaMaterias from "@modules/materias/components/tablaMaterias";
import { labelListarMaterias } from "@modules/materias/enums/labelListarMaterias";
import { getMateriasService } from "@modules/materias/services/get.materias.services";
import { MateriaTabla } from "@modules/materias/types/materia.tabla";
import { adaptMateriaService } from "@modules/materias/utils/adapters/materia.service";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getMateriasSemestresLabels } from "@modules/materias/utils/materias";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { useNavigate } from "react-router";
import { rutasMaterias } from "@modules/materias/router/router";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { FilterOptions, SelectFilters } from "@modules/general/components/selects";

/**
 * Filter options for the refine panel. Allows filtering by active groups, status, and semester.
 */
const filterOptions: FilterOptions = [
  {
    key: "cantidadGruposActivos",
    label: "Grupos Activos",
    options: [
      ["Grupos Activos", (x) => x != 0],
      ["Sin Grupos Activos", (x) => x == 0],
    ],
  },
  {
    key: "estado",
    label: "Estado",
    options: [
      ["Activo", (x) => x == "A"],
      ["Inactivo", (x) => x == "I"],
    ],
  },
  {
    label: "Semestre",
    key: "semestre",
    options: getMateriasSemestresLabels().map(([value, text]) => [text, (x) => x == value]),
  },
];

/**
 * ListarMaterias component definition.
 * Handles subject listing, search, filtering, error handling and navigation.
 *
 * @returns {JSX.Element} React component
 */
function ListarMaterias() {
  /** Authentication context */
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  /**
   * React Query hook to fetch subjects using the token.
   */
  const { data, isLoading, error } = useQuery({
    queryFn: () => getMateriasService(token),
    queryKey: ["get Materias"],
  });

  // /**
  //  * Search function used by the RefinePanel.
  //  *
  //  * @param {MateriaTabla[]} materia - Array of subject data
  //  * @param {string} s - Search string
  //  * @returns {MateriaTabla[]} Filtered subjects by name or code
  //  */
  // const searchFn = (materia: MateriaTabla[], s: string) => {
  //   return materia.filter((mat) =>
  //     (mat.codigo + mat.nombre).toLowerCase().includes(s.toLowerCase())
  //   );
  // };

  /** Alert dialog control hook */
  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();

  /** Error handling hook */
  const { setError } = useErrorReader(showDialog);

  const materias = data ? data.map(adaptMateriaService) : [];

  const [buffer, setBuffer] = useState<MateriaTabla[]>(materias);

  /**
   * Effect that handles error setting when fetching fails.
   */
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  /** React Router navigation hook */
  const navigate = useNavigate();

  return (
    <>
      {/* Alert Dialog for errors or confirmations */}
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />

      {/* Show loader while fetching data */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={3}>
          {/* Page title */}
          <Typography variant="h4">{labelListarMaterias.titulo}</Typography>

          <SelectFilters data={materias} setRefineData={setBuffer} filterOptions={filterOptions} />

          {materias && <TablaMaterias materias={buffer} />}
          {/* Action button to navigate to create new subject */}
          <Stack direction={"row"} justifyContent={"end"}>
            <Box>
              <GeneralButton
                onClick={() => navigate(rutasMaterias.crearMateria)}
                mode={buttonTypes.add}
              />
            </Box>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default ListarMaterias;
