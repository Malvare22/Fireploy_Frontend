import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import {
  AlertDialogProvider,
  useAlertDialogContext,
} from "@modules/general/context/alertDialogContext";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import EditProject from "@modules/proyectos/components/configuracion";
import { ProjectExecutionStatusContextProvider } from "@modules/proyectos/context/executionStatus.context";
import { getProjectById } from "@modules/proyectos/services/get.project";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

/**
 * VerProyecto component – A page that allows the user to view and edit a project.
 *
 * This component fetches the project details based on the project ID from the URL and displays
 * the project details in an editable form. It also handles loading and error states, and shows
 * an alert dialog in case of errors.
 *
 * @component
 *
 * @returns {JSX.Element} A page displaying the project details and allowing the user to edit it.
 *
 * @example
 * ```tsx
 * <VerProyecto />
 * ```
 */
function VerProyecto() {
  function View() {
    const { token } = useAuth().accountInformation;

    const { id } = useParams();

    const dialogContextInformation = useAlertDialogContext();
    const { showDialog, open, title, message, handleCancel, type, handleAccept } =
      dialogContextInformation;
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
        {isLoading || !data ? (
          <LoaderElement />
        ) : (
          <ProjectExecutionStatusContextProvider projectId={parseInt(id ?? "-1")}>
            <EditProject project={adaptProject(data)} />
          </ProjectExecutionStatusContextProvider>
        )}
      </>
    );
  }

  return (
    <AlertDialogProvider>
      <View></View>
    </AlertDialogProvider>
  );
}

export default VerProyecto;
