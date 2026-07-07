import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { DoctorCard } from "@/components/doctor-card";
import { doctors, specialties } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Find a Doctor — Sebika" },
      {
        name: "description",
        content: "Browse verified specialists by department, rating and location. Book instantly.",
      },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesQuery =
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.specialty.toLowerCase().includes(query.toLowerCase()) ||
        d.hospital.toLowerCase().includes(query.toLowerCase());
      const matchesSpec = specialty === "All" || d.specialty === specialty;
      const matchesVerified = !verifiedOnly || d.verified;
      return matchesQuery && matchesSpec && matchesVerified;
    });
  }, [query, specialty, verifiedOnly]);

  return (
    <AppShell>
      <PageHeader
        title="Find a Doctor"
        bengali="ডাক্তার খুঁজুন"
        subtitle="Verified specialists, transparent fees and real availability."
      />

      <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, specialty or hospital…"
            className="pl-9"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setSpecialty(s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                specialty === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted",
              )}
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => setVerifiedOnly((v) => !v)}
            className={cn(
              "ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              verifiedOnly
                ? "border-success bg-success/10 text-success"
                : "border-border bg-background text-muted-foreground hover:bg-muted",
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Verified only
          </button>
        </div>
      </div>

      <div className="mb-3 mt-6 flex items-center gap-2">
        <Badge variant="secondary">{filtered.length} doctors</Badge>
        <span className="text-sm text-muted-foreground">available now</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((d) => (
          <DoctorCard key={d.id} doctor={d} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">No doctors match your filters.</p>
        </div>
      )}
    </AppShell>
  );
}
