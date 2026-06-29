import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className="font-mono text-lg uppercase tracking-wider px-3 py-1 border-2 border-transparent rounded-full transition-colors hover:bg-foreground hover:text-background"
      activeProps={{ className: "bg-foreground text-background border-foreground" }}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-foreground bg-primary text-white font-display text-lg">Y</span>
          <span className="font-display text-2xl tracking-tight">YULIN<span className="text-primary">.zip</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" label="Home" />
          <NavLink to="/works" label="Works" />
          <NavLink to="/archive" label="Archive" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
        </nav>
        <Link to="/contact" className="chrome-btn-pink text-sm">★ Hire Me</Link>
      </div>
      <div className="md:hidden border-t-2 border-foreground bg-background overflow-x-auto">
        <nav className="flex items-center gap-1 px-4 py-2 whitespace-nowrap">
          <NavLink to="/" label="Home" />
          <NavLink to="/works" label="Works" />
          <NavLink to="/archive" label="Archive" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
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
          <span key={i} className="font-mono text-xl px-6 inline-flex items-center gap-3">
            {t} <span className="text-primary">♥</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t-2 border-foreground bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-display text-3xl">YULIN<span className="text-primary">.zip</span></div>
          <p className="mt-2 font-mono text-base opacity-80">AI Video Creator · Brand Film · Visual Storytelling</p>
        </div>
        <div>
          <div className="font-mono uppercase text-sm opacity-60 mb-2">Sitemap</div>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-primary">→ Home</Link></li>
            <li><Link to="/works" className="hover:text-primary">→ Works</Link></li>
            <li><Link to="/about" className="hover:text-primary">→ About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">→ Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-mono uppercase text-sm opacity-60 mb-2">Contact</div>
          <a href="mailto:hello@yulin.zip" className="block hover:text-primary">hello@yulin.zip</a>
          <a href="#" className="block hover:text-primary">@yulin.zip / instagram</a>
          <a href="#" className="block hover:text-primary">@yulin / vimeo</a>
        </div>
      </div>
      <div className="border-t border-background/20 py-4 text-center font-mono text-sm opacity-60">
        © 2026 YULIN.zip — coded with ♥ &amp; chrome
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
