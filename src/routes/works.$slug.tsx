import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { CATEGORY_LABELS, getWork, works, type Work } from "@/lib/works";

export const Route = createFileRoute("/works/$slug")({
  head: ({ params }) => {
    const w = getWork(params.slug);
    const title = w ? `${w.title} — 프로젝트 상세 · YULIN.zip` : "프로젝트 상세 — YULIN.zip";
    const desc = w?.concept ?? "YULIN의 AI 영상 프로젝트 상세 페이지입니다.";
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
        <h1 className="font-display text-5xl md:text-6xl">404 / 프로젝트를 찾을 수 없습니다</h1>
        <Link to="/works" className="chrome-btn mt-6">
          ← 프로젝트로 돌아가기
        </Link>
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
  const { work } = Route.useLoaderData() as { work: Work };

  const idx = works.findIndex((w) => w.slug === work.slug);
  const next = works[(idx + 1) % works.length];

  return (
    <PageShell>
      <article className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <Link to="/works" className="font-mono text-sm hover:text-primary">
          ← 전체 프로젝트
        </Link>

        <header className="case-study-header mt-6">
          <div className="case-study-kicker" aria-label="케이스 스터디 정보">
            <span>CASE STUDY</span>
            <span className="case-study-barcode" aria-hidden="true" />
            <span>PROJECT {String(idx + 1).padStart(2, "0")}</span>
            <span className="text-primary">YULIN.zip ✦</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="sticker-pink">▶ {CATEGORY_LABELS[work.category]}</span>
            <span className="sticker">{work.year}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-8xl leading-[1]">
            {work.title}
          </h1>
          {work.subtitle && (
            <p className="font-body font-bold text-xl md:text-2xl text-muted-foreground mt-3">
              {work.subtitle}
            </p>
          )}
        </header>

        <div className="case-study-media relative mt-8 panel overflow-hidden">
          <span className="tape -top-2 left-10 -rotate-3" />
          <span className="tape -top-2 right-10 rotate-3" />
          <div className="group relative aspect-video bg-foreground overflow-hidden">
            <img
              src={work.thumb}
              alt={`${work.title} 프로젝트 대표 이미지`}
              width={1920}
              height={1080}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-3 left-3 sticker-pink">★ 대표 이미지</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {work.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-sm px-2 py-0.5 border-2 border-foreground rounded-full bg-white"
            >
              #{t}
            </span>
          ))}
        </div>

        <Section n="01" label="기획 의도">
          <p>{work.concept}</p>
        </Section>

        <Section n="02" label="담당 역할">
          <p>{work.role}</p>
        </Section>

        <Section n="03" label="사용 도구">
          <ul className="flex flex-wrap gap-2">
            {work.tools.map((t) => (
              <li key={t} className="sticker">
                {t}
              </li>
            ))}
          </ul>
        </Section>

        <Section n="04" label="제작 과정">
          <ol className="space-y-3">
            {work.process.map((p, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-2xl text-chrome-pink shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section n="05" label="결과">
          <p>{work.output}</p>
        </Section>

        <Section n="06" label="배운 점과 개선">
          <p className="border-l-4 border-primary pl-4 italic">{work.improved}</p>
        </Section>

        <div className="border-t-2 border-foreground mt-10 pt-10 flex items-center justify-between gap-4 flex-wrap">
          <Link to="/works" className="chrome-btn">
            ← 전체 프로젝트
          </Link>
          <Link to="/works/$slug" params={{ slug: next.slug }} className="chrome-btn-pink">
            다음 프로젝트: {next.title} →
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
