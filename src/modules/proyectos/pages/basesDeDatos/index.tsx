import AlertDialog from "@modules/general/components/alertDialog";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import TablaBasesDeDatos from "@modules/proyectos/components/tablaBasesDeDatos";
import { labelBaseDeDatos } from "@modules/proyectos/enum/labelBaseDeDatos";
import { getDataBaseById } from "@modules/proyectos/services/get.database";
import { getProjectByUserId } from "@modules/proyectos/services/get.project";
import { BaseDeDatos } from "@modules/proyectos/types/baseDeDatos";
import { adaptDataBase } from "@modules/proyectos/utils/adaptDataBase";
import { Alert, Divider, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
    queryKey: ["Get DataBases"],
  });

  const { setError } = useErrorReader(showDialog);

  useEffect(() => {
    if (error) setError(error);
  }, [error]);


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
        {dataBases.length == 0 ? (
          <Alert severity="info">Actualmente no dispone de bases de datos</Alert>
        ) : (
          <TablaBasesDeDatos basesDeDatos={dataBases} />
        )}
      </Stack>
    </>
  );
}

export default VistaBasesDeDatos;
