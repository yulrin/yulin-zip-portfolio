import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/Layout";
import { CATEGORIES, CATEGORY_LABELS, works, type Category } from "@/lib/works";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "아카이브 — YULIN.zip" },
      {
        name: "description",
        content: "YULIN의 AI 영상, 브랜드 필름, 뮤직비디오와 실험 작업을 모은 아카이브입니다.",
      },
      { property: "og:title", content: "아카이브 — YULIN.zip" },
      { property: "og:description", content: "YULIN_FEED.exe에서 탐색하는 전체 프로젝트 기록." },
    ],
  }),
  component: ArchivePage,
});

function ArchivePage() {
  const [category, setCategory] = useState<Category | "ALL">("ALL");

  const filtered = useMemo(
    () => works.filter((work) => category === "ALL" || work.category === category),
    [category],
  );

  return (
    <PageShell>
      <section className="archive-feed-shell mx-auto max-w-6xl px-4 py-10 md:py-16">
        <div className="archive-feed-window">
          <div className="archive-feed-titlebar">
            <div>
              <span aria-hidden="true">▣</span>
              <span>YULIN_FEED.exe</span>
            </div>
            <span aria-hidden="true">_ □ ×</span>
          </div>

          <div className="archive-feed-menu" aria-hidden="true">
            <span>파일</span>
            <span>보기</span>
            <span>정렬</span>
            <span>도움말</span>
          </div>

          <header className="archive-feed-profile">
            <div className="archive-feed-avatar" aria-hidden="true">
              Y
            </div>
            <div className="archive-feed-identity">
              <p className="font-mono">YULIN.zip</p>
              <h1>AI Video Archive</h1>
              <p>
                공개한 프로젝트와 작은 실험을 한곳에 모았습니다. 썸네일을 클릭하면 제작 과정과
                결과물을 볼 수 있습니다.
              </p>
            </div>
            <dl className="archive-feed-stats">
              <div>
                <dt>{works.length}</dt>
                <dd>projects</dd>
              </div>
              <div>
                <dt>{CATEGORIES.length}</dt>
                <dd>categories</dd>
              </div>
              <div>
                <dt>2022—now</dt>
                <dd>production</dd>
              </div>
            </dl>
          </header>

          <nav className="archive-feed-tabs" aria-label="아카이브 카테고리">
            <button
              type="button"
              aria-pressed={category === "ALL"}
              onClick={() => setCategory("ALL")}
              className={category === "ALL" ? "is-active" : ""}
            >
              전체
            </button>
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={category === item ? "is-active" : ""}
              >
                {CATEGORY_LABELS[item]}
              </button>
            ))}
          </nav>

          <div className="archive-feed-scroll" aria-live="polite">
            <div className="archive-feed-grid">
              {filtered.map((work, index) => (
                <Link
                  key={work.slug}
                  to="/works/$slug"
                  params={{ slug: work.slug }}
                  className="archive-feed-card group"
                >
                  <div className="archive-feed-image">
                    <img
                      src={work.thumb}
                      alt={`${work.title} 프로젝트 썸네일`}
                      width={1280}
                      height={720}
                      loading="lazy"
                    />
                    <span>FILE {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="archive-feed-card-meta">
                    <strong>{work.title}</strong>
                    <span>
                      {CATEGORY_LABELS[work.category]} · {work.year}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="archive-feed-empty">선택한 분류에 저장된 프로젝트가 없습니다.</div>
            )}
          </div>

          <div className="archive-feed-statusbar">
            <span>● READY · {filtered.length} FILES</span>
            <span>C:\YULIN.zip\ARCHIVE</span>
          </div>

          <nav className="archive-feed-bottom" aria-label="아카이브 바로가기">
            <Link to="/" aria-label="홈">
              ⌂ <span>홈</span>
            </Link>
            <span className="is-current" aria-current="page">
              ▦ <span>그리드</span>
            </span>
            <Link to="/works" aria-label="프로젝트">
              ▣ <span>프로젝트</span>
            </Link>
            <Link to="/contact" aria-label="문의">
              ♡ <span>문의</span>
            </Link>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
