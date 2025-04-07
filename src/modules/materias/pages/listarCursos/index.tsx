import { Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useSearch from "@modules/general/hooks/useSearch";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { useFiltersByConditions } from "@modules/general/hooks/useFiltersByCondition";
import { CursoTabla } from "@modules/materias/types/curso.tabla";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import TablaCursos from "@modules/materias/components/tablaCursos";
import { useParams } from "react-router";
import { getCursoByMateriaId } from "@modules/materias/services/get.curso";
import { adaptCursoTabla } from "@modules/materias/utils/adapters/curso";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import AlertDialogError from "@modules/general/components/alertDialogError";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";

function ListarCursos() {
  const { idMateria } = useParams();

  const [cursos, setCursos] = useState<CursoTabla[]>([]);

  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getCursoByMateriaId(token, idMateria ?? ""),
    queryKey: [`get curso ${idMateria}`],
  });

  console.log('render', idMateria)

  useEffect(() => {
    if (data) setCursos(data.map((curso) => adaptCursoTabla(adaptCursoService(curso))));
  }, [data]);

  const { filteredData, handleKeyDown, searchValue, setBuffer } = useSearch();

  const sorter = (curso: CursoTabla[]) => {
    return curso.filter((x) =>
      (x.docente + x.estado).toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const { filterData, toggleFilter } = useFiltersByConditions<CursoTabla>();

  const materiasToRender = () => {
    if (cursos) return filteredData(filterData(cursos), sorter);
    return [];
  };

  const {
    handleClose: handleCloseFailFetch,
    open: openFailFetch,
    handleOpen: handleOpenFailFetch,
  } = useAlertDialog();

  useEffect(() => {
    if (isError) {
      handleOpenFailFetch();
    }
  }, [isError]);

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
        <Stack spacing={3}>
          <Typography variant="h4">{labelListarCursos.titulo}</Typography>
          <TextField
            placeholder={labelListarCursos.placeHolder}
            slotProps={{ input: { endAdornment: <SearchIcon /> } }}
            size="small"
            onChange={(e) => setBuffer(e.currentTarget.value as string)}
            onKeyDown={handleKeyDown}
            sx={{
              maxWidth: 500,
            }}
          />
          <Grid2 container spacing={2}>
            <Grid2 size={{ md: 4, xs: 12 }}>
              <TextField
                select
                label={labelSelects.filtrarEstado}
                onChange={(e) => {
                  if (e.target.value == "0") toggleFilter("estado", (value: any) => value == "A");
                  if (e.target.value == "1") toggleFilter("estado", (value: any) => value == "I");
                  if (e.target.value == "-1") toggleFilter("estado", (_value: any) => true);
                }}
                defaultValue={-1}
                fullWidth
                variant="standard"
              >
                <MenuItem value={0}>{labelSelects.activado}</MenuItem>
                <MenuItem value={1}>{labelSelects.desactivado}</MenuItem>
                <MenuItem value={-1}>{labelSelects.noAplicar}</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>
          {<TablaCursos cursos={materiasToRender()} />}
        </Stack>
      )}
    </>
  );
}

export default ListarCursos;
