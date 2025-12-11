"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-cyber-blue text-cyber-blue bg-white/10 hover:bg-white/20 dark:border-cyber-blue dark:text-cyber-blue dark:bg-darker-bg dark:hover:bg-white/10">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-cyber-blue" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-cyber-blue/30 backdrop-blur-xl">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`${
            (theme === 'light' || (theme === 'system' && resolvedTheme === 'light'))
              ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
              : 'text-foreground hover:bg-white/10'
          }`}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`${
            (theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark'))
              ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
              : 'text-foreground hover:bg-white/10'
          }`}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`${
            theme === 'system'
              ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
              : 'text-foreground hover:bg-white/10'
          }`}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="border-cyber-blue text-cyber-blue bg-white/10 hover:bg-white/20 dark:border-cyber-blue dark:text-cyber-blue dark:bg-darker-bg dark:hover:bg-white/10"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-cyber-blue" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
