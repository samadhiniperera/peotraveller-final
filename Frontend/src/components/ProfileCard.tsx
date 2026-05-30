import { Edit2, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  profileImage?: string;
  location?: string;
  joinedDate?: string;
  placesVisited?: number;
  placesWishlisted?: number;
}

interface ProfileCardProps {
  user: UserProfile;
  isOwnProfile?: boolean;
  onEditClick?: () => void;
}

export function ProfileCard({
  user,
  isOwnProfile = false,
  onEditClick,
}: ProfileCardProps) {
  return (
    <div className="w-full rounded-3xl border border-border/60 bg-card p-8 shadow-sm ring-1 ring-border/20">
      {/* Header with edit button */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          {/* Profile Image */}
          <div className="relative mb-6 h-32 w-32">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="h-full w-full rounded-full object-cover ring-4 ring-primary/20"
              />
            ) : (
              <div className="h-full w-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-primary-foreground ring-4 ring-primary/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* User Info */}
          <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.bio}</p>

          {/* Location and Email */}
          <div className="mt-4 space-y-2">
            {user.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        {isOwnProfile && (
          <Button
            variant="outline"
            size="sm"
            onClick={onEditClick}
            className="gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 border-t border-border/40 pt-6">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {user.placesVisited || 0}
          </p>
          <p className="text-xs text-muted-foreground">Places Visited</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {user.placesWishlisted || 0}
          </p>
          <p className="text-xs text-muted-foreground">Wishlisted</p>
        </div>
      </div>

      {/* Joined Date */}
      {user.joinedDate && (
        <p className="mt-6 text-xs text-muted-foreground/60">
          Joined {new Date(user.joinedDate).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      )}
    </div>
  );
}
