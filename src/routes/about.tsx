import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Layout";
import { featuredWorks } from "@/lib/works";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "소개 — YULIN.zip" },
      {
        name: "description",
        content: "브랜드와 아티스트의 이야기를 AI 영상으로 연출하는 크리에이터 YULIN을 소개합니다.",
      },
      { property: "og:title", content: "소개 — YULIN.zip" },
      { property: "og:description", content: "기획부터 편집까지 직접 완성하는 AI 영상감독." },
    ],
  }),
  component: About,
});

function About() {
  const [primaryStill, secondaryStill] = featuredWorks;

  return (
    <PageShell>
      <section className="about-issue mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="about-issue-labels">
          <span>YULIN.zip / ABOUT ISSUE</span>
          <span>PROFILE SPREAD 2026</span>
          <span className="text-primary">AI VIDEO CREATOR ✦</span>
        </div>

        <div className="about-magazine-window">
          <div className="about-magazine-titlebar">
            <span>YULIN.zip / ABOUT_ISSUE_2026.mag</span>
            <span aria-hidden="true">_ □ ×</span>
          </div>

          <div className="about-magazine-spread">
            <article className="about-magazine-left">
              <span className="about-ribbon">PERSONAL ARCHIVE / VOL.01</span>
              <h1 className="about-yulin-title">YULIN</h1>
              <p className="about-role-title">AI 영상 디렉터 · 편집자</p>
              <p className="about-lead">
                브랜드와 아티스트의 분위기를
                <br /> AI 영상과 편집으로 설계합니다.
              </p>

              <section className="about-copy-block">
                <h2>INTRO</h2>
                <p>
                  AI 영상 기획과 편집을 중심으로 브랜드 필름, 광고, 뮤직비디오, 애니메이션을
                  제작합니다. 프롬프트 디렉팅부터 이미지 톤 설계, 영상 생성, 편집, 사운드 구성까지
                  하나의 장면이 완성되는 흐름을 설계합니다.
                </p>
              </section>

              <section className="about-copy-block about-role-list">
                <h2>ROLE</h2>
                <ul>
                  {["AI 영상 디렉터", "프롬프트 디렉터", "영상 편집자", "비주얼 스토리텔러"].map(
                    (role) => (
                      <li key={role}>♥ {role}</li>
                    ),
                  )}
                </ul>
              </section>

              <div className="about-profile-facts">
                <span>BASED · SEOUL / REMOTE</span>
                <span>STATUS · PROJECT OPEN</span>
              </div>
              <div className="about-issue-barcode" aria-hidden="true" />
            </article>

            <article className="about-magazine-right">
              <div className="about-collage" aria-label="YULIN 프로젝트 영상 스틸">
                <figure className="about-photo-card about-photo-primary">
                  <img
                    src={primaryStill.thumb}
                    alt={`${primaryStill.title} 프로젝트 영상 스틸`}
                    loading="lazy"
                  />
                  <figcaption>STILL 01 / {primaryStill.title}</figcaption>
                </figure>
                <figure className="about-photo-card about-photo-secondary">
                  <img
                    src={secondaryStill.thumb}
                    alt={`${secondaryStill.title} 프로젝트 영상 스틸`}
                    loading="lazy"
                  />
                  <figcaption>STILL 02 / {secondaryStill.title}</figcaption>
                </figure>
                <span className="about-collage-heart" aria-hidden="true">
                  ♡
                </span>
                <span className="about-collage-star" aria-hidden="true">
                  ☆
                </span>
                <span className="about-tape about-tape-a" aria-hidden="true" />
                <span className="about-tape about-tape-b" aria-hidden="true" />
              </div>

              <div className="about-info-grid">
                <section className="about-info-card about-polka-card">
                  <h2>WORKFLOW</h2>
                  <ol>
                    {[
                      "기획",
                      "레퍼런스 분석",
                      "프롬프트 디렉팅",
                      "이미지 생성 및 수정",
                      "AI 영상화",
                      "Premiere 편집",
                      "자막 / 사운드 / 룸톤 구성",
                    ].map((step, index) => (
                      <li key={step}>
                        <span>{String(index + 1).padStart(2, "0")}</span> {step}
                      </li>
                    ))}
                  </ol>
                </section>

                <section className="about-info-card">
                  <h2>TOOLS</h2>
                  <ul>
                    {[
                      "ChatGPT",
                      "Midjourney",
                      "Higgsfield",
                      "Premiere Pro",
                      "Photoshop",
                      "After Effects",
                    ].map((tool) => (
                      <li key={tool}>★ {tool}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="about-keywords">
                <h2>STYLE KEYWORDS</h2>
                <div>
                  {[
                    "AI Video",
                    "Brand Film",
                    "Music Video",
                    "Animation",
                    "Y2K Webcore",
                    "Retro Mood",
                    "Visual Storytelling",
                  ].map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <Link to="/works" className="chrome-btn-pink">
            프로젝트 보기 →
          </Link>
          <Link to="/contact" className="chrome-btn">
            함께 작업하기 ✉
          </Link>
        </div>
      </section>

      {/* Press / Recognition */}
      <section className="about-recognition mx-auto max-w-7xl px-4 pb-20">
        <div className="sticker mb-3">⊹ 주요 이력</div>
        <h2 className="font-display text-4xl md:text-6xl">선정 · 소개 · 참여</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            { y: "2025", t: "서울 AI 필름 쇼케이스 공식 선정" },
            { y: "2025", t: "Korean Indie Mag 14호 작업 소개" },
            { y: "2024", t: "도쿄 Visual AI Conference 연사" },
            { y: "2024", t: "IT'S NICE THAT AI Auteurs 라운드테이블 참여" },
            { y: "2023", t: "Pixels Festival 생성형 단편 부문 수상" },
            { y: "2023", t: "서울 생성예술 연구소 레지던시" },
          ].map((r) => (
            <div key={r.t} className="panel p-4 flex gap-3 items-start">
              <span className="sticker-pink shrink-0">{r.y}</span>
              <p className="font-body">{r.t}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
