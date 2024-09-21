"use client"
import React, { createContext, useContext, useState } from 'react';
import LoadingScreen from '@/components/elements/LoadingScreen';
import { useDisclosure } from '@nextui-org/react';
import LoginModal from '@/components/main-components/themas/midnight-amethyst/modal/LoginModal';
import RegisterModal from '@/components/main-components/themas/midnight-amethyst/modal/RegisterModal';

interface AppContextProps {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  isMinimalMenu: boolean;
  setIsMinimalMenu: (isLoading: boolean) => void;
  loginOnModal: () => void;
  registerOnModal: () => void;
}

export const AppContext = createContext<AppContextProps>({
  loading: false,
  setLoading: () => { },
  isMinimalMenu: false,
  setIsMinimalMenu: () => { },
  loginOnModal: () => { },
  registerOnModal: () => { }
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isMinimalMenu, setIsMinimalMenu] = useState(false);
  const { isOpen: loginIsModal, onOpen: loginOnModal, onOpenChange: loginOnOpenChange } = useDisclosure();
  const { isOpen: registerIsModal, onOpen: registerOnModal, onOpenChange: registerOnOpenChange } = useDisclosure();

  return (
    <AppContext.Provider value={{ loading, setLoading, isMinimalMenu, setIsMinimalMenu, loginOnModal, registerOnModal }}>
      <LoginModal loginIsModal={loginIsModal} loginOnModal={loginOnModal} loginOnOpenChange={loginOnOpenChange} />
      <RegisterModal registerIsModal={registerIsModal} registerOnModal={registerOnModal} registerOnOpenChange={registerOnOpenChange} />
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