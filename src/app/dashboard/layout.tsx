import MainLayout from "@/components/layouts/main-layout/MainLayout";


export default function DashboardLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {

  return (
    <>
      <MainLayout>
        {children}
      </MainLayout>
    </>
  );
}
