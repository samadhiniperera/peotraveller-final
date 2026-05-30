import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Search, Upload, Image, Sparkles, MapPin, X, Loader2, Wand2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({
    meta: [
      { title: "Smart Search — PeoTraveller" },
      { name: "description", content: "Search places by image or description using AI." },
    ],
  }),
});

/* ── Mock AI result type ──────────────────────────────────────── */
type Result = {
  name: string;
  city: string;
  country: string;
  description: string;
  image: string;
  matchReason: string;
};

/* ── Mock results by query keyword ───────────────────────────── */
const MOCK_RESULTS: Result[] = [
  {
    name: "Blue Domes of Oia",
    city: "Santorini",
    country: "Greece",
    description: "Whitewashed cliffside village with iconic blue-domed churches overlooking the Aegean caldera.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80",
    matchReason: "Matches your description of blue domes and white buildings by the sea.",
  },
  {
    name: "Chefchaouen",
    city: "Rif Mountains",
    country: "Morocco",
    description: "The famous Blue City, a maze of blue-painted alleyways nestled in the Atlas mountains.",
    image: "https://images.unsplash.com/photo-1548017787-e7a7e0a46f3b?w=400&q=80",
    matchReason: "Known for its striking blue-washed streets and buildings.",
  },
  {
    name: "Glacier Bay",
    city: "Alaska",
    country: "USA",
    description: "A UNESCO World Heritage site with dramatic blue glacier landscapes and pristine wilderness.",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=400&q=80",
    matchReason: "Features the vivid blue palette you described in the query.",
  },
];

const SUGGESTIONS = [
  "Misty mountains with cherry blossoms",
  "Desert with red sand dunes at sunset",
  "Colourful houses on a cliffside by the sea",
  "Ancient temple surrounded by jungle",
  "Crystal blue lake between snowy peaks",
  "Night market with lanterns and street food",
];

/* ── Page ─────────────────────────────────────────────────────── */
function SearchPage() {
  const [mode, setMode]           = useState<"text" | "image">("text");
  const [query, setQuery]         = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);
  const [results, setResults]     = useState<Result[] | null>(null);
  const [searched, setSearched]   = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSearch = (q?: string) => {
    const searchTerm = q ?? query;
    if (mode === "text" && !searchTerm.trim()) return;
    if (mode === "image" && !imageFile) return;

    setLoading(true);
    setResults(null);
    setSearched(mode === "text" ? searchTerm : `Image: ${imageFile?.name}`);

    // Simulate AI search delay
    setTimeout(() => {
      setLoading(false);
      setResults(MOCK_RESULTS);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero search area */}
      <div
        className="border-b border-border/50 py-16 texture-overlay"
        style={{ background: "oklch(0.975 0.008 95)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center space-y-3 mb-10 fade-up">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: "oklch(0.680 0.130 60 / 0.12)" }}
            >
              <Sparkles className="h-7 w-7" style={{ color: "oklch(0.680 0.130 60)" }} />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-semibold text-foreground"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Smart Place Search
            </h1>
            <p className="text-muted-foreground">
              Describe a place in your own words — or upload a photo — and our AI will find it for you.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex justify-center mb-6 fade-up fade-up-1">
            <div className="flex rounded-xl p-1 border border-border/60" style={{ background: "oklch(0.990 0.004 95)" }}>
              {(["text", "image"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setResults(null); }}
                  className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition-all ${
                    mode === m ? "text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={mode === m ? { background: "oklch(0.560 0.110 155)" } : {}}
                >
                  {m === "text" ? <Search className="h-4 w-4" /> : <Image className="h-4 w-4" />}
                  {m === "text" ? "Describe it" : "Upload image"}
                </button>
              ))}
            </div>
          </div>

          {/* Text search */}
          {mode === "text" && (
            <div className="space-y-4 fade-up fade-up-2">
              <div className="relative">
                <Textarea
                  placeholder="e.g. A white village with blue domes overlooking the sea at sunset…"
                  className="rounded-2xl resize-none pr-16 text-sm border-border/70"
                  rows={3}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.metaKey) handleSearch();
                  }}
                />
                <Button
                  onClick={() => handleSearch()}
                  disabled={!query.trim() || loading}
                  className="absolute right-3 bottom-3 rounded-xl gap-1.5 px-4"
                  style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                  Search
                </Button>
              </div>

              {/* Quick suggestions */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Try these:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setQuery(s); handleSearch(s); }}
                      className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                      style={{ background: "oklch(0.990 0.004 95)" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Image search */}
          {mode === "image" && (
            <div className="space-y-4 fade-up fade-up-2">
              {!imagePreview ? (
                <div
                  className="rounded-2xl border-2 border-dashed border-border/60 p-12 text-center cursor-pointer hover:border-primary/40 transition-colors"
                  style={{ background: "oklch(0.990 0.004 95)" }}
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
                  <p className="text-sm font-medium text-foreground">Click to upload a photo</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WEBP up to 10MB</p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden border border-border/60">
                  <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-cover" />
                  <button
                    onClick={clearImage}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/80 text-background hover:bg-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {imageFile && (
                <Button
                  onClick={() => handleSearch()}
                  disabled={loading}
                  className="w-full h-11 rounded-xl gap-2"
                  style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Analysing image…</>
                  ) : (
                    <><Sparkles className="h-4 w-4" /> Identify this place</>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <main className="container mx-auto px-4 sm:px-6 py-10 max-w-3xl">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: "oklch(0.560 0.110 155)" }} />
            <p className="text-sm text-muted-foreground">
              {mode === "image" ? "Analysing your image with AI…" : "Finding matching places…"}
            </p>
          </div>
        )}

        {results && !loading && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">
                AI results for:{" "}
                <span className="font-medium text-foreground">"{searched}"</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {results.length} places found
              </p>
            </div>
            <div className="space-y-4">
              {results.map((r) => (
                <SearchResultCard key={r.name} result={r} />
              ))}
            </div>
            <div
              className="rounded-2xl p-4 text-sm text-center"
              style={{
                background: "oklch(0.680 0.130 60 / 0.06)",
                border: "1px solid oklch(0.680 0.130 60 / 0.15)",
                color: "oklch(0.520 0.130 60)",
              }}
            >
              <Sparkles className="inline h-3.5 w-3.5 mr-1.5" />
              AI-powered suggestions — results are illustrative while the AI backend is being built.
            </div>
          </div>
        )}

        {!loading && !results && (
          <div className="text-center py-20 space-y-3">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/20" />
            <p className="text-muted-foreground text-sm">Your AI search results will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

/* ── Result card ─────────────────────────────────────────────── */
function SearchResultCard({ result }: { result: Result }) {
  return (
    <div className="group flex gap-4 rounded-2xl bg-card border border-border/50 overflow-hidden card-hover">
      <div className="w-32 sm:w-40 flex-shrink-0 overflow-hidden">
        <img
          src={result.image}
          alt={result.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ minHeight: 120 }}
        />
      </div>
      <div className="flex-1 p-4 space-y-2 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: "oklch(0.560 0.110 155)" }} />
          <span>{result.city}, {result.country}</span>
        </div>
        <h3
          className="font-semibold text-foreground leading-snug"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {result.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {result.description}
        </p>
        <div
          className="flex items-start gap-1.5 rounded-lg px-3 py-2 text-xs"
          style={{
            background: "oklch(0.560 0.110 155 / 0.07)",
            color: "oklch(0.420 0.110 155)",
          }}
        >
          <Sparkles className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>{result.matchReason}</span>
        </div>
      </div>
    </div>
  );
}