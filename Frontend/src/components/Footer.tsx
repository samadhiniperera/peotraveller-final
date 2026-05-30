import React from "react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border/40 bg-background/90 py-8">
      <div className="container mx-auto px-4 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} PeoTraveller. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <Link to="/" className="hover:text-primary">Home</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
