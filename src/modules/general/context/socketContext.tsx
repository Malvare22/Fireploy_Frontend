// SocketContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./accountContext";

type SocketContext = Socket | null;

export const SocketContext = createContext<SocketContext>(null);

export const useSocketContext = (): SocketContext => {
  const context = useContext(SocketContext);
  // if (!context) throw new Error("SocketContext must be used within SocketContextProvider");
  return context;
};

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
