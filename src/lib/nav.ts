import {
  CalendarHeart,
  Stethoscope,
  FolderLock,
  GraduationCap,
  Droplets,
  ShieldCheck,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  bengali: string;
  to: string;
  icon: LucideIcon;
  desc: string;
}

export const navItems: NavItem[] = [
  {
    title: "Overview",
    bengali: "হোম",
    to: "/",
    icon: LayoutDashboard,
    desc: "Your health at a glance",
  },
  {
    title: "Appointments",
    bengali: "অ্যাপয়েন্টমেন্ট",
    to: "/appointments",
    icon: CalendarHeart,
    desc: "Book and manage visits",
  },
  {
    title: "Doctors",
    bengali: "ডাক্তার",
    to: "/doctors",
    icon: Stethoscope,
    desc: "Find verified specialists",
  },
  {
    title: "Records",
    bengali: "রেকর্ড",
    to: "/records",
    icon: FolderLock,
    desc: "Secure health records",
  },
  {
    title: "Blood",
    bengali: "রক্ত",
    to: "/blood",
    icon: Droplets,
    desc: "Emergency donor network",
  },
  {
    title: "Medicine Directory",
    bengali: "ওষুধ",
    to: "/verify",
    icon: ShieldCheck,
    desc: "Browse and verify medicines",
  },
  {
    title: "Learn",
    bengali: "শিক্ষা",
    to: "/learn",
    icon: GraduationCap,
    desc: "Health education library",
  },
];

// Items shown in the mobile bottom bar (keep it to 5 for clarity)
export const mobileNavItems: NavItem[] = [
  navItems[0],
  navItems[1],
  navItems[2],
  navItems[4],
  navItems[5],
];
