"use client";

import Image from "next/image";
import { HiAcademicCap, HiOutlineMapPin } from "react-icons/hi2";

import { useLanguage } from "@/i18n/LanguageProvider";
import { getTechIcon } from "@/lib/techIcons";
import { PHOTOS } from "@/lib/photos";
import PageShell from "@/components/layout/PageShell";
import PhotoSlideshow from "@/components/about/PhotoSlideshow";

export default function AboutContent() {
  const { t } = useLanguage();

  return (
    <PageShell
      title={t.about.heading}
      lead={t.about.lead}
      intro={
        <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-muted">
          <HiOutlineMapPin className="text-sm" aria-hidden />
          {t.about.location}
        </p>
      }
      aside={PHOTOS.length > 0 ? <PhotoSlideshow photos={PHOTOS} /> : undefined}
      background={
        // Fondo sutil: una foto muy desenfocada y con poca opacidad, fundida
        // con el color de fondo para que el texto siga legible en claro y oscuro.
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <Image
            src="/images/photos/04.jpg"
            alt=""
            fill
            sizes="100vw"
            className="scale-125 object-cover opacity-[0.14] blur-3xl dark:opacity-[0.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        </div>
      }
    >
      <div className="mt-14">
        <h2 className="font-mono text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {t.about.educationHeading}
        </h2>

        <ol className="mt-6 border-l border-border-soft">
          {t.about.education.map((item) => (
            <li
              key={`${item.institution}-${item.degree}`}
              className="relative pb-8 pl-10 last:pb-0"
            >
              <span className="absolute -left-4 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border-soft bg-surface text-muted">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.institution}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <HiAcademicCap className="h-4 w-4" aria-hidden />
                )}
              </span>

              <div className="pt-1">
                <h3 className="font-medium text-foreground">
                  {item.institution}
                </h3>
                <p className="text-sm text-foreground/70">{item.degree}</p>

                {(item.status || item.period) && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                    {item.status && (
                      <span className="rounded-md border border-border-soft px-2 py-0.5 text-xs">
                        {item.status}
                      </span>
                    )}
                    {item.period && <span>{item.period}</span>}
                  </div>
                )}

                {item.details && (
                  <p className="mt-2 text-sm text-foreground/60">
                    {item.details}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14">
        <h2 className="font-mono text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {t.about.skillsHeading}
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.skillGroups.map((group) => (
            <section
              key={group.label}
              className="h-fit rounded-2xl border border-border-soft bg-surface/60 p-5 backdrop-blur-sm"
            >
              <h3 className="font-mono text-sm font-semibold tracking-tight text-foreground">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => {
                  const meta = getTechIcon(skill);
                  const Icon = meta?.Icon;
                  return (
                    <li
                      key={skill}
                      className="flex items-center gap-2 rounded-lg border border-border-soft px-2.5 py-1.5 text-sm text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground"
                    >
                      {Icon && (
                        <Icon
                          className="h-4 w-4 shrink-0"
                          style={meta.color ? { color: meta.color } : undefined}
                          aria-hidden
                        />
                      )}
                      {skill}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
