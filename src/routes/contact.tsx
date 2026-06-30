import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "문의 — YULIN.zip" },
      {
        name: "description",
        content: "브랜드 필름, 광고, AI 뮤직비디오와 캠페인 프로젝트를 문의해 주세요.",
      },
      { property: "og:title", content: "문의 — YULIN.zip" },
      { property: "og:description", content: "2026년 프로젝트를 진행하고 있습니다." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-16 grid md:grid-cols-12 gap-8 md:gap-10">
        <div className="md:col-span-5">
          <div className="sticker mb-3">⊹ 문의.zip</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1]">
            좋은 아이디어를
            <br />
            <span className="text-foreground">함께 완성해요.</span>
          </h1>
          <p className="mt-4 font-body text-lg text-muted-foreground">
            정리된 브리프도, 아직 형태가 없는 아이디어도 좋습니다. 목표와 일정, 예산을 남겨주시면
            영업일 기준 2일 안에 답변드리겠습니다.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="mailto:hello@yulin.zip"
              className="panel p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform block"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-primary text-white">
                ✉
              </span>
              <span>
                <div className="font-mono text-xs text-muted-foreground">이메일</div>
                <div className="font-body font-bold text-lg md:text-xl">hello@yulin.zip</div>
              </span>
            </a>
            <a
              href="https://instagram.com/yulin.zip"
              target="_blank"
              rel="noreferrer"
              className="panel p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform block"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-foreground text-background">
                @
              </span>
              <span>
                <div className="font-mono text-xs text-muted-foreground">인스타그램</div>
                <div className="font-body font-bold text-lg md:text-xl">@yulin.zip</div>
              </span>
            </a>
            <a
              href="https://vimeo.com/yulin"
              target="_blank"
              rel="noreferrer"
              className="panel p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform block"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-foreground bg-accent text-foreground">
                ▶
              </span>
              <span>
                <div className="font-mono text-xs text-muted-foreground">비메오</div>
                <div className="font-body font-bold text-lg md:text-xl">vimeo.com/yulin</div>
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="sticker-pink">★ 2026 프로젝트 접수 중</span>
            <span className="sticker">서울 / 원격 협업</span>
          </div>
        </div>

        <div className="md:col-span-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const subject = encodeURIComponent(
                `[프로젝트 문의] ${String(data.get("projectType") ?? "영상 제작")}`,
              );
              const body = encodeURIComponent(
                `이름: ${String(data.get("name") ?? "")}\n이메일: ${String(data.get("email") ?? "")}\n프로젝트 유형: ${String(data.get("projectType") ?? "")}\n예산: ${String(data.get("budget") ?? "미정")}\n\n문의 내용:\n${String(data.get("brief") ?? "")}`,
              );
              window.location.href = `mailto:hello@yulin.zip?subject=${subject}&body=${body}`;
              setSent(true);
            }}
            className="project-chat-window"
          >
            <div className="project-chat-titlebar">
              <span>PROJECT_CHAT.exe / YULIN.zip 님과의 대화</span>
              <span aria-hidden="true">_ □ ×</span>
            </div>
            <div className="project-chat-profile">
              <span className="project-chat-avatar" aria-hidden="true">
                Y
              </span>
              <div>
                <strong>YULIN.zip</strong>
                <p>AI 영상 디렉터 · 편집자</p>
              </div>
              <div className="project-chat-presence">
                <span>● ONLINE</span>
                <small>서울 / 원격 협업 가능</small>
              </div>
            </div>

            <div className="project-chat-log" role="log" aria-label="프로젝트 문의 안내 대화">
              <div className="chat-system-message">
                <span>[시스템]</span>
                <p>프로젝트 문의 창이 열렸습니다.</p>
              </div>
              <div className="chat-message">
                <span className="chat-message-name">YULIN.zip</span>
                <p>
                  안녕하세요. 작업하고 싶은 영상이 있나요?
                  <br /> 브랜드, 음악, 광고, 무드만 있어도 괜찮아요.
                </p>
              </div>
              <div className="chat-message">
                <span className="chat-message-name">YULIN.zip</span>
                <p>
                  기획부터 프롬프트 디렉팅, 영상 생성, 편집, 사운드 구성까지 함께 정리할 수
                  있습니다.
                </p>
              </div>
            </div>

            <div className="project-chat-toolbar" aria-hidden="true">
              <span>✉ 메일</span>
              <span>▣ brief.zip</span>
              <span>☆ 즐겨찾기</span>
            </div>

            <div className="project-chat-input-area">
              <div>
                <label htmlFor="name" className="block font-mono text-sm mb-1">
                  이름 / 회사명
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  type="text"
                  className="chat-field"
                  placeholder="예: 박하나 / YULIN 대행사"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-mono text-sm mb-1">
                  회신받을 이메일
                </label>
                <input
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  type="email"
                  className="chat-field"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label htmlFor="project-type" className="block font-mono text-sm mb-1">
                  프로젝트 유형
                </label>
                <select id="project-type" name="projectType" className="chat-field">
                  <option>브랜드 필름 / 광고</option>
                  <option>뮤직비디오</option>
                  <option>캠페인 제안 / 피치 필름</option>
                  <option>비주얼 시스템 / 룩북</option>
                  <option>기타 / 협의 필요</option>
                </select>
              </div>
              <div>
                <fieldset>
                  <legend className="block font-mono text-sm mb-2">예산 범위</legend>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "500만 원 미만",
                      "500–1,500만 원",
                      "1,500–4,000만 원",
                      "4,000만 원 이상",
                      "협의 필요",
                    ].map((b) => (
                      <label
                        key={b}
                        className="sticker cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-white hover:bg-primary hover:text-white"
                      >
                        <input type="radio" name="budget" value={b} className="sr-only" /> {b}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div>
                <label htmlFor="brief" className="block font-mono text-sm mb-1">
                  보낼 메시지
                </label>
                <textarea
                  id="brief"
                  name="brief"
                  required
                  rows={5}
                  className="chat-field chat-message-field resize-y"
                  placeholder="프로젝트 목표, 원하는 분위기, 일정과 참고 자료를 알려주세요."
                />
              </div>

              <div className="project-chat-send-row">
                <p className="font-mono text-sm text-muted-foreground">
                  메시지는 이메일 작성 화면으로 안전하게 연결됩니다.
                </p>
                <button type="submit" className="chrome-btn-pink">
                  메시지 보내기 →
                </button>
              </div>

              {sent && (
                <div className="chat-sent-message">
                  <strong>YULIN.zip</strong>
                  <span>이메일 앱이 열렸습니다. 내용을 확인한 뒤 보내주세요. ♥</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
