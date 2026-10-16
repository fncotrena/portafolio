"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import ToolTip from "@/components/common/ToolTip";

export default function LanguageToggle() {
  const { lang, toggle, t } = useLanguage();

  return (
    <button
      type="button"
      aria-label={t.nav.language}
      onClick={toggle}
      className="group relative flex h-11 w-11 items-center justify-center rounded-2xl font-mono text-sm font-semibold text-foreground/70 transition-colors duration-200 hover:text-foreground"
    >
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {lang === "es" ? "ES" : "EN"}
      </span>
      <ToolTip>{t.nav.language}</ToolTip>
    </button>
  );
}
