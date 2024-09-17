import "../../styles/themas/midnight-amethyst.scss";
export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="w-full h-screen grid grid-cols-12 ">
      <div className="col-span-5">{children}</div>
      <div className="col-span-7 p-4">
        <div className="w-full h-full overflow-hidden p-5 relative rounded-xl ">
          <div className="w-[calc(100%+18rem)] h-[calc(100%+26rem)] grid grid-cols-4 gap-3 absolute -top-52 -left-32">
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
            <div className="w-full h-full bg-blue-500 rounded-[2.5rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
