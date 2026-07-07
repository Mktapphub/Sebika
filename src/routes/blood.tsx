import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Droplets, MapPin, Phone, Plus, Users, Activity } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader, SectionCard } from "@/components/page-header";
import { bloodRequests } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/blood")({
  head: () => ({
    meta: [
      { title: "Blood Donor Network — Sebika" },
      {
        name: "description",
        content: "Real-time emergency blood donor matching. Request or respond in seconds.",
      },
    ],
  }),
  component: BloodPage,
});

const groups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const donors = [
  { name: "Sabbir A.", group: "O-", distance: "1.2 km", lastDonated: "4 months ago" },
  { name: "Rima K.", group: "B+", distance: "2.8 km", lastDonated: "6 months ago" },
  { name: "Tanvir H.", group: "A+", distance: "3.4 km", lastDonated: "5 months ago" },
];

const urgencyStyle: Record<string, string> = {
  Critical: "border-destructive/50 bg-destructive/10 text-destructive",
  Urgent: "border-warning/50 bg-warning/10 text-warning",
  Scheduled: "border-border bg-muted text-muted-foreground",
};

function BloodPage() {
  const [group, setGroup] = useState("O-");

  return (
    <AppShell>
      <PageHeader
        title="Blood Donor Network"
        bengali="রক্তদাতা নেটওয়ার্ক"
        subtitle="Every second counts. Find matched donors near you, instantly."
        action={
          <Button
            variant="destructive"
            onClick={() => toast.success("Emergency request broadcast to nearby donors")}
          >
            <Plus className="h-4 w-4" /> Request blood
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <SectionCard className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-destructive/10 text-destructive">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xl font-semibold text-foreground">2,480</p>
            <p className="text-xs text-muted-foreground">Registered donors</p>
          </div>
        </SectionCard>
        <SectionCard className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-success/10 text-success">
            <Activity className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xl font-semibold text-foreground">312</p>
            <p className="text-xs text-muted-foreground">Available now</p>
          </div>
        </SectionCard>
        <SectionCard className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
            <Droplets className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xl font-semibold text-foreground">18</p>
            <p className="text-xs text-muted-foreground">Lives saved this week</p>
          </div>
        </SectionCard>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold text-foreground">Active requests near you</h2>
          <div className="space-y-3">
            {bloodRequests.map((r) => (
              <SectionCard key={r.id} className="flex flex-wrap items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-destructive/10 text-lg font-bold text-destructive">
                  {r.group}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">{r.hospital}</p>
                    <Badge variant="outline" className={cn(urgencyStyle[r.urgency])}>
                      {r.urgency}
                    </Badge>
                  </div>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {r.location} · {r.units} unit(s) · {r.patient} · {r.postedAgo}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => toast.success(`Thank you! ${r.hospital} has been notified.`)}
                >
                  Respond
                </Button>
              </SectionCard>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SectionCard>
            <h3 className="font-semibold text-foreground">Find donors by group</h3>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {groups.map((g) => (
                <button
                  key={g}
                  onClick={() => setGroup(g)}
                  className={cn(
                    "rounded-xl border py-2 text-sm font-bold transition-colors",
                    group === g
                      ? "border-destructive bg-destructive text-destructive-foreground"
                      : "border-border text-foreground hover:bg-muted",
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {donors
                .filter((d) => d.group === group || group === "O-")
                .map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted text-xs font-bold text-destructive">
                      {d.group}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{d.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {d.distance} · {d.lastDonated}
                      </p>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => toast.success(`Calling ${d.name}…`)}>
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </SectionCard>

          <SectionCard className="bg-primary text-primary-foreground">
            <Droplets className="h-6 w-6" />
            <h3 className="mt-2 font-semibold">Become a donor</h3>
            <p className="mt-1 text-sm text-primary-foreground/80">
              One donation can save up to three lives.
            </p>
            <Button variant="secondary" size="sm" className="mt-4 w-full" onClick={() => toast.success("Registered as a donor!")}>
              Register now
            </Button>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
