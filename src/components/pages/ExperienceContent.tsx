"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineDocumentText, HiOutlineEnvelope } from "react-icons/hi2";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getTechIcon } from "@/lib/techIcons";
import { CONTACT_URL, LINKS } from "@/lib/links";
import PageShell from "@/components/layout/PageShell";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ExperienceContent() {
  const { t } = useLanguage();

  return (
    <PageShell title={t.experience.heading} lead={t.experience.lead}>
      <div className="flex flex-col gap-8">
        {t.experience.items.map((job, i) => (
          <motion.article
            key={`${job.company}-${job.period}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
            className="rounded-2xl border border-border-soft bg-surface/50 p-6 backdrop-blur-sm transition-colors hover:border-foreground/25 md:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              {job.logo && (
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={64}
                  height={64}
                  className="h-14 w-14 shrink-0 rounded-xl border border-border-soft object-cover sm:h-16 sm:w-16"
                />
              )}

              <div className="min-w-0">
                <h2 className="text-xl font-semibold tracking-tight">
                  {job.role}
                </h2>
                <p className="mt-1 text-sm text-foreground/70">
                  <span className="font-medium text-foreground">
                    {job.company}
                  </span>{" "}
                  · {job.employmentType}
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  {job.period} · {job.duration}
                </p>
                <p className="text-sm text-muted">
                  {job.location} · {job.workMode}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium text-foreground/90">{job.subtitle}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                {job.summary}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.stack.map((tech) => {
                const meta = getTechIcon(tech);
                const Icon = meta?.Icon;
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-md bg-foreground/5 px-2 py-0.5 text-xs font-medium text-foreground/80"
                  >
                    {Icon && (
                      <Icon
                        className="h-3.5 w-3.5 shrink-0"
                        style={meta.color ? { color: meta.color } : undefined}
                        aria-hidden
                      />
                    )}
                    {tech}
                  </span>
                );
              })}
            </div>

            <ul className="mt-6 space-y-2.5">
              {job.responsibilities.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-3 text-sm leading-relaxed text-foreground/70"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                  <span>
                    <span className="font-medium text-foreground/90">
                      {item.title}:
                    </span>{" "}
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-border-soft bg-surface/60 p-8 text-center backdrop-blur-sm"
      >
        <p className="max-w-[56ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
          {t.experience.contactText}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={CONTACT_URL}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <HiOutlineEnvelope className="text-base" />
            {t.experience.contactCta}
          </a>
          <a
            href={LINKS.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-soft px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-foreground/30 hover:bg-foreground/5"
          >
            <HiOutlineDocumentText className="text-base" />
            {t.experience.contactCv}
          </a>
        </div>
      </motion.div>
    </PageShell>
  );
}
