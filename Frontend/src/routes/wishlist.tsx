import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWishlist, removeFromWishlist } from "@/lib/api";
import { Compass, Heart } from "lucide-react";
import { PlaceCard, type Place } from "@/components/PlaceCard";
import { Button } from "@/components/ui/button";
import paris from "@/assets/place-paris.jpg";
import fuji from "@/assets/place-fuji.jpg";
import santorini from "@/assets/place-santorini.jpg";
import machu from "@/assets/place-machu.jpg";
import bali from "@/assets/place-bali.jpg";
import banff from "@/assets/place-banff.jpg";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({
    meta: [
      { title: "My Wishlist — Roamly" },
      {
        name: "description",
        content: "View and manage the places you want to visit.",
      },
    ],
  }),
});

// TODO: Replace with actual API call to fetch user's wishlist
const defaultWishlistPlaces: Place[] = [
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
];

function WishlistPage() {
  // Fetch wishlist from API (requires auth)
  const { data: wishlistItems, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      try {
        return await getWishlist();
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        return [];
      }
    },
  });

  const [localPlaces, setLocalPlaces] = useState<Place[]>(
    defaultWishlistPlaces
  );

  // Map API wishlist items to PlaceCard `Place` shape
  const wishlistPlaces = (wishlistItems || []).map((item: any) => ({
    name: item.place?.name || "Unknown place",
    city: item.place?.city || "",
    country: item.place?.country || "",
    description: item.place?.description || item.place?.summary || "",
    image: item.place?.image_url || paris,
    item_id: item.id,
  })) as unknown as Place[];

  const handleRemoveFromWishlist = async (itemIdOrPlaceName: any) => {
    try {
      const id = typeof itemIdOrPlaceName === "number" ? itemIdOrPlaceName : itemIdOrPlaceName.item_id || itemIdOrPlaceName;
      await removeFromWishlist(String(id));
      // optimistic UI: remove locally
      setLocalPlaces((p) => p.filter((pl) => (pl as any).item_id !== id && pl.name !== itemIdOrPlaceName));
    } catch (err) {
      console.error("Failed to remove wishlist item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-bold text-primary hover:opacity-80 transition"
            >
              <Compass className="h-6 w-6" />
              <span>Roamly</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link to="/Places">
                <Button variant="ghost" size="sm">
                  Browse Places
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  Profile
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">My Wishlist</h1>
          </div>
          <p className="text-muted-foreground">
            {isLoading ? "Loading..." : `${wishlistPlaces.length} ${wishlistPlaces.length === 1 ? "place" : "places"} saved · Start planning your next adventure`}
          </p>
        </div>

        {/* Wishlist Grid */}
        {wishlistPlaces.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistPlaces.map((place) => (
              <div key={(place as any).item_id || place.name} className="relative group">
                <PlaceCard place={place} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFromWishlist((place as any).item_id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border/60 bg-card p-12 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No places saved yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start exploring and save your favorite destinations to your
              wishlist
            </p>
            <Link to="/Places">
              <Button>Browse Places</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
