import { getData } from "@core/services";
import { NotificationMessage } from "../types/notification";

/**
 * `getNotificaciones` – Fetches the list of notifications for a specific user.
 *
 * This function makes an authenticated GET request to retrieve all notification messages
 * associated with the given user ID.
 *
 * @async
 * @function
 * 
 * @param {number} id - The ID of the user whose notifications are being fetched.
 * @param {string} token - The session token used for authentication.
 *
 * @returns {Promise<NotificationMessage[]>} A promise that resolves to an array of notification messages.
 *
 * @example
 * ```ts
 * const notifications = await getNotificaciones(5, "mySessionToken");
 * console.log(notifications);
 * ```
 */
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
