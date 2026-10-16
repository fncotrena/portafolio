"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import ToolTip from "./ToolTip";

// Icono de red social con su tooltip. El `group relative` es lo que ancla
// el tooltip, así que no lo saques de acá.
export default function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="block cursor-pointer text-3xl tracking-wider text-foreground transition-transform duration-200 hover:scale-125 active:scale-100 sm:text-4xl"
      >
        {children}
      </Link>
      <ToolTip>{label}</ToolTip>
    </div>
  );
}
