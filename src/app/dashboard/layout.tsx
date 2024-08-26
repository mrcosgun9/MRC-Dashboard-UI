import Providers from "@/context/Providers";
import Navbar from "@/components/layouts/main-layout/Navbar";


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
        <Navbar />
        <main className="container mt-3">
          {children}
        </main>
      </Providers>
    </>
  );
}
