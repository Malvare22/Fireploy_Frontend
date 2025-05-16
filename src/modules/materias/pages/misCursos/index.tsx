import { Grid2, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CursoTabla } from "@modules/materias/types/curso.tabla";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import { getCursos } from "@modules/materias/services/get.curso";
import { adaptCursoTabla } from "@modules/materias/utils/adapters/curso";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { FilterOptions, SelectFilters } from "@modules/general/components/selects";
import TablaCursos from "@modules/materias/components/tablaCursos";
import useSearch from "@modules/general/hooks/useSearch";
import TextFieldSearch from "@modules/general/components/textFieldSearch";

const filterOptions: FilterOptions = [
  {
    key: "estado",
    label: "Estado",
    options: [
      ["Activo", (x: any) => x == "A"],
      ["Inactivo", (x: any) => x == "I"],
    ],
  },
];

/**
 * ListarMisCursos component – displays a list of courses for students or professors,
 * with the ability to filter by status, search by course name, and view course details.
 *
 * This component fetches data on the courses for the currently authenticated user,
 * either a student or a professor. It supports filtering, searching, and displays
 * course data in a table format.
 *
 * The component uses Material-UI for layout and components, and React Query to manage
 * data fetching and state. It also integrates an alert dialog to show error messages or
 * confirmation dialogs.
 *
 * @component
 *
 * @returns {JSX.Element} A list of courses with filtering and searching capabilities.
 *
 * @example
 * ```tsx
 * <ListarMisCursos />
 * ```
 */
function ListarMisCursos() {
  const [cursos, setCursos] = useState<CursoTabla[]>([]);

  const [cursosBuffer, setCursosBuffer] = useState<CursoTabla[]>([]);

  const { accountInformation } = useAuth();

  const { token, id } = accountInformation;

  const IS_STUDENT = accountInformation.tipo == "E";

  const {
    data,
    isLoading,
    error: errorQuery,
  } = useQuery({
    queryFn: async () => {
      if (IS_STUDENT) return await getCursos(token, { estudiantes: id });
      else return await getCursos(token, { docente: id });
    },
    queryKey: [`Get Cursos by Id`, id, token],
  });

  const { showDialog, open, title, message, handleCancel, type, handleAccept } = useAlertDialog();

  const { setSearchValue, filteredData } = useSearch();

  function searchFn(x: CursoTabla[], s: string) {
    return x.filter((y) => y.materia.nombre.toLowerCase().includes(s.toLowerCase()));
  }

  const { setError } = useErrorReader(showDialog);

  useEffect(() => {
    if (errorQuery) setError(errorQuery);
  }, [errorQuery]);

  useEffect(() => {
    if (data) {
      setCursos(data.map((curso) => adaptCursoTabla(adaptCursoService(curso))));
    }
  }, [data]);

  useEffect(() => {
    setCursosBuffer(cursos);
  }, [cursos]);

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        handleCancel={handleCancel}
        type={type}
      />
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={3}>
          <Typography variant="h4">{labelListarCursos.titulo}</Typography>
          <Grid2 container sx={{ width: "100%" }}>
            <Grid2 size={{ md: 6, xs: 12 }}>
              <TextFieldSearch setSearchValue={setSearchValue} fullWidth />
            </Grid2>
          </Grid2>
          <SelectFilters
            data={cursos}
            filterOptions={filterOptions}
            setRefineData={setCursosBuffer}
          />

          {
            <TablaCursos
              cursos={filteredData(cursosBuffer, searchFn)}
              type={IS_STUDENT ? "E" : "D"}
            />
          }
        </Stack>
      )}
    </>
  );
}

export default ListarMisCursos;
