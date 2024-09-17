import "../../styles/themas/midnight-amethyst.scss";
export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="w-full h-screen grid grid-cols-12 bg-auth-bg bg-cover relative bg-center gap-5">
      <div className="col-span-8 p-6">
        <div className="w-full h-full bg-black/60 rounded-3xl"></div>
      </div>
      <div className="col-span-4 flex align-middle items-center z-10 relative">
        {children}
      </div>

    </div>
  );
}
