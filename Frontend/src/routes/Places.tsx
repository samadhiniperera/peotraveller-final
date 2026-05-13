import { createFileRoute, Link } from "@tanstack/react-router";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Compass, Map as MapIcon, Heart, X } from "lucide-react";
import { PlaceCard, type Place } from "@/components/PlaceCard";
import { PostCard } from "@/components/PostCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
      { title: "Places — Roamly" },
      {
        name: "description",
        content:
          "Browse a feed of beautiful destinations and save favourites to your wishlist.",
      },
    ],
  }),
});

const places: Place[] = [
  {
    name: "Eiffel Tower",
    city: "Paris",
    country: "France",
    description:
      "Iconic wrought-iron lattice tower on the Champ de Mars, glowing every night over the City of Light.",
    image: paris,
  },
  {
    name: "Mount Fuji",
    city: "Fujinomiya",
    country: "Japan",
    description:
      "Japan's tallest peak, framed by cherry blossoms in spring and reflected in the Fuji Five Lakes.",
    image: fuji,
  },
  {
    name: "Blue Domes of Oia",
    city: "Santorini",
    country: "Greece",
    description:
      "Whitewashed cliffside village with blue-domed churches overlooking the Aegean Sea caldera.",
    image: santorini,
  },
  {
    name: "Machu Picchu",
    city: "Cusco",
    country: "Peru",
    description:
      "Ancient Incan citadel set high in the Andes Mountains, surrounded by lush green peaks.",
    image: machu,
  },
  {
    name: "Tegallalang Rice Terraces",
    city: "Ubud",
    country: "Indonesia",
    description:
      "Sweeping emerald rice paddies carved into Bali's hillsides using traditional irrigation systems.",
    image: bali,
  },
  {
    name: "Moraine Lake",
    city: "Banff",
    country: "Canada",
    description:
      "Glacier-fed turquoise lake nestled in the Valley of the Ten Peaks in the Canadian Rockies.",
    image: banff,
  },
];

type FlyingBall = {
  id: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

function PlacesPage() {
  const [wishlist, setWishlist] = useState<Place[]>([]);
  const [openSheet, setOpenSheet] = useState(false);
  const [viewing, setViewing] = useState<Place | null>(null);
  const [balls, setBalls] = useState<FlyingBall[]>([]);
  const [pulse, setPulse] = useState(false);
  const railRef = useRef<HTMLButtonElement>(null);
  const ballId = useRef(0);

  const handleAdd = useCallback(
    (place: Place, originRect: DOMRect) => {
      if (wishlist.some((p) => p.name === place.name)) return;
      const target = railRef.current?.getBoundingClientRect();
      if (!target) return;
      const id = ++ballId.current;
      setBalls((b) => [
        ...b,
        {
          id,
          fromX: originRect.left + originRect.width / 2,
          fromY: originRect.top + originRect.height / 2,
          toX: target.left + target.width / 2,
          toY: target.top + target.height / 2,
        },
      ]);
      // Add to wishlist after the ball arrives
      window.setTimeout(() => {
        setWishlist((w) =>
          w.some((p) => p.name === place.name) ? w : [...w, place],
        );
        setPulse(true);
        window.setTimeout(() => setPulse(false), 600);
        setBalls((b) => b.filter((x) => x.id !== id));
      }, 700);
    },
    [wishlist],
  );

  return (
    <div className="relative min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Roamly
            </span>
          </Link>
          <span className="text-sm text-muted-foreground">
            {places.length} posts · {wishlist.length} saved
          </span>
        </div>
      </header>

      {/* Left wishlist rail */}
      <WishlistRail
        ref={railRef}
        count={wishlist.length}
        pulse={pulse}
        onClick={() => setOpenSheet(true)}
      />

      {/* Feed */}
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Discover places
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Hover a post to <span className="font-medium text-foreground">Add</span> it
            to your wishlist or <span className="font-medium text-foreground">View</span>{" "}
            the details.
          </p>
        </div>

        <div className="space-y-8">
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
      </main>

      {/* Wishlist sheet */}
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="left" className="w-[92vw] sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Your wishlist
            </SheetTitle>
            <SheetDescription>
              {wishlist.length === 0
                ? "Tap Add on any post to save it here."
                : `${wishlist.length} place${wishlist.length === 1 ? "" : "s"} saved.`}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {wishlist.length === 0 ? (
              <EmptyWishlist />
            ) : (
              wishlist.map((p) => <PlaceCard key={p.name} place={p} />)
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* View dialog (lightweight) */}
      {viewing && <ViewDialog place={viewing} onClose={() => setViewing(null)} />}

      {/* Flying balls portal */}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[60]">
            {balls.map((b) => (
              <FlyingBallEl key={b.id} ball={b} />
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

const WishlistRail = forwardRef<
  HTMLButtonElement,
  { count: number; pulse: boolean; onClick: () => void }
>(({ count, pulse, onClick }, ref) => (
  <div className="fixed left-0 top-1/2 z-30 -translate-y-1/2">
    <button
      ref={ref}
      onClick={onClick}
      aria-label="Open wishlist"
      className={`group flex h-28 w-12 flex-col items-center justify-center gap-2 rounded-r-2xl bg-card shadow-lg ring-1 ring-border/60 transition-all hover:w-14 hover:bg-primary/5 ${pulse ? "animate-pulse ring-primary/60" : ""}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        <MapIcon className="h-4 w-4" />
      </span>
      <span className="text-[11px] font-semibold text-foreground/80">{count}</span>
    </button>
  </div>
));
WishlistRail.displayName = "WishlistRail";

function EmptyWishlist() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Heart className="h-5 w-5" />
      </span>
      <p className="mt-3 text-sm font-medium text-foreground">No places yet</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Add posts from the feed to start your wishlist.
      </p>
    </div>
  );
}

function ViewDialog({ place, onClose }: { place: Place; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/80 text-background hover:bg-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <img src={place.image} alt={place.name} className="h-64 w-full object-cover" />
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-foreground">{place.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {place.city}, {place.country}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">
            {place.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FlyingBallEl({ ball }: { ball: FlyingBall }) {
  const [pos, setPos] = useState({ x: ball.fromX, y: ball.fromY, scale: 1 });

  useEffect(() => {
    // Trigger transition next frame
    const r = requestAnimationFrame(() => {
      setPos({ x: ball.toX, y: ball.toY, scale: 0.4 });
    });
    return () => cancelAnimationFrame(r);
  }, [ball]);

  return (
    <div
      className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${pos.scale})`,
        transition: "transform 700ms cubic-bezier(0.4, 0.6, 0.2, 1), opacity 700ms ease-out",
        background:
          "radial-gradient(circle at 30% 30%, white, color-mix(in oklab, var(--primary) 80%, white))",
        boxShadow:
          "0 0 18px 4px color-mix(in oklab, var(--primary) 60%, transparent), 0 0 6px 1px white",
        opacity: pos.scale === 1 ? 1 : 0.85,
      }}
    />
  );
}