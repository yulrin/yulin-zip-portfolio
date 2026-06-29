import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Marquee } from "@/components/Layout";
import { works } from "@/lib/works";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works — YULIN.zip" },
      { name: "description", content: "Selected AI video work, brand films, music videos, and spec campaigns by YULIN." },
      { property: "og:title", content: "Works — YULIN.zip" },
      { property: "og:description", content: "Selected AI video work, brand films, music videos, and spec campaigns." },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="sticker">VOL.01 / WORKS</span>
          <span className="sticker-pink">★ 04 FEATURED</span>
        </div>
        <h1 className="font-display text-6xl md:text-9xl leading-[0.9]">
          <span className="text-chrome">SELECTED</span><br />
          <span className="text-chrome-pink">WORKS</span>
        </h1>
        <p className="mt-4 font-mono text-xl text-muted-foreground max-w-2xl">
          Four projects that map where AI video can go when it's actually directed.
          Click any card to open the case study.
        </p>
      </section>

      <Marquee items={["▶ NOW PLAYING", "AI FILM", "BRAND", "MUSIC VIDEO", "FASHION", "★", "★", "★"]} />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {works.map((w, i) => (
            <article
              key={w.slug}
              className="group relative panel overflow-hidden"
              style={{ transform: `rotate(${i % 2 === 0 ? -0.4 : 0.4}deg)` }}
            >
              <span className="tape -top-2 left-8 -rotate-3" />
              <div className="relative aspect-video overflow-hidden border-b-2 border-foreground bg-foreground">
                <img src={w.thumb} alt={w.title} loading="lazy" width={1280} height={720} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 sticker-pink">▶ {w.category}</span>
                <span className="absolute top-3 right-3 sticker">{w.year}</span>
                <span className="absolute bottom-3 left-3 sticker">#{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="p-6">
                <h2 className="font-display text-4xl">{w.title}</h2>
                {w.subtitle && <p className="font-serif italic text-xl text-muted-foreground">{w.subtitle}</p>}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.tags.map((t) => (
                    <span key={t} className="font-mono text-sm px-2 py-0.5 border border-foreground rounded-full">#{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
                  <span className="font-mono uppercase text-sm text-muted-foreground">Role · {w.role.split("·")[0].trim()}</span>
                  <Link to="/works/$slug" params={{ slug: w.slug }} className="chrome-btn-pink text-sm">
                    Case study →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
