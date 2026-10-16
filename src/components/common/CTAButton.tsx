"use client";

import { useTransitionRouter } from "next-transition-router";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function CTAButton({ target = "/projects" }: { target?: string }) {
  const router = useTransitionRouter();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => router.push(target)}
      className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      {t.home.cta}
      <HiOutlineArrowUpRight className="text-base transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}
