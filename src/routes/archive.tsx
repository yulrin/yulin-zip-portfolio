import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, Marquee } from "@/components/Layout";
import { works } from "@/lib/works";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "Archive — YULIN.zip" },
      { name: "description", content: "Full archive of YULIN's AI video work, brand films, music videos, and spec campaigns." },
      { property: "og:title", content: "Archive — YULIN.zip" },
      { property: "og:description", content: "Every project, indexed. Filter by year, type, or tag." },
    ],
  }),
  component: ArchivePage,
});

// Extra catalog entries — older / smaller works to make the archive feel real.
const extras = [
  { slug: "neon-bath", title: "NEON BATH", category: "Music Video", year: "2024", tags: ["Music Video", "Neon"], role: "Director / Edit" },
  { slug: "kintsugi-loop", title: "KINTSUGI LOOP", category: "Loop Series", year: "2024", tags: ["Loop", "Texture"], role: "AI Visualist" },
  { slug: "seoul-2099", title: "SEOUL 2099", category: "Spec / City Film", year: "2024", tags: ["Spec", "Sci-Fi"], role: "Director" },
  { slug: "ssg-summer", title: "SSG // SUMMER", category: "Brand Spot", year: "2023", tags: ["Brand", "Retail"], role: "AI Visualist" },
  { slug: "ghost-channel", title: "GHOST CHANNEL", category: "Personal Short", year: "2023", tags: ["Short", "Horror"], role: "Director / Edit" },
  { slug: "pearl-rain", title: "PEARL RAIN", category: "Lookbook", year: "2023", tags: ["Fashion", "Editorial"], role: "AI Stylist" },
  { slug: "kkang-tour", title: "KKANG TOUR", category: "Tour Visuals", year: "2022", tags: ["Live", "Loop"], role: "VJ / Visuals" },
  { slug: "rooftop-vhs", title: "ROOFTOP VHS", category: "Personal", year: "2022", tags: ["Found", "Lo-fi"], role: "Editor" },
];

type Entry = {
  slug: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  role: string;
  hasCase: boolean;
};

const catalog: Entry[] = [
  ...works.map((w) => ({
    slug: w.slug,
    title: w.title,
    category: w.category,
    year: w.year,
    tags: w.tags,
    role: w.role.split("·")[0].trim(),
    hasCase: true,
  })),
  ...extras.map((e) => ({ ...e, hasCase: false })),
];

function ArchivePage() {
  const [year, setYear] = useState<string>("ALL");
  const [tag, setTag] = useState<string>("ALL");

  const years = useMemo(() => ["ALL", ...Array.from(new Set(catalog.map((e) => e.year))).sort((a, b) => b.localeCompare(a))], []);
  const tags = useMemo(() => ["ALL", ...Array.from(new Set(catalog.flatMap((e) => e.tags))).sort()], []);

  const filtered = catalog.filter(
    (e) => (year === "ALL" || e.year === year) && (tag === "ALL" || e.tags.includes(tag))
  );

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="sticker">⊹ INDEX.txt</span>
          <span className="sticker-pink">★ {catalog.length} ENTRIES</span>
          <span className="sticker">SINCE 2022</span>
        </div>
        <h1 className="font-display text-6xl md:text-9xl leading-[0.9]">
          <span className="text-chrome">THE</span><br />
          <span className="text-chrome-pink">ARCHIVE</span>
        </h1>
        <p className="mt-4 font-mono text-xl text-muted-foreground max-w-2xl">
          Everything I've shipped, scribbled, or shelved. Filter by year or tag.
          Full case studies live on the marked entries.
        </p>
      </section>

      <Marquee items={["★ FULL CATALOG", "VOL.01 → VOL.04", "ALL YEARS", "ALL TAGS", "♥"]} />

      <section className="mx-auto max-w-7xl px-4 py-10">
        {/* Filters */}
        <div className="panel p-4 md:p-5 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono uppercase text-sm text-muted-foreground mr-2">Year:</span>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={
                  y === year
                    ? "sticker-pink cursor-pointer"
                    : "sticker cursor-pointer hover:bg-foreground hover:text-background"
                }
              >
                {y}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="font-mono uppercase text-sm text-muted-foreground mr-2">Tag:</span>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={
                  t === tag
                    ? "sticker-pink cursor-pointer"
                    : "sticker cursor-pointer hover:bg-foreground hover:text-background"
                }
              >
                #{t}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="panel overflow-hidden">
          <div className="hidden md:grid grid-cols-[80px_1fr_1.2fr_120px_1fr_120px] gap-4 px-5 py-3 bg-foreground text-background font-mono uppercase text-xs tracking-wider">
            <div>#</div>
            <div>Title</div>
            <div>Category</div>
            <div>Year</div>
            <div>Role</div>
            <div className="text-right">Open</div>
          </div>
          <ul>
            {filtered.map((e, i) => (
              <li
                key={e.slug}
                className="grid grid-cols-[1fr_auto] md:grid-cols-[80px_1fr_1.2fr_120px_1fr_120px] gap-x-4 gap-y-2 px-5 py-4 border-t-2 border-foreground items-center hover:bg-primary/10 transition-colors"
              >
                <div className="font-display text-2xl text-chrome-pink md:col-auto col-start-1">
                  {String(i + 1).padStart(3, "0")}
                </div>
                <div className="min-w-0 col-span-2 md:col-span-1 md:col-start-2 order-2 md:order-none">
                  <div className="font-display text-xl md:text-2xl truncate">{e.title}</div>
                  <div className="md:hidden font-mono text-sm text-muted-foreground">{e.category} · {e.year}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {e.tags.slice(0, 3).map((t) => (
                      <span key={t} className="font-mono text-xs px-1.5 py-0.5 border border-foreground rounded-full">#{t}</span>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block font-mono text-sm">{e.category}</div>
                <div className="hidden md:block font-mono text-sm">{e.year}</div>
                <div className="hidden md:block font-mono text-sm text-muted-foreground truncate">{e.role}</div>
                <div className="justify-self-end col-start-2 md:col-auto row-start-1 md:row-auto">
                  {e.hasCase ? (
                    <Link to="/works/$slug" params={{ slug: e.slug }} className="chrome-btn-pink text-xs">Case →</Link>
                  ) : (
                    <span className="sticker text-xs opacity-60">Archived</span>
                  )}
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-5 py-12 text-center font-mono text-lg">
                No entries match that filter. <button onClick={() => { setYear("ALL"); setTag("ALL"); }} className="underline text-primary">Reset →</button>
              </li>
            )}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-between items-center">
          <p className="font-mono text-sm text-muted-foreground">
            ♥ Older work + experiments stay archived — ask for the showreel.
          </p>
          <Link to="/contact" className="chrome-btn">Request showreel →</Link>
        </div>
      </section>
    </PageShell>
  );
}
