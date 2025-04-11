import AlertDialogError from "@modules/general/components/alertDialogError";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import EditProject from "@modules/proyectos/components/configuracion";
import { getProjectById } from "@modules/proyectos/services/get.project";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

function VerProyecto() {
  const token = useAuth().accountInformation.token;

  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryFn: () => getProjectById(token, parseInt(id ?? "-1")),
    queryKey: ["Get Project By Id"],
  });

  const { handleClose, open, handleOpen } = useAlertDialog();

  useEffect(() => {
    if (error) handleOpen();
  }, [error]);

  return (
    <>
      {error && (
        <AlertDialogError
          error={error}
          handleClose={handleClose}
          open={open}
          title="Información de Proyecto"
        />
      )}
      {isLoading || !data ? <LoaderElement /> : <EditProject project={adaptProject(data)} />}
    </>
  );
}

export default VerProyecto;
