import { createFileRoute } from "@tanstack/react-router";
import { PlaceCard, type Place } from "@/components/PlaceCard";
import paris from "@/assets/place-paris.jpg";
import fuji from "@/assets/place-fuji.jpg";
import santorini from "@/assets/place-santorini.jpg";
import machu from "@/assets/place-machu.jpg";
import bali from "@/assets/place-bali.jpg";
import banff from "@/assets/place-banff.jpg";
import { Compass } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Wanderlist — Discover places to travel" },
      {
        name: "description",
        content:
          "A curated list of beautiful places to travel around the world. Explore destinations by city and country.",
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

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Wanderlist
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {places.length} destinations
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Places worth the journey
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          A simple list of destinations to inspire your next trip — curated, beautiful, and easy to browse.
        </p>
      </section>

      {/* Cards */}
      <main className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {places.map((p) => (
            <PlaceCard key={p.name} place={p} />
          ))}
        </div>
      </main>
    </div>
  );
}
