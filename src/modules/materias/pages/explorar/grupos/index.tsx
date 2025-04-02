import AlertDialog from "@modules/general/components/alertDialog";
import { AccountContext } from "@modules/general/context/accountContext";
import useQuery from "@modules/general/hooks/useQuery";
import CardCurso from "@modules/materias/components/cardCurso";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import { getCursosMateria } from "@modules/materias/services/get.curso";
import { Materia } from "@modules/materias/types/materia";
import { MateriaService } from "@modules/materias/types/materia.service";
import { adaptarMateriaService } from "@modules/materias/utils/adapters/materia.service";
import { Alert, Card, Grid2, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerCursosMateria() {
  const { id } = useParams();

  const token = useContext(AccountContext).localUser?.token;

  const { error, handleAlertClose, initQuery, message, open, responseData } =
    useQuery<MateriaService>(
      () => getCursosMateria(token!!, id!!),
      false,
      "Obtener Cursos"
    );

  const [materia, setMateria] = useState<Materia | undefined>(undefined);

  useEffect(() => {
    if (token && id) {
      initQuery();
    }
  }, [token, id]);

  useEffect(() => {
    if (responseData) {
      setMateria(adaptarMateriaService(responseData));
    }
  }, [responseData]);

  return (
    <>
      {error && (
        <AlertDialog
          handleAccept={handleAlertClose}
          open={open}
          title="Consultar Cursos"
          textBody={message}
        />
      )}
      {materia && (
        <Stack spacing={3} paddingX={6}>
          <Card>
            <Stack spacing={3} margin={4}>
              <Typography variant="h3">{materia.nombre}</Typography>
              <Typography
                variant="h6"
                sx={{ wordWrap: "break-word", overflowWrap: "break-word" }}
              >
                {materia.descripcion}
              </Typography>
            </Stack>
          </Card>
          {materia.cursos && materia.cursos.length > 0 ? (
            <>
              <Typography variant="h4">{labelListarCursos.grupos}</Typography>
              <Grid2 container spacing={4}>
                {materia.cursos?.map((curso, key) => (
                  <Grid2 size={{ md: 3, sm: 6, xs: 12 }}>
                    <CardCurso curso={curso} key={key} />
                  </Grid2>
                ))}
              </Grid2>
            </>
          )
          : <Alert severity="warning" sx={{fontSize: 64}}><Typography>{labelListarCursos.noHayGrupos}</Typography></Alert>
        }
        </Stack>
      )}
    </>
  );
}

export default VerCursosMateria;
