import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/Layout";
import { works, CATEGORIES, CATEGORY_LABELS, type Category } from "@/lib/works";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "프로젝트 — YULIN.zip" },
      {
        name: "description",
        content: "브랜드 필름, 광고, 뮤직비디오, 애니메이션과 실험 영상 프로젝트를 소개합니다.",
      },
      { property: "og:title", content: "프로젝트 — YULIN.zip" },
      {
        property: "og:description",
        content: "기획부터 생성, 편집과 마무리까지 직접 연출한 AI 영상 프로젝트.",
      },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  const isWorksIndex = useRouterState({
    select: (state) => state.location.pathname === "/works",
  });
  const [category, setCategory] = useState<Category | "ALL">("ALL");
  const [year, setYear] = useState<string>("ALL");

  const years = useMemo(
    () => [
      "ALL",
      ...Array.from(new Set(works.map((w) => w.year))).sort((a, b) => b.localeCompare(a)),
    ],
    [],
  );

  const filtered = useMemo(() => {
    return works
      .filter(
        (w) =>
          (category === "ALL" || w.category === category) && (year === "ALL" || w.year === year),
      )
      .sort((a, b) => b.year.localeCompare(a.year));
  }, [category, year]);

  if (!isWorksIndex) return <Outlet />;

  return (
    <PageShell>
      <section className="works-browser-shell mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="works-browser-window">
          <div className="works-browser-titlebar">
            <div>
              <span aria-hidden="true">▣</span>
              <span>ARCHIVE_BROWSER.exe / YULIN.zip PROJECTS</span>
            </div>
            <span aria-hidden="true">_ □ ×</span>
          </div>

          <div className="works-hardware-panel" aria-label="아카이브 시스템 상태">
            <div className="works-drive-slot">
              <span>OPTICAL ARCHIVE DRIVE</span>
              <i aria-hidden="true" />
              <button type="button" tabIndex={-1} aria-hidden="true">
                EJECT
              </button>
            </div>
            <div className="works-hardware-leds">
              <span>
                <i className="led-green" /> POWER
              </span>
              <span>
                <i className="led-pink" /> HDD
              </span>
              <span>
                <i className="led-cyan" /> READY
              </span>
            </div>
            <div className="works-vent" aria-hidden="true" />
            <span className="works-screw works-screw-left" aria-hidden="true" />
            <span className="works-screw works-screw-right" aria-hidden="true" />
          </div>

          <div className="works-browser-content">
            <header className="works-browser-header">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="sticker">SELECTED WORK</span>
                <span className="sticker-pink">★ {works.length} FILES LOADED</span>
                <span className="sticker">SORTED BY LATEST</span>
              </div>
              <div className="works-title-wrap">
                <span className="works-title-decor works-title-star-a" aria-hidden="true">
                  ☆
                </span>
                <span className="works-title-decor works-title-heart" aria-hidden="true">
                  ♡
                </span>
                <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[1]">
                  선별한
                  <br />
                  프로젝트
                </h1>
              </div>
              <p>
                브랜드의 과제를 영상 언어로 풀어낸 작업부터 개인적인 실험까지 모았습니다. 유형과
                연도를 선택하거나 카드를 눌러 기획 의도와 제작 과정을 확인해 보세요.
              </p>
            </header>

            <div className="works-browser-filters">
              <div>
                <span>유형</span>
                <button
                  onClick={() => setCategory("ALL")}
                  aria-pressed={category === "ALL"}
                  className={category === "ALL" ? "sticker-pink" : "sticker"}
                >
                  전체 ({works.length})
                </button>
                {CATEGORIES.map((c) => {
                  const count = works.filter((w) => w.category === c).length;
                  return (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      aria-pressed={category === c}
                      disabled={count === 0}
                      className={category === c ? "sticker-pink" : "sticker"}
                    >
                      {CATEGORY_LABELS[c]} ({count})
                    </button>
                  );
                })}
              </div>
              <div>
                <span>연도</span>
                {years.map((item) => (
                  <button
                    key={item}
                    onClick={() => setYear(item)}
                    aria-pressed={year === item}
                    className={year === item ? "sticker-pink" : "sticker"}
                  >
                    {item === "ALL" ? "전체 연도" : item}
                  </button>
                ))}
              </div>
            </div>

            <div className="works-browser-grid" aria-live="polite">
              {filtered.map((work, index) => (
                <article key={work.slug} className="works-file-card group">
                  <Link to="/works/$slug" params={{ slug: work.slug }}>
                    <div className="works-file-image">
                      <img
                        src={work.thumb}
                        alt={`${work.title} 프로젝트 썸네일`}
                        width={1280}
                        height={720}
                        loading="lazy"
                      />
                      <span>FILE {String(index + 1).padStart(2, "0")}</span>
                    </div>
                  </Link>
                  <div className="works-file-body">
                    <div className="works-file-label">
                      <span
                        className={
                          index % 2 === 0 ? "card-file-icon card-cd-icon" : "card-file-icon"
                        }
                        aria-hidden="true"
                      />
                      <span>PROJECT FILE / {work.year}</span>
                    </div>
                    <h2>{work.title}</h2>
                    <p>{work.description}</p>
                    <div className="works-file-footer">
                      <span>{CATEGORY_LABELS[work.category]}</span>
                      <Link to="/works/$slug" params={{ slug: work.slug }}>
                        열기 →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="works-browser-empty">선택한 조건에 맞는 프로젝트가 없습니다.</div>
            )}
          </div>

          <div className="works-browser-statusbar">
            <span>POWER ● ON</span>
            <span>HDD ● READING</span>
            <span>{filtered.length} FILES · PROJECTS LOADED</span>
            <span>YULIN.zip ARCHIVE ONLINE</span>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
