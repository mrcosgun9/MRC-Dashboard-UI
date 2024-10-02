"use client"
import Providers from "@/context/Providers";
import Navbar from "@/components/layouts/main-layout/Navbar";
import { useAppContext } from "@/context/AppContext";
import React,{ useEffect } from "react";
import { showToast } from "@/services/toastrServices";
import toast from "react-hot-toast";
 

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
        toast.success(`new message`);
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
