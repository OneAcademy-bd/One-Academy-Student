import { useState } from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { Sun as SunIcon, Moon as MoonIcon } from "lucide-react";


export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = useState<boolean>(theme === 'dark')

  if (isDark)
    setTheme('dark')
  else
    setTheme('light')

  return (
    <Switch
      size="sm"
      color="success"
      isSelected={isDark}
      onValueChange={setIsDark}
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    />
  );
}
