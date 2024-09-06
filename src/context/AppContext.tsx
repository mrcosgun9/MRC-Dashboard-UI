"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import LoadingScreen from '@/components/elements/LoadingScreen';

interface AppContextProps {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  isMinimalMenu: boolean;
  setIsMinimalMenu: (isLoading: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  loading: false,
  setLoading: () => { },
  isMinimalMenu: false,
  setIsMinimalMenu: () => { },
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isMinimalMenu, setIsMinimalMenu] = useState(false);
  return (
    <AppContext.Provider value={{ loading, setLoading, isMinimalMenu, setIsMinimalMenu }}>
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