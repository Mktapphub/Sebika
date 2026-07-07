import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Activity, Bell, Search } from "lucide-react";
import { navItems, mobileNavItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function useActive() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
        <Activity className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <div className="leading-tight">
        <span className="block font-display text-lg font-semibold tracking-tight text-foreground">
          Sebika
        </span>
        <span className="block text-[11px] font-medium text-muted-foreground">Health Companion</span>
      </div>
    </Link>
  );
}

function DesktopSidebar() {
  const isActive = useActive();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar px-4 py-5 lg:flex">
      <div className="px-2">
        <Brand />
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon
                className={cn("h-[18px] w-[18px] shrink-0", active && "text-primary")}
                strokeWidth={2.1}
              />
              <span className="flex-1 truncate">{item.title}</span>
              <span className="text-[11px] font-normal text-muted-foreground/70">
                {item.bengali}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl bg-primary-soft p-4">
        <p className="text-xs font-semibold text-accent-foreground">Emergency?</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          Find nearby blood donors instantly.
        </p>
        <Button asChild size="sm" variant="default" className="mt-3 w-full">
          <Link to="/blood">Open Blood Network</Link>
        </Button>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:px-8">
      <div className="lg:hidden">
        <Brand />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground md:flex">
          <Search className="h-4 w-4" />
          <span className="pr-8">Search doctors, medicines…</span>
        </div>
        <Button variant="ghost" size="icon" className="relative rounded-xl">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <Avatar className="h-9 w-9 border border-border">
          <AvatarFallback className="bg-accent text-accent-foreground text-xs font-semibold">
            RA
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

function MobileBottomBar() {
  const isActive = useActive();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {mobileNavItems.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 py-2.5"
            >
              <span
                className={cn(
                  "grid h-9 w-11 place-items-center rounded-xl transition-colors",
                  active ? "bg-primary-soft text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background">
      <DesktopSidebar />
      <div className="lg:pl-64">
        <TopBar />
        <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 lg:px-8 lg:pb-12">{children}</main>
      </div>
      <MobileBottomBar />
    </div>
  );
}
