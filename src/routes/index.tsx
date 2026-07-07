import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarHeart,
  Droplets,
  HeartPulse,
  Activity,
  Pill,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/page-header";
import { DoctorCard } from "@/components/doctor-card";
import { navItems } from "@/lib/nav";
import { doctors, bloodRequests } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  component: Home,
});

const quickActions = navItems.slice(1);

const vitals = [
  { label: "Heart Rate", value: "72", unit: "bpm", icon: HeartPulse, tone: "text-destructive" },
  { label: "Blood Pressure", value: "118/76", unit: "mmHg", icon: Activity, tone: "text-primary" },
  { label: "Glucose", value: "5.4", unit: "mmol/L", icon: TrendingUp, tone: "text-success" },
];

function Home() {
  return (
    <AppShell>
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card lg:p-10">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="relative max-w-2xl">
          <Badge variant="secondary" className="bg-primary-soft text-primary hover:bg-primary-soft">
            Your Health Companion
          </Badge>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-foreground lg:text-4xl">
            Hello, Minhajul.
            <br />
            How are you feeling today?
          </h1>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground lg:text-base">
            Book trusted doctors, keep your records safe, verify medicines and reach blood
            donors — all in one calm, reliable place.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/appointments">
                <CalendarHeart className="h-4 w-4" /> Book Appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/doctors">
                Find a Doctor <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vitals */}
      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {vitals.map((v) => (
          <SectionCard key={v.label} className="flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-muted">
              <v.icon className={`h-6 w-6 ${v.tone}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{v.label}</p>
              <p className="text-xl font-semibold text-foreground">
                {v.value}{" "}
                <span className="text-xs font-normal text-muted-foreground">{v.unit}</span>
              </p>
            </div>
          </SectionCard>
        ))}
      </section>

      {/* Quick actions */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-foreground">Quick access</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <a.icon className="h-5 w-5" strokeWidth={2.1} />
              </span>
              <span className="text-sm font-semibold text-foreground">{a.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Upcoming + Doctors */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Top-rated doctors</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/doctors">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {doctors.slice(0, 2).map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>

          <SectionCard className="mt-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <CalendarHeart className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Next appointment · Dr. Nusrat Jahan
                </p>
                <p className="text-xs text-muted-foreground">Today, 7:00 PM · United Hospital</p>
              </div>
              <Button size="sm" variant="outline">
                Details
              </Button>
            </div>
          </SectionCard>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          <SectionCard>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Health profile</h3>
              <Badge variant="secondary">78% complete</Badge>
            </div>
            <Progress value={78} className="mt-3" />
            <p className="mt-2 text-xs text-muted-foreground">
              Add your allergy details to complete your record.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-3 w-full">
              <Link to="/records">Complete profile</Link>
            </Button>
          </SectionCard>

          <SectionCard>
            <div className="mb-3 flex items-center gap-2">
              <Droplets className="h-4 w-4 text-destructive" />
              <h3 className="font-semibold text-foreground">Live blood requests</h3>
            </div>
            <div className="space-y-3">
              {bloodRequests.slice(0, 2).map((r) => (
                <div key={r.id} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-destructive/10 text-sm font-bold text-destructive">
                    {r.group}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{r.hospital}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.units} unit(s) · {r.postedAgo}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-destructive/40 text-destructive">
                    {r.urgency}
                  </Badge>
                </div>
              ))}
            </div>
            <Button asChild size="sm" className="mt-4 w-full">
              <Link to="/blood">Open blood network</Link>
            </Button>
          </SectionCard>

          <SectionCard className="bg-primary text-primary-foreground">
            <ShieldCheck className="h-6 w-6" />
            <h3 className="mt-3 font-semibold">Verify your medicine</h3>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Scan or enter a batch code to confirm authenticity instantly.
            </p>
            <Button asChild variant="secondary" size="sm" className="mt-4 w-full">
              <Link to="/verify">
                <Pill className="h-4 w-4" /> Check now
              </Link>
            </Button>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
