import { AccountContext } from "@modules/general/context/accountContext";
import { Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useSearch from "@modules/general/hooks/useSearch";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { useFiltersByConditions } from "@modules/general/hooks/useFiltersByCondition";
import {
  CursoTabla,
} from "@modules/materias/types/curso.tabla";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import TablaCursos from "@modules/materias/components/tablaCursos";
import { useParams } from "react-router";
import { CursoService } from "@modules/materias/types/curso.service";
import { getCursoByMateriaId } from "@modules/materias/services/get.curso";
import useQuery from "@modules/general/hooks/useQuery";
import { adaptCursoToCursoTabla } from "@modules/materias/utils/adapters/curso";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import AlertDialog from "@modules/general/components/alertDialog";

function ListarCursos() {
  const { idMateria } = useParams();

  const [cursos, setCursos] = useState<CursoTabla[]>([]);

  const token = useContext(AccountContext)!!.localUser?.token;

  /**
   * Variables de Consulta de Materias
   */
  const { error, handleAlertClose, initQuery, responseData, message, open } =
    useQuery<CursoService[]>(() => getCursoByMateriaId(token!!, idMateria!!), false);

  useEffect(() => {
    initQuery();
  }, []);

  useEffect(() => {
    if (responseData) {
      setCursos(
        responseData.map((curso) =>
          adaptCursoToCursoTabla(adaptCursoService(curso))
        )
      );
    }
  }, [responseData]);

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

  return (
    <>
      {error && (
        <AlertDialog
          open={open}
          handleAccept={handleAlertClose}
          title="Consultar Materias"
          textBody={message}
        />
      )}
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
                if (e.target.value == "0")
                  toggleFilter("estado", (value: any) => value == "A");
                if (e.target.value == "1")
                  toggleFilter("estado", (value: any) => value == "I");
                if (e.target.value == "-1")
                  toggleFilter("estado", (_value: any) => true);
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
    </>
  );
}

export default ListarCursos;
