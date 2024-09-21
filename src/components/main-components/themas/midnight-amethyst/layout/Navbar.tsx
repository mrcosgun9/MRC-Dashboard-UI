"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { BiChevronDown, BiLock, BiServer, BiUser } from "react-icons/bi";
import { HiScale } from "react-icons/hi";
import { BsActivity } from "react-icons/bs";
import { IoFlash } from "react-icons/io5";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

export default function HomeNavbar() {
  const { loginOnModal, registerOnModal } = useAppContext();
  const icons = {
    chevron: <BiChevronDown fill="currentColor" size={16} />,
    scale: <HiScale className="text-warning" fill="currentColor" size={30} />,
    lock: <BiLock className="text-success" fill="currentColor" size={30} />,
    activity: <BsActivity className="text-secondary" fill="currentColor" size={30} />,
    flash: <IoFlash className="text-primary" fill="currentColor" size={30} />,
    server: <BiServer className="text-success" fill="currentColor" size={30} />,
    user: <BiUser className="text-danger" fill="currentColor" size={30} />,
  };

  return (
    <Navbar position="sticky" maxWidth="xl">
      <NavbarBrand>
        <Link href={"/"} className="font-bold text-inherit">
          <img src='/images/white-logo.png' className="h-9" />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-5" justify="center">
        <NavbarItem>
          <Link href="#" color="foreground">
            Kurumsal
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Hizmetlerimiz
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="ACME scales apps to meet user demand, automagically, based on load."
              startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              startContent={icons.activity}
            >
              Usage Metrics
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="ACME runs on ACME, join us and others serving requests at web scale."
              startContent={icons.flash}
            >
              Production Ready
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
              startContent={icons.server}
            >
              +99% Uptime
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
              startContent={icons.user}
            >
              +Supreme Support
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link href="#" color="foreground">
            Referanslar
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Blog
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            İletişim
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onPress={registerOnModal} variant="shadow" className="bg-gradient-to-tr from-purple-700 to-blue-700 text-white shadow-lg font-medium" >
            Kayıt Ol
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button onPress={loginOnModal} className="bg-gradient-to-tr from-purple-700 to-blue-700 text-white shadow-lg font-medium" variant="shadow">Giriş Yap</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
