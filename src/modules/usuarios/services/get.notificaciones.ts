import { getData } from "@core/services";
import { NotificationMessage } from "../types/notification";

export const getNotificaciones= async (id: number, token: string) => {
  const response = await getData<NotificationMessage[]>(
    `/notificaciones/usuario/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
