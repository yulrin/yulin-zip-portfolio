import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import chromeBg from "@/assets/chrome-bg.jpg";
import { works } from "@/lib/works";

export const Route = createFileRoute("/")({
  loader: () => ({ projects }),
  head: () => ({
    meta: [
      { title: "YULIN.ZIP — AI 영상 크리에이터" },
      {
        name: "description",
        content:
          "AI로 장면을 설계하고 이미지와 움직임을 만들어 편집으로 완성하는 YULIN의 포트폴리오입니다.",
      },
      { property: "og:title", content: "YULIN.ZIP — AI 영상 크리에이터" },
      {
        property: "og:description",
        content: "Brand Film · Music Video · Fashion Film · AI Image · AI Video · Editing",
      },
    ],
  }),
  component: Home,
});

const sections = [
  ["home", "HOME"],
  ["human", "HUMAN-IN-THE-LOOP"],
  ["workflow", "WORKFLOW"],
  ["skills", "SKILLS"],
  ["projects", "PROJECTS"],
  ["update-log", "UPDATE LOG"],
  ["contact", "CONTACT"],
] as const;

const workflow = [
  ["01", "기획", "프로젝트의 목표와 이야기를 구체화합니다."],
  ["02", "무드보드", "분위기와 방향성을 시각적으로 정리합니다."],
  ["03", "프롬프트 설계", "원하는 결과를 위한 프롬프트를 구성합니다."],
  ["04", "AI 이미지", "장면의 기준이 되는 이미지를 제작합니다."],
  ["05", "AI 영상", "이미지를 자연스러운 움직임으로 확장합니다."],
  ["06", "편집", "영상, 사운드, 자막을 하나의 흐름으로 완성합니다."],
  ["07", "완성", "최종 결과물을 검토하고 출력합니다."],
] as const;

const skills = [
  [
    "AI 이미지 제작",
    "프로젝트의 콘셉트와 분위기에 맞는 이미지를 제작합니다.",
    "Midjourney · Photoshop",
  ],
  [
    "AI 영상 제작",
    "이미지를 움직임과 카메라 연출로 확장합니다.",
    "Higgsfield · Seedance · Kling · Veo 3",
  ],
  [
    "프롬프트 설계",
    "목표에 맞는 결과를 얻기 위해 프롬프트를 설계하고 개선합니다.",
    "ChatGPT · Claude · Gemini",
  ],
  [
    "자료 조사 및 정리",
    "레퍼런스와 프로젝트 자료를 수집하고 체계적으로 정리합니다.",
    "NotebookLM · Notion · Pinterest",
  ],
  [
    "바이브 코딩",
    "AI를 활용해 웹사이트와 간단한 서비스를 빠르게 구현합니다.",
    "Lovable · Cursor · Codex",
  ],
  [
    "영상 편집",
    "컷 편집, 사운드, 자막, 색보정을 통해 완성도를 높입니다.",
    "Premiere Pro · After Effects",
  ],
] as const;

const updates = [
  ["v0.1.0", "시작", "'무엇을 만들까'보다 '왜 만들어야 할까'를 먼저 고민하기 시작했습니다."],
  [
    "v0.8.2",
    "실험",
    "새로운 AI 도구를 배우고, 같은 장면을 여러 방식으로 구현하며, 결과보다 과정에 더 많은 시간을 보냈습니다.",
  ],
  [
    "v1.0.0",
    "기록",
    "이곳에 담긴 프로젝트들은 완성된 결과물이면서 동시에 새로운 시작입니다. 기술은 계속 변하지만, 좋은 이야기를 만들고 싶은 마음은 그대로입니다.",
  ],
  [
    "NEXT UPDATE",
    "계속",
    "아직 압축되지 않은 프로젝트가 남아 있습니다. 이 기록은 계속 이어집니다.",
  ],
] as const;

const projectImage = (slug: string) => works.find((work) => work.slug === slug)?.thumb ?? chromeBg;

export type PortfolioProject = {
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  youtubeId?: string;
  youtubeUrl?: string;
  aspectRatio?: "16:9" | "9:16";
};

const projects: PortfolioProject[] = [
  {
    number: "01",
    title: "철길 심야식당",
    category: "Brand Film",
    description:
      "브랜드의 이야기를 2000년대 한국·일본 심야 드라마 감성으로 재해석한 AI 브랜드 필름.",
    image: projectImage("midnight-railway-diner"),
  },
  {
    number: "02",
    title: "Starlight",
    category: "AI Music Video",
    description: "가상의 아티스트를 위한 세계관과 퍼포먼스를 담은 AI 뮤직비디오.",
    image: projectImage("arcade-heart"),
  },
  {
    number: "03",
    title: "Balenciaga Campaign",
    category: "AI Fashion Film",
    description: "패션 브랜드의 아이덴티티를 시네마틱한 영상으로 표현한 AI 패션 캠페인.",
    image: projectImage("post-apocalypse-paris"),
  },
  {
    number: "04",
    title: "YULIN.ZIP",
    category: "Interactive Portfolio",
    description: "포트폴리오 자체를 하나의 경험으로 설계한 인터랙티브 웹 프로젝트.",
    image: chromeBg,
  },
  {
    number: "05",
    title: "SODEUNG",
    category: "Original Cinematic Film",
    description:
      "의뢰를 위한 작품이 아닌, 제가 가장 만들고 싶었던 장면과 감정을 담은 오리지널 시네마틱 프로젝트.",
    image: projectImage("sodeung"),
  },
];

export function getYouTubeId(project: PortfolioProject) {
  if (project.youtubeId) return project.youtubeId;
  if (!project.youtubeUrl) return null;

  try {
    const url = new URL(project.youtubeUrl);
    if (url.hostname === "youtu.be") return url.pathname.slice(1) || null;
    if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/")[2] || null;
    if (url.pathname.startsWith("/embed/")) return url.pathname.split("/")[2] || null;
    return url.searchParams.get("v");
  } catch {
    return null;
  }
}

function Home() {
  const screenRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const { projects: projectItems } = Route.useLoaderData();

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    const root = screenRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { root, threshold: [0.35, 0.55, 0.75] },
    );

    root
      .querySelectorAll<HTMLElement>(".crt-section")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="portfolio-stage">
      <a className="skip-link" href="#home">
        CRT 콘텐츠로 바로가기
      </a>

      <div className="y2k-backdrop" aria-hidden="true">
        <span className="backdrop-orbit backdrop-orbit-a" />
        <span className="backdrop-orbit backdrop-orbit-b" />
        <span className="backdrop-star backdrop-star-a">✦</span>
        <span className="backdrop-star backdrop-star-b">✧</span>
        <span className="backdrop-label backdrop-label-a">YULIN OS / DISPLAY 01</span>
        <span className="backdrop-label backdrop-label-b">ARCHIVE ONLINE · 2026</span>
      </div>

      <div className="crt-wrap">
        <div className="crt-monitor">
          <div className="crt-bezel">
            <div className="crt-brand" aria-hidden="true">
              <span>YULIN</span>
              <span>COLOR DISPLAY 2000</span>
            </div>

            <div className="crt-screen-shell">
              <div
                ref={screenRef}
                className={`crt-screen ${selectedProject ? "is-playing" : ""}`}
                tabIndex={0}
              >
                <nav className="crt-nav" aria-label="포트폴리오 섹션">
                  <a href="#home" className="crt-logo" aria-label="YULIN.ZIP 홈">
                    YULIN<span>.ZIP</span>
                  </a>
                  <div className="crt-nav-links">
                    {sections.map(([id, label]) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        aria-current={activeSection === id ? "page" : undefined}
                        className={activeSection === id ? "is-active" : ""}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </nav>

                {selectedProject && (
                  <ProjectPlayer
                    project={selectedProject}
                    onBack={() => {
                      setSelectedProject(null);
                      requestAnimationFrame(() => {
                        document.querySelector("#projects")?.scrollIntoView({ block: "start" });
                      });
                    }}
                  />
                )}

                <section id="home" className="crt-section crt-home">
                  <div className="crt-kicker">
                    <span>● SYSTEM ONLINE</span>
                    <span>SEOUL / REMOTE</span>
                  </div>
                  <div className="home-file-icon" aria-hidden="true">
                    <span>ZIP</span>
                  </div>
                  <p className="home-path">C:\YULIN\PORTFOLIO\README.TXT</p>
                  <h1>YULIN.ZIP</h1>
                  <p className="home-copy">
                    AI를 활용해 장면을 설계하고,
                    <br />
                    이미지를 만들고,
                    <br />
                    움직임을 입히고,
                    <br />
                    편집으로 완성합니다.
                  </p>
                  <p className="home-services">
                    BRAND FILM · MUSIC VIDEO · FASHION FILM
                    <br />
                    AI IMAGE · AI VIDEO · EDITING · VIBE CODING
                  </p>
                  <a href="#human" className="screen-button">
                    ENTER PORTFOLIO ↓
                  </a>
                </section>

                <section id="human" className="crt-section crt-content-section">
                  <SectionHeading
                    index="01"
                    title="HUMAN-IN-THE-LOOP"
                    subtitle="AI와 사람의 판단이 반복되는 제작 과정"
                  />
                  <div className="human-grid">
                    <div className="human-copy">
                      <p className="section-lead">AI는 결과를 생성합니다.</p>
                      <p className="human-emphasis">
                        하지만 좋은 결과는
                        <br />
                        사람의 판단과 반복적인 개선을 통해 완성됩니다.
                      </p>
                      <p>
                        저는 생성된 결과를 그대로 사용하지 않습니다.
                        <br />
                        <br />
                        기획하고, 분석하고, 수정하고, 다시 생성하는 과정을 반복하며 프로젝트를
                        완성합니다.
                        <br />
                        <br />
                        AI는 제작을 돕는 도구이고, 최종 결과를 완성하는 것은 사람이라고 믿습니다.
                      </p>
                    </div>
                    <div className="loop-diagram" aria-label="사람과 AI의 반복 제작 과정">
                      {["기획", "무드보드 설계", "프롬프트 설계", "AI 이미지", "AI 영상"].map(
                        (step) => (
                          <div key={step} className="diagram-step">
                            <span>{step}</span>
                            <i>↓</i>
                          </div>
                        ),
                      )}
                      <div className="diagram-review">
                        <span>검토 · 개선</span>
                        <i>↕</i>
                        <span>프롬프트 수정</span>
                      </div>
                      <div className="diagram-step">
                        <i>↓</i>
                        <span>편집</span>
                        <i>↓</i>
                      </div>
                      <strong>Final Output</strong>
                    </div>
                  </div>
                </section>

                <section id="workflow" className="crt-section crt-content-section">
                  <SectionHeading
                    index="02"
                    title="WORKFLOW"
                    subtitle="아이디어가 최종 화면이 되는 과정"
                  />
                  <ol className="workflow-list">
                    {workflow.map(([number, title, description]) => (
                      <li key={number}>
                        <span className="workflow-number">{number}</span>
                        <div>
                          <h3>{title}</h3>
                          <p>{description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>

                <section id="skills" className="crt-section crt-content-section">
                  <SectionHeading
                    index="03"
                    title="SKILLS"
                    subtitle="장면을 만들고 움직이고 연결하는 도구들"
                  />
                  <div className="skill-grid">
                    {skills.map(([title, description, tools], index) => (
                      <article key={title}>
                        <span className="skill-index">0{index + 1}.EXE</span>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <p className="skill-tools">Tools: {tools}</p>
                        <div className="skill-meter" aria-hidden="true">
                          <span />
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="projects" className="crt-section crt-content-section crt-projects">
                  <SectionHeading
                    index="04"
                    title="PROJECTS"
                    subtitle="Selected moving-image work"
                  />
                  <div className="project-grid">
                    {projectItems.map((project) => {
                      const youtubeId = getYouTubeId(project);

                      return youtubeId ? (
                        <button
                          key={project.number}
                          type="button"
                          className="project-card project-card-playable"
                          onClick={() => {
                            setSelectedProject(project);
                            screenRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <ProjectCardContent project={project} />
                        </button>
                      ) : (
                        <article key={project.number} className="project-card">
                          <ProjectCardContent project={project} comingSoon />
                        </article>
                      );
                    })}
                  </div>
                  <Link to="/works" className="screen-button">
                    OPEN ALL PROJECTS →
                  </Link>
                </section>

                <section id="update-log" className="crt-section crt-content-section">
                  <SectionHeading
                    index="05"
                    title="UPDATE LOG"
                    subtitle="YULIN.ZIP / VERSION HISTORY"
                  />
                  <div className="update-window">
                    <div className="update-titlebar">
                      <span>CHANGELOG.TXT</span>
                      <span>_ □ ×</span>
                    </div>
                    <ol>
                      {updates.map(([date, title, description]) => (
                        <li key={date}>
                          <time>{date}</time>
                          <div>
                            <h3>{title}</h3>
                            <p>{description}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </section>

                <section id="contact" className="crt-section crt-content-section crt-contact">
                  <SectionHeading index="06" title="CONTACT" subtitle="NEXT PROJECT / NEW SCENE" />
                  <div className="contact-window">
                    <p className="section-lead">함께 만들고 싶은 이야기가 있다면 연락해주세요.</p>
                    <dl className="contact-list">
                      <div>
                        <dt>Email:</dt>
                        <dd>
                          <a href="mailto:dlgustj725@gmail.com">dlgustj725@gmail.com</a>
                        </dd>
                      </div>
                      <div>
                        <dt>GitHub:</dt>
                        <dd>
                          <a href="https://github.com/yulrin" target="_blank" rel="noreferrer">
                            github.com/yulrin
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt>Portfolio:</dt>
                        <dd>
                          <a href="https://yulrin-zip.vercel.app" target="_blank" rel="noreferrer">
                            yulrin-zip.vercel.app
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <p className="contact-status">● CONTACT CHANNEL OPEN · 2026</p>
                </section>
              </div>

              <div className="crt-scanlines" aria-hidden="true" />
              <div className="crt-noise" aria-hidden="true" />
              <div className="crt-glass" aria-hidden="true" />
            </div>

            <div className="crt-controls" aria-hidden="true">
              <span className="crt-speaker" />
              <span className="crt-control-label">TRINITRON COLOR</span>
              <span className="crt-buttons">
                <i />
                <i />
                <i />
              </span>
              <span className="crt-power">
                <i /> POWER
              </span>
            </div>
          </div>
        </div>
        <div className="crt-stand" aria-hidden="true">
          <span />
        </div>
      </div>
    </main>
  );
}

export function ProjectCardContent({
  project,
  comingSoon = false,
}: {
  project: PortfolioProject;
  comingSoon?: boolean;
}) {
  return (
    <>
      <div className="project-image">
        <img src={project.image} alt={`${project.title} 대표 장면`} loading="lazy" />
        <span>FILE_{project.number}</span>
        {comingSoon && <b className="coming-soon-badge">Coming Soon</b>}
      </div>
      <div className="project-meta">
        <h3>
          {project.number} {project.title}
        </h3>
        <p>Category: {project.category}</p>
        <p className="project-description">{project.description}</p>
      </div>
    </>
  );
}

export function ProjectPlayer({
  project,
  onBack,
}: {
  project: PortfolioProject;
  onBack: () => void;
}) {
  const youtubeId = getYouTubeId(project);
  if (!youtubeId) return null;

  const isPortrait = project.aspectRatio === "9:16";

  return (
    <div
      className="project-player-view"
      role="dialog"
      aria-label={`${project.title} 영상 플레이어`}
    >
      <div className="project-player-bar">
        <button type="button" onClick={onBack}>
          ← Back to Projects
        </button>
        <span>
          {project.number} / {project.title}
        </span>
      </div>
      <div className="project-video-area">
        <iframe
          className={`youtube-embed ${isPortrait ? "is-portrait" : "is-landscape"}`}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&controls=1&rel=0`}
          title={`${project.title} YouTube 영상`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="section-heading">
      <span>{index}</span>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </header>
  );
}
