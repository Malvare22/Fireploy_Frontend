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
  currentUrl: string;
};

/**
 * ProjectExecutionStatusContextProvider – Context provider for managing and accessing
 * the execution status of a specific project, including real-time queue position and URL updates.
 *
 * @component
 * @param children - React child components that will have access to the context.
 * @param projectId - The ID of the project whose execution status is being tracked.
 *
 * @description
 * - Fetches project execution status from the backend at a regular interval (every 10 seconds).
 * - Listens to a WebSocket event (`deploy_position`) to update the project’s position in the execution queue.
 * - Provides access to:
 *   - `executionState`: the current execution state (`EstadoEjecucionProyecto` or `null`),
 *   - `refetchExecutionState`: a function to manually refetch the current status,
 *   - `currentPosition`: the project's current queue position (or `null`),
 *   - `currentUrl`: the current deployment URL if available.
 *
 * @example
 * ```tsx
 * <ProjectExecutionStatusContextProvider projectId={42}>
 *   <ProjectExecutionDashboard />
 * </ProjectExecutionStatusContextProvider>
 * ```
 */
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

  const { data, error, refetch } = useQuery({
    queryFn: async () => {
      if (projectId != -1) return await getProjectById(token, projectId);
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
          executionState: data ? (data.estado_ejecucion as EstadoEjecucionProyecto) : null,
          refetchExecutionState: refetch,
          currentPosition: currentPosition,
          currentUrl: data ? data.url : "",
        }}
      >
        {children}
      </ProjectExecutionStatusContext.Provider>
    </>
  );
}

/**
 * useExecutionStatusContext – Custom hook to access the `ProjectExecutionStatusContext`.
 *
 * @returns An object containing:
 *   - `executionState`: current execution status of the project
 *   - `refetchExecutionState`: function to manually trigger refetching
 *   - `currentPosition`: current queue position if in deployment queue
 *   - `currentUrl`: current public deployment URL of the project
 *
 * @throws Will throw an error if called outside of the `ProjectExecutionStatusContextProvider`.
 *
 * @example
 * ```tsx
 * const { executionState, currentPosition } = useExecutionStatusContext();
 * ```
 */
export const useExecutionStatusContext = (): ProjectExecutionStatusContext => {
  const context = useContext(ProjectExecutionStatusContext);
  if (!context)
    throw new Error("useExecutionStatusContext must be used within ExecutionStatusContextProvider");
  return context;
};
