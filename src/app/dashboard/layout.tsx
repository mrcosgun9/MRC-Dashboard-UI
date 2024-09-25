"use client"
import Providers from "@/context/Providers";
import Navbar from "@/components/layouts/main-layout/Navbar";
import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import { showToast } from "@/services/toastrServices";


export default function DashboardLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  const { connection } = useAppContext();
  useEffect(() => {
    if (connection) {
      connection.on("UserLoggedIn", (userName: string) => {
        showToast('success', `${userName} is online`)
        const audio = new Audio('/sounds/bell.wav'); // Ses dosyanızın yolu
        audio.play();
      })
       connection.on("userConnections", (userList: any[]) => {
        console.log("userConnections", userList)
      })
      connection.on("receiveMessageNotification", (senderId: number, userName: string, receiverUserId: number, content: string) => {
        const audio = new Audio('/sounds/bell.wav'); // Ses dosyanızın yolu
        audio.play();
        showToast('default', `${userName} send you a new message`);
      })
    }
  }, [connection])
  return (

    <>
      <Providers session={session}>
        <Navbar />
        <main className="container mt-3">
          {children}
        </main>
      </Providers>
    </>
  );
}
