import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, Marquee } from "@/components/Layout";
import { works, CATEGORIES, type Category } from "@/lib/works";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works — YULIN.zip" },
      { name: "description", content: "Selected AI video work — brand films, music videos, animation, fashion visuals, and experiments. Filter by category and year." },
      { property: "og:title", content: "Works — YULIN.zip" },
      { property: "og:description", content: "AI brand films, music videos, animation, fashion visuals, experimental." },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  const [category, setCategory] = useState<Category | "ALL">("ALL");
  const [year, setYear] = useState<string>("ALL");

  const years = useMemo(
    () => ["ALL", ...Array.from(new Set(works.map((w) => w.year))).sort((a, b) => b.localeCompare(a))],
    []
  );

  const filtered = useMemo(() => {
    return works
      .filter((w) => (category === "ALL" || w.category === category) && (year === "ALL" || w.year === year))
      .sort((a, b) => b.year.localeCompare(a.year));
  }, [category, year]);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="sticker">VOL.01 / WORKS</span>
          <span className="sticker-pink">★ {works.length} PROJECTS</span>
          <span className="sticker">LIVE ARCHIVE</span>
        </div>
        <h1 className="font-display text-6xl md:text-9xl leading-[0.9]">
          <span className="text-chrome">SELECTED</span><br />
          <span className="text-chrome-pink">WORKS</span>
        </h1>
        <p className="mt-4 font-mono text-xl text-muted-foreground max-w-2xl">
          A living archive — new music videos, animations, AI brand films, and
          experiments dropped as they ship. Filter by type or year. Tap a card
          for the full case study.
        </p>

        {/* Filters */}
        <div className="mt-8 panel p-4 md:p-5 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono uppercase text-sm text-muted-foreground mr-2 w-20">Type:</span>
            <button
              onClick={() => setCategory("ALL")}
              className={category === "ALL" ? "sticker-pink cursor-pointer" : "sticker cursor-pointer hover:bg-foreground hover:text-background"}
            >
              ★ All ({works.length})
            </button>
            {CATEGORIES.map((c) => {
              const count = works.filter((w) => w.category === c).length;
              const is = c === category;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  disabled={count === 0}
                  className={
                    (is ? "sticker-pink " : "sticker hover:bg-foreground hover:text-background ") +
                    "cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  }
                >
                  {c} <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono uppercase text-sm text-muted-foreground mr-2 w-20">Year:</span>
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
                {y === "ALL" ? "All years" : y}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 pt-1 border-t-2 border-dashed border-foreground/30">
            <span className="font-mono text-xs uppercase text-muted-foreground">
              Showing {filtered.length} of {works.length} · sorted newest first
            </span>
            {(category !== "ALL" || year !== "ALL") && (
              <button
                onClick={() => { setCategory("ALL"); setYear("ALL"); }}
                className="font-mono text-xs uppercase underline text-primary cursor-pointer"
              >
                Reset filters ↺
              </button>
            )}
          </div>
        </div>
      </section>

      <Marquee items={["▶ NOW PLAYING", "AI BRAND FILM", "MUSIC VIDEO", "ANIMATION", "FASHION VISUAL", "EXPERIMENTAL", "★"]} />

      <section className="mx-auto max-w-7xl px-4 py-16">
        {filtered.length === 0 ? (
          <div className="panel p-12 text-center font-mono text-lg">
            Nothing in <strong>{category}</strong>
            {year !== "ALL" && <> for <strong>{year}</strong></>} yet —{" "}
            <button onClick={() => { setCategory("ALL"); setYear("ALL"); }} className="underline text-primary cursor-pointer">show all →</button>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((w, i) => (
              <article
                key={w.slug}
                className="group relative panel overflow-hidden flex flex-col"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.4 : 0.4}deg)` }}
              >
                <span className="tape -top-2 left-8 -rotate-3" />
                <Link to="/works/$slug" params={{ slug: w.slug }} className="block">
                  <div className="relative aspect-video overflow-hidden border-b-2 border-foreground bg-foreground">
                    <img src={w.thumb} alt={w.title} loading="lazy" width={1280} height={720} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 sticker-pink">▶ {w.category}</span>
                    <span className="absolute top-3 right-3 sticker">{w.year}</span>
                    {w.duration && <span className="absolute bottom-3 right-3 sticker">{w.duration}</span>}
                    <span className="absolute bottom-3 left-3 sticker">#{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display text-3xl md:text-4xl leading-tight">{w.title}</h2>
                  {w.subtitle && <p className="font-serif italic text-lg text-muted-foreground">{w.subtitle}</p>}
                  <p className="mt-1 font-mono text-xs uppercase text-muted-foreground">{w.categoryLabel}{w.client && <> · {w.client}</>}</p>
                  <p className="mt-3 font-body text-base text-foreground/80">{w.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {w.tags.slice(0, 4).map((t) => (
                      <span key={t} className="font-mono text-xs px-2 py-0.5 border border-foreground rounded-full">#{t}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-5 flex items-center justify-between gap-3 flex-wrap">
                    <span className="font-mono uppercase text-xs text-muted-foreground">Role · {w.role.split("·")[0].trim()}</span>
                    <Link to="/works/$slug" params={{ slug: w.slug }} className="chrome-btn-pink text-sm">
                      Case study →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-16 panel p-6 md:p-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-2xl md:text-3xl">More in the vault.</p>
            <p className="font-mono text-sm text-muted-foreground mt-1">
              Older projects, loops, and unreleased experiments live in the archive.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/archive" className="chrome-btn">Open archive →</Link>
            <Link to="/contact" className="chrome-btn-pink">Request showreel</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
