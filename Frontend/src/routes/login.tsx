import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Mail, Lock, Eye, EyeOff, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — PeoTraveller" },
      { name: "description", content: "Sign in to your PeoTraveller account." },
    ],
  }),
});

function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: "/Places" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex texture-overlay"
      style={{ background: "oklch(0.990 0.004 95)" }}
    >
      {/* Left decorative panel — hidden on mobile */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 w-[42%]"
        style={{ background: "oklch(0.560 0.110 155 / 0.07)" }}
      >
        <div className="flex items-center gap-2.5">
          <Compass className="h-5 w-5" style={{ color: "oklch(0.560 0.110 155)" }} />
          <span
            className="font-semibold"
            style={{ fontFamily: "'Lora', serif", color: "oklch(0.200 0.025 240)" }}
          >
            PeoTraveller
          </span>
        </div>
        <div className="space-y-5">
          <h2
            className="text-4xl font-semibold leading-tight"
            style={{ fontFamily: "'Lora', serif", color: "oklch(0.200 0.025 240)" }}
          >
            Welcome back,{" "}
            <span style={{ color: "oklch(0.560 0.110 155)" }}>explorer</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Your wishlists, memories, and planned adventures are waiting for you.
          </p>
          {/* Mini feature pills */}
          {[
            "🗺  Browse 1,000+ curated destinations",
            "❤️  Manage your travel wishlists",
            "📔  Keep a photo memory journal",
            "🤖  Plan trips with AI assistance",
          ].map((f) => (
            <div
              key={f}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-foreground/80"
              style={{ background: "oklch(0.560 0.110 155 / 0.06)", border: "1px solid oklch(0.560 0.110 155 / 0.15)" }}
            >
              {f}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} PeoTraveller</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-7 fade-up">
          <div className="space-y-1.5">
            <h1
              className="text-2xl font-semibold"
              style={{ fontFamily: "'Lora', serif", color: "oklch(0.200 0.025 240)" }}
            >
              Sign in
            </h1>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium hover:underline" style={{ color: "oklch(0.560 0.110 155)" }}>
                Create one free
              </Link>
            </p>
          </div>

          {error && (
            <div
              className="rounded-xl px-4 py-3 text-sm"
              style={{ background: "oklch(0.590 0.195 28 / 0.08)", color: "oklch(0.490 0.195 28)", border: "1px solid oklch(0.590 0.195 28 / 0.20)" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="off"
                  placeholder="example@traveler.com"
                  className="pl-10 rounded-xl border-border/70 h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <a href="#" className="text-xs hover:underline" style={{ color: "oklch(0.560 0.110 155)" }}>
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Example123!"
                  className="pl-10 pr-10 rounded-xl border-border/70 h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl text-sm font-medium"
              style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in…</>
              ) : (
                "Sign in"
              )}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Enter your registered email and a strong password. Example: user@example.com and a secure password with at least 8 characters.
            </p>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-background text-muted-foreground">or</span>
            </div>
          </div>

          <Link to="/Places">
            <Button variant="outline" className="w-full h-11 rounded-xl border-border/70 text-sm">
              Continue as guest
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}