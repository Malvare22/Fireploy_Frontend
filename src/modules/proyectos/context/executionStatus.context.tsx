import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { EstadoEjecucionProyecto } from "../types/proyecto.tipo";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../services/get.project";
import { useAuth } from "@modules/general/context/accountContext";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import { QueueEntry } from "../types/queueEntry";
import { useSocketContext } from "@modules/general/context/socketContext";

type ProjectExecutionStatusContext = {
  executionState: EstadoEjecucionProyecto | null;
  refetchExecutionState: Function;
  currentPosition: null | number;
};
export const ProjectExecutionStatusContext = createContext<
  ProjectExecutionStatusContext | undefined
>(undefined);

export function ProjectExecutionStatusContextProvider({
  children,
  projectId,
}: {
  children: ReactNode;
  projectId: number;
}) {
  const { token } = useAuth().accountInformation;

  const {
    data: projectStatus,
    error,
    refetch,
  } = useQuery({
    queryFn: async () => {
      if (projectId != -1) return (await getProjectById(token, projectId)).estado_ejecucion;
    },
    queryKey: ["Get Status Project", projectId, token],
    refetchInterval: 10000,
  });

  const { showDialog } = useAlertDialogContext();

  const { setError } = useErrorReader(showDialog);

  const [currentPosition, setCurrentPosition] = useState<null | number>(null);

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  const socket = useSocketContext();

  useEffect(() => {
    if (!socket) return;
    const f = (msg: QueueEntry) => {
      if (msg.projectId == projectId && msg.position) {
        setCurrentPosition(msg.position);
        refetch();
      }
    };
    socket.on("deploy_position", f);

    return () => {
      socket.off("deploy_position", f);
    };
  }, [socket]);

  return (
    <>
      <ProjectExecutionStatusContext.Provider
        value={{
          executionState: projectStatus ? (projectStatus as EstadoEjecucionProyecto) : null,
          refetchExecutionState: refetch,
          currentPosition: currentPosition,
        }}
      >
        {children}
      </ProjectExecutionStatusContext.Provider>
    </>
  );
}

export const useExecutionStatusContext = (): ProjectExecutionStatusContext => {
  const context = useContext(ProjectExecutionStatusContext);
  if (!context)
    throw new Error("useExecutionStatusContext must be used within ExecutionStatusContextProvider");
  return context;
};
