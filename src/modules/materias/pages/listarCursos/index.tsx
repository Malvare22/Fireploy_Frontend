import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CursoTabla } from "@modules/materias/types/curso.tabla";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import TablaCursos from "@modules/materias/components/tablaCursos";
import { useNavigate, useParams } from "react-router";
import { getCursoByMateriaId } from "@modules/materias/services/get.curso";
import { adaptCursoTabla } from "@modules/materias/utils/adapters/curso";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
// import RefinePanel, { FilterOptions } from "@modules/general/components/selects";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { FilterOptions, SelectFilters } from "@modules/general/components/selects";
import { rutasMaterias } from "@modules/materias/router/router";

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

function ListarCursos() {
  const { idMateria } = useParams();

  const [cursos, setCursos] = useState<CursoTabla[]>([]);

  const [cursosBuffer, setCursosBuffer] = useState<CursoTabla[]>([]);

  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error: errorQuery,
  } = useQuery({
    queryFn: () => getCursoByMateriaId(token, idMateria ?? ""),
    queryKey: [`Fetch Cursos`, idMateria],
  });

  const { showDialog, open, title, message, handleCancel, type, handleAccept } = useAlertDialog();

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
          <SelectFilters
            data={cursos}
            filterOptions={filterOptions}
            setRefineData={setCursosBuffer}
          />
          {<TablaCursos cursos={cursosBuffer} />}
          <Stack alignItems={"end"}>
            <Box>
              <GeneralButton
                mode={buttonTypes.add}
                onClick={() =>
                  navigate(rutasMaterias.crearCurso.replace(":idMateria", idMateria || "-1"))
                }
              />
            </Box>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default ListarCursos;
