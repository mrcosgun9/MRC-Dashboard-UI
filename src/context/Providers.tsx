"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react"
import { AppProvider } from "./AppContext";
interface ProvidersProps {
  children: React.ReactNode;
}
export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AppProvider>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
      </AppProvider>
    </SessionProvider>
  );
}