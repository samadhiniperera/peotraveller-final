// import { MapPin, Plus, Eye, Check } from "lucide-react";
// import { useRef } from "react";
// import type { Place } from "@/components/PlaceCard";

// type Props = {
//   place: Place;
//   added: boolean;
//   onAdd: (place: Place, originRect: DOMRect) => void;
//   onView: (place: Place) => void;
// };

// export function PostCard({ place, added, onAdd, onView }: Props) {
//   const addBtnRef = useRef<HTMLButtonElement>(null);

//   const handleAdd = () => {
//     if (added) return;
//     const rect = addBtnRef.current?.getBoundingClientRect();
//     if (rect) onAdd(place, rect);
//   };

//   return (
//     <article className="group relative overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border/60 transition-all hover:shadow-xl hover:ring-primary/30">
//       {/* Action chips — visible on hover/focus */}
//       <div className="pointer-events-none absolute right-4 top-4 z-20 flex gap-2 opacity-0 translate-y-[-4px] transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
//         <button
//           ref={addBtnRef}
//           onClick={handleAdd}
//           disabled={added}
//           aria-label={added ? "Already in wishlist" : "Add to wishlist"}
//           className="inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background shadow-md ring-1 ring-black/10 transition hover:bg-foreground/90 disabled:opacity-70"
//         >
//           {added ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
//           {added ? "Added" : "Add"}
//         </button>
//         <button
//           onClick={() => onView(place)}
//           aria-label="View place"
//           className="inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background shadow-md ring-1 ring-black/10 transition hover:bg-foreground/90"
//         >
//           <Eye className="h-3 w-3" />
//           View
//         </button>
//       </div>

//       {/* Image */}
//       <div className="relative aspect-[16/9] w-full overflow-hidden">
//         <img
//           src={place.image}
//           alt={`${place.name}, ${place.city}`}
//           loading="lazy"
//           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
//         />
//         <div
//           aria-hidden
//           className="absolute inset-0"
//           style={{
//             background:
//               "linear-gradient(to top, color-mix(in oklab, var(--card) 70%, transparent) 0%, transparent 45%)",
//           }}
//         />
//       </div>

//       {/* Body */}
//       <div className="p-5 sm:p-6">
//         <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
//           <MapPin className="h-3.5 w-3.5 text-primary" />
//           <span className="font-medium text-foreground/80">{place.city}</span>
//           <span>·</span>
//           <span>{place.country}</span>
//         </div>
//         <h3 className="mt-1.5 text-xl font-semibold leading-tight text-foreground sm:text-2xl">
//           {place.name}
//         </h3>
//         <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
//           {place.description}
//         </p>
//       </div>
//     </article>
//   );
// }

// ======================================================
// FILE: Frontend/src/components/PostCard.tsx
// ======================================================
import { MapPin, Plus, Eye, Check, Heart } from "lucide-react";
import { useRef } from "react";
import type { Place } from "@/components/PlaceCard";

type Props = {
  place: Place;
  added: boolean;
  onAdd: (place: Place, originRect: DOMRect) => void;
  onView: (place: Place) => void;
};

export function PostCard({ place, added, onAdd, onView }: Props) {
  const addBtnRef = useRef<HTMLButtonElement>(null);

  const handleAdd = () => {
    if (added) return;
    const rect = addBtnRef.current?.getBoundingClientRect();
    if (rect) onAdd(place, rect);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 card-hover">
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={place.image}
          alt={`${place.name}, ${place.city}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 translate-y-[-6px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
          <button
            ref={addBtnRef}
            onClick={handleAdd}
            disabled={added}
            aria-label={added ? "Already in wishlist" : "Add to wishlist"}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg transition-all active:scale-95"
            style={
              added
                ? { background: "oklch(0.560 0.110 155)", color: "#fff" }
                : { background: "rgba(255,255,255,0.92)", color: "oklch(0.200 0.025 240)", backdropFilter: "blur(8px)" }
            }
          >
            {added ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            {added ? "Saved" : "Save"}
          </button>
          <button
            onClick={() => onView(place)}
            aria-label="View details"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg transition-all active:scale-95"
            style={{ background: "rgba(255,255,255,0.92)", color: "oklch(0.200 0.025 240)", backdropFilter: "blur(8px)" }}
          >
            <Eye className="h-3 w-3" />
            View
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
          <MapPin className="h-3.5 w-3.5" style={{ color: "oklch(0.560 0.110 155)" }} />
          <span className="font-medium text-foreground/80">{place.city}</span>
          <span>·</span>
          <span>{place.country}</span>
        </div>
        <h3
          className="text-xl font-semibold leading-snug text-foreground"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {place.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {place.description}
        </p>
      </div>
    </article>
  );
}


// ======================================================
// FILE: Frontend/src/components/PlaceCard.tsx
// ======================================================
import { MapPin as MapPinIcon } from "lucide-react";

export type Place = {
  name: string;
  city: string;
  country: string;
  description: string;
  image: string;
};

export function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex h-32">
        {/* Details */}
        <div className="relative flex flex-1 flex-col justify-between p-4">
          <div>
            <h3
              className="text-base font-semibold leading-tight text-foreground"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {place.name}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPinIcon className="h-3 w-3" style={{ color: "oklch(0.560 0.110 155)" }} />
              <span className="font-medium text-foreground/70">{place.city}</span>
              <span>·</span>
              <span>{place.country}</span>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {place.description}
          </p>
        </div>
        {/* Thumbnail */}
        <div className="relative h-full w-28 flex-shrink-0 overflow-hidden bg-muted rounded-r-2xl">
          <img
            src={place.image}
            alt={place.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
    </article>
  );
}