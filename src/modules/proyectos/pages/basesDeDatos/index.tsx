import AlertDialog from "@modules/general/components/alertDialog";
import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { useAuth } from "@modules/general/context/accountContext";
import { labelSelects } from "@modules/general/enums/labelSelects";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { useFiltersByConditions } from "@modules/general/hooks/useFilters";
import useSearch from "@modules/general/hooks/useSearch";
import TablaBasesDeDatos from "@modules/proyectos/components/tablaBasesDeDatos";
import { labelBaseDeDatos } from "@modules/proyectos/enum/labelBaseDeDatos";
import { labelRepositorios } from "@modules/proyectos/enum/labelRepositorios";
import { getDataBaseById } from "@modules/proyectos/services/get.database";
import { getProjectByUserId } from "@modules/proyectos/services/get.project";
import { BaseDeDatos } from "@modules/proyectos/types/baseDeDatos";
import { adaptDataBase } from "@modules/proyectos/utils/adaptDataBase";
import { getDataBaseTypesArray } from "@modules/proyectos/utils/database";
import { getNoRepeatValuesBasesDeDatos } from "@modules/proyectos/utils/getNoRepeatValues.basesDeDatos";
import { Alert, Divider, Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

function VistaBasesDeDatos() {
  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog2();

  const { token, id } = useAuth().accountInformation;

  const { data: dataBases = [], error } = useQuery({
    queryFn: async (): Promise<BaseDeDatos[]> => {
      const projectsByUser = await getProjectByUserId(token, id);
      if (projectsByUser) {
        const dataBases = await Promise.all(
          projectsByUser.map(async (project) => {
            if (project.base_de_datos != null) {
              const dataBase = await getDataBaseById(project.base_de_datos.id ?? -1, token);
              if (dataBase) {
                return adaptDataBase(dataBase);
              }
            }
          })
        );
        return dataBases.filter(Boolean) as BaseDeDatos[];
      }
      return [];
    },
    queryKey: ["get DataBases"],
  });

  const { setError } = useErrorReader(showDialog);

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  const { searchValue, setSearchValue, filteredData: filterByText } = useSearch();

  const { filterData, filters, toggleFilter } = useFiltersByConditions();

  const filterProject = useMemo(() => {
    return (
      <>
        <TextField
          select
          size="small"
          label={labelRepositorios.filtrarPorProyecto}
          variant="standard"
          fullWidth
          onChange={(e) => {
            const value = e.target.value || "";
            if (value != "") toggleFilter("proyecto", (x: any) => x == value);
            else toggleFilter("proyecto", (_x: any) => true);
          }}
          defaultValue={""}
        >
          <MenuItem value="">{labelSelects.noAplicar}</MenuItem>
          {Array.from(getNoRepeatValuesBasesDeDatos(dataBases, "proyecto")).map((element) => (
            <MenuItem value={element} key={element}>
              {element}
            </MenuItem>
          ))}
        </TextField>
      </>
    );
  }, []);

  const filterType = useMemo(() => {
    return (
      <TextField
        select
        size="small"
        label={labelRepositorios.filtrarPorTipo}
        variant="standard"
        fullWidth
        onChange={(e) => {
          const value = e.target.value || "";
          if (value != "") toggleFilter("tipo", (x: any) => x == value);
          else toggleFilter("tipo", (_x: any) => true);
        }}
        defaultValue={""}
      >
        <MenuItem value="">{labelSelects.noAplicar}</MenuItem>
        {getDataBaseTypesArray.map(([value, key]) => (
          value != 'E' &&<MenuItem value={value} key={key}>
            {key}
          </MenuItem>
        ))}
      </TextField>
    );
  }, []);

  const dataToRender = useMemo(() => {
    const filterText = (x: BaseDeDatos[]) => {
      const textValue = searchValue.toLowerCase();
      if (searchValue == "") return x;
      return x.filter((y) => y.proyecto?.titulo.toLowerCase().includes(textValue));
    };

    return filterData(filterByText(dataBases, filterText)) as BaseDeDatos[];
  }, [filters, searchValue, dataBases]);

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
      <Stack spacing={3}>
        <Stack>
          <Typography variant="h4">{labelBaseDeDatos.basesDeDatos}</Typography>
          <Divider />
        </Stack>
        <Stack spacing={1}>
          <TextFieldSearch setSearchValue={setSearchValue} sx={{ maxWidth: 500 }} />
          <Grid2 container columnSpacing={4}>
            <Grid2 size={{ xs: 12, md: 4 }}>{filterProject}</Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>{filterType}</Grid2>
          </Grid2>
        </Stack>
{ dataBases.length == 0? <Alert severity="info">Actualmente no dispone de bases de datos</Alert>:       <TablaBasesDeDatos basesDeDatos={dataToRender} />
}      </Stack>
    </>
  );
}

export default VistaBasesDeDatos;
