import { patchData } from "@core/services";
import { NotificationMessage } from "../types/notification";

export const patchNotificationCheck = async (idNotificacion: number, token: string) => {
  const response = await patchData<NotificationMessage>(
    `/notificaciones/${idNotificacion}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
