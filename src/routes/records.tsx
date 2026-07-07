import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Download,
  Lock,
  FlaskConical,
  Pill,
  Syringe,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader, SectionCard } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/records")({
  head: () => ({
    meta: [
      { title: "Health Records — Sebika" },
      { name: "description", content: "Your encrypted digital health record portal (EHR)." },
    ],
  }),
  component: RecordsPage,
});

const summary = [
  { label: "Blood group", value: "B+", icon: HeartPulse },
  { label: "Allergies", value: "Penicillin", icon: ShieldCheck },
  { label: "Conditions", value: "Hypertension", icon: FlaskConical },
  { label: "Active meds", value: "3", icon: Pill },
];

const reports = [
  { name: "Complete Blood Count", date: "2 Jun 2026", lab: "Popular Diagnostic", type: "Lab" },
  { name: "Lipid Profile", date: "18 May 2026", lab: "Labaid", type: "Lab" },
  { name: "ECG Report", date: "3 May 2026", lab: "Square Hospital", type: "Cardiac" },
  { name: "X-Ray Chest PA", date: "21 Apr 2026", lab: "Ibn Sina", type: "Imaging" },
];

const meds = [
  { name: "Amlodipine 5mg", freq: "Once daily · morning", by: "Dr. Farhana Rahman" },
  { name: "Metformin 500mg", freq: "Twice daily · after meals", by: "Dr. Sabbir Ahmed" },
  { name: "Atorvastatin 10mg", freq: "Once daily · night", by: "Dr. Farhana Rahman" },
];

const vaccines = [
  { name: "COVID-19 Booster", date: "12 Jan 2026", status: "Done" },
  { name: "Influenza (annual)", date: "Due Oct 2026", status: "Due" },
  { name: "Tetanus", date: "2023", status: "Done" },
];

function RecordsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Health Records"
        bengali="স্বাস্থ্য রেকর্ড"
        subtitle="Encrypted, private and always with you."
        action={
          <Button variant="outline">
            <Download className="h-4 w-4" /> Export
          </Button>
        }
      />

      <div className="mb-6 flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
        <Lock className="h-4 w-4" />
        End-to-end encrypted · only you and doctors you approve can view this.
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((s) => (
          <SectionCard key={s.label}>
            <s.icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs text-muted-foreground">{s.label}</p>
            <p className="text-lg font-semibold text-foreground">{s.value}</p>
          </SectionCard>
        ))}
      </div>

      <Tabs defaultValue="reports" className="mt-8">
        <TabsList>
          <TabsTrigger value="reports">Lab reports</TabsTrigger>
          <TabsTrigger value="meds">Medications</TabsTrigger>
          <TabsTrigger value="vaccines">Vaccinations</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="mt-4 space-y-3">
          {reports.map((r) => (
            <SectionCard key={r.name} className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.lab} · {r.date}
                </p>
              </div>
              <Badge variant="secondary">{r.type}</Badge>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </SectionCard>
          ))}
        </TabsContent>

        <TabsContent value="meds" className="mt-4 space-y-3">
          {meds.map((m) => (
            <SectionCard key={m.name} className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <Pill className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.freq}</p>
              </div>
              <span className="hidden text-xs text-muted-foreground sm:block">{m.by}</span>
            </SectionCard>
          ))}
        </TabsContent>

        <TabsContent value="vaccines" className="mt-4 space-y-3">
          {vaccines.map((v) => (
            <SectionCard key={v.name} className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <Syringe className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{v.name}</p>
                <p className="text-xs text-muted-foreground">{v.date}</p>
              </div>
              <Badge
                variant={v.status === "Due" ? "outline" : "secondary"}
                className={
                  v.status === "Due"
                    ? "border-warning/50 text-warning"
                    : "bg-success/10 text-success hover:bg-success/10"
                }
              >
                {v.status}
              </Badge>
            </SectionCard>
          ))}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
