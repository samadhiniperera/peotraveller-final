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

        {/* Right: image */}
        <div className="relative h-full w-32 flex-shrink-0 overflow-hidden bg-muted">
          <img
            src={place.image}
            alt={place.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
        </div>
      </div>
    </article>
  );
}
