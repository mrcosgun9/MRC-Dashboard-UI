"use client";

import { Button, Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  const changeTheme = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <div>
      
      <Button isIconOnly aria-label="Like" variant="faded" onClick={() => { changeTheme() }}>
        {theme=='light'?<FiSun size={18}/>:<IoMoonOutline size={18}/>}
      </Button>
 
    </div>
  )
};