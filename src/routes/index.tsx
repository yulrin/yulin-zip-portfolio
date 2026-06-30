import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/Layout";
import { OpeningSequence } from "@/components/OpeningSequence";
import { CATEGORY_LABELS, featuredWorks as works, works as allWorks } from "@/lib/works";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YULIN.zip — AI 영상 크리에이터" },
      {
        name: "description",
        content:
          "브랜드 필름, 광고, 비주얼 스토리를 만드는 AI 영상 크리에이터 YULIN의 포트폴리오입니다.",
      },
      { property: "og:title", content: "YULIN.zip — AI 영상 크리에이터" },
      { property: "og:description", content: "브랜드 필름 · 광고 · 비주얼 스토리" },
    ],
  }),
  component: Home,
});

function WindowFrame({
  title,
  variant = "pink",
  className = "",
  children,
  status,
}: {
  title: string;
  variant?: "pink" | "silver";
  className?: string;
  children: React.ReactNode;
  status?: string;
}) {
  return (
    <div className={`win ${className}`}>
      <div className={variant === "pink" ? "win-bar" : "win-bar-silver"}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="win-dot">▣</span>
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
          <span className="win-dot">_</span>
          <span className="win-dot">▢</span>
          <span className="win-dot">×</span>
        </div>
      </div>
      {children}
      {status && (
        <div className="px-3 py-1 border-t-2 border-foreground bg-muted font-mono text-sm flex items-center justify-between">
          <span>{status}</span>
          <span className="blink">▮</span>
        </div>
      )}
    </div>
  );
}

function useClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(d.toTimeString().slice(0, 8));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const SHOWREEL_CLIPS = [
  { slug: "midnight-railway-diner", label: "철길심야식당", tag: "실험 영상", t: "00:00" },
  { slug: "sodeung", label: "SODEUNG", tag: "뮤직비디오", t: "00:32" },
  { slug: "post-apocalypse-paris", label: "POST-APOCALYPSE PARIS", tag: "패션", t: "01:08" },
] as const;

const SHOWREEL_TOTAL_SEC = 168; // 02:48

function pad(n: number) {
  return n.toString().padStart(2, "0");
}
function fmtTime(s: number) {
  return `${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}`;
}

function ShowreelPlayer() {
  const clips = useMemo(() => {
    return SHOWREEL_CLIPS.map((c) => {
      const w = allWorks.find((x) => x.slug === c.slug);
      return { ...c, thumb: w?.thumb ?? "", year: w?.year ?? "" };
    });
  }, []);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        if (next >= SHOWREEL_TOTAL_SEC) {
          setIdx((i) => (i + 1) % clips.length);
          return 0;
        }
        // advance idx based on timestamps
        const tToSec = (t: string) => {
          const [m, s] = t.split(":").map(Number);
          return m * 60 + s;
        };
        const newIdx = clips.reduce((acc, c, i) => (tToSec(c.t) <= next ? i : acc), 0);
        setIdx(newIdx);
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, clips]);

  const current = clips[idx];
  const progress = (elapsed / SHOWREEL_TOTAL_SEC) * 100;
  const chapterSecond = (chapterIndex: number) => {
    const [m, s] = clips[chapterIndex].t.split(":").map(Number);
    return m * 60 + s;
  };
  const seek = (second: number) => {
    const next = Math.max(0, Math.min(SHOWREEL_TOTAL_SEC - 1, second));
    const nextIdx = clips.reduce((acc, c, i) => (chapterSecond(i) <= next ? i : acc), 0);
    setElapsed(next);
    setIdx(nextIdx);
  };
  const selectChapter = (chapterIndex: number) => {
    setIdx(chapterIndex);
    setElapsed(chapterSecond(chapterIndex));
  };

  return (
    <div id="showreel" className="showreel-shell scroll-mt-32">
      <WindowFrame title="SHOWREEL_2026.MP4" variant="silver">
        <div className="showreel-player-shell">
          {/* Video area */}
          <div className="showreel-screen relative aspect-[4/3] overflow-hidden">
            {clips.map((c, i) => (
              <img
                key={c.slug}
                src={c.thumb}
                alt={c.label}
                className={`showreel-preview absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
            {/* Scanline overlay */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 1px, transparent 1px 3px)",
              }}
              aria-hidden
            />
            {/* Top labels */}
            <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2">
              <div className="sticker-pink text-xs">HADURI FILTER</div>
              <div className="sticker text-[10px] text-signal">● CAM 02 · LOW-FI</div>
            </div>
            {/* Center play button */}
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "쇼릴 일시정지" : "쇼릴 재생"}
              className="absolute inset-0 grid place-items-center group"
            >
              <span className="media-play-button">{playing ? "❚❚" : "▶"}</span>
            </button>
            {/* Bottom title strip */}
            <div className="absolute bottom-0 inset-x-0 bg-foreground/85 text-background px-3 py-2 font-mono text-xs flex items-center justify-between gap-2">
              <span className="truncate">
                <span className="text-chrome-pink">▶</span> {current.label}
              </span>
              <span className="opacity-70 shrink-0">
                {current.tag} · {current.year}
              </span>
            </div>
          </div>

          {/* Webcam filter presets */}
          <div className="showreel-filter-tabs" aria-label="쇼릴 필터">
            {["Y2Ki", "HADURI", "FUTURE", "ARCHIVE"].map((filter) => (
              <span
                key={filter}
                className={filter === "HADURI" ? "showreel-filter is-active" : "showreel-filter"}
              >
                {filter}
              </span>
            ))}
          </div>

          {/* Transport / progress */}
          <div className="bg-white px-3 py-2 border-t-2 border-foreground">
            {/* Progress bar */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="쇼릴 재생 위치"
              aria-valuemin={0}
              aria-valuemax={SHOWREEL_TOTAL_SEC}
              aria-valuenow={Math.round(elapsed)}
              aria-valuetext={`${fmtTime(elapsed)} / ${fmtTime(SHOWREEL_TOTAL_SEC)}`}
              className="relative h-4 border-2 border-foreground bg-muted rounded-sm overflow-hidden cursor-pointer"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - r.left) / r.width;
                seek(pct * SHOWREEL_TOTAL_SEC);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  seek(elapsed - 5);
                }
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  seek(elapsed + 5);
                }
                if (e.key === "Home") {
                  e.preventDefault();
                  seek(0);
                }
                if (e.key === "End") {
                  e.preventDefault();
                  seek(SHOWREEL_TOTAL_SEC - 1);
                }
              }}
            >
              <div className="showreel-progress h-full" style={{ width: `${progress}%` }} />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-foreground bg-white rounded-full shadow-[1px_1px_0_var(--ink)]"
                style={{ left: `calc(${progress}% - 6px)` }}
                aria-hidden
              />
            </div>
            {/* Timestamp + transport */}
            <div className="mt-2 flex items-center justify-between font-mono text-xs">
              <span>
                {fmtTime(elapsed)} / {fmtTime(SHOWREEL_TOTAL_SEC)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => selectChapter((idx - 1 + clips.length) % clips.length)}
                  className="showreel-transport-button"
                  aria-label="이전 챕터"
                >
                  PREV
                </button>
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="showreel-transport-button showreel-transport-play"
                  aria-label={playing ? "일시정지" : "재생"}
                >
                  {playing ? "❚❚" : "▶"}
                </button>
                <button
                  type="button"
                  onClick={() => selectChapter((idx + 1) % clips.length)}
                  className="showreel-transport-button"
                  aria-label="다음 챕터"
                >
                  NEXT
                </button>
              </div>
            </div>
            {/* Chapter list */}
            <ol className="mt-2 border-t border-foreground/20 pt-2 space-y-0.5">
              {clips.map((c, i) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      selectChapter(i);
                    }}
                    aria-current={i === idx ? "true" : undefined}
                    className={`w-full min-h-8 grid grid-cols-[auto_1fr_auto] items-center gap-2 px-1.5 py-1 font-mono text-[11px] rounded-sm text-left ${i === idx ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                  >
                    <span className="opacity-70">{String(i + 1).padStart(2, "0")}</span>
                    <span className="truncate">{c.label}</span>
                    <span className="opacity-70">{c.tag}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className="px-3 py-2 border-t-2 border-foreground bg-muted font-mono text-xs flex justify-between items-center">
            <span className="text-signal">● READY</span>
            <Link to="/works" className="underline underline-offset-2 hover:text-primary">
              프로젝트 3개 열기 →
            </Link>
          </div>
        </div>
      </WindowFrame>
    </div>
  );
}

let hasPlayedOpening = false;

function Home() {
  const clock = useClock();
  const [showOpening, setShowOpening] = useState(() =>
    typeof window === "undefined" ? true : !hasPlayedOpening,
  );

  const completeOpening = () => {
    hasPlayedOpening = true;
    setShowOpening(false);
  };

  return (
    <>
      {showOpening && <OpeningSequence onComplete={completeOpening} />}
      <PageShell>
        {/* ============ DESKTOP ============ */}
        <div className="home-desktop relative">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-8 md:py-14 space-y-8 md:space-y-10">
            {/* ===== TOP ROW: README + SHOWREEL ===== */}
            <div className="hero-webcore-zone">
              <div className="webcore-decorations" aria-hidden="true">
                <span className="decor-folder" />
                <span className="decor-folder decor-folder-secondary" />
                <span className="decor-cd" />
                <span className="decor-cursor" />
                <span className="decor-star">★</span>
                <span className="decor-heart">♥</span>
                <span className="decor-bubble decor-bubble-a" />
                <span className="decor-bubble decor-bubble-b" />
                <span className="decor-bubble decor-bubble-c" />
                <span className="decor-os-label">YULIN OS · READY</span>
              </div>
              <div className="grid gap-5 md:gap-6 lg:grid-cols-12">
                <WindowFrame
                  title="YULIN.ZIP / README.TXT"
                  className="lg:col-span-7"
                  status={`ONLINE · ${clock} · SEOUL / REMOTE`}
                >
                  <div className="readme-surface p-6 sm:p-8 md:p-10">
                    <div className="readme-meta flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <span className="readme-status">● YULIN PERSONAL ARCHIVE</span>
                      <span>OWNER: YULIN · 2.4 KB</span>
                    </div>
                    <div className="readme-copy mt-7 max-w-xl space-y-4 font-body font-medium text-[15px] sm:text-base leading-[1.68] tracking-[-0.02em]">
                      <p className="readme-welcome">YULIN.zip에 오신 것을 환영합니다.</p>
                      <p>
                        이곳은 제가 만들고 모아온 영상,
                        <br className="hidden sm:block" /> 장면, 그리고 좋아하는 무드를 정리해둔
                        개인 아카이브입니다.
                      </p>
                      <p>
                        브랜드 필름, 뮤직비디오, 실험적인 비주얼 작업까지
                        <br className="hidden sm:block" /> 기억하고 싶은 화면들을 하나씩 꺼내어
                        보여드립니다.
                      </p>
                    </div>
                    <h1 className="readme-title mt-8 font-display text-[2.15rem] sm:text-4xl md:text-5xl leading-[1.02] tracking-[-0.04em]">
                      <span className="readme-headline block">
                        <span className="text-primary">AI</span> 영상 크리에이터
                      </span>
                      <span className="readme-subtitle block mt-3 font-body font-bold text-base sm:text-lg md:text-xl tracking-[-0.025em]">
                        장면과 무드를 모으는 영상 작업 아카이브
                      </span>
                    </h1>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link to="/works" className="chrome-btn-pink text-sm w-full sm:w-auto">
                        ▶ 대표 프로젝트 보기
                      </Link>
                      <a href="#showreel" className="chrome-btn text-sm w-full sm:w-auto">
                        ▶ 쇼릴 보기
                      </a>
                    </div>
                  </div>
                </WindowFrame>

                <div className="lg:col-span-5">
                  <ShowreelPlayer />
                </div>
              </div>
            </div>

            {/* ===== FEATURED PROJECTS ===== */}
            <WindowFrame title="FEATURED_PROJECTS / 03 FILES" variant="silver">
              <div className="bg-white p-4 md:p-6">
                <div className="works-magazine-strip" aria-label="선정 프로젝트 정보">
                  <span className="works-magazine-title">SELECTED WORK</span>
                  <span className="works-magazine-vol">VOL.01 / AI VIDEO ARCHIVE</span>
                  <span className="works-barcode" aria-hidden="true" />
                  <span className="works-new-label">NEW UPLOAD ♥</span>
                </div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    작품을 선택하면 상세 제작 과정을 볼 수 있습니다.
                  </span>
                  <span className="font-pixel text-[11px] text-primary">♥ EDITOR'S PICK</span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {works.slice(0, 3).map((work, index) => (
                    <Link
                      key={work.slug}
                      to="/works/$slug"
                      params={{ slug: work.slug }}
                      className="featured-project group"
                    >
                      <div className="relative aspect-video overflow-hidden bg-foreground">
                        <img
                          src={work.thumb}
                          alt={`${work.title} 대표 장면`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <span className="absolute left-2 top-2 system-label">
                          FILE {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="font-display text-xl leading-tight">{work.title}</div>
                        <div className="mt-1 font-mono text-[11px] text-muted-foreground">
                          {CATEGORY_LABELS[work.category]} · {work.year}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </WindowFrame>

            {/* ===== RECENT FILES (selected works) ===== */}
            <WindowFrame
              title="최근_프로젝트.exe — 최신순"
              status={`${works.length}개 파일 · 형식: video/mp4 · 보기: 자세히`}
            >
              <div className="bg-white">
                {/* table header */}
                <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 border-b-2 border-foreground bg-muted font-mono text-xs uppercase">
                  <div className="col-span-1">번호</div>
                  <div className="col-span-5">프로젝트</div>
                  <div className="col-span-3">분류</div>
                  <div className="col-span-1">연도</div>
                  <div className="col-span-2 text-right">열기</div>
                </div>
                <ul>
                  {works.map((w, i) => (
                    <li key={w.slug} className="border-b border-foreground/20 last:border-b-0">
                      <Link
                        to="/works/$slug"
                        params={{ slug: w.slug }}
                        className="group grid grid-cols-12 gap-3 items-center px-3 md:px-4 py-3 hover:bg-muted focus:bg-muted transition-colors"
                      >
                        <div className="col-span-2 md:col-span-1">
                          <div className="relative w-14 h-14 md:w-12 md:h-12 border-2 border-foreground overflow-hidden rounded-sm bg-foreground">
                            <img
                              src={w.thumb}
                              alt=""
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="col-span-10 md:col-span-5 min-w-0">
                          <div className="font-display text-xl leading-none truncate">
                            {w.title}
                          </div>
                          <div className="font-mono text-xs opacity-70 truncate">
                            {w.slug}.mp4
                            {w.duration ? ` · ${w.duration}` : ""}
                          </div>
                        </div>
                        <div className="col-span-7 md:col-span-3 font-mono text-sm">
                          <span className="sticker text-xs">{CATEGORY_LABELS[w.category]}</span>
                        </div>
                        <div className="col-span-2 md:col-span-1 font-mono text-sm">{w.year}</div>
                        <div className="col-span-3 md:col-span-2 text-right font-mono text-sm">
                          <span className="inline-flex items-center gap-1 group-hover:text-primary">
                            ▶ 열기 →
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-3 border-t-2 border-foreground bg-muted flex justify-between items-center">
                  <span className="font-mono text-sm opacity-70">전체 프로젝트 보기</span>
                  <Link to="/works" className="chrome-btn text-xs">
                    ▶ 전체 보기
                  </Link>
                </div>
              </div>
            </WindowFrame>

            {/* ===== PROCESS + ABOUT ===== */}
            <div className="grid gap-5 md:gap-6 lg:grid-cols-12">
              <WindowFrame title="제작과정.exe — 영상이 완성되는 과정" className="lg:col-span-7">
                <div className="bg-white p-4 md:p-6">
                  <div className="font-mono text-sm uppercase text-muted-foreground mb-3">
                    제작 과정 · 04단계
                  </div>
                  <ol className="space-y-3">
                    {[
                      {
                        n: "01",
                        t: "기획과 무드",
                        d: "목표를 정리하고 레퍼런스와 트리트먼트를 설계합니다.",
                      },
                      {
                        n: "02",
                        t: "프리비주얼",
                        d: "스틸 이미지로 스타일과 캐릭터의 일관성을 잡습니다.",
                      },
                      {
                        n: "03",
                        t: "생성과 디렉팅",
                        d: "장면마다 가장 적합한 AI 도구로 움직임을 연출합니다.",
                      },
                      {
                        n: "04",
                        t: "후반 작업과 완성",
                        d: "편집, 색보정, 사운드 디자인으로 최종 완성도를 높입니다.",
                      },
                    ].map((s) => (
                      <li
                        key={s.n}
                        className="flex gap-4 items-start border-2 border-foreground rounded-md p-3 bg-muted"
                      >
                        <div className="font-display text-3xl text-foreground leading-none">
                          {s.n}
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-lg leading-tight">{s.t}</div>
                          <div className="font-body text-sm leading-relaxed text-muted-foreground">
                            {s.d}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </WindowFrame>

              <WindowFrame title="소개.txt" variant="silver" className="lg:col-span-5">
                <div className="bg-white p-4 md:p-6">
                  <div className="sticker mb-3">⊹ 메모장.EXE</div>
                  <h2 className="font-display text-3xl md:text-4xl">
                    안녕하세요, <span className="text-foreground">YULIN</span>입니다
                  </h2>
                  <p className="mt-3 font-body text-base leading-relaxed">
                    편집자로 시작해 지금은 AI 영상감독으로 일하고 있습니다. 생성형 도구의 가능성과
                    전통적인 영상 제작의 치밀함을 결합해 브랜드 필름, 광고, 뮤직비디오를 만듭니다.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-sm">
                    {[
                      { k: "프로젝트", v: "40+" },
                      { k: "경력", v: "06년" },
                      { k: "협업 브랜드", v: "12" },
                      { k: "아이디어", v: "∞" },
                    ].map((s) => (
                      <div key={s.k} className="border-2 border-foreground rounded-md p-2 bg-muted">
                        <div className="font-display text-2xl text-foreground leading-none">
                          {s.v}
                        </div>
                        <div className="text-xs uppercase opacity-70 mt-1">{s.k}</div>
                      </div>
                    ))}
                  </div>
                  <Link to="/about" className="chrome-btn mt-5 text-sm">
                    소개 보기 →
                  </Link>
                </div>
              </WindowFrame>
            </div>

            {/* ===== CONTACT DIALOG ===== */}
            <WindowFrame title="문의하기.exe — 새 메시지" variant="pink">
              <div className="bg-white p-5 md:p-10 text-center">
                <div className="sticker-pink mx-auto mb-3">⊹ 안내</div>
                <h2 className="font-display text-4xl md:text-6xl leading-[0.95]">
                  만들고 싶은 이야기가 있나요? <br />
                  <span className="text-foreground">함께 영상으로 완성해요.</span>
                </h2>
                <p className="mt-3 font-mono text-base md:text-lg text-muted-foreground">
                  2026년 브랜드 필름과 광고 프로젝트를 진행하고 있습니다.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a href="mailto:hello@yulin.zip" className="chrome-btn-pink w-full sm:w-auto">
                    ✉ 이메일로 문의하기
                  </a>
                  <Link to="/contact" className="chrome-btn w-full sm:w-auto">
                    [ 확인 ] 프로젝트 상담하기
                  </Link>
                </div>
              </div>
              <div className="px-3 py-1 border-t-2 border-foreground bg-muted font-mono text-sm flex justify-between">
                <span>24시간 내 답변드립니다</span>
                <span className="blink">▮</span>
              </div>
            </WindowFrame>

            {/* ===== TASKBAR ===== */}
            <div className="win hidden sm:block" aria-hidden="true">
              <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-b from-[oklch(0.95_0_0)] via-[oklch(0.82_0.01_250)] to-[oklch(0.6_0.01_250)] border-b-2 border-foreground">
                <span className="chrome-btn-pink !min-h-0 !py-1 !px-3 text-xs">★ 시작</span>
                <div className="flex-1 flex items-center gap-1 overflow-x-auto">
                  {[
                    "README.txt",
                    "SHOWREEL_2026.MP4",
                    "최근_프로젝트.exe",
                    "제작과정.exe",
                    "소개.txt",
                    "문의하기.exe",
                  ].map((t) => (
                    <span
                      key={t}
                      className="font-pixel text-xs px-2 py-1 border-2 border-foreground bg-white rounded-sm whitespace-nowrap"
                    >
                      ▣ {t}
                    </span>
                  ))}
                </div>
                <span className="font-pixel text-xs px-2 py-1 border-2 border-foreground bg-white rounded-sm whitespace-nowrap">
                  🕒 {clock}
                </span>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </>
  );
}
