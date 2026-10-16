"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import TransitionProvider from "@/components/transition/TransitionProvider";
import Dock from "@/components/nav/Dock";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>
        <TransitionProvider>
          {children}
          <Dock />
        </TransitionProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
