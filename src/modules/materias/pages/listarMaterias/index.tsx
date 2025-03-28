import AlertDialog from "@modules/general/components/alertDialog";
import { AccountContext } from "@modules/general/context/accountContext";
import useQuery from "@modules/general/hooks/useQuery";
import TablaMaterias from "@modules/materias/components/tablaMaterias";
import { labelListarMaterias } from "@modules/materias/enums/labelListarMaterias";
import { getMateriasService } from "@modules/materias/services/get.materias.services";
import { MateriaService } from "@modules/materias/types/materia.service";
import { MateriaTabla } from "@modules/materias/types/materia.tabla";
import { adaptMateriaService } from "@modules/materias/utils/adapters/adaptar.materiaService.materia";
import { Stack, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useSearch from "@modules/general/hooks/useSearch";

function ListarMaterias() {
  const [materias, setMaterias] = useState<MateriaTabla[] | undefined>(
    undefined
  );

  const token = useContext(AccountContext).localUser?.token;

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

  const {
    buffer,
    filteredData,
    handleKeyDown,
    searchValue,
    setBuffer,
    setSearchValue,
  } = useSearch();

  const sorter = (materia: MateriaTabla[]) => {
    return materia.filter((mat) =>
      (mat.codigo + mat.nombre)
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  };

  const materiasToRender = () => {
    return filteredData(materias, sorter);
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
      <Stack>
        <Typography variant="h4">{labelListarMaterias.titulo}</Typography>
        <TextField
          placeholder={labelListarMaterias.buscarMateria}
          slotProps={{ input: { endAdornment: <SearchIcon /> } }}
          size="small"
          onChange={(e) => setBuffer(e.currentTarget.value as string)}
          onKeyDown={handleKeyDown}
        />
        {materias && <TablaMaterias materias={materiasToRender()} />}
      </Stack>
      ;
    </>
  );
}

export default ListarMaterias;
