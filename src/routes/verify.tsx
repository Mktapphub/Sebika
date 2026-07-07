import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ShieldCheck, ShieldAlert, ScanLine, Search, Pill, Info } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader, SectionCard } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { medicines, medicineCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify Medicine — Sebika" },
      { name: "description", content: "Confirm the authenticity of your medicine by batch code." },
    ],
  }),
  component: VerifyPage,
});

type Result = null | { authentic: boolean; name: string; maker: string; batch: string; expiry: string };

function VerifyPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filteredMeds = useMemo(
    () =>
      medicines.filter(
        (m) =>
          (cat === "All" || m.category === cat) &&
          (m.brand.toLowerCase().includes(query.toLowerCase()) ||
            m.generic.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, cat],
  );


  const verify = () => {
    if (!code.trim()) return;
    // Demo logic: codes starting with "X" are flagged
    const authentic = !code.trim().toUpperCase().startsWith("X");
    setResult({
      authentic,
      name: authentic ? "Napa Extra 500mg" : "Unknown / Unregistered",
      maker: authentic ? "Beximco Pharmaceuticals" : "—",
      batch: code.trim().toUpperCase(),
      expiry: authentic ? "Nov 2027" : "—",
    });
  };

  return (
    <AppShell>
      <PageHeader
        title="Medicine Directory"
        bengali="ওষুধ"
        subtitle="Browse registered medicines and verify authenticity by batch code."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <Pill className="h-5 w-5" />
            </span>
            <h3 className="font-semibold text-foreground">Enter batch / authentication code</h3>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verify()}
              placeholder="e.g. BX-4821-NAPA"
              className="pl-9 uppercase"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <Button onClick={verify} className="flex-1">
              <ShieldCheck className="h-4 w-4" /> Verify
            </Button>
            <Button variant="outline">
              <ScanLine className="h-4 w-4" /> Scan
            </Button>
          </div>
          <p className="mt-3 inline-flex items-start gap-1.5 text-xs text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            The code is printed on the strip or box. Try a code starting with “X” to see a flagged
            result.
          </p>
        </SectionCard>

        <SectionCard className="flex flex-col justify-center">
          {!result && (
            <div className="py-8 text-center">
              <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">
                Verification results will appear here.
              </p>
            </div>
          )}

          {result && (
            <div>
              <div
                className={
                  "flex items-center gap-3 rounded-xl border p-4 " +
                  (result.authentic
                    ? "border-success/40 bg-success/10"
                    : "border-destructive/40 bg-destructive/10")
                }
              >
                {result.authentic ? (
                  <ShieldCheck className="h-8 w-8 text-success" />
                ) : (
                  <ShieldAlert className="h-8 w-8 text-destructive" />
                )}
                <div>
                  <p
                    className={
                      "text-base font-semibold " +
                      (result.authentic ? "text-success" : "text-destructive")
                    }
                  >
                    {result.authentic ? "Authentic product" : "Warning — not verified"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {result.authentic
                      ? "This medicine is registered and genuine."
                      : "Do not use. Report to your pharmacist."}
                  </p>
                </div>
              </div>

              <dl className="mt-4 space-y-3 text-sm">
                <Detail label="Product" value={result.name} />
                <Detail label="Manufacturer" value={result.maker} />
                <Detail label="Batch code" value={result.batch} />
                <Detail label="Expiry" value={result.expiry} />
              </dl>
              {result.authentic && (
                <Badge variant="secondary" className="mt-4 bg-success/10 text-success hover:bg-success/10">
                  DGDA registered
                </Badge>
              )}
            </div>
          )}
        </SectionCard>
      </div>

      {/* Medicine list */}
      <div className="mb-3 mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Medicine list</h2>
        <Badge variant="secondary">{filteredMeds.length} medicines</Badge>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand or generic name…"
            className="pl-9"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {medicineCategories.map((c) => (
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

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {filteredMeds.map((m) => (
          <SectionCard key={m.id} className="flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <Pill className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-foreground">
                  {m.brand} {m.strength}
                </p>
                {m.prescription ? (
                  <Badge variant="outline" className="border-warning/50 text-warning">
                    Rx
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/10">
                    OTC
                  </Badge>
                )}
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {m.generic} · {m.form} · {m.maker}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-foreground">৳{m.price}</p>
              <p className="text-[11px] text-muted-foreground">{m.category}</p>
            </div>
          </SectionCard>
        ))}
      </div>

      {filteredMeds.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">No medicines match your search.</p>
        </div>
      )}
    </AppShell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
