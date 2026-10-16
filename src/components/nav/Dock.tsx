"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-transition-router";
import { useLanguage } from "@/i18n/LanguageProvider";
import { navItems, navLabel } from "@/lib/nav";
import ToolTip from "@/components/common/ToolTip";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

function Divider() {
  return (
    <span className="h-5 w-px shrink-0 bg-border-soft sm:mx-1 sm:h-6" />
  );
}

export default function Dock() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useTransitionRouter();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))]">
      <motion.nav
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-center gap-px rounded-[18px] border border-border-soft bg-surface/80 p-1 shadow-[0_10px_45px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:gap-1 sm:rounded-[22px] sm:p-2 dark:shadow-[0_10px_45px_rgba(0,0,0,0.55)]"
      >
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const external = item.href.startsWith("mailto:");
          const active = !external && isActive(item.href);
          const label = navLabel(item.key, t);

          const className = `group relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors duration-200 sm:h-11 sm:w-11 sm:rounded-2xl ${
            active ? "text-foreground" : "text-foreground/60 hover:text-foreground"
          }`;

          const content = (
            <>
              {active && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-xl bg-foreground/10 sm:rounded-2xl"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 32,
                  }}
                />
              )}
              <Icon
                className={`relative z-10 text-[19px] transition-transform duration-200 group-hover:scale-110 sm:text-[21px] ${
                  active ? "scale-110" : ""
                }`}
              />
              <ToolTip>{label}</ToolTip>
            </>
          );

          return (
            <Fragment key={item.key}>
              {i === 1 && <Divider />}
              {external ? (
                <a href={item.href} aria-label={label} className={className}>
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                  onClick={() => {
                    if (!active) router.push(item.href);
                  }}
                  className={className}
                >
                  {content}
                </button>
              )}
            </Fragment>
          );
        })}

        <Divider />
        <LanguageToggle />
        <Divider />
        <ThemeToggle />
      </motion.nav>
    </div>
  );
}
