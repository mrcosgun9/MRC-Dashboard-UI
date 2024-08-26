import { BiHomeAlt2, BiUser } from 'react-icons/bi';
import { MenuItemType } from "@/types/NavbarTypes";

export const menuItems: MenuItemType[] = [
  {
    icon: <BiHomeAlt2 />,
    title: "Dashboard",
    childs: [
      {
        title: "Main Dashboard",
        href: "/dashboard"
      },

    ]
  },
  {
    icon: <BiUser />,
    title: "Manage Users",
    childs: [
      {
        title: "All Users",
        href: "/dashboard/manage-users/all-user"
      },
    ]
  }
]