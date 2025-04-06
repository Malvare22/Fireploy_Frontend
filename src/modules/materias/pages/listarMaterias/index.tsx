import AlertDialog from "@modules/general/components/alertDialog";
import useQuery from "@modules/general/hooks/useQuery";
import TablaMaterias from "@modules/materias/components/tablaMaterias";
import { labelListarMaterias } from "@modules/materias/enums/labelListarMaterias";
import { getMateriasService } from "@modules/materias/services/get.materias.services";
import { MateriaService } from "@modules/materias/types/materia.service";
import {
  MateriaTabla,
} from "@modules/materias/types/materia.tabla";
import { adaptMateriaService } from "@modules/materias/utils/adapters/materia.service";
import {
  Box,
  Grid2,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useSearch from "@modules/general/hooks/useSearch";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { useFiltersByConditions } from "@modules/general/hooks/useFiltersByCondition";
import { getMateriasSemestresLabels } from "@modules/materias/utils/materias";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { useNavigate } from "react-router";
import { rutasMaterias } from "@modules/materias/router/router";
import { useAuth } from "@modules/general/context/accountContext";

function ListarMaterias() {
  const [materias, setMaterias] = useState<MateriaTabla[]>([]);

  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  /**
   * Variables de Consulta de Materias
   */
  const { error, handleAlertClose, initQuery, responseData, message, open } =
    useQuery<MateriaService[]>(() => getMateriasService(token!!), false);

  useEffect(() => {
    initQuery();
  }, []);

  useEffect(() => {
    if (responseData) {
      setMaterias(responseData.map((materia) => adaptMateriaService(materia)));
    }
  }, [responseData]);

  const { filteredData, handleKeyDown, searchValue, setBuffer } = useSearch();

  const sorter = (materia: MateriaTabla[]) => {
    return materia.filter((mat) =>
      (mat.codigo + mat.nombre)
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  };

  const { filterData, toggleFilter } = useFiltersByConditions<MateriaTabla>();

  const materiasToRender = () => {
    if (materias) return filteredData(filterData(materias), sorter);
    return [];
  };

  const navigate = useNavigate();

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
        <Typography variant="h4">{labelListarMaterias.titulo}</Typography>
        <TextField
          placeholder={labelListarMaterias.buscarMateria}
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
              label={labelSelects.filtrarCursosActivos}
              onChange={(e) => {
                if (e.target.value == "0")
                  toggleFilter(
                    "cantidadGruposActivos",
                    (value: any) => value == 0
                  );
                if (e.target.value == "1")
                  toggleFilter(
                    "cantidadGruposActivos",
                    (value: any) => value != 0
                  );
                if (e.target.value == "-1")
                  toggleFilter("cantidadGruposActivos", (_value: any) => true);
              }}
              defaultValue={-1}
              fullWidth
              variant="standard"
            >
              <MenuItem value={0}>{labelSelects.sinCursos}</MenuItem>
              <MenuItem value={1}>{labelSelects.conCursos}</MenuItem>
              <MenuItem value={-1}>{labelSelects.noAplicar}</MenuItem>
            </TextField>
          </Grid2>
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
          <Grid2 size={{ md: 4, xs: 12 }}>
            <TextField
              select
              label={labelSelects.filtrarSemestre}
              onChange={(e) => {
                if (e.target.value == "-1")
                  toggleFilter("semestre", (_value: any) => true);
                else {
                  toggleFilter(
                    "semestre",
                    (value: any) => value == e.target.value
                  );
                }
              }}
              defaultValue={-1}
              fullWidth
              variant="standard"
            >
              {getMateriasSemestresLabels().map(([value, text], key) => (
                <MenuItem value={value} key={key}>
                  {text}
                </MenuItem>
              ))}
              <MenuItem value={-1}>{labelSelects.noAplicar}</MenuItem>
            </TextField>
          </Grid2>
        </Grid2>
        {materias && <TablaMaterias materias={materiasToRender()} />}
        <Stack direction={"row"} justifyContent={"end"}>
          <Box>
            <GeneralButton
              onClick={() => navigate(rutasMaterias.crearMateria)}
              mode={buttonTypes.add}
            />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

export default ListarMaterias;
