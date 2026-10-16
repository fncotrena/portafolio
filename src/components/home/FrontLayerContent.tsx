"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { useLanguage } from "@/i18n/LanguageProvider";
import CTAButton from "@/components/common/CTAButton";
import SocialLink from "@/components/common/SocialLink";
import { LINKS } from "@/lib/links";

export default function FrontLayerContent() {
  const { t } = useLanguage();

  return (
    <div className="pointer-events-none relative z-10 h-full w-full text-foreground">
      {/* Velo superior: sube el contraste del texto sin tocar la parte de abajo */}
      <div className="hero-veil absolute inset-0" />

      <div className="relative w-full max-w-5xl space-y-3 px-6 pt-10 sm:px-10 sm:pt-16 md:space-y-5 md:px-16 md:pt-24">
        <h1 className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          {t.home.role}
        </h1>

        <p className="max-w-[62ch] text-sm leading-relaxed text-foreground/80 sm:text-base">
          {t.home.greeting}{" "}
          <span className="font-caveat text-xl tracking-wide text-foreground md:text-2xl">
            {t.home.name}
          </span>
          . {t.home.intro}{" "}
          <span className="whitespace-nowrap font-sans text-xs font-medium text-foreground">
            {t.common.openToWork}
          </span>
        </p>

        <div className="pointer-events-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-2 sm:gap-x-6">
          <CTAButton />

          <a
            href={LINKS.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface/40 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {t.home.cv}
            <HiOutlineDocumentText className="text-base transition-transform duration-200 group-hover:-translate-y-0.5" />
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            <SocialLink href={LINKS.linkedin} label={t.home.linkedin}>
              <FaLinkedin />
            </SocialLink>
            <SocialLink href={LINKS.github} label={t.home.github}>
              <FaGithub />
            </SocialLink>
          </div>
        </div>
      </div>
    </div>
  );
}
