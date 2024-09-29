import React from "react";
import { ThemeSwitcher } from "@/components/elements/ThemeSwitcher";
import HomeNavbar from "@/components/main-components/themas/midnight-amethyst/layout/Navbar";
import "../../styles/themas/midnight-amethyst.scss";
import HomeFooter from "@/components/main-components/themas/midnight-amethyst/layout/Footer";

export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <HomeNavbar /> */}
      {children}
      <HomeFooter />
      <div className="fixed z-50 right-5 bottom-5">
        <ThemeSwitcher />
      </div>
    </>
  );
}
