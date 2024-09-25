"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import LoadingScreen from '@/components/elements/LoadingScreen';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
interface AppContextProps {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  setConnection: React.Dispatch<React.SetStateAction<HubConnection | null>>;
  connection: HubConnection | null

}

export const AppContext = createContext<AppContextProps>({
  loading: false,
  setLoading: () => { },
  setConnection: () => { },
  connection: null
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  useEffect(() => {
    if (session !== null && session !== undefined && status === 'authenticated' && connection === null) {
      createHubConnection();
    }
  }, [status])
  const createHubConnection = async () => {
    const connect = new HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_CHAT_HUB ?? "", {
        accessTokenFactory: () => session!.user.accessToken,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${session!.user.accessToken}`,
        },
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Error)
      .build();
    try {
      await connect.start();   
      setConnection(connect)
    } catch (e) {
      console.log("e", e)
    }
    return () => {
      connect.stop();
    };
  }
  return (
    <AppContext.Provider value={{ loading, setLoading, setConnection, connection }}>
      {children}
      {
        loading && <LoadingScreen />
      }

    </AppContext.Provider>
  );
};
export function useAppContext() {
  return useContext(AppContext);
}