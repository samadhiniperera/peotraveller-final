// import React from "react";
// import { Link } from "@tanstack/react-router";

// export function Footer() {
//   return (
//     <footer className="mt-12 border-t border-border/40 bg-background/90 py-8">
//       <div className="container mx-auto px-4 text-sm text-muted-foreground">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//           <div>© {new Date().getFullYear()} PeoTraveller. All rights reserved.</div>
//           <div className="flex gap-4">
//             <a href="#" className="hover:text-primary">Terms</a>
//             <a href="#" className="hover:text-primary">Privacy</a>
//             <Link to="/" className="hover:text-primary">Home</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


import React from "react";
import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="w-full border-t border-border/40"
      style={{ background: "oklch(0.975 0.008 95)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand column */}
          <div className="space-y-3 max-w-xs">
            <Link to="/" className="flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "oklch(0.560 0.110 155 / 0.12)" }}
              >
                <Compass
                  className="h-4 w-4"
                  style={{ color: "oklch(0.560 0.110 155)" }}
                />
              </span>
              <span
                className="font-semibold"
                style={{ fontFamily: "'Lora', serif", color: "oklch(0.200 0.025 240)" }}
              >
                PeoTraveller
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Discover places, plan adventures, and share memories — your all-in-one travel companion.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8 text-sm">
            <div className="space-y-2">
              <p className="font-medium text-foreground text-xs uppercase tracking-wider">Explore</p>
              <div className="flex flex-col gap-1.5">
                <Link to="/Places" className="text-muted-foreground hover:text-primary transition-colors">Places</Link>
                <Link to="/wishlist" className="text-muted-foreground hover:text-primary transition-colors">Wishlist</Link>
                <Link to="/memos" className="text-muted-foreground hover:text-primary transition-colors">Memories</Link>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground text-xs uppercase tracking-wider">Account</p>
              <div className="flex flex-col gap-1.5">
                <Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">Profile</Link>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Sign in</Link>
                <Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">Register</Link>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground text-xs uppercase tracking-wider">Legal</p>
              <div className="flex flex-col gap-1.5">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PeoTraveller. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Explore smarter. Travel better.
          </p>
        </div>
      </div>
    </footer>
  );
}