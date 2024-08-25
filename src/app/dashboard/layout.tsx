import Providers from "@/context/Providers";
import Navbar from "@/components/layouts/main-layout/Navbar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
        <Navbar />
        <main className="container mt-3">
          {children}
        </main>
      </Providers>
    </>
  );
}
