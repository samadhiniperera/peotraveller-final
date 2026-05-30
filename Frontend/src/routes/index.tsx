// import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { Compass, Mail, Lock, ArrowRight, MapPin } from "lucide-react";
// import paris from "@/assets/place-paris.jpg";
// import fuji from "@/assets/place-fuji.jpg";
// import santorini from "@/assets/place-santorini.jpg";
// import machu from "@/assets/place-machu.jpg";
// import bali from "@/assets/place-bali.jpg";
// import banff from "@/assets/place-banff.jpg";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export const Route = createFileRoute("/")({
//   component: Landing,
//   head: () => ({
//     meta: [
//       { title: "Roamly — Plan trips, discover places, travel better" },
//       {
//         name: "description",
//         content:
//           "Roamly is your all-in-one travel companion — plan itineraries, discover beautiful places, and keep your trips organised.",
//       },
//       { property: "og:title", content: "Roamly — Your travel companion" },
//       {
//         property: "og:description",
//         content: "Plan trips, discover places, travel better.",
//       },
//     ],
//   }),
// });

// type Tile = {
//   src: string;
//   alt: string;
//   city: string;
//   country: string;
//   /** position + size as Tailwind classes (absolute, top/left/right/bottom, w/h, rotation) */
//   className: string;
// };

// const tiles: Tile[] = [
//   {
//     src: santorini,
//     alt: "Santorini, Greece",
//     city: "Santorini",
//     country: "Greece",
//     className:
//       "left-[2%] top-[8%] h-40 w-32 -rotate-6 sm:h-48 sm:w-40 md:h-56 md:w-44",
//   },
//   {
//     src: fuji,
//     alt: "Mount Fuji, Japan",
//     city: "Fuji",
//     country: "Japan",
//     className:
//       "right-[3%] top-[6%] h-44 w-36 rotate-6 sm:h-52 sm:w-44 md:h-60 md:w-48",
//   },
//   {
//     src: bali,
//     alt: "Bali, Indonesia",
//     city: "Bali",
//     country: "Indonesia",
//     className:
//       "left-[6%] bottom-[8%] h-40 w-32 rotate-3 sm:h-48 sm:w-40 md:h-56 md:w-44",
//   },
//   {
//     src: banff,
//     alt: "Banff, Canada",
//     city: "Banff",
//     country: "Canada",
//     className:
//       "right-[5%] bottom-[6%] h-44 w-36 -rotate-6 sm:h-52 sm:w-44 md:h-60 md:w-48",
//   },
//   {
//     src: paris,
//     alt: "Paris, France",
//     city: "Paris",
//     country: "France",
//     className:
//       "hidden md:block left-[20%] bottom-[28%] h-32 w-28 -rotate-12",
//   },
//   {
//     src: machu,
//     alt: "Machu Picchu, Peru",
//     city: "Machu Picchu",
//     country: "Peru",
//     className:
//       "hidden md:block right-[20%] top-[30%] h-32 w-28 rotate-12",
//   },
// ];

// function PolaroidTile({ tile }: { tile: Tile }) {
//   return (
//     <figure
//       className={`pointer-events-auto absolute overflow-hidden rounded-2xl bg-card p-2 shadow-xl ring-1 ring-border/60 transition-transform duration-500 hover:rotate-0 hover:scale-105 ${tile.className}`}
//     >
//       <div className="relative h-[78%] w-full overflow-hidden rounded-xl">
//         <img
//           src={tile.src}
//           alt={tile.alt}
//           loading="lazy"
//           className="h-full w-full object-cover"
//         />
//       </div>
//       <figcaption className="mt-1.5 flex items-center gap-1 px-1 text-[11px] font-medium text-foreground/80">
//         <MapPin className="h-3 w-3 text-primary" />
//         <span className="truncate">
//           {tile.city}, <span className="text-muted-foreground">{tile.country}</span>
//         </span>
//       </figcaption>
//     </figure>
//   );
// }

// function Landing() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     navigate({ to: "/login" });
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-background">
//       {/* Soft ambient gradient */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--accent) 35%, transparent) 0%, transparent 70%), radial-gradient(50% 50% at 100% 100%, color-mix(in oklab, var(--primary) 18%, transparent) 0%, transparent 70%)",
//         }}
//       />

//       {/* Header */}
//       <header className="relative z-20 border-b border-border/60 bg-card/60 backdrop-blur">
//         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
//           <div className="flex items-center gap-2">
//             <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
//               <Compass className="h-5 w-5" />
//             </span>
//             <span className="text-lg font-semibold tracking-tight text-foreground">
//               Roamly
//             </span>
//           </div>
//           <Link
//             to="/places"
//             className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//           >
//             Browse places →
//           </Link>
//         </div>
//       </header>

//       {/* Hero */}
//       <section className="relative mx-auto max-w-6xl px-6">
//         <div className="relative min-h-[calc(100vh-72px)] py-12">
//           {/* Scattered place polaroids */}
//           <div aria-hidden={false} className="pointer-events-none absolute inset-0">
//             {tiles.map((t) => (
//               <PolaroidTile key={t.alt} tile={t} />
//             ))}
//           </div>

//           {/* Center stack */}
//           <div className="relative z-10 mx-auto flex h-full max-w-md flex-col items-center justify-center pt-2 text-center">
//             <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-border/60">
//               <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               Your travel companion
//             </span>
//             <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
//               Plan trips. Discover places.{" "}
//               <span className="text-primary">Travel better.</span>
//             </h1>
//             <p className="mt-3 max-w-sm text-sm text-muted-foreground">
//               Build itineraries, save inspiring destinations, and keep every
//               journey organised — all in one calm place.
//             </p>

//             {/* Login card */}
//             <div className="mt-8 w-full rounded-2xl border border-border/60 bg-card/95 p-6 text-left shadow-2xl backdrop-blur sm:p-7">
//               <div className="mb-5">
//                 <h2 className="text-xl font-semibold tracking-tight text-foreground">
//                   Welcome back
//                 </h2>
//                 <p className="mt-1 text-sm text-muted-foreground">
//                   Sign in to continue your journey
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-1.5">
//                   <Label htmlFor="email">Email</Label>
//                   <div className="relative">
//                     <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="email"
//                       type="email"
//                       required
//                       placeholder="you@example.com"
//                       className="pl-9"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-1.5">
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="password">Password</Label>
//                     <a
//                       href="#"
//                       className="text-xs font-medium text-primary hover:underline"
//                     >
//                       Forgot?
//                     </a>
//                   </div>
//                   <div className="relative">
//                     <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                     <Input
//                       id="password"
//                       type="password"
//                       required
//                       placeholder="••••••••"
//                       className="pl-9"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <Button type="submit" className="w-full">
//                   Sign in
//                   <ArrowRight className="h-4 w-4" />
//                 </Button>
//               </form>

//               <p className="mt-5 text-center text-sm text-muted-foreground">
//                 New here?{" "}
//                 <Link to="/signup" className="font-medium text-primary hover:underline">
//                   Create an account
//                 </Link>
//               </p>
//             </div>

//             <p className="mt-4 text-center text-xs text-muted-foreground">
//               or{" "}
//               <Link
//                 to="/Places"
//                 className="font-medium text-foreground hover:underline"
//               >
//                 continue as guest
//               </Link>
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Compass,
  MapPin,
  ArrowRight,
  Search,
  Heart,
  Map,
  BookOpen,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "PeoTraveller — Explore smarter. Travel better." },
      {
        name: "description",
        content:
          "Discover destinations, build travel wishlists, plan trips with AI, and share your memories.",
      },
    ],
  }),
});

/* ── Feature cards data ── */
const features = [
  {
    icon: Search,
    color: "oklch(0.560 0.110 155)",
    bg: "oklch(0.560 0.110 155 / 0.08)",
    title: "Smart Discovery",
    desc: "Search by image or description — our AI identifies places from photos and natural language.",
  },
  {
    icon: Heart,
    color: "oklch(0.590 0.195 28)",
    bg: "oklch(0.590 0.195 28 / 0.08)",
    title: "Personal Wishlists",
    desc: "Save places into curated lists, tag them by mood, and access them from anywhere.",
  },
  {
    icon: Map,
    color: "oklch(0.620 0.090 220)",
    bg: "oklch(0.620 0.090 220 / 0.08)",
    title: "AI Trip Planner",
    desc: "Tell us your preferences and get a full itinerary with hotels, routes, and budget.",
  },
  {
    icon: BookOpen,
    color: "oklch(0.680 0.130 60)",
    bg: "oklch(0.680 0.130 60 / 0.08)",
    title: "Memory Journal",
    desc: "Upload photos, write stories, and relive every adventure tied to the places you loved.",
  },
];

/* ── Destination preview spots ── */
const destinations = [
  { name: "Santorini", country: "Greece", tag: "Island", color: "#3B82F6" },
  { name: "Kyoto",     country: "Japan",  tag: "Culture", color: "#10B981" },
  { name: "Banff",     country: "Canada", tag: "Nature",  color: "#8B5CF6" },
  { name: "Lisbon",    country: "Portugal", tag: "City",  color: "#F59E0B" },
];

function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden texture-overlay">
        <div className="container mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center space-y-6 fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border border-primary/20"
              style={{ background: "oklch(0.560 0.110 155 / 0.08)", color: "oklch(0.420 0.110 155)" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Your AI-powered travel companion
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
              style={{ fontFamily: "'Lora', serif", color: "oklch(0.200 0.025 240)" }}
            >
              Discover places that{" "}
              <span
                className="relative inline-block"
                style={{ color: "oklch(0.560 0.110 155)" }}
              >
                move you
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="6" viewBox="0 0 200 6" fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q50 1 100 4 Q150 7 200 3"
                    stroke="oklch(0.560 0.110 155)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed fade-up fade-up-1">
              Build wishlists, plan adventures with AI, find rest stops, manage budgets, and share memories — all in one calm place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center fade-up fade-up-2">
              {isAuthenticated ? (
                <Link to="/Places">
                  <Button
                    size="lg"
                    className="gap-2 rounded-full px-8 text-sm font-medium"
                    style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
                  >
                    Explore Places <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="gap-2 rounded-full px-8 text-sm font-medium"
                      style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
                    >
                      Start for free <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/Places">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 rounded-full px-8 text-sm font-medium border-border/70"
                    >
                      Browse as guest
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground fade-up fade-up-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1">Loved by explorers worldwide</span>
            </div>
          </div>
        </div>

        {/* Decorative dots */}
        <div
          className="absolute -bottom-8 left-0 right-0 h-16"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--color-background))",
          }}
        />
      </section>

      {/* ── DESTINATION PREVIEWS ── */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {destinations.map((dest, i) => (
            <Link
              key={dest.name}
              to="/Places"
              className={`relative group rounded-2xl overflow-hidden fade-up`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Placeholder image gradient */}
              <div
                className="aspect-[3/4] w-full"
                style={{
                  background: `linear-gradient(135deg, ${dest.color}22 0%, ${dest.color}55 100%)`,
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span
                  className="pill text-white text-xs"
                  style={{ background: dest.color + "cc" }}
                >
                  {dest.tag}
                </span>
              </div>
              {/* Name */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-base leading-tight" style={{ fontFamily: "'Lora', serif" }}>
                  {dest.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-white/70" />
                  <span className="text-white/70 text-xs">{dest.country}</span>
                </div>
              </div>
              {/* Hover effect */}
              <div className="absolute inset-0 ring-2 ring-inset ring-white/0 group-hover:ring-white/20 rounded-2xl transition-all" />
            </Link>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          <Link to="/Places" className="hover:text-primary transition-colors font-medium">
            See all destinations →
          </Link>
        </p>
      </section>

      {/* ── FEATURES ── */}
      <section
        className="py-20"
        style={{ background: "oklch(0.975 0.008 95)" }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-14">
            <h2
              className="text-3xl sm:text-4xl font-semibold"
              style={{ fontFamily: "'Lora', serif", color: "oklch(0.200 0.025 240)" }}
            >
              Everything for your journey
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              From discovering hidden gems to tracking every expense — PeoTraveller has you covered.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, color, bg, title, desc }, i) => (
              <div
                key={title}
                className="rounded-2xl p-6 space-y-3 bg-card border border-border/50 card-hover fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: bg }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <h3
                  className="font-semibold text-foreground"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="container mx-auto px-4 sm:px-6 py-20">
        <div
          className="rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
          style={{
            background: "oklch(0.560 0.110 155 / 0.08)",
            border: "1px solid oklch(0.560 0.110 155 / 0.20)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-10 -right-10 h-48 w-48 rounded-full"
            style={{ background: "oklch(0.560 0.110 155 / 0.08)" }}
          />
          <div
            className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full"
            style={{ background: "oklch(0.870 0.060 220 / 0.15)" }}
          />
          <div className="relative space-y-5">
            <h2
              className="text-3xl sm:text-4xl font-semibold"
              style={{ fontFamily: "'Lora', serif", color: "oklch(0.200 0.025 240)" }}
            >
              Ready to explore?
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Join thousands of travellers who plan smarter and travel better.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="gap-2 rounded-full px-8"
                  style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
                >
                  Create free account <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/Places">
                <Button size="lg" variant="outline" className="rounded-full px-8 border-primary/30">
                  Browse places
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}