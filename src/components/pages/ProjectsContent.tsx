"use client";

import { motion } from "framer-motion";
import { HiOutlineArrowUpRight, HiOutlineCodeBracket } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getCategoryIcon, getTechIcon } from "@/lib/techIcons";
import PageShell from "@/components/layout/PageShell";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProjectsContent() {
  const { t } = useLanguage();

  return (
    <PageShell title={t.projects.heading} lead={t.projects.lead}>
      <div className="flex flex-col gap-6">
        {t.projects.items.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
            className="group rounded-2xl border border-border-soft bg-surface/50 p-6 backdrop-blur-sm transition-colors hover:border-foreground/25 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h2 className="text-xl font-semibold tracking-tight">
                  {project.title}
                </h2>

                {project.status && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/30 bg-foreground/5 px-2.5 py-0.5 text-xs font-medium text-foreground">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground" />
                    {project.status}
                  </span>
                )}

                <span className="rounded-md border border-border-soft px-2 py-0.5 text-xs text-muted">
                  {project.architecture}
                </span>
              </div>

              <span className="font-mono text-xs text-muted">0{i + 1}</span>
            </div>

            <p className="mt-4 max-w-3xl leading-relaxed text-foreground/70">
              {project.description}
            </p>

            <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.stack.map((group) => {
                const CategoryIcon = getCategoryIcon(group.label);
                return (
                  <div key={group.label} className="flex flex-col gap-2">
                    <dt className="flex items-center gap-1.5 font-mono text-xs font-semibold tracking-tight text-muted">
                      {CategoryIcon && (
                        <CategoryIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      )}
                      {group.label}
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => {
                        const tech = getTechIcon(item);
                        const Icon = tech?.Icon;
                        return (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1.5 rounded-md bg-foreground/5 px-2 py-0.5 text-xs font-medium text-foreground/80"
                          >
                            {Icon && (
                              <Icon
                                className="h-3.5 w-3.5 shrink-0"
                                style={tech.color ? { color: tech.color } : undefined}
                                aria-hidden
                              />
                            )}
                            {item}
                          </span>
                        );
                      })}
                    </dd>
                  </div>
                );
              })}
            </dl>

            {project.links.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-border-soft pt-4">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.url.includes("github.com") ? (
                      <SiGithub className="text-base" />
                    ) : (
                      <HiOutlineCodeBracket className="text-base" />
                    )}
                    {link.label}
                    <HiOutlineArrowUpRight className="text-base" />
                  </a>
                ))}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
