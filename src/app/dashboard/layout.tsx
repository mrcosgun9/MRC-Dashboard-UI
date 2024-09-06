import Providers from "@/context/Providers";
import Navbar from "@/components/layouts/main-layout/Navbar";
import { RiMenuFoldFill } from "react-icons/ri";
import { Button } from "@nextui-org/react";
import LayoutMenu from "@/components/layouts/main-layout/Menu";


export default function DashboardLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <>
      <Providers session={session}>
        {/* <Navbar /> */}
        <LayoutMenu />
        <div className="w-screen pl-60 transition-all py-10">
          {/* <div className="w-full pl-60 py-3 bg-white dark:bg-gray-800 mb-6">
            <div className="container"></div>
          </div> */}
          <div className="w-full px-10">
            {children}
          </div>
        </div>
        {/* <main className="container mt-3">
          {children}
        </main> */}
      </Providers>
    </>
  );
}
