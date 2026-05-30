// import React from "react";
// import { Link, useNavigate } from "@tanstack/react-router";
// import { Compass } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/lib/auth";

// export function Header() {
//   const navigate = useNavigate();
//   const { user, isAuthenticated, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate({ to: "/login" });
//   };

//   return (
//     <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/90 backdrop-blur-sm">
//       <div className="container mx-auto flex items-center justify-between px-4 py-3">
//         <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
//           <Compass className="h-6 w-6" />
//           <span>PeoTraveller</span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-3">
//           <Link to="/Places" className="text-sm text-foreground hover:text-primary">Places</Link>
//           <Link to="/wishlist" className="text-sm text-foreground hover:text-primary">Wishlist</Link>
//           <Link to="/profile" className="text-sm text-foreground hover:text-primary">Profile</Link>
//         </nav>

//         <div className="flex items-center gap-2">
//           {!isAuthenticated ? (
//             <>
//               <Link to="/login">
//                 <Button size="sm">Sign in</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button size="sm" variant="outline">Sign up</Button>
//               </Link>
//             </>
//           ) : (
//             <>
//               {user?.name ? (
//                 <span className="hidden sm:inline text-sm text-muted-foreground">Hi, {user.name}</span>
//               ) : null}
//               <Button size="sm" variant="outline" onClick={handleLogout}>Logout</Button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { Compass, Menu, X, BookHeart, MapPin, User, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate({ to: "/login" });
  };

  const navLinks = [
    { to: "/Places",   label: "Explore",  icon: MapPin },
    { to: "/wishlist", label: "Wishlist",  icon: BookHeart },
    { to: "/memos",    label: "Memories", icon: FileText },
    { to: "/profile",  label: "Profile",  icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Frosted glass strip */}
        <div
          className="w-full border-b border-border/50"
          style={{
            background: "oklch(0.990 0.004 95 / 0.88)",
            backdropFilter: "blur(14px) saturate(1.4)",
            WebkitBackdropFilter: "blur(14px) saturate(1.4)",
          }}
        >
          <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              aria-label="PeoTraveller home"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                style={{ background: "oklch(0.560 0.110 155 / 0.12)" }}
              >
                <Compass className="h-5 w-5" style={{ color: "oklch(0.560 0.110 155)" }} />
              </span>
              <span
                className="text-lg font-semibold tracking-tight"
                style={{ fontFamily: "'Lora', serif", color: "oklch(0.200 0.025 240)" }}
              >
                PeoTraveller
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive(to)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {label}
                  {isActive(to) && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                      style={{ background: "oklch(0.560 0.110 155)" }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth actions */}
            <div className="hidden md:flex items-center gap-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-sm font-medium">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      size="sm"
                      className="text-sm font-medium rounded-full px-5"
                      style={{
                        background: "oklch(0.560 0.110 155)",
                        color: "oklch(0.990 0.004 95)",
                      }}
                    >
                      Get started
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  {user?.name && (
                    <span className="text-sm text-muted-foreground">
                      Hi,{" "}
                      <span className="font-medium text-foreground">
                        {user.name.split(" ")[0]}
                      </span>
                    </span>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleLogout}
                    className="gap-1.5 text-muted-foreground hover:text-destructive"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-16 left-0 right-0 border-b border-border"
            style={{ background: "oklch(0.990 0.004 95 / 0.97)", backdropFilter: "blur(14px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(to)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted/60"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
              <div className="border-t border-border/60 mt-2 pt-3">
                {!isAuthenticated ? (
                  <div className="flex gap-2">
                    <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full">Sign in</Button>
                    </Link>
                    <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full">Get started</Button>
                    </Link>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}