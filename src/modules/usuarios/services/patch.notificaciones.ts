import { patchData } from "@core/services";
import { NotificationMessage } from "../types/notification";

/**
 * `patchNotificationCheck` – Marks a specific notification as read on the server.
 *
 * This function sends a PATCH request to update the "read" status of a notification,
 * identified by its unique ID. A session token is required for authentication.
 *
 * @async
 * @function
 *
 * @param {number} idNotificacion - The unique identifier of the notification to mark as read.
 * @param {string} token - The session token used for authenticating the request.
 *
 * @returns {Promise<NotificationMessage>} A promise that resolves to the updated notification data.
 *
 * @example
 * ```tsx
 * await patchNotificationCheck(15, "your-session-token");
 * ```
 */
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
