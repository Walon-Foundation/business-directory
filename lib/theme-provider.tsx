"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      // Make light mode the explicit default and let the class on <html> control Tailwind's dark styles
      defaultTheme="light"
      enableSystem={false}
      storageKey="theme-preference"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

export { useTheme } from "next-themes";
