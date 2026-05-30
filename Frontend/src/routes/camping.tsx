import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Tent, MapPin, Search, Loader2, Wifi, Droplets,
  Flame, Car, Star, ShoppingBag, ChevronRight, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/camping")({
  component: CampingPage,
  head: () => ({
    meta: [
      { title: "Camping & Rest Finder — PeoTraveller" },
      { name: "description", content: "Find rest stops and camping sites along your route." },
    ],
  }),
});

/* ── Types ────────────────────────────────────────────────────── */
type CampSite = {
  id: number;
  name: string;
  location: string;
  distance: string;
  type: "campsite" | "rest_stop" | "glamping";
  rating: number;
  pricePerNight: number | null;
  amenities: string[];
  description: string;
};

type GearSupplier = {
  id: number;
  name: string;
  location: string;
  distance: string;
  items: string[];
  rating: number;
  phone: string;
};

/* ── Mock data ─────────────────────────────────────────────────── */
const MOCK_CAMPSITES: CampSite[] = [
  {
    id: 1,
    name: "Riverside Campground",
    location: "Ella, Sri Lanka",
    distance: "2.3 km",
    type: "campsite",
    rating: 4.6,
    pricePerNight: 12,
    amenities: ["water", "toilets", "fire", "wifi"],
    description: "Peaceful riverside site with stunning mountain views. Perfect for tents and small campervans.",
  },
  {
    id: 2,
    name: "Highway Rest Area 14",
    location: "A9 Road, Kandy",
    distance: "5.1 km",
    type: "rest_stop",
    rating: 3.8,
    pricePerNight: null,
    amenities: ["toilets", "parking", "water"],
    description: "Clean highway rest stop with covered seating, vending machines, and clean facilities.",
  },
  {
    id: 3,
    name: "Jungle Glamping Retreat",
    location: "Sinharaja Forest",
    distance: "8.7 km",
    type: "glamping",
    rating: 4.9,
    pricePerNight: 65,
    amenities: ["water", "wifi", "fire", "parking"],
    description: "Luxury tents set in the jungle canopy with en-suite bathrooms and gourmet meals.",
  },
  {
    id: 4,
    name: "Summit Base Camp",
    location: "Horton Plains",
    distance: "12.4 km",
    type: "campsite",
    rating: 4.3,
    pricePerNight: 8,
    amenities: ["water", "toilets", "fire"],
    description: "High-altitude base camp for hikers. Basic facilities but breathtaking scenery.",
  },
];

const MOCK_SUPPLIERS: GearSupplier[] = [
  {
    id: 1,
    name: "Trek & Camp Supplies",
    location: "Kandy Town Centre",
    distance: "1.2 km",
    items: ["Tents", "Sleeping bags", "Torches", "Stoves", "Backpacks"],
    rating: 4.7,
    phone: "+94 81 234 5678",
  },
  {
    id: 2,
    name: "OutdoorPro Sri Lanka",
    location: "Colombo Road, Kandy",
    distance: "3.8 km",
    items: ["Camping gear rental", "GPS devices", "First aid", "Rain gear", "Cooking sets"],
    rating: 4.4,
    phone: "+94 81 987 6543",
  },
  {
    id: 3,
    name: "Adventure Gear Hub",
    location: "Ella Village",
    distance: "6.1 km",
    items: ["Trekking poles", "Hammocks", "Water filters", "Head lamps", "Rope"],
    rating: 4.2,
    phone: "+94 57 111 2222",
  },
];

const AMENITY_ICONS: Record<string, { icon: React.ReactNode; label: string }> = {
  water:   { icon: <Droplets className="h-3.5 w-3.5" />, label: "Water" },
  wifi:    { icon: <Wifi className="h-3.5 w-3.5" />, label: "WiFi" },
  fire:    { icon: <Flame className="h-3.5 w-3.5" />, label: "Fire pit" },
  parking: { icon: <Car className="h-3.5 w-3.5" />, label: "Parking" },
  toilets: { icon: <Package className="h-3.5 w-3.5" />, label: "Toilets" },
};

const TYPE_STYLES: Record<CampSite["type"], { label: string; color: string; bg: string }> = {
  campsite:  { label: "Campsite",   color: "oklch(0.420 0.110 155)", bg: "oklch(0.560 0.110 155 / 0.10)" },
  rest_stop: { label: "Rest Stop",  color: "oklch(0.420 0.090 220)", bg: "oklch(0.620 0.090 220 / 0.10)" },
  glamping:  { label: "Glamping",   color: "oklch(0.520 0.130 60)",  bg: "oklch(0.680 0.130 60 / 0.10)" },
};

/* ── Page ─────────────────────────────────────────────────────── */
function CampingPage() {
  const [tab, setTab]           = useState<"sites" | "gear">("sites");
  const [route, setRoute]       = useState("");
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [typeFilter, setTypeFilter] = useState<"all" | "campsite" | "rest_stop" | "glamping">("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!route.trim()) return;
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setSearched(true);
    }, 1200);
  };

  const filtered = MOCK_CAMPSITES.filter((s) => typeFilter === "all" || s.type === typeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 py-10" style={{ background: "oklch(0.975 0.008 95)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2 fade-up">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "oklch(0.560 0.110 155 / 0.12)" }}
            >
              <Tent className="h-5 w-5" style={{ color: "oklch(0.560 0.110 155)" }} />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-semibold text-foreground"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Camping & Rest Finder
            </h1>
          </div>
          <p className="text-sm text-muted-foreground fade-up fade-up-1">
            Find campsites, rest stops, and gear suppliers along your route.
          </p>

          {/* Search form */}
          <form onSubmit={handleSearch} className="mt-6 flex gap-3 max-w-xl fade-up fade-up-2">
            <div className="relative flex-1">
              <MapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter your route or destination…"
                className="pl-10 rounded-xl border-border/60 h-11"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={!route.trim() || searching}
              className="rounded-xl gap-2 px-5"
              style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
            >
              {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Search
            </Button>
          </form>

          {/* Tabs */}
          <div className="mt-6 flex gap-2 fade-up fade-up-3">
            {(["sites", "gear"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  tab === t ? "text-white" : "bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
                style={tab === t ? { background: "oklch(0.560 0.110 155)" } : {}}
              >
                {t === "sites" ? <Tent className="h-3.5 w-3.5" /> : <ShoppingBag className="h-3.5 w-3.5" />}
                {t === "sites" ? "Rest & Camp sites" : "Gear suppliers"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 py-10">
        {!searched && !searching && (
          <EmptySearch tab={tab} />
        )}

        {searching && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "oklch(0.560 0.110 155)" }} />
            <p className="text-sm text-muted-foreground">Finding sites along your route…</p>
          </div>
        )}

        {searched && !searching && tab === "sites" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-muted-foreground">
                {filtered.length} sites found near <span className="font-medium text-foreground">"{route}"</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {(["all", "campsite", "rest_stop", "glamping"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setTypeFilter(f)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      typeFilter === f ? "text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                    style={typeFilter === f ? { background: "oklch(0.560 0.110 155)" } : {}}
                  >
                    {f === "all" ? "All" : f === "rest_stop" ? "Rest stops" : f === "campsite" ? "Campsites" : "Glamping"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {filtered.map((site) => (
                <CampSiteCard key={site.id} site={site} />
              ))}
            </div>
          </div>
        )}

        {searched && !searching && tab === "gear" && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground">
              {MOCK_SUPPLIERS.length} gear suppliers near <span className="font-medium text-foreground">"{route}"</span>
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MOCK_SUPPLIERS.map((s) => (
                <GearSupplierCard key={s.id} supplier={s} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ── Empty search state ───────────────────────────────────────── */
function EmptySearch({ tab }: { tab: "sites" | "gear" }) {
  return (
    <div className="text-center py-20 space-y-3">
      {tab === "sites" ? (
        <Tent className="mx-auto h-14 w-14 text-muted-foreground/20" />
      ) : (
        <ShoppingBag className="mx-auto h-14 w-14 text-muted-foreground/20" />
      )}
      <p className="font-medium text-foreground">
        {tab === "sites" ? "Find rest stops along your route" : "Find camping gear nearby"}
      </p>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
        {tab === "sites"
          ? "Enter your destination or route above to discover campsites and rest stops."
          : "Search for your destination to find outdoor gear suppliers and rental shops."}
      </p>
    </div>
  );
}

/* ── Camp site card ───────────────────────────────────────────── */
function CampSiteCard({ site }: { site: CampSite }) {
  const style = TYPE_STYLES[site.type];
  return (
    <div className="rounded-2xl bg-card border border-border/50 p-5 space-y-3 card-hover">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 flex-1 min-w-0">
          <h3
            className="font-semibold text-foreground leading-snug"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {site.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: "oklch(0.560 0.110 155)" }} />
            <span>{site.location}</span>
            <span>·</span>
            <span>{site.distance} away</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ background: style.bg, color: style.color }}
          >
            {style.label}
          </span>
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-medium">{site.rating}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{site.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {site.amenities.map((a) => {
          const am = AMENITY_ICONS[a];
          return am ? (
            <span
              key={a}
              className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs"
              style={{ background: "oklch(0.955 0.008 95)", color: "oklch(0.520 0.020 240)" }}
            >
              {am.icon} {am.label}
            </span>
          ) : null;
        })}
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-sm font-semibold" style={{ color: "oklch(0.560 0.110 155)" }}>
          {site.pricePerNight !== null ? `$${site.pricePerNight}/night` : "Free"}
        </span>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full text-xs gap-1 border-primary/30 text-primary hover:bg-primary/5"
        >
          View details <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

/* ── Gear supplier card ───────────────────────────────────────── */
function GearSupplierCard({ supplier }: { supplier: GearSupplier }) {
  return (
    <div className="rounded-2xl bg-card border border-border/50 p-5 space-y-3 card-hover">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 flex-1 min-w-0">
          <h3
            className="font-semibold text-foreground leading-snug"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {supplier.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: "oklch(0.560 0.110 155)" }} />
            <span>{supplier.location}</span>
          </div>
          <p className="text-xs text-muted-foreground">{supplier.distance} away</p>
        </div>
        <div className="flex items-center gap-1 text-xs flex-shrink-0">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="font-medium">{supplier.rating}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {supplier.items.map((item) => (
          <span
            key={item}
            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
            style={{
              background: "oklch(0.560 0.110 155 / 0.08)",
              color: "oklch(0.420 0.110 155)",
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-muted-foreground font-medium">{supplier.phone}</span>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full text-xs gap-1 border-primary/30 text-primary hover:bg-primary/5"
        >
          Contact <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}