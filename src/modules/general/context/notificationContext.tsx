import React, { createContext, useContext, useEffect } from "react";
import useAlertDialog from "../hooks/useAlertDialog";
import AlertDialog from "../components/alertDialog";
import { useQuery } from "@tanstack/react-query";
import { getNotificaciones } from "@modules/usuarios/services/get.notificaciones";
import { useAuth } from "./accountContext";
import useErrorReader from "../hooks/useErrorReader";
import { NotificationMessage } from "@modules/usuarios/types/notification";
import { useSocketContext } from "./socketContext";

type NotificationContext = {
  notificaciones: NotificationMessage[] | undefined;
  refetch: Function;
  isPending: boolean;
};

/**
 * NotificationContext – React context to manage and provide access to user notifications.
 * 
 * Supplies the latest notifications, loading state, and a refetch function to re-query data.
 * 
 * @typedef {Object} NotificationContext
 * @property {NotificationMessage[] | undefined} notificaciones - The list of user notifications.
 * @property {Function} refetch - Function to manually refetch notifications from the server.
 * @property {boolean} isPending - Indicates if the notifications are still being fetched.
 */
const NotificationContext = createContext<NotificationContext>({
  notificaciones: undefined,
  refetch: () => {},
  isPending: true,
});

/**
 * useNotificationContext hook – retrieves the context value for notifications.
 * 
 * Must be used within a `NotificationProvider`, otherwise it throws an error.
 * 
 * @returns {NotificationContext} The current notification context.
 * 
 * @throws Will throw an error if called outside of the `NotificationProvider`.
 * 
 * @example
 * ```tsx
 * const { notificaciones, isPending } = useNotificationContext();
 * ```
 */
export const useNotificationContext = (): NotificationContext => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("NotificationContext must be used within AlertDialogProvider");
  return context;
};

/**
 * NotificationProvider component – wraps child components and provides notification context.
 * 
 * It integrates with the alert dialog system and socket to update notifications in real time.
 * Handles API fetching and error display through the shared dialog.
 * 
 * @component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that will have access to the notification context.
 * 
 * @returns {JSX.Element} A context provider that manages and distributes notification data.
 * 
 * @example
 * ```tsx
 * <NotificationProvider>
 *   <Dashboard />
 * </NotificationProvider>
 * ```
 */
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id, token } = useAuth().accountInformation;

  const { handleAccept, handleCancel, isLoading, open, title, type, message, showDialog } =
    useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const socket = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const handleNotification = () => refetch();

    socket.on("notificacion", handleNotification);

    return () => {
      socket.off("notificacion", handleNotification);
    };
  }, [socket]);

  const {
    data: notificaciones,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryFn: () => getNotificaciones(id, token),
    queryKey: ["Notificaciones", id, token],
  });

  useEffect(() => {
    if (!error) return;
    setError(error);
  }, [error]);

  function sorter(a: NotificationMessage, b: NotificationMessage) {
    return new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime();
  }

  return (
    <NotificationContext.Provider
      value={{
        notificaciones: notificaciones?.sort(sorter),
        isPending: isPending,
        refetch: refetch,
      }}
    >
      {children}
      {open && (
        <AlertDialog
          handleAccept={handleAccept}
          open={open}
          title={title}
          isLoading={isLoading}
          type={type}
          textBody={message}
          handleCancel={handleCancel}
        />
      )}
    </NotificationContext.Provider>
  );
};
