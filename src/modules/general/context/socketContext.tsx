// SocketContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./accountContext";

/**
 * SocketContext – React context that provides access to a Socket.IO connection instance.
 * 
 * Allows components to access and interact with a shared WebSocket connection.
 * 
 * @typedef {Socket | null} SocketContext
 */
type SocketContext = Socket | null;


export const SocketContext = createContext<SocketContext>(null);

/**
 * useSocketContext hook – retrieves the current Socket.IO instance from context.
 * 
 * Must be used within a `SocketProvider`, otherwise it throws an error.
 * 
 * @returns {Socket} The active Socket.IO client instance.
 * 
 * @throws Will throw an error if called outside of the `SocketProvider`.
 * 
 * @example
 * ```tsx
 * const socket = useSocketContext();
 * socket.emit("event", data);
 * ```
 */
export const useSocketContext = (): SocketContext => {
  const context = useContext(SocketContext);
  // if (!context) throw new Error("SocketContext must be used within SocketContextProvider");
  return context;
};

/**
 * SocketProvider component – establishes and manages a Socket.IO connection for child components.
 * 
 * It initializes the socket connection with user ID as a query param, and cleans up on unmount.
 * 
 * @component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that will have access to the socket context.
 * 
 * @returns {JSX.Element} A context provider for WebSocket functionality using Socket.IO.
 * 
 * @example
 * ```tsx
 * <SocketProvider>
 *   <Notifications />
 * </SocketProvider>
 * ```
 */
export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { id } = useAuth().accountInformation;
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!id || id == -1) return;

    const socketInstance = io(import.meta.env.VITE_URL_BACKEND, {
      reconnectionDelayMax: 10000,
      query: {
        userId: id,
      },
    });

    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [id]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
