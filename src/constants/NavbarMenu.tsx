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
    icon: <TbBook size={20} />,
    title: "Blog",
    href: `${main}/blog` 
  },
]