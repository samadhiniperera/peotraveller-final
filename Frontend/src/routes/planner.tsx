import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Map, Sparkles, Loader2, MapPin, Hotel, Bus,
  Tent, DollarSign, Calendar, ChevronRight, Clock, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/planner")({
  component: PlannerPage,
  head: () => ({
    meta: [
      { title: "AI Trip Planner — PeoTraveller" },
      { name: "description", content: "Let AI plan your perfect trip itinerary." },
    ],
  }),
});

/* ── Mock itinerary ───────────────────────────────────────────── */
type DayPlan = {
  day: number;
  title: string;
  places: { name: string; type: string; duration: string; note: string }[];
};

type Hotel = {
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  note: string;
};

type Transport = {
  from: string;
  to: string;
  type: string;
  duration: string;
  cost: number;
};

type Itinerary = {
  destination: string;
  days: number;
  budget: number;
  dayPlans: DayPlan[];
  hotels: Hotel[];
  transport: Transport[];
  totalEstimate: number;
};

function generateMockItinerary(dest: string, days: number, budget: number): Itinerary {
  return {
    destination: dest,
    days,
    budget,
    totalEstimate: Math.round(budget * 0.85),
    dayPlans: [
      {
        day: 1,
        title: "Arrival & First Impressions",
        places: [
          { name: `${dest} Old Town`, type: "Sightseeing", duration: "2 hrs", note: "Start your journey here" },
          { name: "Local Food Market", type: "Food", duration: "1.5 hrs", note: "Try local specialties" },
          { name: "Central Viewpoint", type: "Scenic", duration: "1 hr", note: "Best at sunset" },
        ],
      },
      {
        day: 2,
        title: "Culture & History",
        places: [
          { name: `${dest} National Museum`, type: "Museum", duration: "3 hrs", note: "Book tickets in advance" },
          { name: "Historic Quarter", type: "Walking tour", duration: "2 hrs", note: "Guided tours available" },
          { name: "Traditional Restaurant", type: "Dinner", duration: "1.5 hrs", note: "Reserve for evenings" },
        ],
      },
      {
        day: 3,
        title: "Nature & Relaxation",
        places: [
          { name: `${dest} Nature Reserve`, type: "Nature", duration: "4 hrs", note: "Bring comfortable shoes" },
          { name: "Local Beach / Park", type: "Leisure", duration: "2 hrs", note: "Great for picnics" },
          { name: "Farewell Dinner", type: "Dining", duration: "2 hrs", note: "Try the local specialty" },
        ],
      },
    ].slice(0, Math.min(days, 3)),
    hotels: [
      {
        name: `${dest} Boutique Hotel`,
        location: "City Centre",
        stars: 4,
        pricePerNight: Math.round(budget / days / 2.5),
        note: "Excellent breakfast included",
      },
      {
        name: `The ${dest} Guesthouse`,
        location: "Old Quarter",
        stars: 3,
        pricePerNight: Math.round(budget / days / 4),
        note: "Great value, friendly staff",
      },
    ],
    transport: [
      {
        from: "Airport",
        to: `${dest} City Centre`,
        type: "Taxi / Rideshare",
        duration: "30 min",
        cost: Math.round(budget * 0.03),
      },
      {
        from: "Hotel",
        to: "Attractions",
        type: "Public transit / Walking",
        duration: "Varies",
        cost: Math.round(budget * 0.05),
      },
    ],
  };
}

/* ── Page ─────────────────────────────────────────────────────── */
function PlannerPage() {
  const [destination, setDestination] = useState("");
  const [days, setDays]               = useState(3);
  const [budget, setBudget]           = useState([500]);
  const [style, setStyle]             = useState("balanced");
  const [notes, setNotes]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [itinerary, setItinerary]     = useState<Itinerary | null>(null);
  const [error, setError]             = useState("");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }
    setLoading(true);
    setItinerary(null);
    setTimeout(() => {
      setItinerary(generateMockItinerary(destination, days, budget[0]));
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 py-10" style={{ background: "oklch(0.975 0.008 95)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2 fade-up">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "oklch(0.620 0.090 220 / 0.12)" }}
            >
              <Map className="h-5 w-5" style={{ color: "oklch(0.620 0.090 220)" }} />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-semibold text-foreground"
              style={{ fontFamily: "'Lora', serif" }}
            >
              AI Trip Planner
            </h1>
          </div>
          <p className="text-sm text-muted-foreground fade-up fade-up-1">
            Tell us where you want to go and we'll build a full itinerary with places, hotels, and transport.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Form */}
          <div>
            <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-5 sticky top-24">
              <h2 className="font-semibold text-base" style={{ fontFamily: "'Lora', serif" }}>
                Trip preferences
              </h2>
              <form onSubmit={handleGenerate} className="space-y-5">
                {error && (
                  <div
                    className="rounded-xl px-4 py-3 text-sm"
                    style={{
                      background: "oklch(0.590 0.195 28 / 0.08)",
                      color: "oklch(0.490 0.195 28)",
                      border: "1px solid oklch(0.590 0.195 28 / 0.20)",
                    }}
                  >
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label>Destination *</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-9 rounded-xl border-border/70"
                      placeholder="e.g. Kyoto, Japan"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Number of days</Label>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex gap-1.5 flex-wrap">
                      {[1, 2, 3, 5, 7, 10, 14].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDays(d)}
                          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                            days === d ? "text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                          style={days === d ? { background: "oklch(0.560 0.110 155)" } : {}}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    Budget:{" "}
                    <span className="font-semibold" style={{ color: "oklch(0.560 0.110 155)" }}>
                      ${budget[0].toLocaleString()}
                    </span>
                  </Label>
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <Slider
                      min={100}
                      max={5000}
                      step={50}
                      value={budget}
                      onValueChange={setBudget}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$100</span><span>$5,000</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Travel style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="rounded-xl border-border/70">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">🏕 Adventure</SelectItem>
                      <SelectItem value="cultural">🏛 Cultural</SelectItem>
                      <SelectItem value="relaxation">🌊 Relaxation</SelectItem>
                      <SelectItem value="balanced">⚖️ Balanced mix</SelectItem>
                      <SelectItem value="budget">💰 Budget conscious</SelectItem>
                      <SelectItem value="luxury">✨ Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Special notes</Label>
                  <Textarea
                    placeholder="Any specific interests, dietary needs, accessibility requirements…"
                    rows={2}
                    className="rounded-xl border-border/70 resize-none text-sm"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl gap-2"
                  style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Planning your trip…</>
                  ) : (
                    <><Sparkles className="h-4 w-4" /> Generate itinerary</>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: "oklch(0.620 0.090 220 / 0.10)" }}
                >
                  <Sparkles className="h-8 w-8 animate-pulse" style={{ color: "oklch(0.620 0.090 220)" }} />
                </div>
                <div className="text-center space-y-1">
                  <p className="font-medium text-foreground">AI is planning your trip…</p>
                  <p className="text-sm text-muted-foreground">Building the best itinerary for {destination}</p>
                </div>
              </div>
            )}

            {!loading && !itinerary && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <Map className="h-16 w-16 text-muted-foreground/20" />
                <p className="text-muted-foreground">
                  Fill in your preferences and click Generate to see your personalised itinerary.
                </p>
              </div>
            )}

            {itinerary && !loading && (
              <>
                {/* Summary banner */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "oklch(0.560 0.110 155 / 0.07)",
                    border: "1px solid oklch(0.560 0.110 155 / 0.18)",
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2
                        className="text-xl font-semibold"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {itinerary.destination} — {itinerary.days} day{itinerary.days !== 1 ? "s" : ""}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Estimated total:{" "}
                        <span className="font-semibold text-foreground">
                          ${itinerary.totalEstimate.toLocaleString()}
                        </span>{" "}
                        of ${itinerary.budget.toLocaleString()} budget
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{
                        background: "oklch(0.560 0.110 155 / 0.12)",
                        color: "oklch(0.420 0.110 155)",
                      }}
                    >
                      <Sparkles className="h-3 w-3" />
                      AI-generated preview
                    </div>
                  </div>
                </div>

                {/* Day plans */}
                <section className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2" style={{ fontFamily: "'Lora', serif" }}>
                    <Calendar className="h-5 w-5" style={{ color: "oklch(0.620 0.090 220)" }} />
                    Day-by-day plan
                  </h3>
                  {itinerary.dayPlans.map((day) => (
                    <div key={day.day} className="rounded-2xl bg-card border border-border/50 overflow-hidden">
                      <div
                        className="px-5 py-3 flex items-center gap-2"
                        style={{ background: "oklch(0.620 0.090 220 / 0.08)" }}
                      >
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-white"
                          style={{ background: "oklch(0.620 0.090 220)" }}
                        >
                          {day.day}
                        </span>
                        <span className="font-medium text-sm">{day.title}</span>
                      </div>
                      <div className="divide-y divide-border/40">
                        {day.places.map((p, i) => (
                          <div key={i} className="px-5 py-3 flex items-start gap-3">
                            <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium text-sm">{p.name}</span>
                                <span
                                  className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                                  style={{
                                    background: "oklch(0.620 0.090 220 / 0.10)",
                                    color: "oklch(0.420 0.090 220)",
                                  }}
                                >
                                  {p.type}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 mt-0.5">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" /> {p.duration}
                                </span>
                                <span className="text-xs text-muted-foreground">{p.note}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>

                {/* Hotels */}
                <section className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2" style={{ fontFamily: "'Lora', serif" }}>
                    <Hotel className="h-5 w-5" style={{ color: "oklch(0.590 0.195 28)" }} />
                    Suggested accommodation
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {itinerary.hotels.map((h) => (
                      <div key={h.name} className="rounded-2xl bg-card border border-border/50 p-5 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm leading-snug">{h.name}</h4>
                          <div className="flex flex-shrink-0">
                            {Array.from({ length: h.stars }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" style={{ color: "oklch(0.560 0.110 155)" }} />
                          {h.location}
                        </div>
                        <p className="text-xs text-muted-foreground">{h.note}</p>
                        <p className="text-sm font-semibold" style={{ color: "oklch(0.560 0.110 155)" }}>
                          ~${h.pricePerNight}/night
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Transport */}
                <section className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2" style={{ fontFamily: "'Lora', serif" }}>
                    <Bus className="h-5 w-5" style={{ color: "oklch(0.680 0.130 60)" }} />
                    Getting around
                  </h3>
                  <div className="rounded-2xl bg-card border border-border/50 divide-y divide-border/40">
                    {itinerary.transport.map((t, i) => (
                      <div key={i} className="px-5 py-4 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">
                            {t.from} → {t.to}
                          </p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-muted-foreground">{t.type}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {t.duration}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-foreground flex-shrink-0">
                          ~${t.cost}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Camping gear suggestion */}
                <section>
                  <div
                    className="rounded-2xl p-5 flex items-start gap-4"
                    style={{
                      background: "oklch(0.560 0.110 155 / 0.05)",
                      border: "1px solid oklch(0.560 0.110 155 / 0.15)",
                    }}
                  >
                    <Tent className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "oklch(0.560 0.110 155)" }} />
                    <div>
                      <p className="font-medium text-sm">Camping & outdoor gear</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        If your trip includes nature activities, check the{" "}
                        <span className="font-medium text-foreground">Camping Finder</span> for gear suppliers near {itinerary.destination}.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Disclaimer */}
                <div
                  className="rounded-xl p-4 text-xs text-center"
                  style={{
                    background: "oklch(0.680 0.130 60 / 0.06)",
                    color: "oklch(0.520 0.130 60)",
                    border: "1px solid oklch(0.680 0.130 60 / 0.15)",
                  }}
                >
                  <Sparkles className="inline h-3 w-3 mr-1" />
                  This is an AI-generated preview. Full live itineraries powered by real data coming soon.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}