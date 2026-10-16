"use client";

import { useTheme } from "next-themes";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useLanguage } from "@/i18n/LanguageProvider";
import ToolTip from "@/components/common/ToolTip";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLanguage();

  const isDark = (resolvedTheme ?? "dark") === "dark";

  return (
    <button
      type="button"
      aria-label={t.nav.theme}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative flex h-11 w-11 items-center justify-center rounded-2xl text-foreground/70 transition-colors duration-200 hover:text-foreground"
    >
      {/*
        El icono se decide con CSS según la clase del <html>, así evitamos
        un estado de "montado" y no parpadea al hidratar.
      */}
      <span className="relative z-10 text-[22px] transition-transform duration-300 group-hover:rotate-12 dark:hidden">
        <HiOutlineSun />
      </span>
      <span className="relative z-10 hidden text-[22px] transition-transform duration-300 group-hover:rotate-12 dark:block">
        <HiOutlineMoon />
      </span>
      <ToolTip>{t.nav.theme}</ToolTip>
    </button>
  );
}
