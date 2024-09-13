import { ThemeSwitcher } from "@/components/elements/ThemeSwitcher";
import HomeNavbar from "@/components/main-components/layout/Navbar";

export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <HomeNavbar />
      {children}
      <div className="fixed z-50 right-5 bottom-5">
        <ThemeSwitcher />
      </div>
    </>
  );
}
