import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarHeart, Check, Clock, MapPin, Video, Building2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader, SectionCard } from "@/components/page-header";
import { doctors } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/appointments")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Sebika" },
      { name: "description", content: "Choose a doctor, mode, date and time in a few taps." },
    ],
  }),
  component: AppointmentsPage,
});

const days = ["Mon 8", "Tue 9", "Wed 10", "Thu 11", "Fri 12", "Sat 13"];
const times = ["09:30 AM", "11:00 AM", "12:30 PM", "03:00 PM", "05:30 PM", "07:00 PM"];

const upcoming = [
  { doctor: "Dr. Nusrat Jahan", specialty: "Pediatrics", when: "Today · 7:00 PM", mode: "In-person" },
  { doctor: "Dr. Imran Hossain", specialty: "Dermatology", when: "Fri 12 · 10:00 AM", mode: "Video" },
];

function AppointmentsPage() {
  const [doctorId, setDoctorId] = useState(doctors[0].id);
  const [mode, setMode] = useState<"In-person" | "Video">("In-person");
  const [day, setDay] = useState(days[2]);
  const [time, setTime] = useState<string | null>(null);

  const doctor = doctors.find((d) => d.id === doctorId)!;

  return (
    <AppShell>
      <PageHeader
        title="Book an Appointment"
        bengali="অ্যাপয়েন্টমেন্ট"
        subtitle="A simple, guided flow — three steps and you're done."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Step 1: doctor */}
          <SectionCard>
            <Step n={1} title="Choose a doctor" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {doctors.slice(0, 4).map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDoctorId(d.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                    doctorId === d.id
                      ? "border-primary bg-primary-soft"
                      : "border-border hover:bg-muted",
                  )}
                >
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback className="bg-card text-primary text-xs font-semibold">
                      {d.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{d.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{d.specialty}</p>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Step 2: mode */}
          <SectionCard>
            <Step n={2} title="Visit type" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { key: "In-person", icon: Building2, desc: `${doctor.hospital}` },
                  { key: "Video", icon: Video, desc: "Secure video consultation" },
                ] as const
              ).map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                    mode === m.key ? "border-primary bg-primary-soft" : "border-border hover:bg-muted",
                  )}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-card text-primary">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{m.key}</p>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Step 3: schedule */}
          <SectionCard>
            <Step n={3} title="Pick date & time" />
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {days.map((d) => (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={cn(
                    "shrink-0 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                    day === d ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={cn(
                    "inline-flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-medium transition-colors",
                    time === t
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Clock className="h-3.5 w-3.5" /> {t}
                </button>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Summary */}
        <div>
          <SectionCard className="sticky top-20">
            <h3 className="font-semibold text-foreground">Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <Row label="Doctor" value={doctor.name} />
              <Row label="Specialty" value={doctor.specialty} />
              <Row label="Type" value={mode} />
              <Row label="Location" value={mode === "Video" ? "Online" : doctor.hospital} icon={MapPin} />
              <Row label="Date" value={day} />
              <Row label="Time" value={time ?? "—"} />
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-muted-foreground">Consultation fee</span>
                <span className="text-base font-semibold text-foreground">৳{doctor.fee}</span>
              </div>
            </div>
            <Button
              className="mt-5 w-full"
              size="lg"
              disabled={!time}
              onClick={() =>
                toast.success("Appointment confirmed!", {
                  description: `${doctor.name} · ${day}, ${time} · ${mode}`,
                })
              }
            >
              <CalendarHeart className="h-4 w-4" /> Confirm booking
            </Button>
            {!time && (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Select a time slot to continue
              </p>
            )}
          </SectionCard>
        </div>
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-foreground">Upcoming appointments</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {upcoming.map((u) => (
          <SectionCard key={u.doctor} className="flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              {u.mode === "Video" ? <Video className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{u.doctor}</p>
              <p className="text-xs text-muted-foreground">
                {u.specialty} · {u.when}
              </p>
            </div>
            <Badge variant="outline">{u.mode}</Badge>
          </SectionCard>
        ))}
      </div>
    </AppShell>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {n}
      </span>
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
  );
}

function Row({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof Check;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="inline-flex items-center gap-1 truncate font-medium text-foreground">
        {Icon && <Icon className="h-3.5 w-3.5 text-primary" />}
        {value}
      </span>
    </div>
  );
}
