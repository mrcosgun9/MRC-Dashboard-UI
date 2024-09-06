import { TbBook, TbHome, TbHome2, TbShoppingBag } from 'react-icons/tb'
import { MenuItemType } from "@/types/NavbarTypes";
const main = "/dashboard";
export const menuItems: MenuItemType[] = [
  {
    icon: <TbHome size={20} />,
    title: "Giriş",
    href: main
  },
  {
    icon: <TbShoppingBag size={20} />,
    title: "Ürünler",
    childs: [
      {
        title: "Ürünler",
        href: `${main}/products`,
      },
      {
        title: "Satın Alma",
        href: `${main}/saller`,
      },
      {
        title: "Ürünler",
        href: `${main}/products`,
      },
      {
        title: "Satın Alma",
        href: `${main}/saller`,
      },
      {
        title: "Ürünler",
        href: `${main}/products`,
      },
      {
        title: "Satın Alma",
        href: `${main}/saller`,
      },
      {
        title: "Ürünler",
        href: `${main}/products`,
      },
      {
        title: "Satın Alma",
        href: `${main}/saller`,
      }
    ]
  },
  {
    icon: <TbShoppingBag size={20} />,
    title: "Ürünler",
    childs: [
      {
        title: "Ürünler",
        href: `${main}/products`,
      },
      {
        title: "Satın Alma",
        href: `${main}/saller`,
      },
      {
        title: "Ürünler",
        href: `${main}/products`,
      },
      {
        title: "Satın Alma",
        href: `${main}/saller`,
      },
      {
        title: "Ürünler",
        href: `${main}/products`,
      },
      {
        title: "Satın Alma",
        href: `${main}/saller`,
      },
      {
        title: "Ürünler",
        href: `${main}/products`,
      },
      {
        title: "Satın Alma",
        href: `${main}/saller`,
      },
      {
        title: "Ürünler",
        href: `${main}/products`,
      },
      {
        title: "Satın Alma",
        href: `${main}/saller`,
      },
      {
        title: "Ürünler",
        href: `${main}/products`,
      },
      {
        title: "Satın Alma",
        href: `${main}/saller`,
      }
    ]
  },
  {
    icon: <TbBook size={20} />,
    title: "Blog",
    href: `${main}/blog`
  },
]