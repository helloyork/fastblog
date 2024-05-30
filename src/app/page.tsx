"use client";

import { useTheme } from "@lib/ui/providers/theme-mode";

export default function Home() {
  const { theme, setTheme } = useTheme();
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <>
      <p>Hello World!</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </>
  );
}
