import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  DollarSign, Plus, Trash2, Hotel, Bus, Utensils,
  Ticket, ShoppingBag, MoreHorizontal, TrendingUp,
  PiggyBank, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/cost")({
  component: CostPage,
  head: () => ({
    meta: [
      { title: "Trip Cost Organizer — PeoTraveller" },
      { name: "description", content: "Estimate and track your travel expenses." },
    ],
  }),
});

/* ── Types ────────────────────────────────────────────────────── */
type Category = "accommodation" | "transport" | "food" | "activities" | "shopping" | "other";

type Expense = {
  id: number;
  description: string;
  category: Category;
  estimated: number;
  actual: number | null;
  date: string;
};

const CATEGORY_CONFIG: Record<Category, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  accommodation: { label: "Accommodation", icon: <Hotel className="h-4 w-4" />,      color: "oklch(0.420 0.090 220)", bg: "oklch(0.620 0.090 220 / 0.10)" },
  transport:     { label: "Transport",     icon: <Bus className="h-4 w-4" />,         color: "oklch(0.420 0.110 155)", bg: "oklch(0.560 0.110 155 / 0.10)" },
  food:          { label: "Food & Drink",  icon: <Utensils className="h-4 w-4" />,    color: "oklch(0.520 0.130 60)",  bg: "oklch(0.680 0.130 60 / 0.10)"  },
  activities:    { label: "Activities",    icon: <Ticket className="h-4 w-4" />,      color: "oklch(0.490 0.195 28)",  bg: "oklch(0.590 0.195 28 / 0.10)"  },
  shopping:      { label: "Shopping",      icon: <ShoppingBag className="h-4 w-4" />, color: "oklch(0.520 0.150 300)", bg: "oklch(0.650 0.150 300 / 0.10)"  },
  other:         { label: "Other",         icon: <MoreHorizontal className="h-4 w-4" />, color: "oklch(0.520 0.020 240)", bg: "oklch(0.955 0.008 95)"        },
};

const INITIAL_EXPENSES: Expense[] = [
  { id: 1, description: "Hotel (3 nights)",    category: "accommodation", estimated: 180, actual: 195, date: "2025-06-01" },
  { id: 2, description: "Flight tickets",      category: "transport",     estimated: 320, actual: 310, date: "2025-06-01" },
  { id: 3, description: "Daily meals",         category: "food",          estimated: 90,  actual: null, date: "2025-06-02" },
  { id: 4, description: "Museum tickets",      category: "activities",    estimated: 35,  actual: 35,   date: "2025-06-02" },
  { id: 5, description: "Local transport",     category: "transport",     estimated: 20,  actual: null, date: "2025-06-03" },
];

/* ── Page ─────────────────────────────────────────────────────── */
function CostPage() {
  const [budget, setBudget]         = useState(800);
  const [budgetInput, setBudgetInput] = useState("800");
  const [expenses, setExpenses]     = useState<Expense[]>(INITIAL_EXPENSES);
  const [showForm, setShowForm]     = useState(false);
  const [activeTab, setActiveTab]   = useState<"overview" | "expenses">("overview");

  // New expense form
  const [newDesc, setNewDesc]     = useState("");
  const [newCat, setNewCat]       = useState<Category>("accommodation");
  const [newEst, setNewEst]       = useState("");
  const [newAct, setNewAct]       = useState("");
  const [newDate, setNewDate]     = useState(new Date().toISOString().split("T")[0]);

  const totalEstimated = expenses.reduce((s, e) => s + e.estimated, 0);
  const totalActual    = expenses.reduce((s, e) => s + (e.actual ?? 0), 0);
  const remaining      = budget - totalActual;
  const budgetPct      = Math.min(Math.round((totalActual / budget) * 100), 100);
  const overBudget     = totalActual > budget;

  // Per-category breakdown
  const byCategory = (Object.keys(CATEGORY_CONFIG) as Category[]).map((cat) => {
    const catExpenses = expenses.filter((e) => e.category === cat);
    return {
      cat,
      estimated: catExpenses.reduce((s, e) => s + e.estimated, 0),
      actual:    catExpenses.reduce((s, e) => s + (e.actual ?? 0), 0),
    };
  }).filter((c) => c.estimated > 0 || c.actual > 0);

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc || !newEst) return;
    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now(),
        description: newDesc,
        category: newCat,
        estimated: parseFloat(newEst) || 0,
        actual: newAct ? parseFloat(newAct) : null,
        date: newDate,
      },
    ]);
    setNewDesc(""); setNewEst(""); setNewAct(""); setShowForm(false);
  };

  const removeExpense = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateActual = (id: number, val: string) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, actual: val === "" ? null : parseFloat(val) || 0 } : e
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 py-10" style={{ background: "oklch(0.975 0.008 95)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2 fade-up">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "oklch(0.680 0.130 60 / 0.12)" }}
            >
              <DollarSign className="h-5 w-5" style={{ color: "oklch(0.680 0.130 60)" }} />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-semibold text-foreground"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Trip Cost Organizer
            </h1>
          </div>
          <p className="text-sm text-muted-foreground fade-up fade-up-1">
            Set your budget, estimate costs, and track actual spending.
          </p>

          {/* Budget setter */}
          <div className="mt-6 flex items-center gap-3 max-w-sm fade-up fade-up-2">
            <Label className="text-sm font-medium whitespace-nowrap">Total budget:</Label>
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
              <Input
                type="number"
                min={0}
                className="pl-8 rounded-xl border-border/70 h-10"
                value={budgetInput}
                onChange={(e) => {
                  setBudgetInput(e.target.value);
                  const v = parseFloat(e.target.value);
                  if (!isNaN(v) && v > 0) setBudget(v);
                }}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex gap-2 fade-up fade-up-3">
            {(["overview", "expenses"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeTab === t ? "text-white" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
                style={activeTab === t ? { background: "oklch(0.560 0.110 155)" } : {}}
              >
                {t === "overview" ? "Overview" : "All expenses"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 py-10">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total budget", value: `$${budget.toLocaleString()}`, icon: <PiggyBank className="h-5 w-5" />, color: "oklch(0.560 0.110 155)", bg: "oklch(0.560 0.110 155 / 0.10)" },
                { label: "Estimated", value: `$${totalEstimated.toLocaleString()}`, icon: <TrendingUp className="h-5 w-5" />, color: "oklch(0.620 0.090 220)", bg: "oklch(0.620 0.090 220 / 0.10)" },
                { label: "Spent", value: `$${totalActual.toLocaleString()}`, icon: <DollarSign className="h-5 w-5" />, color: "oklch(0.680 0.130 60)", bg: "oklch(0.680 0.130 60 / 0.10)" },
                { label: remaining >= 0 ? "Remaining" : "Over budget", value: `${remaining >= 0 ? "" : "-"}$${Math.abs(remaining).toLocaleString()}`, icon: <AlertCircle className="h-5 w-5" />, color: remaining >= 0 ? "oklch(0.420 0.110 155)" : "oklch(0.490 0.195 28)", bg: remaining >= 0 ? "oklch(0.560 0.110 155 / 0.08)" : "oklch(0.590 0.195 28 / 0.10)" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl p-5 space-y-2 border border-border/50 bg-card"
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: card.bg, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <p className="text-xs text-muted-foreground">{card.label}</p>
                  <p
                    className="text-xl font-semibold"
                    style={{ color: card.color }}
                  >
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Budget progress */}
            <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold" style={{ fontFamily: "'Lora', serif" }}>Budget usage</h3>
                <span
                  className="text-sm font-semibold"
                  style={{ color: overBudget ? "oklch(0.490 0.195 28)" : "oklch(0.560 0.110 155)" }}
                >
                  {budgetPct}%
                </span>
              </div>
              <Progress
                value={budgetPct}
                className="h-3 rounded-full"
                style={{
                  background: overBudget
                    ? "oklch(0.590 0.195 28 / 0.15)"
                    : "oklch(0.560 0.110 155 / 0.15)",
                }}
              />
              {overBudget && (
                <p className="text-xs font-medium" style={{ color: "oklch(0.490 0.195 28)" }}>
                  ⚠ You've exceeded your budget by ${Math.abs(remaining).toLocaleString()}
                </p>
              )}
            </div>

            {/* Category breakdown */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg" style={{ fontFamily: "'Lora', serif" }}>
                Breakdown by category
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {byCategory.map(({ cat, estimated, actual }) => {
                  const cfg = CATEGORY_CONFIG[cat];
                  const pct = estimated > 0 ? Math.min(Math.round((actual / estimated) * 100), 100) : 0;
                  return (
                    <div key={cat} className="rounded-2xl bg-card border border-border/50 p-4 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-lg"
                          style={{ background: cfg.bg, color: cfg.color }}
                        >
                          {cfg.icon}
                        </div>
                        <span className="text-sm font-medium">{cfg.label}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Estimated</p>
                          <p className="font-semibold text-sm">${estimated}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Actual</p>
                          <p
                            className="font-semibold text-sm"
                            style={{ color: actual > estimated ? "oklch(0.490 0.195 28)" : cfg.color }}
                          >
                            ${actual}
                          </p>
                        </div>
                      </div>
                      <Progress value={pct} className="h-1.5 rounded-full" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "expenses" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{expenses.length} expense{expenses.length !== 1 ? "s" : ""}</p>
              <Button
                onClick={() => setShowForm(!showForm)}
                size="sm"
                className="gap-1.5 rounded-full px-4"
                style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
              >
                <Plus className="h-3.5 w-3.5" />
                Add expense
              </Button>
            </div>

            {/* Add expense form */}
            {showForm && (
              <form
                onSubmit={addExpense}
                className="rounded-2xl border border-primary/20 p-5 space-y-4"
                style={{ background: "oklch(0.560 0.110 155 / 0.04)" }}
              >
                <h4 className="font-medium text-sm">New expense</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Description *</Label>
                    <Input
                      placeholder="e.g. Hotel night"
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      required
                      className="rounded-xl border-border/70 h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Category</Label>
                    <Select value={newCat} onValueChange={(v: Category) => setNewCat(v)}>
                      <SelectTrigger className="rounded-xl border-border/70 h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(CATEGORY_CONFIG) as Category[]).map((c) => (
                          <SelectItem key={c} value={c}>
                            <span className="flex items-center gap-2">
                              {CATEGORY_CONFIG[c].icon}
                              {CATEGORY_CONFIG[c].label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Estimated ($) *</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0.00"
                      value={newEst}
                      onChange={(e) => setNewEst(e.target.value)}
                      required
                      className="rounded-xl border-border/70 h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Actual ($)</Label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Leave blank if not spent yet"
                      value={newAct}
                      onChange={(e) => setNewAct(e.target.value)}
                      className="rounded-xl border-border/70 h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Date</Label>
                    <Input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="rounded-xl border-border/70 h-9 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    size="sm"
                    className="rounded-full px-4"
                    style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full px-4"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* Expense list */}
            <div className="rounded-2xl bg-card border border-border/50 divide-y divide-border/40">
              {expenses.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground text-sm">
                  No expenses yet. Click "Add expense" to get started.
                </div>
              ) : (
                expenses.map((exp) => {
                  const cfg = CATEGORY_CONFIG[exp.category];
                  const over = exp.actual !== null && exp.actual > exp.estimated;
                  return (
                    <div key={exp.id} className="flex items-center gap-3 px-5 py-4">
                      <div
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        {cfg.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{exp.description}</p>
                        <p className="text-xs text-muted-foreground">{exp.date} · {cfg.label}</p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-muted-foreground">Est.</p>
                          <p className="text-sm font-medium">${exp.estimated}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Actual</p>
                          <Input
                            type="number"
                            min={0}
                            className="w-20 h-7 text-xs text-right rounded-lg border-border/60 p-1.5"
                            placeholder="—"
                            value={exp.actual ?? ""}
                            onChange={(e) => updateActual(exp.id, e.target.value)}
                            style={over ? { color: "oklch(0.490 0.195 28)" } : {}}
                          />
                        </div>
                        <button
                          onClick={() => removeExpense(exp.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Delete expense"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Totals row */}
            {expenses.length > 0 && (
              <div
                className="flex items-center justify-between rounded-xl px-5 py-4"
                style={{ background: "oklch(0.955 0.008 95)", border: "1px solid oklch(0.890 0.015 200)" }}
              >
                <span className="text-sm font-semibold">Totals</span>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Estimated</p>
                    <p className="text-sm font-semibold">${totalEstimated.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Actual</p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: overBudget ? "oklch(0.490 0.195 28)" : "oklch(0.420 0.110 155)" }}
                    >
                      ${totalActual.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}