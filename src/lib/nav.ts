import type { IconType } from "react-icons";
import {
  HiOutlineBriefcase,
  HiOutlineEnvelope,
  HiOutlineFolder,
  HiOutlineHome,
  HiOutlineUser,
} from "react-icons/hi2";
import type { Dictionary } from "@/i18n/dictionaries";
import { CONTACT_URL } from "@/lib/links";

export type NavKey = "home" | "about" | "projects" | "experience" | "contact";

export type NavItem = {
  key: NavKey;
  href: string;
  icon: IconType;
};

export const navItems: NavItem[] = [
  { key: "home", href: "/", icon: HiOutlineHome },
  { key: "about", href: "/about", icon: HiOutlineUser },
  { key: "projects", href: "/projects", icon: HiOutlineFolder },
  { key: "experience", href: "/experience", icon: HiOutlineBriefcase },
  { key: "contact", href: CONTACT_URL, icon: HiOutlineEnvelope },
];

export function navLabel(key: NavKey, t: Dictionary) {
  return t.nav[key];
}
