import AuthCarousel from "@/components/main-components/themas/midnight-amethyst/auth/carousel";
import "../../styles/themas/midnight-amethyst.scss";

export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="w-full h-screen bg-auth-bg bg-cover relative bg-center">
      <div className="container h-full p-6">
        <div className="w-full h-full grid grid-cols-12 bg-gradient-to-tr from-black/40 to-purple-950/40 rounded-2xl">
          <div className="col-span-6 flex flex-col align-middle items-center z-10 relative p-6 justify-between">
            <div className="w-full font-bold text-lg">e-papyon</div>
            <div className="w-full">{children}</div>
            <div className="w-full"></div>
          </div>
          <div className="col-span-6 py-6 px-16">
            <div className="w-full h-full bg-purple-950/80 rounded-xl p-8">
              <div className="w-full mb-8">
                <div className="text-5xl leading-tight text-white mb-4 font-bold">Hizmetlerimizi Keşfedin,<br /> Dijital Dünyada<br/>Bir Adım Öne Geçin!</div>
               </div>
              <AuthCarousel />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
