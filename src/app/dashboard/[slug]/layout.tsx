import MainLayout from "@/components/layouts/main-layout/MainLayout";


export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <MainLayout>
        {children}
      </MainLayout>
    </>
  );
}
