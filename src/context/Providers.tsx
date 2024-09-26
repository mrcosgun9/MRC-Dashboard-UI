"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider, useSession } from "next-auth/react"
import { AppProvider } from "./app-context";
import { Toaster } from "react-hot-toast";
interface ProvidersProps {
  children: React.ReactNode;
  session: any;
}
export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
            <Toaster position="bottom-right"
              reverseOrder={false} />
          </NextThemesProvider>
        </NextUIProvider>
      </AppProvider>
    </SessionProvider>
  );
}