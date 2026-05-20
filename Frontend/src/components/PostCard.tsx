import { MapPin, Plus, Eye, Check } from "lucide-react";
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
    <article className="group relative overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border/60 transition-all hover:shadow-xl hover:ring-primary/30">
      {/* Action chips — visible on hover/focus */}
      <div className="pointer-events-none absolute right-4 top-4 z-20 flex gap-2 opacity-0 translate-y-[-4px] transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
        <button
          ref={addBtnRef}
          onClick={handleAdd}
          disabled={added}
          aria-label={added ? "Already in wishlist" : "Add to wishlist"}
          className="inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background shadow-md ring-1 ring-black/10 transition hover:bg-foreground/90 disabled:opacity-70"
        >
          {added ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          {added ? "Added" : "Add"}
        </button>
        <button
          onClick={() => onView(place)}
          aria-label="View place"
          className="inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background shadow-md ring-1 ring-black/10 transition hover:bg-foreground/90"
        >
          <Eye className="h-3 w-3" />
          View
        </button>
      </div>

      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={place.image}
          alt={`${place.name}, ${place.city}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--card) 70%, transparent) 0%, transparent 45%)",
          }}
        />
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium text-foreground/80">{place.city}</span>
          <span>·</span>
          <span>{place.country}</span>
        </div>
        <h3 className="mt-1.5 text-xl font-semibold leading-tight text-foreground sm:text-2xl">
          {place.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {place.description}
        </p>
      </div>
    </article>
  );
}