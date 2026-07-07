import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Play, Headphones, Video, Clock, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader, SectionCard } from "@/components/page-header";
import { lessons } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Health Education (বাংলা) — Sebika" },
      {
        name: "description",
        content: "Trusted audio and video health lessons in Bengali for every family.",
      },
    ],
  }),
  component: LearnPage,
});

const categories = ["All", "Chronic Care", "Maternal", "Emergency", "Pediatric", "Medicine"];

function LearnPage() {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      lessons.filter(
        (l) =>
          (cat === "All" || l.category === cat) &&
          (l.title.toLowerCase().includes(query.toLowerCase()) || l.titleBn.includes(query)),
      ),
    [cat, query],
  );

  return (
    <AppShell>
      <PageHeader
        title="Health Education"
        bengali="স্বাস্থ্য শিক্ষা"
        subtitle="বিশ্বস্ত স্বাস্থ্য তথ্য — বাংলায় অডিও ও ভিডিওতে।"
      />

      {/* Featured */}
      <div className="gradient-hero relative mb-8 overflow-hidden rounded-3xl border border-border p-6 lg:p-8">
        <Badge variant="secondary" className="bg-primary-soft text-primary hover:bg-primary-soft">
          ফিচার্ড · Featured
        </Badge>
        <h2 className="mt-3 max-w-lg font-display text-2xl font-semibold text-foreground">
          ঘরে বসে ডায়াবেটিস নিয়ন্ত্রণ
        </h2>
        <p className="mt-1 max-w-lg text-sm text-muted-foreground">
          A complete Bengali guide to managing diabetes with diet, exercise and medicine.
        </p>
        <button
          onClick={() => toast.success("Playing: ঘরে বসে ডায়াবেটিস নিয়ন্ত্রণ")}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
        >
          <Play className="h-4 w-4 fill-current" /> Watch now · 12:40
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="খুঁজুন / Search lessons…"
            className="pl-9 [font-family:'Hind_Siliguri',var(--font-sans)]"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                cat === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <button
            key={l.id}
            onClick={() => toast.success(`Playing: ${l.titleBn}`)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-card transition-shadow hover:shadow-lift"
          >
            <div className="relative flex aspect-video items-center justify-center bg-primary-soft">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform group-hover:scale-110">
                {l.type === "Video" ? (
                  <Play className="h-6 w-6 fill-current" />
                ) : (
                  <Headphones className="h-6 w-6" />
                )}
              </span>
              <Badge className="absolute left-3 top-3 gap-1 bg-card/90 text-foreground hover:bg-card/90">
                {l.type === "Video" ? <Video className="h-3 w-3" /> : <Headphones className="h-3 w-3" />}
                {l.type}
              </Badge>
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-foreground/70 px-1.5 py-0.5 text-[11px] font-medium text-background">
                <Clock className="h-3 w-3" /> {l.duration}
              </span>
            </div>
            <div className="p-4">
              <p className="[font-family:'Hind_Siliguri',var(--font-sans)] text-base font-semibold text-foreground">
                {l.titleBn}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{l.title}</p>
              <Badge variant="outline" className="mt-3 font-normal">
                {l.category}
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </AppShell>
  );
}
