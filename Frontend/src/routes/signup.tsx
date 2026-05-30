import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Mail, Lock, Eye, EyeOff, User, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupUser } from "@/lib/api";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Create Account — PeoTraveller" },
      { name: "description", content: "Join PeoTraveller and start exploring the world." },
    ],
  }),
});

function SignupPage() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await signupUser(email, password, name);
      navigate({ to: "/login" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex texture-overlay"
      style={{ background: "oklch(0.990 0.004 95)" }}
    >
      {/* Left decorative panel */}
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
            Start your{" "}
            <span style={{ color: "oklch(0.560 0.110 155)" }}>adventure</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Join thousands of travellers discovering the world smarter.
          </p>
          {[
            "🗺  Browse 1,000+ curated destinations",
            "❤️  Build your personal travel wishlist",
            "🤖  Plan trips with AI assistance",
            "📔  Share and relive your memories",
          ].map((f) => (
            <div
              key={f}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-foreground/80"
              style={{
                background: "oklch(0.560 0.110 155 / 0.06)",
                border: "1px solid oklch(0.560 0.110 155 / 0.15)",
              }}
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
              Create account
            </h1>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium hover:underline"
                style={{ color: "oklch(0.560 0.110 155)" }}
              >
                Sign in
              </Link>
            </p>
          </div>

          {error && (
            <div
              className="rounded-xl px-4 py-3 text-sm"
              style={{
                background: "oklch(0.590 0.195 28 / 0.08)",
                color: "oklch(0.490 0.195 28)",
                border: "1px solid oklch(0.590 0.195 28 / 0.20)",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium">Full name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Alex Johnson"
                  className="pl-10 rounded-xl border-border/70 h-11"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 rounded-xl border-border/70 h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 6 characters"
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

            {/* Confirm password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-sm font-medium">Confirm password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirm"
                  type={showPw ? "text" : "password"}
                  placeholder="Re-enter password"
                  className="pl-10 rounded-xl border-border/70 h-11"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl text-sm font-medium"
              style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
              disabled={loading}
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account…</>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            By creating an account you agree to our{" "}
            <a href="#" className="underline hover:text-foreground">Terms</a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}