import { MapPin } from "lucide-react";

export type Place = {
  name: string;
  city: string;
  country: string;
  description: string;
  image: string;
};

export function PlaceCard({ place }: { place: Place }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border/60 transition-all hover:shadow-xl hover:ring-primary/30">
      <div className="flex h-56 sm:h-48">
        {/* Left: details */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-5">
          <div>
            <h3 className="text-xl font-semibold leading-tight text-foreground">
              {place.name}
            </h3>
            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium text-foreground/80">{place.city}</span>
              <span className="text-muted-foreground">·</span>
              <span>{place.country}</span>
            </div>
          </div>
          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
            {place.description}
          </p>
        </div>

        {/* Right: image stuck to card, blurred fade into details */}
        <div className="relative w-1/2 sm:w-2/5 shrink-0 overflow-hidden">
          <img
            src={place.image}
            alt={`${place.name}, ${place.city}`}
            loading="lazy"
            width={800}
            height={800}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Blur fade overlay — strong on left edge, clear on right */}
          <div
            aria-hidden
            className="absolute inset-0 backdrop-blur-md"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, rgba(0,0,0,0.55) 35%, transparent 75%)",
              maskImage:
                "linear-gradient(to right, black 0%, rgba(0,0,0,0.55) 35%, transparent 75%)",
            }}
          />
          {/* Color fade so card body blends into image */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, var(--card) 0%, color-mix(in oklab, var(--card) 60%, transparent) 35%, transparent 70%)",
            }}
          />
        </div>
      </div>
    </article>
  );
}
