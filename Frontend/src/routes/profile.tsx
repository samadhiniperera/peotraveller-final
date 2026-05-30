import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Compass, LogOut, Settings, Loader } from "lucide-react";
import { ProfileCard, type UserProfile } from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { getProfileData, updateBio } from "@/lib/api";
import { useEffect } from "react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "My Profile — Roamly" },
      {
        name: "description",
        content: "View and manage your Roamly travel profile.",
      },
    ],
  }),
});

function ProfilePage() {
  // Fetch user profile from API
  const { data: profileData, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const result = await getProfileData();
        return result.data || result;
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        throw error;
      }
    },
  });

  // Default user data (fallback)
  const [user, setUser] = useState<UserProfile>(
    profileData || {
      id: "user123",
      name: "Alex Johnson",
      email: "alex@example.com",
      bio: "Travel enthusiast exploring the world one place at a time 🌍",
      location: "San Francisco, USA",
      joinedDate: "2024-01-15",
      placesVisited: 12,
      placesWishlisted: 28,
      profileImage: undefined,
    }
  );

  // Update local user when profile data loads
  useEffect(() => {
    if (profileData) {
      setUser(profileData);
    }
  }, [profileData]);

  // Bio editing state
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState(user.bio || "");
  const queryClient = useQueryClient();

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile page or open edit modal
    console.log("Edit profile clicked");
  };

  const startEditBio = () => {
    setBioDraft(user.bio || "");
    setIsEditingBio(true);
  };

  const cancelEditBio = () => {
    setIsEditingBio(false);
    setBioDraft(user.bio || "");
  };

  const saveBio = async () => {
    try {
      const updated = await updateBio(bioDraft);
      // update local user state
      setUser((prev) => ({ ...prev, bio: updated.bio || bioDraft }));
      // invalidate profile query
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsEditingBio(false);
    } catch (err) {
      console.error("Failed to save bio:", err);
      // keep editing mode so user can retry
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 border-b border-border/50 bg-background/80 backdrop-blur-sm z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-bold text-primary hover:opacity-80 transition"
            >
              <Compass className="h-6 w-6" />
              <span>Roamly</span>
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-destructive hover:text-destructive">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-12">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
              Failed to load profile. Please try again later.
            </div>
          ) : (
            <>
              {/* Profile Card */}
                  <ProfileCard
                    user={user}
                    isOwnProfile={true}
                    onEditClick={handleEditProfile}
                  />

                  {/* Inline bio editor */}
                  <div className="rounded-lg border border-border/60 bg-card p-4">
                    <h3 className="text-sm font-semibold">About</h3>
                    {!isEditingBio ? (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">{user.bio}</p>
                        <div className="mt-3">
                          <Button size="sm" onClick={startEditBio}>Edit Bio</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 space-y-2">
                        <textarea
                          className="w-full rounded-md border p-2"
                          rows={4}
                          value={bioDraft}
                          onChange={(e) => setBioDraft(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={saveBio}>Save</Button>
                          <Button variant="ghost" size="sm" onClick={cancelEditBio}>Cancel</Button>
                        </div>
                      </div>
                    )}
                  </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/wishlist"
                className="rounded-lg border border-border/60 bg-card p-4 hover:shadow-md transition-shadow text-foreground hover:text-primary"
              >
                <div className="font-medium">My Wishlist</div>
                <p className="text-sm text-muted-foreground">
                  {user.placesWishlisted} places saved
                </p>
              </Link>

              <Link
                to="/Places"
                className="rounded-lg border border-border/60 bg-card p-4 hover:shadow-md transition-shadow text-foreground hover:text-primary"
              >
                <div className="font-medium">Browse Places</div>
                <p className="text-sm text-muted-foreground">
                  Discover new destinations
                </p>
              </Link>
            </div>
          </div>

          {/* Recent Activity (Placeholder) */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <div className="rounded-lg border border-border/60 bg-card/50 p-8 text-center text-muted-foreground">
              <p>No recent activity yet</p>
            </div>
          </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
