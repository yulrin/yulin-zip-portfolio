import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className="font-body font-bold text-sm md:text-base tracking-[-0.02em] leading-none px-3 py-2 border border-transparent rounded-sm transition-all hover:bg-foreground hover:text-background"
      activeProps={{ className: "bg-foreground text-background border-foreground" }}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b-2 border-foreground bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" aria-label="YULIN.zip 홈" className="flex items-center gap-2 rounded-md">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-foreground bg-primary text-white font-display text-lg">
            Y
          </span>
          <span className="font-display text-2xl tracking-tight">
            YULIN<span className="logo-zip text-primary">.zip</span>
          </span>
        </Link>
        <nav aria-label="주요 메뉴" className="hidden md:flex items-center gap-1">
          <NavLink to="/" label="홈" />
          <NavLink to="/works" label="프로젝트" />
          <NavLink to="/archive" label="아카이브" />
          <NavLink to="/about" label="소개" />
          <NavLink to="/contact" label="문의" />
        </nav>
        <Link to="/contact" className="chrome-btn-pink !px-4 text-sm">
          ★ 함께 작업하기
        </Link>
      </div>
      <div className="md:hidden border-t-2 border-foreground bg-background">
        <nav aria-label="모바일 주요 메뉴" className="grid grid-cols-5 items-center px-1 py-1">
          <NavLink to="/" label="홈" />
          <NavLink to="/works" label="프로젝트" />
          <NavLink to="/archive" label="아카이브" />
          <NavLink to="/about" label="소개" />
          <NavLink to="/contact" label="문의" />
        </nav>
      </div>
    </header>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="border-y-2 border-foreground bg-foreground text-background overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {doubled.map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="font-mono text-lg md:text-xl px-5 md:px-6 inline-flex items-center gap-3"
          >
            {t} <span className="text-primary">♥</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 md:mt-24 border-t-2 border-foreground bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-display text-3xl">
            YULIN<span className="text-primary">.zip</span>
          </div>
          <p className="mt-2 font-mono text-base opacity-80">
            AI 영상 크리에이터 · 브랜드 필름 · 비주얼 스토리
          </p>
        </div>
        <div>
          <div className="font-mono uppercase text-sm opacity-60 mb-2">바로가기</div>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-primary">
                → 홈
              </Link>
            </li>
            <li>
              <Link to="/works" className="hover:text-primary">
                → 프로젝트
              </Link>
            </li>
            <li>
              <Link to="/archive" className="hover:text-primary">
                → 아카이브
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                → 소개
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                → 문의
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-mono uppercase text-sm opacity-60 mb-2">문의</div>
          <a href="mailto:hello@yulin.zip" className="block hover:text-primary">
            hello@yulin.zip
          </a>
          <a
            href="https://instagram.com/yulin.zip"
            target="_blank"
            rel="noreferrer"
            className="block hover:text-primary"
          >
            @yulin.zip / 인스타그램
          </a>
          <a
            href="https://vimeo.com/yulin"
            target="_blank"
            rel="noreferrer"
            className="block hover:text-primary"
          >
            @yulin / 비메오
          </a>
        </div>
      </div>
      <div className="border-t border-background/20 py-4 text-center font-mono text-sm opacity-60">
        © 2026 YULIN.zip — ♥와 크롬으로 만들었습니다
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        본문으로 바로가기
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 page-enter">
        <div className="pearl-sparkle-layer" aria-hidden="true">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
