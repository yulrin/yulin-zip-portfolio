import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { getWork, works } from "@/lib/works";

export const Route = createFileRoute("/works/$slug")({
  head: ({ params }) => {
    const w = getWork(params.slug);
    const title = w ? `${w.title} — Case Study · YULIN.zip` : "Case Study — YULIN.zip";
    const desc = w?.concept ?? "AI video case study by YULIN.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(w ? [{ property: "og:image", content: w.thumb }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return { work };
  },
  component: CaseStudy,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="font-display text-6xl">404 / Case not found</h1>
        <Link to="/works" className="chrome-btn mt-6">← Back to works</Link>
      </div>
    </PageShell>
  ),
});

function Section({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <section className="border-t-2 border-foreground py-10">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-display text-5xl text-chrome-pink">{n}</span>
        <h2 className="font-display text-3xl md:text-4xl uppercase">{label}</h2>
      </div>
      <div className="font-body text-lg leading-relaxed">{children}</div>
    </section>
  );
}

function CaseStudy() {
  const { work } = Route.useLoaderData();

  const idx = works.findIndex((w) => w.slug === work.slug);
  const next = works[(idx + 1) % works.length];

  return (
    <PageShell>
      <article className="mx-auto max-w-5xl px-4 py-12">
        <Link to="/works" className="font-mono uppercase text-sm hover:text-primary">← All Works</Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="sticker-pink">▶ {work.category}</span>
            <span className="sticker">{work.year}</span>
          </div>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9]">{work.title}</h1>
          {work.subtitle && (
            <p className="font-serif italic text-2xl text-muted-foreground mt-2">{work.subtitle}</p>
          )}
        </header>

        <div className="relative mt-8 panel overflow-hidden">
          <span className="tape -top-2 left-10 -rotate-3" />
          <span className="tape -top-2 right-10 rotate-3" />
          <div className="relative aspect-video bg-foreground">
            <img src={work.thumb} alt={work.title} width={1920} height={1080} className="w-full h-full object-cover" />
            <button className="absolute inset-0 grid place-items-center">
              <span className="grid h-24 w-24 place-items-center rounded-full border-4 border-foreground bg-primary text-white font-display text-3xl shadow-[4px_4px_0_var(--ink)] transition-transform hover:scale-110">▶</span>
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {work.tags.map((t) => (
            <span key={t} className="font-mono text-sm px-2 py-0.5 border-2 border-foreground rounded-full bg-white">#{t}</span>
          ))}
        </div>

        <Section n="01" label="Concept">
          <p>{work.concept}</p>
        </Section>

        <Section n="02" label="Role">
          <p>{work.role}</p>
        </Section>

        <Section n="03" label="Tools">
          <ul className="flex flex-wrap gap-2">
            {work.tools.map((t) => (
              <li key={t} className="sticker">{t}</li>
            ))}
          </ul>
        </Section>

        <Section n="04" label="Process">
          <ol className="space-y-3">
            {work.process.map((p, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-2xl text-chrome-pink shrink-0 w-8">{String(i + 1).padStart(2, "0")}</span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section n="05" label="Final Output">
          <p>{work.output}</p>
        </Section>

        <Section n="06" label="What I Improved">
          <p className="border-l-4 border-primary pl-4 italic">{work.improved}</p>
        </Section>

        <div className="border-t-2 border-foreground mt-10 pt-10 flex items-center justify-between gap-4 flex-wrap">
          <Link to="/works" className="chrome-btn">← All Works</Link>
          <Link to="/works/$slug" params={{ slug: next.slug }} className="chrome-btn-pink">
            Next: {next.title} →
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
