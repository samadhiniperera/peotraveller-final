import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen, MapPin, Upload, Image, Globe, Lock, Users,
  Plus, X, Loader2, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/memos")({
  component: MemosPage,
  head: () => ({
    meta: [
      { title: "Memories — PeoTraveller" },
      { name: "description", content: "Upload and share your travel memories." },
    ],
  }),
});

/* ── Mock data ─────────────────────────────────────────────────── */
type Memo = {
  id: number;
  user: string;
  avatar: string;
  place: string;
  country: string;
  description: string;
  visibility: "public" | "friends_only" | "private";
  image: string;
  tags: string[];
  date: string;
};

const MOCK_MEMOS: Memo[] = [
  {
    id: 1,
    user: "Sarah K.",
    avatar: "SK",
    place: "Santorini",
    country: "Greece",
    description: "Golden hour over the caldera — nothing prepares you for this view. We sat at the edge for two hours just watching the sun melt into the Aegean.",
    visibility: "public",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
    tags: ["sunset", "island", "greece"],
    date: "May 2025",
  },
  {
    id: 2,
    user: "Marco R.",
    avatar: "MR",
    place: "Banff",
    country: "Canada",
    description: "Moraine Lake at 6am before anyone else arrives. The turquoise is almost unreal — like someone painted it.",
    visibility: "public",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&q=80",
    tags: ["lake", "mountains", "nature"],
    date: "Aug 2024",
  },
  {
    id: 3,
    user: "Priya M.",
    avatar: "PM",
    place: "Kyoto",
    country: "Japan",
    description: "Cherry blossom season in Maruyama Park. The weeping cherry tree in the centre is something I'll never forget.",
    visibility: "public",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    tags: ["sakura", "spring", "japan"],
    date: "Apr 2025",
  },
  {
    id: 4,
    user: "Tom W.",
    avatar: "TW",
    place: "Amalfi Coast",
    country: "Italy",
    description: "Driving the coastal road at dawn — villages clinging to cliffs, lemon groves everywhere, the bluest water below.",
    visibility: "public",
    image: "https://images.unsplash.com/photo-1534445967719-8ae7b972b1a5?w=600&q=80",
    tags: ["coast", "italy", "road-trip"],
    date: "Jun 2024",
  },
  {
    id: 5,
    user: "Aisha N.",
    avatar: "AN",
    place: "Sahara Desert",
    country: "Morocco",
    description: "Sleeping under the stars in the Sahara. The silence and the sky full of stars — I've never felt so small and so free at the same time.",
    visibility: "public",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80",
    tags: ["desert", "camping", "morocco"],
    date: "Mar 2025",
  },
  {
    id: 6,
    user: "Leo C.",
    avatar: "LC",
    place: "Machu Picchu",
    country: "Peru",
    description: "Arriving at Sun Gate just as the mist cleared. The citadel emerged below us like something from another world.",
    visibility: "public",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80",
    tags: ["history", "inca", "hiking"],
    date: "Jan 2025",
  },
];

const AVATAR_COLORS = [
  "oklch(0.560 0.110 155)",
  "oklch(0.590 0.195 28)",
  "oklch(0.620 0.090 220)",
  "oklch(0.680 0.130 60)",
  "oklch(0.650 0.150 300)",
];

const TAG_OPTIONS = [
  { id: 1, name: "beach" },
  { id: 2, name: "mountain" },
  { id: 3, name: "city" },
  { id: 4, name: "nature" },
  { id: 5, name: "culture" },
  { id: 6, name: "food" },
  { id: 7, name: "adventure" },
  { id: 8, name: "sunset" },
];

/* ── Visibility icon helper ─────────────────────────────────────── */
function VisibilityIcon({ v }: { v: string }) {
  if (v === "public") return <Globe className="h-3 w-3" />;
  if (v === "friends_only") return <Users className="h-3 w-3" />;
  return <Lock className="h-3 w-3" />;
}

/* ── Main page ──────────────────────────────────────────────────── */
function MemosPage() {
  const [memos, setMemos]           = useState<Memo[]>(MOCK_MEMOS);
  const [filter, setFilter]         = useState<"all" | "public" | "mine">("all");
  const [showDialog, setShowDialog] = useState(false);
  const [viewMemo, setViewMemo]     = useState<Memo | null>(null);

  // New memo form state
  const [formPlace, setFormPlace]       = useState("");
  const [formCountry, setFormCountry]   = useState("");
  const [formDesc, setFormDesc]         = useState("");
  const [formVis, setFormVis]           = useState<"public"|"friends_only"|"private">("public");
  const [formTags, setFormTags]         = useState<number[]>([]);
  const [formLoading, setFormLoading]   = useState(false);
  const [formError, setFormError]       = useState("");

  const filtered = memos.filter((m) => {
    if (filter === "public") return m.visibility === "public";
    if (filter === "mine")   return m.user === "You";
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!formPlace || !formCountry) {
      setFormError("Place and country are required.");
      return;
    }
    if (formTags.length === 0) {
      setFormError("Please select at least one tag.");
      return;
    }
    setFormLoading(true);
    // Simulate API call
    setTimeout(() => {
      const tag = TAG_OPTIONS.filter((t) => formTags.includes(t.id)).map((t) => t.name);
      const newMemo: Memo = {
        id: Date.now(),
        user: "You",
        avatar: "YO",
        place: formPlace,
        country: formCountry,
        description: formDesc,
        visibility: formVis,
        image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80",
        tags: tag,
        date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      };
      setMemos((prev) => [newMemo, ...prev]);
      setFormPlace(""); setFormCountry(""); setFormDesc("");
      setFormVis("public"); setFormTags([]);
      setFormLoading(false);
      setShowDialog(false);
    }, 800);
  };

  const toggleTag = (id: number) => {
    setFormTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border/50 py-10" style={{ background: "oklch(0.975 0.008 95)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "oklch(0.620 0.090 220 / 0.12)" }}
                >
                  <BookOpen className="h-5 w-5" style={{ color: "oklch(0.620 0.090 220)" }} />
                </div>
                <h1
                  className="text-3xl sm:text-4xl font-semibold text-foreground fade-up"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Travel Memories
                </h1>
              </div>
              <p className="text-sm text-muted-foreground fade-up fade-up-1">
                Stories and moments from explorers around the world.
              </p>
            </div>
            <Button
              onClick={() => setShowDialog(true)}
              className="gap-2 rounded-full px-5"
              style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
            >
              <Plus className="h-4 w-4" /> Share a memory
            </Button>
          </div>

          {/* Filter tabs */}
          <div className="mt-6 flex gap-2 fade-up fade-up-2">
            {(["all", "public", "mine"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  filter === f
                    ? "text-white"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
                style={filter === f ? { background: "oklch(0.560 0.110 155)" } : {}}
              >
                {f === "all" ? "All memories" : f === "public" ? "Public" : "Mine"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="container mx-auto px-4 sm:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <Camera className="mx-auto h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground">No memories here yet.</p>
            <Button
              onClick={() => setShowDialog(true)}
              className="rounded-full"
              style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
            >
              Share the first one
            </Button>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((memo, i) => (
              <div key={memo.id} className="break-inside-avoid">
                <MemoCard
                  memo={memo}
                  avatarColor={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                  onClick={() => setViewMemo(memo)}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Upload dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "'Lora', serif" }}>
              Share a memory
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {formError && (
              <div
                className="rounded-xl px-4 py-3 text-sm"
                style={{
                  background: "oklch(0.590 0.195 28 / 0.08)",
                  color: "oklch(0.490 0.195 28)",
                  border: "1px solid oklch(0.590 0.195 28 / 0.20)",
                }}
              >
                {formError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Place name *</Label>
                <Input
                  placeholder="e.g. Eiffel Tower"
                  value={formPlace}
                  onChange={(e) => setFormPlace(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Country *</Label>
                <Input
                  placeholder="e.g. France"
                  value={formCountry}
                  onChange={(e) => setFormCountry(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Your story</Label>
              <Textarea
                placeholder="What made this moment special?"
                rows={3}
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
              />
            </div>

            {/* Photo upload placeholder */}
            <div
              className="rounded-xl border-2 border-dashed border-border/60 p-6 text-center cursor-pointer hover:border-primary/40 transition-colors"
              style={{ background: "oklch(0.975 0.008 95)" }}
            >
              <Image className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload photo{" "}
                <span className="text-xs">(coming soon)</span>
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Tags *</Label>
              <div className="flex flex-wrap gap-2">
                {TAG_OPTIONS.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      formTags.includes(tag.id)
                        ? "text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                    style={
                      formTags.includes(tag.id)
                        ? { background: "oklch(0.560 0.110 155)" }
                        : {}
                    }
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Visibility</Label>
              <Select value={formVis} onValueChange={(v: any) => setFormVis(v)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <span className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" /> Public</span>
                  </SelectItem>
                  <SelectItem value="friends_only">
                    <span className="flex items-center gap-2"><Users className="h-3.5 w-3.5" /> Friends only</span>
                  </SelectItem>
                  <SelectItem value="private">
                    <span className="flex items-center gap-2"><Lock className="h-3.5 w-3.5" /> Private</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                className="flex-1 rounded-xl"
                style={{ background: "oklch(0.560 0.110 155)", color: "#fff" }}
                disabled={formLoading}
              >
                {formLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sharing…</>
                ) : (
                  "Share memory"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View detail dialog */}
      {viewMemo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in"
          style={{ background: "rgba(20,20,30,0.55)", backdropFilter: "blur(6px)" }}
          onClick={() => setViewMemo(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewMemo(null)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/80 text-background hover:bg-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={viewMemo.image} alt={viewMemo.place} className="h-56 w-full object-cover" />
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ background: AVATAR_COLORS[viewMemo.id % AVATAR_COLORS.length] }}
                >
                  {viewMemo.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{viewMemo.user}</p>
                  <p className="text-xs text-muted-foreground">{viewMemo.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" style={{ color: "oklch(0.560 0.110 155)" }} />
                {viewMemo.place}, {viewMemo.country}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{viewMemo.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {viewMemo.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-2.5 py-0.5 text-xs"
                    style={{ background: "oklch(0.560 0.110 155 / 0.10)", color: "oklch(0.420 0.110 155)" }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Memo card ──────────────────────────────────────────────────── */
function MemoCard({
  memo,
  avatarColor,
  onClick,
}: {
  memo: Memo;
  avatarColor: string;
  onClick: () => void;
}) {
  return (
    <article
      className="group cursor-pointer rounded-2xl bg-card border border-border/50 overflow-hidden card-hover"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={memo.image}
          alt={memo.place}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ maxHeight: 220 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full px-2 py-1 text-white text-xs"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
          <VisibilityIcon v={memo.visibility} />
          <span className="capitalize">{memo.visibility.replace("_", " ")}</span>
        </div>
      </div>
      <div className="p-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
            style={{ background: avatarColor }}
          >
            {memo.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium truncate">{memo.user}</p>
            <p className="text-xs text-muted-foreground">{memo.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: "oklch(0.560 0.110 155)" }} />
          <span className="font-medium text-foreground/80">{memo.place}</span>
          <span>·</span>
          <span>{memo.country}</span>
        </div>
        {memo.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {memo.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1">
          {memo.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{
                background: "oklch(0.560 0.110 155 / 0.08)",
                color: "oklch(0.420 0.110 155)",
              }}
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}