import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import EditProject from "@modules/proyectos/components/configuracion";
import { getProjectById } from "@modules/proyectos/services/get.project";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

function VerProyecto() {
  const token = useAuth().accountInformation.token;

  const { id } = useParams();

  const {
    showDialog,
    open,
    title,
    message,
    handleCancel,
    type,
    handleAccept,
  } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const { data, error, isLoading } = useQuery({
    queryFn: () => getProjectById(token, parseInt(id ?? "-1")),
    queryKey: ["Get Project By Id", parseInt(id ?? "-1")],
  });

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={open}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoading}
      />
      {isLoading || !data ? <LoaderElement /> : <EditProject project={adaptProject(data)} />}
    </>
  );
}

export default VerProyecto;
