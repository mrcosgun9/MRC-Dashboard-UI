"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import UserMenu from "./UserMenu";
interface ILogo {
  url: string,
  href: string,
  isCenter: boolean
}
interface IChildMenuItem {
  title: string,
  href: string,
  description?: string,
  img?: string
}
interface IMenuItem {
  title: string,
  href: string,
  items?: IChildMenuItem[]
}
interface INavbar {
  logo: ILogo | null,
  menuItems: IMenuItem[],
  position: "static" | "sticky"
}

export default function HomeNavbar({ logo, menuItems, position = "sticky" }: INavbar) {
  const icons = {
    chevron: <BiChevronDown fill="currentColor" size={16} />,
  };
  return (
    <Navbar position={position} maxWidth="xl">
      {
        !logo?.isCenter && <NavbarContent justify="start">
          <NavbarBrand>
            <Link href={logo?.href ?? ""} className="font-bold text-inherit">
              <img src={logo?.url} className="h-11" />
            </Link>
          </NavbarBrand>
        </NavbarContent>
      }
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        {
          menuItems?.map((x, i) => {
            if (!x.items) {
              return <NavbarItem key={i}>
                <Link href={x.href} color="foreground">
                  {x.title}
                </Link>
              </NavbarItem>
            }
            else {
              return <Dropdown key={i}>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base"
                      endContent={icons.chevron}
                      radius="sm"
                      variant="light"

                    >
                      {x.title}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label="ACME features"
                  className="max-w-80"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {
                    x.items.map((child, j) => {
                      return <DropdownItem
                        key={j}
                        description={child.description}
                        startContent={<img src={child.img} className="w-5 h-5" />}
                      >
                        {child.title}
                      </DropdownItem>
                    })
                  }

                </DropdownMenu>
              </Dropdown>
            }
          })
        }
      </NavbarContent>
      {
        logo?.isCenter && <NavbarContent justify="center">
          <NavbarBrand>
            <Link href={logo?.href ?? ""} className="font-bold text-inherit">
              <img src={logo?.url} className="h-11" />
            </Link>
          </NavbarBrand>
        </NavbarContent>
      }
      <NavbarContent justify="end">
        <UserMenu />
      </NavbarContent>
    </Navbar>
  );
}
