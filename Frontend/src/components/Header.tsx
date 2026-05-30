import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
          <Compass className="h-6 w-6" />
          <span>PeoTraveller</span>
        </Link>

        <nav className="hidden md:flex items-center gap-3">
          <Link to="/Places" className="text-sm text-foreground hover:text-primary">Places</Link>
          <Link to="/wishlist" className="text-sm text-foreground hover:text-primary">Wishlist</Link>
          <Link to="/profile" className="text-sm text-foreground hover:text-primary">Profile</Link>
        </nav>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button size="sm">Sign in</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" variant="outline">Sign up</Button>
              </Link>
            </>
          ) : (
            <>
              {user?.name ? (
                <span className="hidden sm:inline text-sm text-muted-foreground">Hi, {user.name}</span>
              ) : null}
              <Button size="sm" variant="outline" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
