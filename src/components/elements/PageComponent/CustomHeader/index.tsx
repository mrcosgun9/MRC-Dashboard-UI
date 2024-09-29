import Link from "next/link";
import React from "react";

interface ImageResponse {
  url: string
  href: string
}
interface MenuItems {
  title: string,
  href: string
}
interface IHeader {
  children: React.ReactNode
  copy: string
  title: string,
  headline: string,
  logo: ImageResponse | null,
  menuItems: MenuItems[]
}

export default function CustomHeader({
  children,
  copy,
  headline,
  logo,
  title,
  menuItems
}: IHeader) {
  return (
    <header className="w-full h-auto py-5">
      <div className="container flex align-middle items-center justify-between">
        <div>
          {logo && <Link href={logo.href}><img src={logo.url} className="h-10" /></Link>}
        </div>
        <div>
          <div className="flex align-middle items-center justify-center gap-2">
            {menuItems?.map((x, i) => {
              return <div key={i}>
                {x.title}
              </div>
            })}
          </div>
        </div>
        <div>Right Menü</div>
      </div>
    </header>
  )
}
