// 


import { createFileRoute, Link } from "@tanstack/react-router";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { Search, X, Loader2, SlidersHorizontal, BookHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceCard, type Place } from "@/components/PlaceCard";
import { PostCard } from "@/components/PostCard";
import { addToWishlist as apiAddToWishlist, getAllPlaces } from "@/lib/api";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

// Image imports
import paris from "@/assets/place-paris.jpg";
import fuji from "@/assets/place-fuji.jpg";
import santorini from "@/assets/place-santorini.jpg";
import machu from "@/assets/place-machu.jpg";
import bali from "@/assets/place-bali.jpg";
import banff from "@/assets/place-banff.jpg";

export const Route = createFileRoute("/Places")({
  component: PlacesPage,
  head: () => ({
    meta: [
      { title: "Explore Places — PeoTraveller" },
      { name: "description", content: "Browse beautiful destinations and save favourites." },
    ],
  }),
});

const FALLBACK_PLACES: Place[] = [
  { name: "Eiffel Tower",           city: "Paris",       country: "France",    description: "Iconic wrought-iron lattice tower on the Champ de Mars, glowing every night over the City of Light.", image: paris },
  { name: "Mount Fuji",             city: "Fujinomiya",  country: "Japan",     description: "Japan's tallest peak, framed by cherry blossoms in spring and reflected in the Fuji Five Lakes.", image: fuji },
  { name: "Blue Domes of Oia",      city: "Santorini",   country: "Greece",    description: "Whitewashed cliffside village with blue-domed churches overlooking the Aegean Sea caldera.", image: santorini },
  { name: "Machu Picchu",           city: "Cusco",       country: "Peru",      description: "Ancient Incan citadel set high in the Andes Mountains, surrounded by lush green peaks.", image: machu },
  { name: "Tegallalang Terraces",   city: "Ubud",        country: "Indonesia", description: "Sweeping emerald rice paddies carved into Bali's hillsides using traditional irrigation systems.", image: bali },
  { name: "Moraine Lake",           city: "Banff",       country: "Canada",    description: "Glacier-fed turquoise lake nestled in the Valley of the Ten Peaks in the Canadian Rockies.", image: banff },
];

type FlyingBall = { id: number; fromX: number; fromY: number; toX: number; toY: number };

function PlacesPage() {
  const { data: apiPlaces, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: async () => {
      try {
        const result = await getAllPlaces();
        const placesFromApi = Array.isArray(result) ? result : result?.data;
        return Array.isArray(placesFromApi) && placesFromApi.length > 0
          ? placesFromApi
          : FALLBACK_PLACES;
      } catch {
        return FALLBACK_PLACES;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const allPlaces: Place[] = Array.isArray(apiPlaces) && apiPlaces.length > 0 ? apiPlaces : FALLBACK_PLACES;
  const [search, setSearch]     = useState("");
  const [wishlist, setWishlist] = useState<Place[]>([]);
  const [openSheet, setOpenSheet] = useState(false);
  const [viewing, setViewing]   = useState<Place | null>(null);
  const [balls, setBalls]       = useState<FlyingBall[]>([]);
  const [pulse, setPulse]       = useState(false);
  const railRef   = useRef<HTMLButtonElement>(null);
  const ballId    = useRef(0);

  // Filter
  const places = search.trim()
    ? allPlaces.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.city.toLowerCase().includes(search.toLowerCase()) ||
          p.country.toLowerCase().includes(search.toLowerCase())
      )
    : allPlaces;

  const handleAdd = useCallback(
    (place: Place, originRect: DOMRect) => {
      if (wishlist.some((p) => p.name === place.name)) return;
      const target = railRef.current?.getBoundingClientRect();
      if (!target) return;
      const id = ++ballId.current;
      setBalls((b) => [
        ...b,
        { id, fromX: originRect.left + originRect.width / 2, fromY: originRect.top + originRect.height / 2, toX: target.left + target.width / 2, toY: target.top + target.height / 2 },
      ]);
      window.setTimeout(async () => {
        try {
          const sp = (allPlaces || []).find((s: any) => s.name === place.name);
          if (sp && (sp as any).id) await apiAddToWishlist(String((sp as any).id));
        } catch {}
        setWishlist((w) => w.some((p) => p.name === place.name) ? w : [...w, place]);
        setPulse(true);
        window.setTimeout(() => setPulse(false), 600);
        setBalls((b) => b.filter((x) => x.id !== id));
      }, 700);
    },
    [wishlist, allPlaces]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div
        className="border-b border-border/50 py-10"
        style={{ background: "oklch(0.975 0.008 95)" }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1
              className="text-3xl sm:text-4xl font-semibold text-foreground fade-up"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Discover places
            </h1>
            <p className="mt-2 text-sm text-muted-foreground fade-up fade-up-1">
              Hover any card to save it to your wishlist or view full details.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-6 flex gap-3 max-w-xl fade-up fade-up-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by place, city or country…"
                className="pl-10 rounded-xl border-border/60 h-11"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearch("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky wishlist float */}
      <WishlistFab ref={railRef} count={wishlist.length} pulse={pulse} onClick={() => setOpenSheet(true)} />

      {/* Grid */}
      <main className="container mx-auto px-4 sm:px-6 py-10">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "oklch(0.560 0.110 155)" }} />
          </div>
        ) : places.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No places match your search.</p>
            <button className="mt-3 text-sm text-primary hover:underline" onClick={() => setSearch("")}>
              Clear search
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {places.length} {places.length === 1 ? "place" : "places"}
              {search && ` matching "${search}"`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((p) => (
                <PostCard
                  key={p.name}
                  place={p}
                  added={wishlist.some((w) => w.name === p.name)}
                  onAdd={handleAdd}
                  onView={setViewing}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Wishlist sheet */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="right" className="w-[92vw] sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="flex items-center gap-2.5" style={{ fontFamily: "'Lora', serif" }}>
              <BookHeart className="h-5 w-5" style={{ color: "oklch(0.560 0.110 155)" }} />
              Your wishlist
            </SheetTitle>
            <SheetDescription>
              {wishlist.length === 0
                ? "Hover a card and click Save to add places here."
                : `${wishlist.length} place${wishlist.length !== 1 ? "s" : ""} saved`}
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-3">
            {wishlist.length === 0 ? (
              <EmptyWishlistHint />
            ) : (
              wishlist.map((p) => <PlaceCard key={p.name} place={p} />)
            )}
          </div>
          {wishlist.length > 0 && (
            <div className="mt-6">
              <Link to="/wishlist" onClick={() => setOpenSheet(false)}>
                <Button className="w-full rounded-xl" style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}>
                  View full wishlist
                </Button>
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* View dialog */}
      {viewing && <ViewDialog place={viewing} onClose={() => setViewing(null)} />}

      {/* Flying balls */}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[60]">
            {balls.map((b) => <FlyingBallEl key={b.id} ball={b} />)}
          </div>,
          document.body,
        )}
    </div>
  );
}

/* ── Wishlist FAB ── */
const WishlistFab = forwardRef<HTMLButtonElement, { count: number; pulse: boolean; onClick: () => void }>(
  ({ count, pulse, onClick }, ref) => (
    <div className="fixed right-5 bottom-8 z-30">
      <button
        ref={ref}
        onClick={onClick}
        aria-label="Open wishlist"
        className={`group relative flex h-14 w-14 flex-col items-center justify-center rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 ${pulse ? "scale-110" : ""}`}
        style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
      >
        <BookHeart className="h-5 w-5" />
        {count > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
            style={{ background: "oklch(0.590 0.195 28)", color: "#fff" }}
          >
            {count}
          </span>
        )}
      </button>
    </div>
  )
);
WishlistFab.displayName = "WishlistFab";

/* ── Empty hint ── */
function EmptyWishlistHint() {
  return (
    <div
      className="rounded-2xl border border-dashed border-border p-10 text-center"
      style={{ background: "oklch(0.975 0.008 95)" }}
    >
      <BookHeart className="mx-auto h-10 w-10 mb-3" style={{ color: "oklch(0.560 0.110 155 / 0.50)" }} />
      <p className="text-sm font-medium text-foreground">No places yet</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Hover any card and click Save to add it here.
      </p>
    </div>
  );
}

/* ── View dialog ── */
function ViewDialog({ place, onClose }: { place: Place; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in"
      style={{ background: "rgba(20,20,30,0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/80 text-background hover:bg-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <img src={place.image} alt={place.name} className="h-56 w-full object-cover" />
        <div className="p-6 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span style={{ color: "oklch(0.560 0.110 155)" }}>●</span>
            {place.city}, {place.country}
          </div>
          <h3
            className="text-2xl font-semibold text-foreground"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {place.name}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{place.description}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Flying ball ── */
function FlyingBallEl({ ball }: { ball: FlyingBall }) {
  const [pos, setPos] = useState({ x: ball.fromX, y: ball.fromY, scale: 1 });
  useEffect(() => {
    const r = requestAnimationFrame(() => setPos({ x: ball.toX, y: ball.toY, scale: 0.3 }));
    return () => cancelAnimationFrame(r);
  }, [ball]);
  return (
    <div
      className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: 0, top: 0,
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%) scale(${pos.scale})`,
        transition: "transform 700ms cubic-bezier(0.4, 0.6, 0.2, 1), opacity 700ms ease-out",
        background: "oklch(0.560 0.110 155)",
        boxShadow: "0 0 16px 4px oklch(0.560 0.110 155 / 0.50)",
        opacity: pos.scale === 1 ? 1 : 0.8,
      }}
    />
  );
}