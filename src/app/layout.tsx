import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.scss";
import Providers from "@/context/Providers";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session: any
}>) {
  return (
    <html lang="en" >
      <body className={nunito.className}>
        <Providers session={session}>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
