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
const NotificationContext = createContext<NotificationContext>({
  notificaciones: undefined,
  refetch: () => {},
  isPending: true,
});

export const useNotificationContext = (): NotificationContext => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("NotificationContext must be used within AlertDialogProvider");
  return context;
};

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
