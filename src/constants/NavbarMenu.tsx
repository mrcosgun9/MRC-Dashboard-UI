import { BiChat, BiHomeAlt2, BiUser } from 'react-icons/bi';
import { MenuItemType } from "@/types/NavbarTypes";
const dashboardUrl='/dashboard';
export const menuItems: MenuItemType[] = [
  {
    icon: <BiHomeAlt2 />,
    title: "Dashboard",
    childs: [
      {
        title: "Main Dashboard",
        href: dashboardUrl
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
  },
  {
    icon: <BiChat />,
    title: "Chats",
    childs: [
      {
        title: "Fake Users Chat",
        href: "/dashboard/chats"
      },
    ]
  }
]