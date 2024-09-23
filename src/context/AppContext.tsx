"use client"
import React, { createContext, useContext, useState } from 'react';
import LoadingScreen from '@/components/elements/LoadingScreen';
import { useDisclosure } from '@nextui-org/react';
import LoginModal from '@/components/main-components/themas/midnight-amethyst/modal/LoginModal';
import RegisterModal from '@/components/main-components/themas/midnight-amethyst/modal/RegisterModal';
import CreateTenantModal from '@/components/main-components/themas/midnight-amethyst/modal/CreateTenantModal';

interface AppContextProps {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  isMinimalMenu: boolean;
  setIsMinimalMenu: (isLoading: boolean) => void;
  loginOnModal: () => void;
  registerOnModal: () => void;
  createTenantOnModal: () => void;
}

export const AppContext = createContext<AppContextProps>({
  loading: false,
  setLoading: () => { },
  isMinimalMenu: false,
  setIsMinimalMenu: () => { },
  loginOnModal: () => { },
  registerOnModal: () => { },
  createTenantOnModal: () => { }
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isMinimalMenu, setIsMinimalMenu] = useState(false);
  const { isOpen: loginIsModal, onOpen: loginOnModal, onOpenChange: loginOnOpenChange } = useDisclosure();
  const { isOpen: registerIsModal, onOpen: registerOnModal, onOpenChange: registerOnOpenChange } = useDisclosure();
  const { isOpen: createTenantIsModal, onOpen: createTenantOnModal, onOpenChange: createTenantOnOpenChange } = useDisclosure();

  return (
    <AppContext.Provider value={{ loading, setLoading, isMinimalMenu, setIsMinimalMenu, loginOnModal, registerOnModal, createTenantOnModal }}>
      <LoginModal loginIsModal={loginIsModal} loginOnModal={loginOnModal} loginOnOpenChange={loginOnOpenChange} />
      <RegisterModal registerIsModal={registerIsModal} registerOnModal={registerOnModal} registerOnOpenChange={registerOnOpenChange} />
      <CreateTenantModal createTenantIsModal={createTenantIsModal} createTenantOnModal={createTenantOnModal} createTenantOnOpenChange={createTenantOnOpenChange} />
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