import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Compass, Mail, Lock, ArrowRight, MapPin } from "lucide-react";
import paris from "@/assets/place-paris.jpg";
import fuji from "@/assets/place-fuji.jpg";
import santorini from "@/assets/place-santorini.jpg";
import machu from "@/assets/place-machu.jpg";
import bali from "@/assets/place-bali.jpg";
import banff from "@/assets/place-banff.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Roamly — Plan trips, discover places, travel better" },
      {
        name: "description",
        content:
          "Roamly is your all-in-one travel companion — plan itineraries, discover beautiful places, and keep your trips organised.",
      },
      { property: "og:title", content: "Roamly — Your travel companion" },
      {
        property: "og:description",
        content: "Plan trips, discover places, travel better.",
      },
    ],
  }),
});

type Tile = {
  src: string;
  alt: string;
  city: string;
  country: string;
  /** position + size as Tailwind classes (absolute, top/left/right/bottom, w/h, rotation) */
  className: string;
};

const tiles: Tile[] = [
  {
    src: santorini,
    alt: "Santorini, Greece",
    city: "Santorini",
    country: "Greece",
    className:
      "left-[2%] top-[8%] h-40 w-32 -rotate-6 sm:h-48 sm:w-40 md:h-56 md:w-44",
  },
  {
    src: fuji,
    alt: "Mount Fuji, Japan",
    city: "Fuji",
    country: "Japan",
    className:
      "right-[3%] top-[6%] h-44 w-36 rotate-6 sm:h-52 sm:w-44 md:h-60 md:w-48",
  },
  {
    src: bali,
    alt: "Bali, Indonesia",
    city: "Bali",
    country: "Indonesia",
    className:
      "left-[6%] bottom-[8%] h-40 w-32 rotate-3 sm:h-48 sm:w-40 md:h-56 md:w-44",
  },
  {
    src: banff,
    alt: "Banff, Canada",
    city: "Banff",
    country: "Canada",
    className:
      "right-[5%] bottom-[6%] h-44 w-36 -rotate-6 sm:h-52 sm:w-44 md:h-60 md:w-48",
  },
  {
    src: paris,
    alt: "Paris, France",
    city: "Paris",
    country: "France",
    className:
      "hidden md:block left-[20%] bottom-[28%] h-32 w-28 -rotate-12",
  },
  {
    src: machu,
    alt: "Machu Picchu, Peru",
    city: "Machu Picchu",
    country: "Peru",
    className:
      "hidden md:block right-[20%] top-[30%] h-32 w-28 rotate-12",
  },
];

function PolaroidTile({ tile }: { tile: Tile }) {
  return (
    <figure
      className={`pointer-events-auto absolute overflow-hidden rounded-2xl bg-card p-2 shadow-xl ring-1 ring-border/60 transition-transform duration-500 hover:rotate-0 hover:scale-105 ${tile.className}`}
    >
      <div className="relative h-[78%] w-full overflow-hidden rounded-xl">
        <img
          src={tile.src}
          alt={tile.alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="mt-1.5 flex items-center gap-1 px-1 text-[11px] font-medium text-foreground/80">
        <MapPin className="h-3 w-3 text-primary" />
        <span className="truncate">
          {tile.city}, <span className="text-muted-foreground">{tile.country}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Landing() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/login" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Soft ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--accent) 35%, transparent) 0%, transparent 70%), radial-gradient(50% 50% at 100% 100%, color-mix(in oklab, var(--primary) 18%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <header className="relative z-20 border-b border-border/60 bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Roamly
            </span>
          </div>
          <Link
            to="/places"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse places →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6">
        <div className="relative min-h-[calc(100vh-72px)] py-12">
          {/* Scattered place polaroids */}
          <div aria-hidden={false} className="pointer-events-none absolute inset-0">
            {tiles.map((t) => (
              <PolaroidTile key={t.alt} tile={t} />
            ))}
          </div>

          {/* Center stack */}
          <div className="relative z-10 mx-auto flex h-full max-w-md flex-col items-center justify-center pt-2 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-border/60">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Your travel companion
            </span>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Plan trips. Discover places.{" "}
              <span className="text-primary">Travel better.</span>
            </h1>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Build itineraries, save inspiring destinations, and keep every
              journey organised — all in one calm place.
            </p>

            {/* Login card */}
            <div className="mt-8 w-full rounded-2xl border border-border/60 bg-card/95 p-6 text-left shadow-2xl backdrop-blur sm:p-7">
              <div className="mb-5">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Welcome back
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sign in to continue your journey
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      className="pl-9"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <p className="mt-5 text-center text-sm text-muted-foreground">
                New here?{" "}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              or{" "}
              <Link
                to="/Places"
                className="font-medium text-foreground hover:underline"
              >
                continue as guest
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}