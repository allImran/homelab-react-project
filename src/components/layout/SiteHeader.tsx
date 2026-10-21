import Link from "next/link";
import { AuthNavAction } from "@/components/auth/AuthNavAction";
import { Wordmark } from "@/components/brand/Wordmark";
import { LiquidGlassFrame } from "@/components/ui/LiquidGlassFrame";
import { ROUTES } from "@/config/routes";
import { NavLink } from "./NavLink";

const NAV_ITEMS = [
  { href: ROUTES.feeds, label: "Feeds" },
  { href: ROUTES.dashboard, label: "Saved" },
];

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-obsidian/80 to-transparent" />
      <LiquidGlassFrame className="h-24">
        <nav aria-label="Main" className="flex items-center gap-2 sm:gap-5">
          <Link href={ROUTES.home} className="pl-2 text-xs sm:pl-3 sm:text-base">
            <Wordmark />
          </Link>
          <span className="h-4 w-px bg-line-strong" aria-hidden />
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
          <AuthNavAction />
        </nav>
      </LiquidGlassFrame>
    </header>
  );
}
