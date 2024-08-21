import { BiHomeAlt2, BiUser } from 'react-icons/bi';
import { MenuItemType } from "@/types/NavbarTypes";

export const menuItems:MenuItemType[]=[
  {
    icon:<BiHomeAlt2/>,
    title: "Dashboard",
    childs: [
      {
        title: "Main Dashboard",
        href:"/"
      },
      {
        title: "Main Dashboard 2",
        href:"/"
      },
      {
        title: "Main Dashboard 2",
        href:"/"
      }
    ]
  },
  {
    icon:<BiUser/>,
    title: "Manage Users",
    childs: [
      {
        title: "All Users"
      },
      {
        title: "Banned Users"
      },
      {
        title: "Reported Users"
      }
    ]
  },
  {
    title: "Manage Users",
    childs: [
      {
        title: "All Users"
      },
      {
        title: "Banned Users"
      },
      {
        title: "Reported Users"
      }
    ]
  },
  {
    title: "Manage Users",
    childs: [
      {
        title: "All Users"
      },
      {
        title: "Banned Users"
      },
      {
        title: "Reported Users"
      }
    ]
  }
]